import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Hero Section Khusus untuk Halaman Home */}
export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  {/* State dan Referensi Untuk Logika Animasi Scroll (Intersection Observer) */}
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  {/* Logika Deteksi Visibilitas Komponen di Layar (Memicu Animasi) */}
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          {/* Memberikan jeda 300ms agar animasi tidak terlewat saat halaman pertama kali dimuat */}
          setTimeout(() => {
            setIsVisible(true);
          }, 300);
          observer.disconnect(); {/* Hentikan observasi setelah animasi berjalan 1x */}
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isMobile = windowWidth < 768;

  {/* Teks Kapsul Dipecah Menjadi Array Huruf Untuk Efek Wave Per Huruf */}
  const capsuleText = "Virtual Inclusive Buddy Assistant";
  const capsuleLetters = capsuleText.split("");
  
  {/* Teks Latar Belakang Dipecah Menjadi Array Huruf Untuk Efek Wave */}
  const bgText = "VIBA";
  const bgLetters = bgText.split("");

  return (
    <section 
      ref={heroRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: isMobile ? '70px' : '80px',
        paddingBottom: '80px',
        width: '100%',
        overflow: 'hidden' 
      }}
    >
      
      {/* Injeksi Gaya Animasi Global Khusus Komponen Ini */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes waveFade {
          0% { opacity: 0; transform: translateY(15px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Animasi khusus untuk teks latar belakang agar maksimal opacity hanya 0.04 */
        @keyframes waveFadeBg {
          0% { opacity: 0; transform: translateY(30px); }
          50% { opacity: 0.08; transform: translateY(-10px); }
          100% { opacity: 0.04; transform: translateY(0); }
        }
      `}</style>

      {/* Konten Gambar Utama Dengan Teks Latar Belakang */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: isMobile ? '20px' : '24px',
        position: 'relative' 
      }}>
        
        {/* Elemen Teks Raksasa Di Belakang Gambar (Animasi Wave Per Huruf) */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: isMobile ? '120px' : '28vw',
          fontWeight: 'bold', 
          color: '#000000',
          fontFamily: '"Gilroy", sans-serif',
          zIndex: 0, 
          letterSpacing: isMobile ? '10px' : '40px',
          userSelect: 'none', 
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          display: 'flex'
        }}>
          {bgLetters.map((char, index) => (
            <span
              key={index}
              style={{
                opacity: 0,
                /* Animasi Wave khusus dengan batas opacity 0.04 dan jeda antar huruf */
                animation: isVisible ? `waveFadeBg 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + (index * 0.15)}s forwards` : 'none'
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Elemen Gambar Utama (Animasi Muncul Dari Bawah) */}
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
            zIndex: 1,
            opacity: 0,
            /* Animasi Fade Up dengan jeda 0.2 detik */
            animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' : 'none'
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
        
        <div style={{ textAlign: 'left', maxWidth: '1000px' }}>
          
          {/* Lencana Fitur Asisten (Animasi Wave Per Huruf) */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: '6px 20px', 
            borderRadius: '50px',
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '500',
            marginBottom: '12px',
            opacity: 0,
            animation: isVisible ? 'fadeUp 0.5s ease-out 0.4s forwards' : 'none'
          }}>
            {capsuleLetters.map((char, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  animation: isVisible ? `waveFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + (index * 0.03)}s forwards` : 'none'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Judul Utama Halaman (Animasi Muncul Dari Bawah Berurutan) */}
          <h1 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '36px' : '64px',
            fontWeight: 'bold',
            color: '#000000',
            lineHeight: '1.1',
            marginTop: '0', 
            marginBottom: '16px',
            letterSpacing: '-1.5px',
            opacity: 0,
            /* Animasi Fade Up dengan jeda 0.8 detik */
            animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' : 'none'
          }}>
            Kuasai Bahasa Isyarat<br />dengan Kecerdasan Buatan
          </h1>

          {/* Paragraf Deskripsi Singkat (Animasi Paling Akhir Muncul) */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'normal',
            color: '#4B5563',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginTop: '0',
            margin: 0,
            opacity: 0,
            /* Animasi Fade Up dengan jeda 1.0 detik */
            animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.0s forwards' : 'none'
          }}>
            Platform pembelajaran interaktif yang memvalidasi gerakan tangan Anda secara real-time melalui teknologi visi komputer.
          </p>
          
        </div>
      </div>

    </section>
  );
}