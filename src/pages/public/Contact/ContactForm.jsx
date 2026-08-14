import React, { useState, useEffect, useRef } from 'react';

{/* Komponen Ikon Panah Untuk Tombol Kirim */}
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

{/* Komponen Formulir Kontak dan Gambar Pendukung */}
export default function ContactForm() {
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

  {/* Logika Observer Untuk Animasi Saat Elemen Masuk Visibilitas Layar */}
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

  {/* Fungsi Pencegah *Reload* Saat Formulir Dikirim */}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika pengiriman API dapat ditambahkan di sini
    console.log("Formulir dikirim");
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        /* PERBAIKAN: Penambahan radius sudut melengkung pada section utama */
        borderTopLeftRadius: isMobile ? '40px' : '80px',
        borderTopRightRadius: isMobile ? '40px' : '80px',
        paddingTop: isMobile ? '60px' : '100px', /* Padding atas ditambah mengimbangi lengkungan */
        paddingBottom: isMobile ? '80px' : '120px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Injeksi Gaya CSS Untuk Input dan Animasi */}
      <style>{`
        @keyframes slideUpForm {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Pengaturan Gaya Input Minimalis */
        .contact-input {
          width: 100%;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #D1D5DB;
          padding: 12px 0;
          font-family: "Manrope", sans-serif;
          font-size: 16px;
          color: #1F2937;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .contact-input::placeholder {
          color: #9CA3AF;
        }

        .contact-input:focus {
          border-bottom: 1px solid #000000;
        }

        /* Pengaturan Khusus Textarea */
        .contact-textarea {
          resize: none;
          min-height: 40px;
        }
      `}</style>

      {/* Kontainer Utama Berwarna Abu-abu Lembut */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        backgroundColor: '#F4F5F7',
        borderRadius: isMobile ? '32px' : '48px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '16px' : '24px',
        gap: isMobile ? '32px' : '64px',
        marginLeft: isMobile ? '16px' : '48px',
        marginRight: isMobile ? '16px' : '48px',
        boxSizing: 'border-box',
        opacity: 0,
        animation: isVisible ? 'slideUpForm 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
      }}>
        
        {/* KOLOM KIRI: Gambar Visual (Portrait) */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 45%',
          height: isMobile ? '350px' : '600px',
          borderRadius: isMobile ? '24px' : '32px',
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          position: 'relative'
        }}>
          <img 
            src="src/assets/contact-image.jpg"
            alt="AI Support"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* KOLOM KANAN: Konten Formulir */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: isMobile ? '0' : '32px',
          paddingBottom: isMobile ? '24px' : '0'
        }}>
          
          {/* Judul dan Deskripsi */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{
              fontFamily: '"Gilroy", sans-serif',
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 'normal',
              color: '#000000',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              margin: '0 0 16px 0'
            }}>
              Sapa Tim Dukungan
            </h3>
            <p style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: isMobile ? '15px' : '16px',
              color: '#4B5563',
              lineHeight: '1.6',
              margin: 0,
              maxWidth: '450px'
            }}>
              Sampaikan pertanyaan teknis, diskusi kemitraan institusi, atau kebutuhan kustomisasi sistem Anda di sini.
            </p>
          </div>

          {/* Elemen Formulir Interaktif */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Baris 1: Nama Depan & Nama Belakang (Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px'
            }}>
              <input 
                type="text" 
                className="contact-input" 
                placeholder="Nama Depan" 
                required 
              />
              <input 
                type="text" 
                className="contact-input" 
                placeholder="Nama Belakang" 
                required 
              />
            </div>

            {/* Baris 2: Alamat Surel */}
            <div>
              <input 
                type="email" 
                className="contact-input" 
                placeholder="Alamat Surel Institusi" 
                required 
              />
            </div>

            {/* Baris 3: Pesan (Textarea) */}
            <div>
              <textarea 
                className="contact-input contact-textarea" 
                placeholder="Tuliskan detail pesan Anda di sini..." 
                rows="1"
                required 
              ></textarea>
            </div>

            {/* Tombol Kirim */}
            <div style={{ marginTop: '16px' }}>
              <button 
                type="submit"
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px 32px',
                  fontFamily: '"Gilroy", sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'transform 0.2s ease, backgroundColor 0.2s ease',
                  width: 'fit-content'
                }}
                onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'scale(1.05)'; 
                  e.currentTarget.style.backgroundColor = '#1F2937'; 
                }}
                onMouseOut={(e) => { 
                  e.currentTarget.style.transform = 'scale(1)'; 
                  e.currentTarget.style.backgroundColor = '#000000'; 
                }}
              >
                Kirim Pesan
                <IconSend />
              </button>
            </div>

          </form>

        </div>
      </div>

    </section>
  );
}