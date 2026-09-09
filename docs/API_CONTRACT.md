# Kontrak Integrasi API (API Integration Contract) - Nusa.ai Frontend

Dokumen ini mendefinisikan standar integrasi dan penanganan respons HTTP dari klien (React) ke peladen (Laravel).

## Konfigurasi Klien (Axios/Fetch)

Seluruh permintaan jaringan harus menggunakan *instance* klien HTTP yang telah dikonfigurasi terpusat (contoh: `src/services/api.js`).

*   **Base URL:** Diambil dari variabel lingkungan `VITE_API_BASE_URL`.
*   **Headers:**
    *   `Accept: application/json`
    *   `Content-Type: application/json`
    *   `Authorization: Bearer {token}` (Disisipkan secara otomatis melalui HTTP Interceptor jika pengguna memiliki sesi aktif).

## Penanganan Respons (Response Handling)

Klien harus memproses struktur JSON standar dari peladen.

### Ekstraksi Data Berhasil
```javascript
// Contoh pemrosesan respons 200 OK
api.get('/users/profile').then(response => {
    const { success, data } = response.data;
    if (success) {
        setUserState(data);
    }
});
```

### Penanganan Kesalahan Global (Error Interceptor)
*   **HTTP 401 (Unauthorized):** Klien harus secara otomatis menghapus token dari penyimpanan lokal (Local Storage) dan mengalihkan pengguna ke halaman `/login`.
*   **HTTP 422 (Unprocessable Entity):** Klien harus memetakan objek `errors` ke dalam *state* validasi formulir untuk ditampilkan di bawah kolom input yang bersesuaian.