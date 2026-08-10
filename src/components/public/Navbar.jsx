import { useNavigate, useLocation } from 'react-router-dom';

/* Komponen Navigasi Utama Situs Publik */
export default function Navbar({ isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Fitur Sistem', path: '/features' }
  ];

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '16px 24px' : '20px 48px', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EAEAEA', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      
      {/* Kolom Kiri: Logo Teks */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#000000' }}>VIBA.AI</span>
      </div>

      {/* Kolom Tengah: Menu Navigasi */}
      {!isMobile && (
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <button 
              key={link.path} 
              onClick={() => navigate(link.path)} 
              style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '400', color: location.pathname === link.path ? '#000000' : '#6B7280', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
              onMouseOut={(e) => e.currentTarget.style.color = location.pathname === link.path ? '#000000' : '#6B7280'}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}

      {/* Kolom Kanan: Tombol Aksi */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
        {!isMobile && (
          <button 
            onClick={() => navigate('/login')} 
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '400', color: '#4B5563', cursor: 'pointer', transition: 'color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = '#000000'} 
            onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}
          >
            Masuk
          </button>
        )}
        <button 
          onClick={() => navigate('/register')} 
          style={{ backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000', borderRadius: '6px', padding: '8px 18px', fontSize: '14px', fontWeight: '400', cursor: 'pointer', transition: 'all 0.2s' }} 
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#000000'; }} 
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.style.color = '#FFFFFF'; }}
        >
          Daftar Akses
        </button>
      </div>

    </nav>
  );
}