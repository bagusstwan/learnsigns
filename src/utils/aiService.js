import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getFeedbackFromAI = async (isCorrect, letter) => {
    if (!apiKey) {
        return "⚠️ ERROR: API Key tidak terdeteksi. Pastikan file .env ada dan kamu sudah me-restart server (npm run dev).";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Kamu adalah "Si Biru", tutor bahasa isyarat yang sangat ramah, sabar, dan suportif. 
        Muridmu sedang mempraktikkan gerakan isyarat untuk huruf "${letter}". 
        Hasil deteksi sistem saat ini: ${isCorrect ? 'BENAR' : 'SALAH'}. 
        Jika BENAR, berikan pujian hangat dan apresiasi. 
        Jika SALAH, berikan teguran yang sangat sopan, lucu, dan menyemangati (misalnya menyuruh mereka mengepalkan jari lebih rapat).
        PENTING: Balas dengan 1 sampai 2 kalimat pendek saja agar cepat dibaca.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error Detail Gemini:", error);
        // Menampilkan pesan error ASLI dari sistem agar kita tahu masalahnya
        return `❌ GAGAL MEMANGGIL AI: ${error.message}`;
    }
};