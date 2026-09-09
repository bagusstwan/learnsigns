# Panduan Instalasi (Setup & Installation) - Frontend

Ikuti langkah-langkah berikut untuk menjalankan lingkungan pengembangan lokal antarmuka Nusa.ai.

## Prasyarat
*   Node.js >= 18.x
*   NPM >= 9.x atau Yarn

## Langkah Instalasi
1.  **Klon Repositori:**
    ```bash
    git clone [URL_REPOSITORI] learnsigns
    cd learnsigns
    ```
2.  **Instalasi Dependensi:**
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment:**
    Salin file `.env.example` menjadi `.env` lalu perbarui bagian ini:
    ```env
    VITE_API_BASE_URL=http://localhost:8000/api/v1
    VITE_GOOGLE_CLIENT_ID=kredensial_oauth_google_publik_anda
    ```
4.  **Jalankan Server Lokal (Vite):**
    ```bash
    npm run dev
    ```
    Aplikasi klien dapat diakses melalui `http://localhost:5173`.