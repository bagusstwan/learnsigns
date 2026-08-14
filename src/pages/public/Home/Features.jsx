import React, { useState, useEffect } from 'react';

{/* Komponen Ikon Panah Diagonal Arah Kanan Atas SVG */}
const ArrowUpRight = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

{/* Komponen Ikon Silang Tutup Modal SVG */}
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

{/* Komponen Bagian Fitur Analitik dan Statistik Aplikasi */}
export default function Features() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  {/* State Untuk Mengontrol Modal Pop-up */}
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  {/* Logika Deteksi Ukuran Layar Untuk Susunan Kartu */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  {/* Logika Penguncian Guliran Latar Saat Modal Terbuka */}
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  {/* Fungsi Pemicu Pembukaan Modal Data */}
  const handleOpenModal = (title, description) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  const isMobile = windowWidth < 1024;

  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      width: '100%',
      /* Sudut lengkung besar pemisah dengan area Hero */
      borderTopLeftRadius: isMobile ? '40px' : '80px',
      borderTopRightRadius: isMobile ? '40px' : '80px',
      paddingTop: isMobile ? '60px' : '100px',
      paddingBottom: '120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* Pembungkus Utama Lebar Maksimal Konten */}
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
        boxSizing: 'border-box'
      }}>

        {/* Bagian Teks Judul Rata Kanan */}
        <div style={{ 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-start' : 'flex-end', 
          marginBottom: isMobile ? '40px' : '80px',
          textAlign: isMobile ? 'left' : 'right' 
        }}>
          <div style={{ maxWidth: '750px' }}>
            <h2 style={{
              fontFamily: '"Gilroy", sans-serif',
              fontSize: isMobile ? '28px' : '42px',
              fontWeight: 'normal',
              color: '#000000',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              Tingkatkan efisiensi pembelajaran bahasa isyarat melalui infrastruktur teknologi berbasis analitik presisi.
            </h2>
            <p style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '500',
              color: '#4B5563',
              lineHeight: '1.6',
              margin: '0',
              marginLeft: isMobile ? '0' : 'auto',
              maxWidth: '600px'
            }}>
              Sistem kami dirancang khusus memfasilitasi kebutuhan institusi dalam memantau perkembangan murid secara komprehensif.
            </p>
          </div>
        </div>

        {/* Susunan Kisi Grid Kartu Statistik */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '24px',
          alignItems: 'start'
        }}>

          {/* Kartu Statistik 1 */}
          <div style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '32px',
            padding: '32px',
            height: isMobile ? '280px' : '380px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxSizing: 'border-box'
          }}>
            <div 
              onClick={() => handleOpenModal('98%', 'Tingkat akurasi sistem dalam memvalidasi pergerakan gestur tangan didukung oleh model machine learning canggih yang meminimalisir tingkat kesalahan pembacaan secara real-time.')}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                backgroundColor: '#000000', width: '48px', height: '48px',
                borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowUpRight color="#FFFFFF" />
            </div>
            <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '48px', fontWeight: 'bold', color: '#000000', margin: '0 0 8px 0', lineHeight: '1' }}>
              98%
            </h3>
            <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '15px', color: '#4B5563', margin: '0', lineHeight: '1.5' }}>
              Tingkat akurasi sistem dalam memvalidasi pergerakan gestur tangan.
            </p>
          </div>

          {/* Kartu Statistik 2 Efek Zig Zag */}
          <div style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '32px',
            padding: '32px',
            height: isMobile ? '280px' : '380px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',
            marginTop: isMobile ? '0' : '60px' 
          }}>
            <div 
              onClick={() => handleOpenModal('50+', 'Modul kosa kata bahasa isyarat disusun oleh para ahli, menjangkau materi dari tahap dasar perkenalan hingga struktur kalimat percakapan kompleks dan lanjutan.')}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                backgroundColor: '#000000', width: '48px', height: '48px',
                borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowUpRight color="#FFFFFF" />
            </div>
            <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '48px', fontWeight: 'bold', color: '#000000', margin: '0 0 8px 0', lineHeight: '1' }}>
              50+
            </h3>
            <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '15px', color: '#4B5563', margin: '0', lineHeight: '1.5' }}>
              Modul kosa kata bahasa isyarat dari dasar hingga lanjutan.
            </p>
          </div>

          {/* Kartu Statistik 3 Gambar Robot */}
          <div style={{
            backgroundColor: '#1F2937',
            backgroundImage: 'url("src/assets/features-image.jpg")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '32px',
            padding: '32px',
            height: isMobile ? '280px' : '380px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* Hamparan Gelap Pelindung Teks */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
              zIndex: 1
            }}></div>

            <div 
              onClick={() => handleOpenModal('24/7', 'Akses penuh ke sistem pemantauan dan evaluasi ruang kelas memungkinkan pengajar memonitor aktivitas belajar tanpa batasan jarak maupun waktu operasi.')}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                backgroundColor: '#FFFFFF', width: '48px', height: '48px',
                borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 2, cursor: 'pointer', transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowUpRight color="#000000" />
            </div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '48px', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: '1' }}>
                24/7
              </h3>
              <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '15px', color: '#D1D5DB', margin: '0', lineHeight: '1.5' }}>
                Akses penuh ke sistem pemantauan dan evaluasi ruang kelas.
              </p>
            </div>
          </div>

          {/* Kartu Statistik 4 Gelap Zig Zag */}
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '32px',
            padding: '32px',
            height: isMobile ? '280px' : '380px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',
            marginTop: isMobile ? '0' : '60px' 
          }}>
            <div 
              onClick={() => handleOpenModal('100%', 'Komitmen penuh kami pada inklusivitas akses pendidikan anak bangsa memastikan semua platform dirancang agar mudah digunakan oleh difabel tanpa hambatan teknologi.')}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                backgroundColor: '#FFFFFF', width: '48px', height: '48px',
                borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowUpRight color="#000000" />
            </div>
            <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '48px', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: '1' }}>
              100%
            </h3>
            <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '15px', color: '#9CA3AF', margin: '0', lineHeight: '1.5' }}>
              Komitmen penuh kami pada inklusivitas akses pendidikan anak bangsa.
            </p>
          </div>

        </div>
      </div>

      {/* Komponen Hamparan Layar Pop-up Modal Dinamis */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          {/* Kotak Modal Utama */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            padding: isMobile ? '32px' : '48px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            boxSizing: 'border-box',
            animation: 'fadeInUp 0.3s ease-out forwards'
          }}>
            {/* Tombol Tutup (X) Di Pojok Kanan Atas Modal */}
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: '#F3F4F6',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            >
              <IconClose />
            </button>
            
            {/* Tagline Detail Fitur */}
            <div style={{
              display: 'inline-block',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '6px 16px', 
              borderRadius: '50px',
              fontFamily: '"Gilroy", sans-serif',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Detail Fitur
            </div>

            {/* Konten Dinamis Berdasarkan Kartu Yang Diklik */}
            <h3 style={{ 
              fontFamily: '"Gilroy", sans-serif', 
              fontSize: isMobile ? '40px' : '56px', 
              fontWeight: 'bold', 
              color: '#000000', 
              margin: '0 0 16px 0', 
              lineHeight: '1' 
            }}>
              {modalContent.title}
            </h3>
            <p style={{ 
              fontFamily: '"Manrope", sans-serif', 
              fontSize: '16px', 
              color: '#4B5563', 
              margin: '0', 
              lineHeight: '1.6' 
            }}>
              {modalContent.description}
            </p>
          </div>
        </div>
      )}

      {/* Tambahan Animasi CSS Sementara Di Dalam Kode (Inline) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}