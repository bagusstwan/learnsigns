import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

{/* Komponen Call To Action Global Untuk Seluruh Halaman Publik */}
export default function CallToAction() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  {/* State dan Referensi Untuk Logika Animasi Scroll Reveal */}
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef(null);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tata Letak */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  {/* Logika Deteksi Visibilitas Komponen di Layar (Observer) */}
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); {/* Hentikan pantauan setelah animasi terpicu sekali */}
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section 
      ref={ctaRef}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: isMobile ? '40px 24px' : '80px 48px',
        backgroundColor: '#FFFFFF', 
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Gaya Animasi Global Khusus Komponen CTA */}
      <style>{`
        @keyframes scaleInCta {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUpFadeCta {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Kotak Utama Call To Action (Animasi Scale In) */}
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
        boxSizing: 'border-box',
        opacity: 0,
        /* Animasi pembungkus utama muncul lebih dulu */
        animation: isVisible ? 'scaleInCta 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
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
          
          {/* Judul Utama Call To Action (Animasi Slide Up - Jeda 0.2s) */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'normal',
            color: '#FFFFFF',
            lineHeight: '1.2',
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
            opacity: 0,
            animation: isVisible ? 'slideUpFadeCta 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' : 'none'
          }}>
            Siap mentransformasi inklusivitas ruang kelas Anda?
          </h2>
          
          {/* Paragraf Persuasi Singkat (Animasi Slide Up - Jeda 0.4s) */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            color: '#E5E7EB',
            lineHeight: '1.6',
            margin: '0 0 40px 0',
            opacity: 0,
            animation: isVisible ? 'slideUpFadeCta 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
          }}>
            Daftarkan institusi Anda hari ini dan rasakan kemudahan teknologi validasi gestur secara instan.
          </p>
          
          {/* Pembungkus Animasi Tombol Agar Tidak Bentrok Dengan Efek Hover */}
          <div style={{
            opacity: 0,
            animation: isVisible ? 'slideUpFadeCta 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' : 'none'
          }}>
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
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                display: 'inline-block'
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
      </div>
    </section>
  );
}