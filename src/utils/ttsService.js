/**
 * Layanan Text to Speech terintegrasi ElevenLabs
 * Versi Final Hardcode - Dijamin Berhasil
 */
export const speakText = async (text, onStart, onEnd) => {
    // Kredensial ini diambil langsung dari pengujian Console yang sukses
    const ELEVENLABS_API_KEY = "sk_97e0160557bdfc60b00c2ef9107f4d0a532078b7ec9a6822";
    const VOICE_ID = "npvlrnBapvbjBtHeTrHA"; 

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const exactReason = errorData?.detail?.message || `HTTP ${response.status}`;
            console.error("ALASAN PENOLAKAN ELEVENLABS:", exactReason);
            throw new Error(exactReason);
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onplay = () => {
            console.log("Audio ElevenLabs Berhasil Diputar di React!");
            if (onStart) onStart();
        };

        audio.onended = () => {
            if (onEnd) onEnd();
            URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
            if (onEnd) onEnd();
        };

        audio.play();

    } catch (error) {
        console.error("Gagal memutar ElevenLabs, beralih ke lokal:", error.message);
        fallbackSpeech(text, onStart, onEnd);
    }
};

/**
 * Mekanisme penyelamat menggunakan Web Speech API lokal
 */
const fallbackSpeech = (text, onStart, onEnd) => {
    if (!('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
    }
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; 
    utterance.rate = 1.0;     
    utterance.pitch = 1.1;  

    utterance.onstart = () => { if (onStart) onStart(); };
    utterance.onend = () => { if (onEnd) onEnd(); };
    utterance.onerror = () => { if (onEnd) onEnd(); };

    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(voice => voice.lang === 'id-ID' || voice.lang.startsWith('id'));
    if (indonesianVoice) utterance.voice = indonesianVoice;
    
    window.speechSynthesis.speak(utterance);
};