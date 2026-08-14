import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* Komponen Ikon Hamburger SVG */
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

/* Komponen Ikon Silang Tutup SVG */
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/* Komponen Navigasi Utama Aplikasi */
export default function Navbar({ isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  /* Logika Deteksi Guliran Layar Untuk Transisi Latar Belakang */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Logika Penguncian Guliran Latar Saat Menu Perangkat Bergerak Terbuka */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: isMobile ? '16px 24px' : '20px 48px', 
      backgroundColor: (isMobile && isMenuOpen) ? '#F4F4F5' : (isScrolled ? 'rgba(255, 255, 255, 0.75)' : '#F4F4F5'), 
      backdropFilter: (isMobile && isMenuOpen) ? 'none' : (isScrolled ? 'blur(12px)' : 'none'),
      WebkitBackdropFilter: (isMobile && isMenuOpen) ? 'none' : (isScrolled ? 'blur(12px)' : 'none'), 
      borderBottom: (isMobile && isMenuOpen) ? 'none' : (isScrolled ? '1px solid #EAEAEA' : 'none'), 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100,
      transition: 'all 0.3s ease-in-out'
    }}>
      
      {/* Identitas Merek Dan Logo Utama */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: 102 }} onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
        <span style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '-0.5px', color: '#000000', fontFamily: '"Gilroy", sans-serif' }}>VIBA.AI</span>
      </div>

      {/* Tautan Navigasi Khusus Tampilan Desktop */}
      {!isMobile && (
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {navLinks.map((link) => (
            <button 
              key={link.path} 
              onClick={() => navigate(link.path)} 
              style={{ 
                background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', 
                color: location.pathname === link.path ? '#000000' : '#6B7280', 
                cursor: 'pointer', transition: 'color 0.2s', fontFamily: '"Gilroy", sans-serif'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
              onMouseOut={(e) => e.currentTarget.style.color = location.pathname === link.path ? '#000000' : '#6B7280'}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}

      {/* Kumpulan Tombol Aksi Dan Pemicu Menu Perangkat Bergerak */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', zIndex: 102 }}>
        
        {/* Modul Autentikasi Khusus Tampilan Desktop */}
        {!isMobile && (
          <>
            <button 
              onClick={() => navigate('/login')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', color: '#4B5563', cursor: 'pointer', fontFamily: '"Gilroy", sans-serif' }} 
            >
              Sign in
            </button>
            <button 
              onClick={() => navigate('/register')} 
              style={{ 
                backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000', 
                borderRadius: '6px', padding: '10px 24px', fontSize: '15px', fontWeight: '500', 
                cursor: 'pointer', fontFamily: '"Gilroy", sans-serif'
              }} 
            >
              Sign up
            </button>
          </>
        )}

        {/* Pemicu Navigasi Khusus Perangkat Bergerak */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: '#000000' }}
          >
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        )}
      </div>

      {/* Hamparan Menu Layar Penuh Khusus Perangkat Bergerak */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F4F4F5', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',     
          zIndex: 101, 
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out'
        }}>
          
          {/* Daftar Tautan Navigasi Utama */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            {navLinks.map((link) => (
              <button 
                key={link.path} 
                onClick={() => { navigate(link.path); setIsMenuOpen(false); }} 
                style={{ 
                  background: 'none', border: 'none', textAlign: 'center', 
                  fontFamily: '"Gilroy", sans-serif', fontSize: '24px', fontWeight: 'bold', 
                  textTransform: 'uppercase', letterSpacing: '1px',
                  color: location.pathname === link.path ? '#000000' : '#6B7280',
                  cursor: 'pointer'
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Indikator Pemisah Visual */}
          <div style={{ width: '40px', height: '3px', backgroundColor: '#D1D5DB', borderRadius: '10px', margin: '40px 0' }}></div>
          
          {/* Kumpulan Tombol Autentikasi Terpusat */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            <button 
              onClick={() => { navigate('/login'); setIsMenuOpen(false); }} 
              style={{ 
                background: 'none', border: 'none', textAlign: 'center', 
                fontFamily: '"Gilroy", sans-serif', fontSize: '20px', fontWeight: 'bold', 
                textTransform: 'uppercase', color: '#000000', cursor: 'pointer' 
              }}
            >
              Sign in
            </button>
            <button 
              onClick={() => { navigate('/register'); setIsMenuOpen(false); }} 
              style={{ 
                backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000', 
                borderRadius: '50px', padding: '16px 56px', 
                fontFamily: '"Gilroy", sans-serif', fontSize: '18px', fontWeight: 'bold', 
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
              }} 
            >
              Sign up
            </button>
          </div>

        </div>
      )}

    </nav>
  );
}