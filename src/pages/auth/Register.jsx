import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/geist-sans';

export default function Register() {
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'corporate'
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', institution: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    // FIX: Menghapus margin bawaan browser dan mengunci scroll horizontal
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role) => {
    setActiveRole(role);
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Konfirmasi kata sandi tidak cocok.');
    }
    if (formData.password.length < 8) {
      return setError('Kata sandi minimal 8 karakter.');
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: activeRole === 'corporate' ? 'teacher' : 'student',
      };

      if (activeRole === 'corporate') {
        payload.phone = formData.phone;
        payload.institution = formData.institution;
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Pendaftaran gagal. Email mungkin telah digunakan.');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'teacher' || data.user.role === 'corporate') {
        navigate('/login');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FIX: Mengganti width '100vw' menjadi '100%'
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', fontFamily: '"Geist Sans", -apple-system, sans-serif', padding: '24px', boxSizing: 'border-box' }}>
      
      <div style={{ width: '100%', maxWidth: activeRole === 'corporate' ? '700px' : '480px', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'max-width 0.3s ease' }}>
        
        <div style={{ padding: isMobile ? '32px 24px 24px' : '48px 48px 32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Pendaftaran Sistem</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>Pilih jenis akun dan lengkapi data untuk melanjutkan.</p>
          </div>

          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '6px', borderRadius: '16px', marginBottom: '32px' }}>
            <button 
              type="button"
              onClick={() => handleRoleToggle('student')}
              style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeRole === 'student' ? '#FFFFFF' : 'transparent', color: activeRole === 'student' ? '#0F172A' : '#64748B', boxShadow: activeRole === 'student' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}
            >
              Personal / Siswa
            </button>
            <button 
              type="button"
              onClick={() => handleRoleToggle('corporate')}
              style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeRole === 'corporate' ? '#FFFFFF' : 'transparent', color: activeRole === 'corporate' ? '#0F172A' : '#64748B', boxShadow: activeRole === 'corporate' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}
            >
              Corporate / Pendidik
            </button>
          </div>

          {error && <div style={{ padding: '14px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', fontSize: '13px', marginBottom: '24px', fontWeight: '500' }}>{error}</div>}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: (activeRole === 'corporate' && !isMobile) ? '1fr 1fr' : '1fr', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                  {activeRole === 'corporate' ? 'Nama PIC (Penanggung Jawab)' : 'Nama Lengkap'}
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder={activeRole === 'corporate' ? "Nama staf perwakilan" : "Nama lengkap pengguna"} onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email Akses</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder="nama@institusi.com" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
              </div>

              {activeRole === 'corporate' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Nomor Telepon Institusi</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder="08xx-xxxx-xxxx" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Nama Institusi / Sekolah</label>
                    <input type="text" name="institution" value={formData.institution} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder="Universitas / SMK / Perusahaan" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Kata Sandi</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder="Minimal 8 karakter" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Konfirmasi Sandi</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', transition: 'border-color 0.2s' }} placeholder="Ulangi kata sandi" onFocus={(e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}/>
              </div>
            </div>

            <button type="submit" disabled={isLoading} style={{ marginTop: '16px', padding: '14px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.8 : 1, transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1)' }} onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#1E293B' }} onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#0F172A' }}>
              {isLoading ? 'Memproses...' : 'Selesaikan Pendaftaran'}
            </button>
          </form>

        </div>
        
        <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#64748B' }}>Sudah memiliki akses? </span>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#0F172A', fontWeight: '600', fontSize: '14px', cursor: 'pointer', padding: 0 }}>Masuk Sistem</button>
        </div>

      </div>
    </div>
  );
}