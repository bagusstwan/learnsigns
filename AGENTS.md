# Instruksi Sistem untuk Agen AI - Frontend

Dokumen ini ditujukan bagi AI Code Assistant yang memproses repositori ini.

## Konteks Proyek
Ini adalah repositori antarmuka klien (`learnsigns`) untuk Nusa.ai, aplikasi EduTech berskala *Enterprise*.
Tumpukan teknologi: **React.js 18, Vite, React Router**.

## Aturan Ketat untuk Asisten AI
1. **Standar React:** Dilarang merekomendasikan atau menggunakan *Class Components*. Selalu gunakan *Functional Components* dan optimasi spesifik *Hooks* (seperti `useCallback`, `useMemo` untuk rendering UI yang berat).
2. **Format Respons:** Gunakan bahasa teknis dan profesional berstandar Indonesia. Dilarang menggunakan emotikon dalam file kode atau berkas Markdown dokumentasi.
3. **Manajemen Efek:** Hindari *Infinite Loop* pada `useEffect`. Selalu pastikan deklarasi array dependensi dilakukan secara eksplisit dan tepat.
4. **Keamanan Sisi Klien:** Jangan pernah menyematkan rahasia peladen (Server Secrets) pada repositori ini. Selalu arahkan kunci publik melalui variabel `VITE_`.
5. **Aksesibilitas:** Saat membuat komponen antarmuka, utamakan properti `aria-labels` dan tag HTML semantik.