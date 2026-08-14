import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Pendekatan Sistematis (Systematic Approach) */}
export default function Approach() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* State dan Referensi Untuk Animasi Scroll Reveal */}
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  {/* Logika Observer Untuk Memicu Animasi Saat Masuk Layar */}
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

  {/* Data Struktur Langkah Pendekatan */}
  const approachSteps = [
    {
      number: '01',
      title: 'Kurikulum Berstandar',
      description: 'Materi pembelajaran yang disusun secara sistematis dari abjad dasar hingga penguasaan kosakata yang kompleks.'
    },
    {
      number: '02',
      title: 'Validasi Real-Time',
      description: 'Analisis pergerakan gestur tangan seketika memberikan umpan balik langsung untuk akurasi pembelajaran siswa.'
    },
    {
      number: '03',
      title: 'Pantauan Akademik',
      description: 'Dasbor terpusat bagi instansi pendidikan untuk mengevaluasi progres dan memberikan penilaian akhir objektif.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: isMobile ? '60px' : '100px',
        paddingBottom: isMobile ? '80px' : '120px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Keyframe Animasi Halus Khusus Komponen Ini */}
      <style>{`
        @keyframes slideUpApproach {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleInImage {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Pembungkus Utama Konten */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Judul Utama Bagian (Tengah) */}
        <h2 style={{
          fontFamily: '"Gilroy", sans-serif',
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: 'normal',
          color: '#000000',
          lineHeight: '1.2',
          letterSpacing: '-1px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 0 60px 0',
          opacity: 0,
          /* Animasi judul muncul pertama */
          animation: isVisible ? 'slideUpApproach 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
        }}>
          Pendekatan Sistematis<br />Menuju Kesetaraan Edukasi.
        </h2>

        {/* Pembungkus Grid Dua Kolom (Daftar Kiri, Gambar Kanan) */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: isMobile ? '48px' : '64px'
        }}>
          
          {/* Kolom Kiri: Daftar Langkah-langkah */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: isMobile ? '32px' : '40px',
            maxWidth: '500px'
          }}>
            {approachSteps.map((step, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '20px',
                  opacity: 0,
                  /* Animasi beruntun (staggered) untuk setiap poin berdasarkan indeksnya */
                  animation: isVisible ? `slideUpApproach 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + (index * 0.15)}s forwards` : 'none'
                }}
              >
                {/* Angka Poin */}
                <span style={{
                  fontFamily: '"Gilroy", sans-serif',
                  fontSize: isMobile ? '24px' : '28px',
                  fontWeight: 'normal',
                  color: '#000000',
                  lineHeight: '1.2'
                }}>
                  {step.number}
                </span>

                {/* Konten Judul dan Deskripsi Poin */}
                <div>
                  <h3 style={{
                    fontFamily: '"Gilroy", sans-serif',
                    fontSize: isMobile ? '22px' : '26px',
                    fontWeight: 'normal',
                    color: '#000000',
                    margin: '0 0 12px 0',
                    lineHeight: '1.2'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: isMobile ? '15px' : '16px',
                    color: '#4B5563',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Kanan: Gambar AI Besar */}
          <div style={{ 
            flex: 1, 
            width: '100%',
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            opacity: 0,
            /* Animasi gambar muncul paling akhir dengan efek scale-in */
            animation: isVisible ? 'scaleInImage 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' : 'none'
          }}>
            <img 
              src="src/assets/approach.jpg"
              alt="AI Robot Face" 
              style={{
                width: '100%',
                maxWidth: '560px',
                height: isMobile ? '340px' : '440px',
                objectFit: 'cover',
                borderRadius: '32px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }} 
            />
          </div>

        </div>

      </div>
    </section>
  );
}