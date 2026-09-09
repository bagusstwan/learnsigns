# Skema State Global (Global State Schema)

Dokumentasi struktur data yang disimpan pada memori klien (Context API / Zustand / Redux) dan penyimpanan lokal (Local Storage).

## Local Storage
Menyimpan data persisten yang dibutuhkan sebelum aplikasi React dirender sepenuhnya.
*   `viba_auth_token` - String, Bearer token untuk otorisasi API.
*   `viba_theme` - String (`light` | `dark`), Preferensi tema antarmuka.

## Authentication State (`authContext`)
Mengelola status sesi pengguna saat ini.
*   `isAuthenticated` - Boolean.
*   `user` - Objek profil pengguna:
    *   `id` - Integer.
    *   `name` - String.
    *   `role` - String (`student`, `teacher`, `corporate`).
    *   `stars` - Integer.

## Quest Progress State (`questState`)
Mengelola status sesi pembelajaran yang sedang aktif.
*   `activeModuleId` - Integer, ID modul yang sedang dikerjakan.
*   `detectedGestures` - Array, Daftar isyarat yang berhasil dideteksi oleh model AI selama sesi berlangsung.