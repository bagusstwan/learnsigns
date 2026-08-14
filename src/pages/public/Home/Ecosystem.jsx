import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Ikon Panah Kiri SVG */}
const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

{/* Komponen Ikon Panah Kanan SVG */}
const IconArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

{/* Komponen Ikon Panah Diagonal Kanan Atas SVG */}
const ArrowUpRight = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

{/* Komponen Ikon Centang Untuk Daftar Fitur SVG */}
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

{/* Komponen Bagian Ekosistem Pembelajaran Dengan Korsel Kartu */}
export default function Ecosystem() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const scrollContainerRef = useRef(null);

  {/* State Untuk Mengontrol Modal Pop-up Kaya Konten */}
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  {/* State dan Referensi Untuk Logika Animasi Scroll Reveal */}
  const [isVisible, setIsVisible] = useState(false);
  const ecosystemRef = useRef(null);

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
      { threshold: 0.15 }
    );

    if (ecosystemRef.current) {
      observer.observe(ecosystemRef.current);
    }

    return () => observer.disconnect();
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

  const isMobile = windowWidth < 1024; 

  {/* Fungsi Pengendali Guliran Korsel Ke Arah Kiri */}
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  {/* Fungsi Pengendali Guliran Korsel Ke Arah Kanan */}
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  {/* Fungsi Pemicu Pembukaan Modal Data */}
  const handleOpenModal = (cardData) => {
    setModalContent(cardData);
    setIsModalOpen(true);
  };

  {/* Data Struktur Kartu Ekosistem Diperkaya Dengan Detail Modal */}
  const ecosystemCards = [
    {
      id: 1,
      title: 'Otoritas Pendidik',
      description: 'Pantau metrik kelulusan kelas dan berikan poin evaluasi akhir.',
      imagePath: 'src/assets/eco-1.jpg',
      modalDetails: {
        longDescription: 'Sistem ini dirancang khusus untuk memberikan kontrol penuh kepada tenaga pengajar. Pendidik dapat dengan mudah memantau perkembangan setiap siswa, menganalisis kurva pembelajaran, dan memberikan penilaian secara objektif berdasarkan data analitik yang direkam secara real-time oleh kecerdasan buatan.',
        features: [
          'Dasbor pemantauan kelas secara langsung (Real-time).',
          'Sistem penilaian otomatis berbasis metrik akurasi gestur.',
          'Manajemen tugas dan kurikulum yang mudah disesuaikan.'
        ]
      }
    },
    {
      id: 2,
      title: 'Belajar Mandiri',
      description: 'Panduan visual interaktif per frame dengan sistem gamifikasi.',
      imagePath: 'src/assets/eco-2.jpg',
      modalDetails: {
        longDescription: 'Pendekatan gamifikasi kami memastikan siswa tidak merasa bosan. Dengan modul pembelajaran mandiri, siswa dapat berlatih bahasa isyarat di mana saja. Sistem visi komputer kami akan membedah pergerakan jari per frame untuk memastikan bentuk dan transisi gestur sudah sempurna.',
        features: [
          'Validasi gerakan tangan per-frame menggunakan Computer Vision.',
          'Sistem poin, lencana, dan papan peringkat (Gamifikasi).',
          'Perpustakaan modul yang dapat diakses 24 jam penuh.'
        ]
      }
    },
    {
      id: 3,
      title: 'Evaluasi Seketika',
      description: 'Umpan balik langsung dari AI untuk mengoreksi gestur isyarat.',
      imagePath: 'src/assets/eco-3.jpg',
      modalDetails: {
        longDescription: 'Tidak perlu menunggu guru untuk mengoreksi gerakan. Sistem AI kami bertindak sebagai asisten pintar yang memberikan umpan balik (feedback) visual dalam hitungan milidetik. Jika sudut jari atau arah gerakan salah, AI akan memberikan panduan visual untuk memperbaikinya saat itu juga.',
        features: [
          'Koreksi sudut dan posisi jari dengan indikator visual.',
          'Tidak ada latensi berkat pemrosesan model AI yang dioptimalkan.',
          'Riwayat evaluasi disimpan untuk ditinjau ulang.'
        ]
      }
    },
    {
      id: 4,
      title: 'Laporan Progres',
      description: 'Rekapitulasi komprehensif untuk mendukung portofolio siswa.',
      imagePath: 'src/assets/eco-4.jpg',
      modalDetails: {
        longDescription: 'Semua data pembelajaran diekstraksi menjadi laporan visual yang mudah dipahami. Laporan ini tidak hanya berguna bagi siswa untuk melihat perkembangan mereka, tetapi juga menjadi portofolio validasi keahlian bahasa isyarat yang dapat dibagikan kepada institusi pendidikan atau dunia profesional.',
        features: [
          'Grafik analitik perkembangan mingguan dan bulanan.',
          'Ekspor laporan dalam format PDF yang terverifikasi.',
          'Pemetaan tingkat keahlian (Beginner, Intermediate, Advanced).'
        ]
      }
    }
  ];

  return (
    <section 
      ref={ecosystemRef}
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingTop: isMobile ? '60px' : '80px',
        paddingBottom: isMobile ? '80px' : '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden' 
      }}
    >
      
      {/* Injeksi Gaya Animasi Global Khusus Komponen Ecosystem */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Pembungkus Utama Dengan Tata Letak Baris Pada Desktop */}
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '0', 
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: isMobile ? '40px' : '48px'
      }}>

        {/* Kolom Kiri: Tipografi Dan Tombol Navigasi Diperlebar */}
        <div style={{ 
          flex: '0 0 auto', 
          width: isMobile ? '100%' : '45%', 
          maxWidth: '550px' 
        }}>
          {/* Animasi Muncul Pada Judul */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: isMobile ? '32px' : '40px',
            fontWeight: 'normal',
            color: '#000000',
            lineHeight: '1.2',
            marginTop: '0',
            marginBottom: '20px',
            letterSpacing: '-1px',
            opacity: 0,
            animation: isVisible ? 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' : 'none'
          }}>
            Eksplorasi ekosistem pembelajaran yang dirancang untuk pendidik dan kemandirian para siswa.
          </h2>
          
          {/* Animasi Muncul Pada Deskripsi */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 'normal',
            color: '#4B5563',
            lineHeight: '1.6',
            margin: '0 0 40px 0',
            opacity: 0,
            animation: isVisible ? 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards' : 'none'
          }}>
            Platform ini menjembatani komunikasi melalui antarmuka interaktif, pemantauan log aktivitas kelas, dan evaluasi seketika.
          </p>

          {/* Kontrol Navigasi Korsel Dengan Animasi Fade */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            opacity: 0,
            animation: isVisible ? 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' : 'none'
          }}>
            <button 
              onClick={scrollLeft}
              style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: '1px solid #000000', backgroundColor: 'transparent',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.children[0].style.stroke = '#FFFFFF'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.children[0].style.stroke = '#000000'; }}
            >
              <IconArrowLeft />
            </button>
            <button 
              onClick={scrollRight}
              style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: '1px solid #000000', backgroundColor: 'transparent',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.children[0].style.stroke = '#FFFFFF'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.children[0].style.stroke = '#000000'; }}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Kontainer Korsel Kartu Yang Dapat Digulir */}
        <div 
          ref={scrollContainerRef}
          style={{ 
            flex: '1 1 auto', 
            width: isMobile ? '100%' : '55%', 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none', 
            paddingRight: isMobile ? '0' : '48px', 
            paddingBottom: '20px' 
          }}
        >
          {/* Injeksi Gaya Global Khusus Untuk Menyembunyikan Webkit Scrollbar */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Pemetaan Data Kartu Ekosistem (Animasi Staggered Per Kartu) */}
          {ecosystemCards.map((card, index) => (
            <div 
              key={card.id} 
              style={{
                minWidth: isMobile ? '280px' : '380px', 
                height: isMobile ? '380px' : '440px',
                borderRadius: '32px',
                backgroundColor: '#1F2937',
                backgroundImage: `url("${card.imagePath}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                scrollSnapAlign: 'start',
                overflow: 'hidden',
                flexShrink: 0,
                opacity: 0,
                /* Efek Jeda Beruntun (Staggered) berdasarkan Index Kartu */
                animation: isVisible ? `slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + (index * 0.15)}s forwards` : 'none'
              }}
            >
              {/* Hamparan Gelap Pelindung Keseluruhan Kartu */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1
              }}></div>

              {/* Panel Kaca Buram Di Bagian Bawah Kartu */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '24px',
                zIndex: 2,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: '1.2' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: '0', lineHeight: '1.5' }}>
                    {card.description}
                  </p>
                </div>
                
                {/* Tombol Panah Aksi Di Dalam Panel Kaca Untuk Membuka Modal */}
                <button 
                  onClick={() => handleOpenModal(card)}
                  style={{
                    minWidth: '32px', width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: '#FFFFFF', border: 'none',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <ArrowUpRight color="#000000" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Komponen Hamparan Layar Pop-up Modal Dinamis Bergaya Bersih */}
      {isModalOpen && modalContent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: isMobile ? '16px' : '24px',
          boxSizing: 'border-box'
        }}>
          {/* Kotak Modal Utama Dengan Gambar Sampul */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            maxWidth: '850px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            boxSizing: 'border-box',
            animation: 'fadeInUp 0.3s ease-out forwards',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '90vh'
          }}>
            
            {/* Tombol Tutup Melayang Di Atas Gambar Sampul */}
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#FFFFFF',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <IconClose />
            </button>

            {/* Bagian Gambar Sampul Modal */}
            <div style={{
              width: '100%',
              height: isMobile ? '200px' : '300px',
              backgroundImage: `url("${modalContent.imagePath}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexShrink: 0
            }}></div>
            
            {/* Bagian Area Teks Detail Yang Dapat Digulir Jika Konten Panjang */}
            <div style={{
              padding: isMobile ? '32px 24px' : '48px',
              overflowY: 'auto',
              boxSizing: 'border-box'
            }}>
              {/* Tagline Detail Ekosistem */}
              <div style={{
                display: 'inline-block',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '6px 16px', 
                borderRadius: '50px',
                fontFamily: '"Gilroy", sans-serif',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Detail Ekosistem
              </div>

              {/* Judul Modal */}
              <h3 style={{ 
                fontFamily: '"Gilroy", sans-serif', 
                fontSize: isMobile ? '32px' : '48px', 
                fontWeight: 'bold', 
                color: '#000000', 
                margin: '0 0 20px 0', 
                lineHeight: '1.2',
                letterSpacing: '-1px'
              }}>
                {modalContent.title}
              </h3>

              {/* Paragraf Deskripsi Panjang */}
              <p style={{ 
                fontFamily: '"Manrope", sans-serif', 
                fontSize: isMobile ? '16px' : '18px', 
                color: '#4B5563', 
                margin: '0 0 32px 0', 
                lineHeight: '1.7' 
              }}>
                {modalContent.modalDetails.longDescription}
              </p>

              {/* Garis Pemisah Tipis */}
              <div style={{ height: '1px', width: '100%', backgroundColor: '#E5E7EB', marginBottom: '32px' }}></div>

              {/* Daftar Poin Fitur Utama */}
              <h4 style={{
                fontFamily: '"Gilroy", sans-serif', 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#000000', 
                margin: '0 0 16px 0',
              }}>
                Fitur Utama:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {modalContent.modalDetails.features.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '2px', flexShrink: 0 }}>
                      <IconCheck />
                    </div>
                    <p style={{ 
                      fontFamily: '"Manrope", sans-serif', 
                      fontSize: '16px', 
                      color: '#374151', 
                      margin: '0', 
                      lineHeight: '1.5' 
                    }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}