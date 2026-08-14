import React, { useState, useEffect, useRef } from 'react';

{/* Kumpulan Ikon SVG Kustom Untuk Masing-masing Tab Kapsul */}
const IconCameraAI = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const IconModule = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const IconSecurity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

{/* Komponen Bagian Fitur Mendetail Dengan Navigasi Kapsul & Galeri Dinamis */}
export default function DetailFeatures() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  {/* State Untuk Mengontrol Visibilitas Animasi (Scroll Reveal) */}
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  {/* State Untuk Konten Interaktif Tab dan Galeri Gambar */}
  const [activeTab, setActiveTab] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(false); 

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

  {/* Data Struktur Konten Fitur Lengkap Beserta Kumpulan Gambarnya */}
  const featuresData = [
    {
      id: 'kamera-ai',
      label: 'Kamera AI',
      icon: <IconCameraAI />,
      title: 'Pemrosesan Visual Tensor Dinamis Tingkat Lanjut.',
      description: 'Sistem mengekstraksi matriks koordinat pergerakan tangan secara aktual untuk memberikan umpan balik instan.',
      images: [
        'src/assets/cam-1.jpg', 
        'src/assets/cam-2.jpg',
        'src/assets/cam-3.jpg'
      ]
    },
    {
      id: 'modul-interaktif',
      label: 'Modul Interaktif',
      icon: <IconModule />,
      title: 'Kurikulum Bahasa Isyarat Terstruktur & Gamifikasi.',
      description: 'Modul pembelajaran langkah demi langkah yang dilengkapi sistem poin dan tantangan untuk meningkatkan keterlibatan siswa.',
      images: [
        'src/assets/module-1.jpg',
        'src/assets/module-2.jpg',
        'src/assets/module-3.jpg'
      ]
    },
    {
      id: 'dasbor-pendidik',
      label: 'Dasbor Pendidik',
      icon: <IconDashboard />,
      title: 'Pemantauan Performa Kelas Terpusat dan Analitik.',
      description: 'Akses penuh bagi pengajar untuk melihat grafik kemajuan, metrik kelulusan, dan riwayat belajar masing-masing siswa.',
      images: [
        'src/assets/teacher-1.jpg',
        'src/assets/teacher-2.jpg',
        'src/assets/teacher-3.jpg'
      ]
    },
    {
      id: 'keamanan-log',
      label: 'Keamanan Log',
      icon: <IconSecurity />,
      title: 'Infrastruktur Privasi dan Enkripsi Data Instansi.',
      description: 'Setiap data rekaman aktivitas kelas dan informasi siswa dienkripsi secara mutlak, mematuhi standar privasi global.',
      images: [
        'src/assets/security-1.jpg',
        'src/assets/security-2.jpg',
        'src/assets/security-3.jpg'
      ]
    }
  ];

  {/* Fungsi Untuk Mengganti Tab. Akan mereset indeks gambar ke 0. */}
  const handleTabChange = (index) => {
    if (activeTab === index) return;
    setImageFade(true); 
    setTimeout(() => {
      setActiveTab(index);
      setActiveImageIndex(0);
      setImageFade(false); 
    }, 200); 
  };

  {/* Fungsi Untuk Mengganti Gambar Besar Ketika Thumbnail Diklik */}
  const handleImageChange = (index) => {
    if (activeImageIndex === index) return;
    setImageFade(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setImageFade(false);
    }, 200);
  };

  const currentContent = featuresData[activeTab];

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        /* PERBAIKAN: Sudut melengkung di bagian atas seperti desain About/Home */
        borderTopLeftRadius: isMobile ? '40px' : '80px',
        borderTopRightRadius: isMobile ? '40px' : '80px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: isMobile ? '40px' : '80px',
        paddingBottom: isMobile ? '80px' : '120px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Keyframe Animasi Komponen */}
      <style>{`
        @keyframes slideUpCard {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .image-transition {
          transition: opacity 0.3s ease-in-out;
        }
        
        /* Menyembunyikan scrollbar untuk daftar kapsul agar terlihat rapi */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Kontainer Utama Berwarna Abu-abu Lembut (Seperti Desain) */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        backgroundColor: '#F4F5F7', 
        borderRadius: isMobile ? '32px' : '48px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '16px' : '24px',
        gap: isMobile ? '32px' : '48px',
        marginLeft: isMobile ? '16px' : '48px',
        marginRight: isMobile ? '16px' : '48px',
        boxSizing: 'border-box',
        opacity: 0,
        animation: isVisible ? 'slideUpCard 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
      }}>
        
        {/* KOLOM KIRI: Gambar Besar Dinamis */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 45%',
          height: isMobile ? '350px' : '600px',
          borderRadius: isMobile ? '24px' : '32px',
          overflow: 'hidden',
          backgroundColor: '#E5E7EB',
          position: 'relative'
        }}>
          <img 
            src={currentContent.images[activeImageIndex]} 
            alt={currentContent.title}
            className="image-transition"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageFade ? 0 : 1, 
            }}
          />
        </div>

        {/* KOLOM KANAN: Navigasi Kapsul, Teks, dan Thumbnail */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: isMobile ? '0' : '32px',
          paddingBottom: isMobile ? '24px' : '0',
          /* PERBAIKAN KRUSIAL: Memaksa Flexbox untuk patuh pada lebar maksimum pembungkus */
          minWidth: 0 
        }}>
          
          {/* 1. Baris Navigasi Tab Kapsul (Bisa Di-scroll Horizontal) */}
          <div 
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              marginBottom: isMobile ? '32px' : '64px',
              whiteSpace: 'nowrap',
              width: '100%',
              paddingBottom: '8px' /* Ruang kecil agar bayangan (shadow) kapsul tidak terpotong */
            }}
          >
            {featuresData.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '50px',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.3s ease',
                    color: isActive ? '#000000' : '#6B7280',
                    flexShrink: 0 /* Menjaga kapsul tidak ikut menciut */
                  }}
                >
                  <span style={{ 
                    fontFamily: '"Manrope", sans-serif', 
                    fontSize: '14px', 
                    fontWeight: isActive ? '600' : '500' 
                  }}>
                    {tab.label}
                  </span>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: isActive ? '#000000' : '#9CA3AF' 
                  }}>
                    {tab.icon}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 2. Judul Dinamis dan Deskripsi Tab Aktif */}
          <h3 className="image-transition" style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '28px' : '42px',
            fontWeight: 'normal',
            color: '#000000',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            margin: '0 0 20px 0',
            opacity: imageFade ? 0 : 1
          }}>
            {currentContent.title}
          </h3>

          <p className="image-transition" style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            color: '#4B5563',
            lineHeight: '1.6',
            margin: '0 0 48px 0',
            maxWidth: '550px',
            opacity: imageFade ? 0 : 1
          }}>
            {currentContent.description}
          </p>

          {/* 3. Baris Gambar Kecil (Thumbnail) Yang Bisa Diklik */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {currentContent.images.map((imgSrc, imgIndex) => {
              const isImageActive = activeImageIndex === imgIndex;
              return (
                <div
                  key={imgIndex}
                  onClick={() => handleImageChange(imgIndex)}
                  style={{
                    width: isMobile ? '70px' : '100px',
                    height: isMobile ? '70px' : '100px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    border: isImageActive ? '2px solid #000000' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    opacity: isImageActive ? 1 : 0.6 
                  }}
                  onMouseOver={(e) => { if (!isImageActive) e.currentTarget.style.opacity = 0.9; }}
                  onMouseOut={(e) => { if (!isImageActive) e.currentTarget.style.opacity = 0.6; }}
                >
                  <img 
                    src={imgSrc} 
                    alt={`Thumbnail ${imgIndex + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}