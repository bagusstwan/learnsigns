# Viba.ai Client Interface (learnsigns)

## Deskripsi Repositori
`learnsigns` adalah repositori antarmuka klien (frontend) untuk platform Viba.ai. Aplikasi ini mengimplementasikan konsep *Single Page Application* (SPA) interaktif yang memberikan pengalaman pengguna (UX) responsif, modern, dan mulus. Antarmuka ini dirancang khusus untuk memfasilitasi pembelajaran bahasa isyarat yang ditenagai oleh Kecerdasan Buatan, serta menyediakan ruang kerja khusus bagi tenaga pendidik dan institusi.

## Tumpukan Teknologi (Tech Stack)
*   **Framework Utama:** React.js
*   **Build Tool:** Vite
*   **Routing:** React Router DOM
*   **Tipografi:** Geist Sans Font Family

## Fitur dan Modul Aplikasi

### Sistem Portal Publik terpadu
*   **Beranda (Home):** Halaman arahan (landing page) yang mempresentasikan proposisi nilai platform.
*   **Tentang Kami (About):** Dokumentasi visi misi dan latar belakang pengembangan Viba.ai.
*   **Fitur (Features):** Rincian teknis kapabilitas sistem dan teknologi AI yang digunakan.
*   **Kontak (Contact):** Saluran komunikasi resmi untuk kemitraan dan dukungan operasional.

### Modul Akses dan Autentikasi
*   **Autentikasi Kredensial:** Formulir login dan registrasi berbasis validasi sisi klien (*client-side validation*) untuk mencegah permintaan tidak valid ke peladen.
*   **Otorisasi SSO:** Integrasi akses *Single Sign-On* Google dengan penanganan *callback* token yang aman.
*   **Proteksi Rute:** Implementasi *Protected Route* untuk membatasi akses dasbor berdasarkan status sesi dan peran entitas (Role-Based Access Control).

### Ruang Kerja Peserta Didik (Student Dashboard)
*   **Modul Interaktif:** Antarmuka utama untuk eksekusi pembelajaran bahasa isyarat dan pengenalan gestur AI.
*   **Manajemen Quest:** Sistem penugasan dan gamifikasi terstruktur untuk meningkatkan retensi pembelajaran.
*   **Papan Peringkat (Leaderboard):** Visualisasi komparasi poin dan pencapaian antar siswa.
*   **Pelacakan Progres (Progress):** Dasbor analitik individual untuk meninjau riwayat penyelesaian modul.

### Ruang Kerja Pendidik (Educator / Corporate Workspace)
*   **Manajemen Siswa (Student Management):** Antarmuka kontrol bagi pendidik untuk memantau daftar peserta didik.
*   **Evaluasi Modul (Evaluation Workspace):** Modul spesifik untuk menganalisis metrik keberhasilan dan kendala siswa dalam mempraktikkan bahasa isyarat.