import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Hero Section Khusus untuk Halaman Kontak */}
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

  {/* Teks Latar Belakang Dipecah Menjadi Array Huruf Untuk Efek Wave */}
  const bgText = "CONTACT";
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
        paddingBottom: isMobile ? '60px' : '100px',
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
        fontSize: isMobile ? '80px' : '24vw',
        fontWeight: 'bold', 
        color: '#6e6e6e',
        fontFamily: '"Gilroy", sans-serif',
        zIndex: 0, 
        letterSpacing: isMobile ? '8px' : '24px',
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
              animation: isVisible ? `waveFadeBg 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + (index * 0.12)}s forwards` : 'none'
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
          fontSize: isMobile ? '32px' : '52px',
          fontWeight: 'bold',
          color: '#000000',
          lineHeight: '1.2',
          marginTop: '0', 
          marginBottom: '0', /* Tidak ada margin bottom karena tidak ada deskripsi di bawahnya pada desain ini */
          letterSpacing: '-1px',
          opacity: 0,
          /* Animasi Fade Up dengan jeda 0.4 detik */
          animation: isVisible ? 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
        }}>
          Hubungi Tim Spesialis Kami,<br />Mari Bangun Akses Kesetaraan.
        </h1>

      </div>
    </section>
  );
}