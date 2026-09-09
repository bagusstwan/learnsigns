# Konvensi Kode (Coding Conventions) - Frontend

Proyek ini mematuhi standar pengembangan antarmuka modern menggunakan React dan Vite.

## 1. Arsitektur Komponen
*   **Functional Components:** Wajib menggunakan *Functional Components* dan *React Hooks*. Dilarang menggunakan *Class Components*.
*   **Pemisahan Tanggung Jawab:** Pisahkan komponen presentasional (hanya antarmuka) dengan komponen logis (*container*).

## 2. Struktur Direktori
*   `src/components/`: Komponen UI yang dapat digunakan kembali (*reusable*), seperti tombol, kartu, dan input.
*   `src/pages/`: Komponen tingkat halaman yang dihubungkan dengan rute (Router).
*   `src/hooks/`: Kumpulan *Custom Hooks* untuk memisahkan logika kompleks dari antarmuka.
*   `src/services/`: Logika komunikasi jaringan dan integrasi API (contoh: Axios config).

## 3. Penamaan (Naming Conventions)
*   **Nama File Komponen:** *PascalCase* (contoh: `UserProfile.jsx`).
*   **Variabel dan Fungsi:** *camelCase* (contoh: `handleLoginSubmit`, `userData`).
*   **Konstanta Global:** *UPPER_SNAKE_CASE* (contoh: `MAX_UPLOAD_SIZE`).