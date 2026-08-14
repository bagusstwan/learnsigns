import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

{/* Komponen Call To Action Global Untuk Seluruh Halaman Publik */}
export default function CallToAction() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tata Letak */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: isMobile ? '40px 24px' : '80px 48px',
      backgroundColor: '#FFFFFF', 
      boxSizing: 'border-box'
    }}>
      
      {/* Kotak Utama Call To Action Dengan Sudut Melengkung */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        borderRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0F172A',
        backgroundImage: 'url("src/assets/cta-bg1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? '40px 24px' : '80px',
        boxSizing: 'border-box'
      }}>
        
        {/* Hamparan Gradien Gelap Agar Teks Tetap Terbaca Di Atas Gambar Apapun */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1
        }}></div>

        {/* Pembungkus Konten Teks Dan Tombol */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          
          {/* Judul Utama Call To Action */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'normal',
            color: '#FFFFFF',
            lineHeight: '1.2',
            margin: '0 0 20px 0',
            letterSpacing: '-1px'
          }}>
            Siap mentransformasi inklusivitas ruang kelas Anda?
          </h2>
          
          {/* Paragraf Persuasi Singkat */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            color: '#E5E7EB',
            lineHeight: '1.6',
            margin: '0 0 40px 0'
          }}>
            Daftarkan institusi Anda hari ini dan rasakan kemudahan teknologi validasi gestur secara instan.
          </p>
          
          {/* Tombol Aksi Pendaftaran */}
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: 'none',
              borderRadius: '50px',
              padding: isMobile ? '14px 32px' : '16px 40px',
              fontFamily: '"Gilroy", sans-serif',
              fontSize: '16px',
              fontWeight: 'normal',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, backgroundColor 0.2s ease',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.transform = 'scale(1.05)'; 
              e.currentTarget.style.backgroundColor = '#F3F4F6'; 
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.transform = 'scale(1)'; 
              e.currentTarget.style.backgroundColor = '#FFFFFF'; 
            }}
          >
            Mulai Sekarang
          </button>

        </div>
      </div>
    </section>
  );
}