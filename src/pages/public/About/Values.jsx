import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Ikon Validasi Gestur Tangan SVG (Khusus Kartu 1) */}
const IconGestureValidation = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6"></path>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
  </svg>
);

{/* Komponen Ikon Keamanan & Privasi Data Terverifikasi SVG (Khusus Kartu 2) */}
const IconDataSecurity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

{/* Komponen Bagian Nilai & Aksesibilitas Ekosistem About */}
export default function Values() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* State dan Referensi Untuk Animasi Scroll Reveal */}
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Grid */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  {/* Logika Observer Untuk Memicu Animasi Saat Bagian Ini Masuk Layar */}
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isMobile = windowWidth < 1024;

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        /* Menambahkan efek transisi melengkung yang konsisten */
        borderTopLeftRadius: isMobile ? '40px' : '80px',
        borderTopRightRadius: isMobile ? '40px' : '80px',
        display: 'flex',
        flexDirection: 'column', /* Diperbarui untuk mendukung center content horizontal */
        alignItems: 'center',    /* Diperbarui */
        paddingTop: isMobile ? '60px' : '100px', /* Jarak disesuaikan untuk mengimbangi lengkungan */
        paddingBottom: isMobile ? '80px' : '120px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Keyframe Animasi Halus */}
      <style>{`
        @keyframes slideUpValues {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Pembungkus Utama Konten */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
        boxSizing: 'border-box'
      }}>
        
        {/* Header Teks Bagian Kiri */}
        <div style={{ maxWidth: '750px', marginBottom: isMobile ? '40px' : '60px' }}>
          
          {/* Judul Utama Section */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '30px' : '44px',
            fontWeight: 'normal',
            color: '#000000',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            margin: '0 0 20px 0',
            opacity: 0,
            animation: isVisible ? 'slideUpValues 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' : 'none'
          }}>
            Membuka Akses Pembelajaran Tanpa Batasan Ruang dan Waktu.
          </h2>

          {/* Paragraf Pendukung */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            color: '#4B5563',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '620px',
            opacity: 0,
            animation: isVisible ? 'slideUpValues 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards' : 'none'
          }}>
            Memadukan kecanggihan visi komputer dengan kurikulum terstruktur untuk menciptakan ruang kelas digital yang setara bagi semua.
          </p>

        </div>

        {/* Susunan Grid 2 Kartu Bento */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          
          {/* KARTU 1: Latar Terang Dengan Gambar Robot Vertikal */}
          <div style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '32px',
            padding: isMobile ? '24px' : '32px',
            height: isMobile ? 'auto' : '380px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            opacity: 0,
            position: 'relative',
            animation: isVisible ? 'slideUpValues 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
          }}>
            
            {/* Bagian Kiri Dalam Kartu 1: Ikon Kotak & Teks */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: isMobile ? 'auto' : '100%',
              flex: 1,
              gap: '20px'
            }}>
              
              {/* Wadah Ikon Hitam */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <IconGestureValidation />
              </div>

              {/* Teks Deskripsi Kartu 1 */}
              <p style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: '500',
                color: '#1F2937',
                lineHeight: '1.5',
                margin: 0,
                maxWidth: '240px'
              }}>
                Validasi gestur tangan secara seketika dan akurat.
              </p>
            </div>

            {/* Bagian Kanan Dalam Kartu 1: Gambar Portrait Melengkung */}
            <div style={{
              width: isMobile ? '100%' : '200px',
              height: isMobile ? '260px' : '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: '#E5E7EB'
            }}>
              <img 
                src="src/assets/validation.jpg" 
                alt="Validasi Gestur AI" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} 
              />
            </div>

          </div>

          {/* KARTU 2: Latar Gelap Full-Bleed */}
          <div style={{
            backgroundColor: '#0F172A',
            backgroundImage: 'url("src/assets/privacy-secure.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '32px',
            height: isMobile ? '340px' : '380px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: isMobile ? '24px' : '32px',
            opacity: 0,
            animation: isVisible ? 'slideUpValues 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards' : 'none'
          }}>
            
            {/* Hamparan Gradien Gelap Untuk Memastikan Keterbacaan */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
              zIndex: 1
            }}></div>

            {/* Konten Di Atas Latar Gelap */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Wadah Ikon Putih */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}>
                <IconDataSecurity />
              </div>

              {/* Teks Deskripsi Kartu 2 */}
              <p style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: '500',
                color: '#FFFFFF',
                lineHeight: '1.5',
                margin: 0,
                maxWidth: '260px'
              }}>
                Privasi dan keamanan data kelas yang terjamin mutlak.
              </p>
              
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}