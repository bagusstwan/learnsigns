/**
 * Utility untuk mendeteksi gestur bahasa isyarat
 * MediaPipe Landmarks: 
 * 0: Pergelangan, 4: Ujung Jempol, 8: Ujung Telunjuk, 12: Ujung Tengah, 16: Ujung Manis, 20: Ujung Kelingking
 */

export const detectSignA = (landmarks) => {
    if (!landmarks || landmarks.length === 0) return false;

    // Logika Huruf 'A': 4 Jari menekuk ke bawah, jempol tegak di samping
    const isIndexFolded = landmarks[8].y > landmarks[5].y;
    const isMiddleFolded = landmarks[12].y > landmarks[9].y;
    const isRingFolded = landmarks[16].y > landmarks[13].y;
    const isPinkyFolded = landmarks[20].y > landmarks[17].y;
    const isThumbUpOrSide = landmarks[4].y < landmarks[2].y;

    if (isIndexFolded && isMiddleFolded && isRingFolded && isPinkyFolded && isThumbUpOrSide) {
        return true;
    }
    return false;
};

export const detectSignB = (landmarks) => {
    if (!landmarks || landmarks.length === 0) return false;

    // Logika Huruf 'B' (Anti-Flicker & Kebal Mirror Kamera):
    // Cukup pastikan keempat jari utama berdiri tegak lurus dengan sempurna 
    // (Nilai Y ujung jari harus lebih kecil dari sendi di bawahnya)
    const isIndexStraight = landmarks[8].y < landmarks[6].y;
    const isMiddleStraight = landmarks[12].y < landmarks[10].y;
    const isRingStraight = landmarks[16].y < landmarks[14].y;
    const isPinkyStraight = landmarks[20].y < landmarks[18].y;

    // Jika 4 jari tegak lurus stabil, maka gestur B dinyatakan sah
    if (isIndexStraight && isMiddleStraight && isRingStraight && isPinkyStraight) {
        return true;
    }
    return false;
};