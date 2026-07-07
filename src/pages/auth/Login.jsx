import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/geist-sans';

const IconEduSync = () => (
  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    // FIX: Menghapus margin bawaan browser dan mengunci scroll horizontal
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflowX = "auto"; // Reset saat pindah halaman
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Kredensial tidak valid. Silakan coba lagi.');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'teacher' || data.user.role === 'corporate') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FIX: Mengganti width '100vw' menjadi '100%' agar tidak kelebihan lebar
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', fontFamily: '"Geist Sans", -apple-system, sans-serif', padding: '24px', boxSizing: 'border-box' }}>
      
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', maxWidth: '1000px', backgroundColor: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.02)' }}>
        
        {!isMobile && (
          <div style={{ flex: 1, backgroundColor: '#0F172A', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '64px' }}>
            <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(15,23,42,0) 60%)', borderRadius: '50%', zIndex: 1 }}></div>
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'auto' }}>
              <IconEduSync />
              <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>VIBA.AI</span>
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h1 style={{ color: '#FFFFFF', fontSize: '42px', fontWeight: '700', letterSpacing: '-1px', lineHeight: '1.15', marginBottom: '24px' }}>
                Transformasi<br />Pendidikan Inklusif.
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '16px', lineHeight: '1.7', maxWidth: '400px' }}>
                Platform pembelajaran bahasa isyarat terintegrasi AI. Memberikan pengalaman belajar gerakan tangan yang akurat dan nyata.
              </p>
            </div>
            
            <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', color: '#64748B', fontSize: '13px', fontWeight: '500' }}>
              © {new Date().getFullYear()} Viba.ai All rights reserved.
            </div>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '40px 32px' : '64px 80px', zIndex: 20 }}>
          
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span style={{ color: '#0F172A', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>EduSync</span>
            </div>
          )}

          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>Selamat Datang</h2>
            <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '40px', lineHeight: '1.6' }}>Silakan masuk menggunakan kredensial terdaftar.</p>

            {error && <div style={{ padding: '14px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', fontSize: '13px', marginBottom: '24px', fontWeight: '500' }}>{error}</div>}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email Akses</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#F8FAFC', color: '#0F172A', transition: 'all 0.2s' }} placeholder="masukkan email" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }} />
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Kata Sandi</label>
                  <a href="#" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#0F172A'} onMouseOut={(e) => e.target.style.color = '#64748B'}>Lupa sandi?</a>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#F8FAFC', color: '#0F172A', transition: 'all 0.2s' }} placeholder="••••••••" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }} />
              </div>
              
              <button type="submit" disabled={isLoading} style={{ marginTop: '8px', padding: '14px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.8 : 1, transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)' }} onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#1E293B' }} onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#0F172A' }}>
                {isLoading ? 'Memverifikasi...' : 'Masuk ke Dasbor'}
              </button>
            </form>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Belum memiliki akses? </span>
              <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#0F172A', fontWeight: '600', fontSize: '14px', cursor: 'pointer', padding: 0 }}>Daftar Sistem</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}