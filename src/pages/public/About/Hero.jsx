import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

{/* Komponen Hero Section Khusus untuk Halaman Tentang Kami (About) */}
export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  
  {/* State dan Referensi Untuk Logika Animasi (Intersection Observer) */}
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
          observer.disconnect();
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

  {/* Teks Latar Belakang Dipecah Menjadi Array Huruf Untuk Efek Wave */}
  const bgText = "ABOUT";
  const bgLetters = bgText.split("");

  return (
    <section 
      ref={heroRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobile ? '120px' : '180px', /* Jeda atas lebih besar untuk memberi ruang dari Navbar */
        paddingBottom: isMobile ? '80px' : '120px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      
      {/* Injeksi Gaya Animasi Global Khusus Komponen Ini */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Animasi khusus teks latar belakang (watermark) */
        @keyframes waveFadeBg {
          0% { opacity: 0; transform: translateY(30px); }
          50% { opacity: 0.06; transform: translateY(-10px); }
          100% { opacity: 0.03; transform: translateY(0); }
        }
      `}</style>

      {/* Elemen Teks Raksasa Di Belakang Latar (Watermark Animasi Wave) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: isMobile ? '100px' : '26vw',
        fontWeight: 'bold', 
        color: '#6e6e6e',
        fontFamily: '"Gilroy", sans-serif',
        zIndex: 0, 
        letterSpacing: isMobile ? '10px' : '30px',
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
              /* Animasi Wave khusus dengan batas opacity tipis (0.03) */
              animation: isVisible ? `waveFadeBg 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + (index * 0.15)}s forwards` : 'none'
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Konten Utama Teks Bagian Tengah */}
      <div style={{ 
        maxWidth: '900px', 
        width: '100%',
        boxSizing: 'border-box', 
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1 /* Memastikan konten bisa diklik dan berada di atas watermark */
      }}>
        
        {/* Judul Utama Halaman (Animasi Muncul Dari Bawah) */}
        <h1 style={{
          fontFamily: '"Gilroy", sans-serif',
          fontSize: isMobile ? '36px' : '56px',
          fontWeight: 'bold',
          color: '#000000',
          lineHeight: '1.2',
          marginTop: '0', 
          marginBottom: '24px',
          letterSpacing: '-1px',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.4 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
        }}>
          Mewujudkan Pendidikan Inklusif<br />Melalui Inovasi Teknologi AI.
        </h1>

        {/* Paragraf Deskripsi (Animasi Muncul Dari Bawah) */}
        <p style={{
          fontFamily: '"Manrope", sans-serif',
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 'normal',
          color: '#4B5563',
          lineHeight: '1.6',
          maxWidth: '650px',
          margin: '0 auto 48px auto',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.6 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' : 'none'
        }}>
          Kami berdedikasi membangun jembatan komunikasi tanpa batas untuk komunitas Tuli melalui ekosistem pembelajaran interaktif.
        </p>
        
        {/* Kontainer Tombol Aksi Ganda (Animasi Muncul Paling Akhir) */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.8 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' : 'none'
        }}>
          
          {/* Tombol Outline - Pelajari Ekosistem */}
          <button 
            onClick={() => navigate('/features')}
            style={{
              backgroundColor: 'transparent',
              color: '#000000',
              border: '1px solid #000000',
              borderRadius: '50px',
              padding: isMobile ? '14px 32px' : '14px 40px',
              fontFamily: '"Gilroy", sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.backgroundColor = '#F3F4F6'; 
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.backgroundColor = 'transparent'; 
            }}
          >
            Pelajari Ekosistem
          </button>

          {/* Tombol Solid - Mulai Belajar */}
          <button 
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #000000',
              borderRadius: '50px',
              padding: isMobile ? '14px 32px' : '14px 40px',
              fontFamily: '"Gilroy", sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.backgroundColor = '#1F2937'; 
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.backgroundColor = '#000000'; 
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Mulai Belajar
          </button>
          
        </div>
      </div>
    </section>
  );
}