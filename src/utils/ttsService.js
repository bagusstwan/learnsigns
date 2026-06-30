/**
 * Utility untuk mengubah Teks menjadi Suara (Text-to-Speech)
 * Ditambahkan Callback untuk memicu animasi mulut maskot
 */

export const speakText = (text, onStart, onEnd) => {
    if (!('speechSynthesis' in window)) {
        console.error("❌ ERROR TTS: Browser tidak mendukung Web Speech API");
        if (onEnd) onEnd();
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; 
    utterance.rate = 1.0;     
    utterance.pitch = 1.1;    

    // Sinyal ke Maskot: Suara Mulai (Buka Mulut)
    utterance.onstart = () => {
        console.log("🔊 TTS STATUS: Berbicara...");
        if (onStart) onStart();
    };

    // Sinyal ke Maskot: Suara Selesai (Tutup Mulut)
    utterance.onend = () => {
        console.log("🔇 TTS STATUS: Selesai.");
        if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
        console.error("❌ TTS ERROR EVENT:", event.error);
        if (onEnd) onEnd();
    };

    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(voice => voice.lang === 'id-ID' || voice.lang.startsWith('id'));
    
    if (indonesianVoice) {
        utterance.voice = indonesianVoice;
    }

    window.speechSynthesis.speak(utterance);
};