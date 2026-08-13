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

        if (isCorrect && confidence >= 80) {
            prompt = `Kamu adalah "Viba.ai", tutor bahasa isyarat BISINDO yang cerdas dan suportif. Muridmu baru saja mempraktikkan gestur "${letter}" dan sistem mendeteksinya dengan akurasi SANGAT TINGGI yaitu ${confidence}%. 
            Tugasmu: Berikan pujian mutlak. Katakan bahwa gerakannya sudah sangat sempurna. 
            DILARANG KERAS memberikan koreksi. Balas dengan 1 kalimat pendek penuh semangat.`;
        } 
        else if (isCorrect && confidence >= 45) {
            prompt = `Kamu adalah "Viba.ai", tutor bahasa isyarat BISINDO. Muridmu mempraktikkan gestur "${letter}" dan gerakannya sudah BENAR dengan akurasi ${confidence}%.
            Tugasmu: Berikan pujian dan dorongan agar gerakannya bisa lebih mantap. DILARANG KERAS memberikan koreksi jari yang spesifik.
            Balas dengan 1 sampai 2 kalimat pendek yang memotivasi.`;
        } 
        else {
            prompt = `Kamu adalah "Viba.ai", tutor bahasa isyarat BISINDO. Muridmu mencoba melakukan gestur "${letter}" tapi sistem mendeteksi gerakannya belum tepat atau akurasinya sangat rendah (hanya ${confidence}%).
            Tugasmu: Berikan respons suportif yang memotivasi murid untuk mengulang.
            ATURAN MUTLAK:
            1. JANGAN PERNAH menyuruh murid meletakkan tangan di tengah kamera.
            2. JANGAN PERNAH memberikan instruksi posisi jari secara detail (karena kamu tidak melihat langsung ke layar).
            3. Beri tahu mereka dengan ramah bahwa gerakannya belum tepat atau AI kesulitan membacanya.
            4. Sarankan murid untuk "memperhatikan kembali referensi gambar" atau "menyesuaikan posisi/ekspresi perlahan".
            5. DILARANG KERAS memberikan pujian "Sempurna" atau "Benar".
            6. Balas dengan 1 sampai 2 kalimat pendek yang ramah namun jujur.`;
        }

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error Detail Gemini:", error);
        return `GAGAL MEMANGGIL AI: ${error.message}`;
    }
};