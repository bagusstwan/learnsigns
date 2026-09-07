import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '@fontsource/geist-sans';

const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden"; 

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    // Menangkap pesan error dari Google Redirect jika ada
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('error')) {
      setError('Otentikasi Google gagal. Silakan coba lagi.');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = "auto"; 
    };
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return setError('Format alamat surel tidak valid.');
    }
    
    if (password.trim().length < 8) {
      return setError('Kredensial yang Anda masukkan tidak valid. Harap periksa kembali.');
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Kredensial yang Anda masukkan tidak valid. Harap periksa kembali.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler SSO Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Alihkan ke layar persetujuan Google
      }
    } catch (err) {
      setError("Gagal terhubung ke server otentikasi Google.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#FFFFFF', fontFamily: '"Geist Sans", -apple-system, sans-serif', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      <div style={{ flex: isMobile ? 'none' : '1', width: isMobile ? '100vw' : '50vw', height: isMobile ? '35vh' : '100vh', padding: isMobile ? '16px' : '32px', boxSizing: 'border-box', display: 'flex' }}>
        <div style={{ flex: 1, position: 'relative', borderRadius: isMobile ? '24px' : '40px', borderTopRightRadius: isMobile ? '24px' : '120px', borderBottomLeftRadius: isMobile ? '24px' : '120px', overflow: 'hidden', backgroundColor: '#F1F5F9', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }}>
          <img src="src/assets/validation1.jpg" alt="Ilustrasi Platform Viba.ai" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
        </div>
      </div>

      <div style={{ flex: isMobile ? '1' : '1', width: isMobile ? '100vw' : '50vw', height: isMobile ? '65vh' : '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '24px' : '40px', boxSizing: 'border-box' }}>
        
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h2 style={{ fontSize: 'min(32px, 7vw)', fontWeight: '800', color: '#0F172A', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Akses Akun Anda
          </h2>
          <p style={{ fontSize: '14.5px', color: '#64748B', marginBottom: '32px', lineHeight: '1.6' }}>
            Silakan masukkan kredensial terdaftar Anda untuk melanjutkan ke dasbor sistem dan mengelola aktivitas Anda.
          </p>

          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', fontSize: '13px', marginBottom: '24px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Alamat Surel</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} placeholder="masukkan alamat email Anda" style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#FFFFFF', color: '#0F172A', transition: 'all 0.2s', opacity: isLoading ? 0.7 : 1 }} onFocus={(e) => e.target.style.borderColor = '#0F172A'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Kata Sandi</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} placeholder="••••••••" style={{ width: '100%', padding: '14px 44px 14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#FFFFFF', color: '#0F172A', transition: 'all 0.2s', fontFamily: showPassword ? 'inherit' : 'caption', letterSpacing: showPassword ? 'normal' : '2px', opacity: isLoading ? 0.7 : 1 }} onFocus={(e) => e.target.style.borderColor = '#0F172A'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: showPassword ? '#0F172A' : '#94A3B8', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} title={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}>
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="rememberMe" disabled={isLoading} style={{ accentColor: '#0F172A', width: '16px', height: '16px', cursor: 'pointer' }} />
                <label htmlFor="rememberMe" style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', fontWeight: '500' }}>Ingat perangkat ini</label>
              </div>
              <a href="#" style={{ fontSize: '13px', color: '#0F172A', textDecoration: 'none', fontWeight: '600' }}>Lupa kata sandi?</a>
            </div>
            
            <button type="submit" disabled={isLoading} style={{ marginTop: '8px', padding: '14px', backgroundColor: '#000000', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: isLoading ? 'wait' : 'pointer', opacity: isLoading ? 0.8 : 1, transition: 'all 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {isLoading ? 'Memverifikasi Akses...' : 'Masuk ke Sistem'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', color: '#94A3B8', fontSize: '12px', fontWeight: '500' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
            <span style={{ padding: '0 12px' }}>ATAU</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{ width: '100%', padding: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'background-color 0.2s', opacity: isLoading ? 0.7 : 1 }} 
            onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#F8FAFC' }} 
            onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#FFFFFF' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <span style={{ fontSize: '14px', color: '#64748B' }}>Belum memiliki hak akses? </span>
            <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#0F172A', fontWeight: '700', fontSize: '14px', cursor: 'pointer', padding: 0 }}>
              Ajukan Pendaftaran
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}