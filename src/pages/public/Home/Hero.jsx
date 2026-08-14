import React, { useState, useEffect } from 'react';

/* Komponen Hero Section Khusus untuk Halaman Home */
export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /* Logika Deteksi Ukuran Layar Untuk Responsivitas */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: isMobile ? '70px' : '80px',
      paddingBottom: '80px',
      width: '100%',
      overflow: 'hidden' 
    }}>
      
      {/* Konten Gambar Utama Dengan Teks Latar Belakang */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: isMobile ? '20px' : '24px',
        position: 'relative' /* Wajib relative agar teks raksasa bisa diposisikan absolut di dalamnya */
      }}>
        
        {/* Elemen Teks Raksasa Di Belakang Gambar */}
        <span style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: isMobile ? '120px' : '28vw', /* Ukuran dinamis mengikuti lebar layar */
          fontWeight: 'bold', 
          color: '#000000',
          opacity: 0.04, /* Transparansi sangat tipis agar elegan */
          fontFamily: '"Gilroy", sans-serif',
          zIndex: 0, /* Posisi berada di lapisan paling bawah */
          letterSpacing: isMobile ? '10px' : '40px',
          userSelect: 'none', /* Mencegah teks terblok atau tersorot oleh kursor pengguna */
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          VIBA
        </span>

        {/* Elemen Gambar Utama */}
        <img
          src="src/assets/hero-image.png" 
          alt="AI Handshake"
          style={{
            width: '100%',
            height: 'auto', 
            objectFit: 'cover', 
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 50%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 50%, transparent 100%)',
            position: 'relative',
            zIndex: 1 /* Posisi berada satu lapis di atas teks raksasa */
          }}
        />
      </div>

      {/* Konten Teks Bagian Bawah */}
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        boxSizing: 'border-box', 
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
      }}>
        
        {/* Pembungkus Teks Dengan Batas Maksimal Agar Judul Memanjang Dua Baris */}
        <div style={{ textAlign: 'left', maxWidth: '1000px' }}>
          
          {/* Lencana Fitur Asisten */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: '6px 20px', 
            borderRadius: '50px',
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '500',
            marginBottom: '8px' 
          }}>
            Virtual Inclusive Buddy Assistant
          </div>

          {/* Judul Utama Halaman */}
          <h1 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '36px' : '64px',
            fontWeight: 'bold',
            color: '#000000',
            lineHeight: '1.1',
            marginTop: '0', 
            marginBottom: '16px',
            letterSpacing: '-1.5px'
          }}>
            Kuasai Bahasa Isyarat<br />dengan Kecerdasan Buatan
          </h1>

          {/* Paragraf Deskripsi Singkat */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'normal',
            color: '#4B5563',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginTop: '0',
            margin: 0
          }}>
            Platform pembelajaran interaktif yang memvalidasi gerakan tangan Anda secara real-time melalui teknologi visi komputer.
          </p>
          
        </div>
      </div>

    </section>
  );
}