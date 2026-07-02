import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getFeedbackFromAI = async (isCorrect, letter, confidence) => {
    if (!apiKey) {
        return "ERROR: API Key tidak terdeteksi. Pastikan file .env ada dan kamu sudah me-restart server (npm run dev).";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        let prompt = "";

        if (isCorrect && confidence >= 90) {
            prompt = `Kamu adalah "Si Biru", tutor bahasa isyarat BISINDO yang suportif. Muridmu baru saja mempraktikkan huruf "${letter}" dan sistem AI EduSync mendeteksinya dengan akurasi SANGAT TINGGI yaitu ${confidence}%. 
            Tugasmu: Berikan pujian mutlak. Katakan bahwa gerakannya sudah sempurna. 
            DILARANG KERAS memberikan koreksi, DILARANG membahas posisi jari. 
            Balas dengan 1 kalimat pendek penuh semangat.`;
        } 
        else if (isCorrect) {
            prompt = `Kamu adalah "Si Biru", tutor bahasa isyarat BISINDO. Muridmu mempraktikkan huruf "${letter}" dan gerakannya sudah BENAR (akurasi ${confidence}%).
            Tugasmu: Berikan pujian. DILARANG KERAS memberikan koreksi jari.
            Balas dengan 1 kalimat pendek.`;
        } 
        else {
            // PERBAIKAN MUTLAK: Menghapus instruksi "tengah kamera" agar LLM tidak merusak UX
            prompt = `Kamu adalah "Si Biru", tutor bahasa isyarat BISINDO. Muridmu mencoba huruf "${letter}" tapi akurasinya baru ${confidence}%.
            Tugasmu: Berikan respons suportif dan memotivasi.
            ATURAN MUTLAK:
            1. JANGAN PERNAH menyuruh murid meletakkan tangan di tengah kamera (kamera aplikasi kami luas dan bisa mendeteksi gerakan di posisi mana pun).
            2. JANGAN PERNAH menyuruh mengepalkan/membuka jari secara spesifik.
            Cukup sarankan murid untuk "memperhatikan kembali gambar tutorial" atau "mencoba menyesuaikan sedikit kemiringan tangannya".
            Balas dengan 1 sampai 2 kalimat pendek yang ramah.
            3. Berikan pujian bahwa gerakannya sudah SEMPURNA.
            4. HANYA ucapkan pujian.
            5. DILARANG KERAS memberikan saran, tips, koreksi, atau kalimat tambahan setelah pujian. 
            6. DILARANG menggunakan kata "tapi", "coba", "sedikit lagi", atau "namun".
            7. JANGAN memancing murid untuk melakukan perbaikan apa pun.
            8. Balas hanya dengan 1 kalimat pendek.`;
        }

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error Detail Gemini:", error);
        return `GAGAL MEMANGGIL AI: ${error.message}`;
    }
};