import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Panel Kendali (Asymmetrical Bento Grid) */}
export default function ControlPanel() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* State dan Referensi Untuk Animasi Scroll Reveal */}
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tata Letak */}
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
          observer.disconnect(); {/* Hentikan pantauan setelah animasi terpicu sekali */}
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
        display: 'flex',
        justifyContent: 'center',
        paddingTop: isMobile ? '40px' : '60px',
        paddingBottom: isMobile ? '80px' : '120px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Keyframe Animasi Halus Khusus Komponen Ini */}
      <style>{`
        @keyframes slideUpControl {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .card-zoom-hover {
          transition: transform 0.5s ease;
        }
        .card-container:hover .card-zoom-hover {
          transform: scale(1.05);
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
        
        {/* Header Teks Bagian Kiri Atas */}
        <div style={{ maxWidth: '700px', marginBottom: isMobile ? '40px' : '60px' }}>
          
          {/* Judul Utama Section */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '32px' : '44px',
            fontWeight: 'normal',
            color: '#000000',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            margin: '0 0 20px 0',
            opacity: 0,
            /* Animasi judul muncul lebih awal */
            animation: isVisible ? 'slideUpControl 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' : 'none'
          }}>
            Kendalikan Seluruh Aspek Pembelajaran di Satu Tempat.
          </h2>

          {/* Paragraf Pendukung */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            color: '#4B5563',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '550px',
            opacity: 0,
            /* Animasi deskripsi menyusul judul */
            animation: isVisible ? 'slideUpControl 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards' : 'none'
          }}>
            Fungsionalitas komprehensif yang menjembatani kebutuhan eksplorasi mandiri siswa dan otoritas evaluasi pendidik.
          </p>
        </div>

        {/* Susunan Bento Grid Asimetris (1 Kiri Besar, 2 Kanan Bertumpuk) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px',
          /* Menentukan tinggi absolut untuk desktop agar grid proporsional */
          height: isMobile ? 'auto' : '600px' 
        }}>
          
          {/* KARTU 1 (KIRI): Portrait Besar - Sistem Gamifikasi */}
          <div 
            className="card-container"
            style={{
              backgroundColor: '#E5E7EB',
              borderRadius: '32px',
              height: isMobile ? '400px' : '100%',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: isMobile ? '24px' : '40px',
              boxSizing: 'border-box',
              opacity: 0,
              cursor: 'pointer',
              /* Animasi Kartu 1 (Delay 0.4s) */
              animation: isVisible ? 'slideUpControl 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
            }}
          >
            {/* Gambar Latar Dinamis Dengan Efek Zoom Saat Hover */}
            <img 
              src="src/assets/trophy.jpg"
              alt="Sistem Gamifikasi" 
              className="card-zoom-hover"
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
              }} 
            />
            
            {/* Hamparan Gradien Gelap Bawah */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)',
              zIndex: 1
            }}></div>

            {/* Konten Teks Kartu 1 */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ 
                fontFamily: '"Gilroy", sans-serif', fontSize: isMobile ? '24px' : '32px', fontWeight: 'normal', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: '1.2' 
              }}>
                Sistem Gamifikasi Modul
              </h3>
              <p style={{ 
                fontFamily: '"Manrope", sans-serif', fontSize: isMobile ? '15px' : '16px', color: '#D1D5DB', margin: 0, lineHeight: '1.6', maxWidth: '400px' 
              }}>
                Pemberian penghargaan bintang untuk memotivasi penyelesaian kurikulum bahasa isyarat secara konsisten.
              </p>
            </div>
          </div>

          {/* KARTU 2 & 3 (KANAN): Wrapper Untuk Menumpuk 2 Kartu */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: isMobile ? 'auto' : '100%'
          }}>
            
            {/* KARTU 2 (KANAN ATAS): Manajemen Kelas */}
            <div 
              className="card-container"
              style={{
                flex: 1, /* Membagi tinggi sama rata dengan kartu bawahnya */
                backgroundColor: '#E5E7EB',
                borderRadius: '32px',
                minHeight: isMobile ? '280px' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: isMobile ? '24px' : '40px',
                boxSizing: 'border-box',
                opacity: 0,
                cursor: 'pointer',
                /* Animasi Kartu 2 (Delay 0.55s) */
                animation: isVisible ? 'slideUpControl 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards' : 'none'
              }}
            >
              <img 
                src="src/assets/class-center.jpg" 
                alt="Manajemen Kelas" 
                className="card-zoom-hover"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} 
              />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)', zIndex: 1
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: isMobile ? '24px' : '28px', fontWeight: 'normal', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: '1.2' }}>
                  Manajemen Kelas Terpusat
                </h3>
                <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: isMobile ? '15px' : '16px', color: '#D1D5DB', margin: 0, lineHeight: '1.6', maxWidth: '400px' }}>
                  Delegasikan tugas dan pantau metrik perkembangan murid langsung dari ruang komando pendidik.
                </p>
              </div>
            </div>

            {/* KARTU 3 (KANAN BAWAH): Laporan Akurasi */}
            <div 
              className="card-container"
              style={{
                flex: 1, /* Membagi tinggi sama rata dengan kartu atasnya */
                backgroundColor: '#E5E7EB',
                borderRadius: '32px',
                minHeight: isMobile ? '280px' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: isMobile ? '24px' : '40px',
                boxSizing: 'border-box',
                opacity: 0,
                cursor: 'pointer',
                /* Animasi Kartu 3 (Delay 0.7s) */
                animation: isVisible ? 'slideUpControl 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards' : 'none'
              }}
            >
              <img 
                src="src/assets/report.jpg" 
                alt="Laporan Akurasi" 
                className="card-zoom-hover"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} 
              />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)', zIndex: 1
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: isMobile ? '24px' : '28px', fontWeight: 'normal', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: '1.2' }}>
                  Laporan Akurasi Aktual
                </h3>
                <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: isMobile ? '15px' : '16px', color: '#D1D5DB', margin: 0, lineHeight: '1.6', maxWidth: '400px' }}>
                  Perekaman log sesi belajar dengan visualisasi data pencapaian untuk evaluasi akademik yang objektif.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}