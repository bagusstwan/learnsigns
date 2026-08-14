import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Ikon Scroll Dinamis (Kapsul Dengan 3 Panah Ke Bawah) */}
const IconScroll = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <svg width="32" height="56" viewBox="0 0 32 56" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="28" height="52" rx="14" ry="14"></rect>
      {/* 3 Panah Berjejer Di Dalam Kapsul */}
      <polyline points="10 16 16 22 22 16"></polyline>
      <polyline points="10 24 16 30 22 24"></polyline>
      <polyline points="10 32 16 38 22 32"></polyline>
    </svg>
    <span style={{ 
      fontFamily: '"Manrope", sans-serif', 
      fontSize: '12px', 
      fontWeight: '600', 
      color: '#000000',
      letterSpacing: '0.5px'
    }}>
      Scroll
    </span>
  </div>
);

{/* Komponen Hero Section Khusus untuk Halaman Features */}
export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
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
          {/* Memberikan jeda 300ms agar animasi tidak terlewat saat halaman dimuat */}
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

  {/* Fungsi Pengendali Guliran Otomatis Saat Tombol Scroll Diklik */}
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, /* Menggulir tepat sejauh 1 layar ke bawah */
      behavior: 'smooth'
    });
  };

  {/* Teks Latar Belakang Dipecah Menjadi Array Huruf Untuk Efek Wave */}
  const bgText = "FEATURES";
  const bgLetters = bgText.split("");

  return (
    <section 
      ref={heroRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobile ? '120px' : '180px',
        paddingBottom: isMobile ? '80px' : '100px',
        width: '100%',
        minHeight: '80vh', /* Menjaga agar Hero Features memakan sebagian besar tinggi layar */
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

        /* Animasi mengambang untuk tombol scroll agar terlihat interaktif */
        @keyframes bounceScroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* Elemen Teks Raksasa Di Belakang Latar (Watermark Animasi Wave) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: isMobile ? '80px' : '22vw',
        fontWeight: 'bold', 
        color: '#6e6e6e',
        fontFamily: '"Gilroy", sans-serif',
        zIndex: 0, 
        letterSpacing: isMobile ? '8px' : '20px',
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
              animation: isVisible ? `waveFadeBg 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + (index * 0.1)}s forwards` : 'none'
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Konten Utama Teks Bagian Tengah */}
      <div style={{ 
        maxWidth: '1000px', 
        width: '100%',
        boxSizing: 'border-box', 
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1 /* Memastikan konten berada di atas watermark */
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
          Ekosistem Fitur Cerdas untuk<br />Akselerasi Pembelajaran.
        </h1>

        {/* Paragraf Deskripsi (Animasi Muncul Dari Bawah) */}
        <p style={{
          fontFamily: '"Manrope", sans-serif',
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 'normal',
          color: '#4B5563',
          lineHeight: '1.6',
          maxWidth: '750px',
          margin: '0 auto 60px auto',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.6 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' : 'none'
        }}>
          Infrastruktur teknologi yang dirancang presisi untuk memfasilitasi penguasaan bahasa isyarat secara interaktif dan terukur.
        </p>
        
        {/* Tombol Interaktif Scroll Ke Bawah (Animasi Muncul Paling Akhir) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.8 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' : 'none'
        }}>
          <button 
            onClick={handleScrollDown}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              outline: 'none',
              /* Animasi mengambang (bounce) berjalan terus-menerus */
              animation: 'bounceScroll 2.5s infinite ease-in-out'
            }}
            aria-label="Scroll ke bagian bawah"
          >
            <IconScroll />
          </button>
        </div>

      </div>
    </section>
  );
}