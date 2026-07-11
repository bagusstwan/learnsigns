import { useState, useEffect } from 'react';

/* IKON MINIMALIS & PROFESIONAL (DITAMBAH IKON INPUT) */
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconPlus = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

export default function StudentManagementPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;
  const paddingMain = isDesktop ? '40px 48px' : '24px 16px';

  /* --- STATE MANAGEMENT API --- */
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/educator/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok && resData.status === 'success') {
        setStudents(resData.data.students);
      }
    } catch (err) {
      console.error("Gagal memuat data murid:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [API_BASE_URL, token]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/educator/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const resData = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '' });
        fetchStudents(); // Refresh tabel
      } else {
        alert(resData.message || "Gagal menambahkan murid. Email mungkin sudah terdaftar.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = (students || []).filter(student => 
    student?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* GAYA INPUT PREMIUM */
  const inputStyle = { width: '100%', padding: '12px 14px 12px 40px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' };
  const inputFocus = (e) => { e.target.style.borderColor = '#111827'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.1)'; };
  const inputBlur = (e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Memuat data instansi...</p>
         <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: paddingMain, boxSizing: 'border-box', backgroundColor: '#FAFAFA' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '22px' : '28px', fontWeight: '800', letterSpacing: '-0.8px', color: '#111827' }}>
            Manajemen Murid
          </h2>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', maxWidth: '600px', lineHeight: '1.6' }}>
            Buat dan kelola akses masuk untuk murid yang terdaftar di bawah bimbingan Anda.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        
        {/* HEADER TABEL & AKSI */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ position: 'relative', width: isMobile ? '100%' : '280px' }}>
            <div style={{ position: 'absolute', left: '14px', top: '10px' }}><IconSearch /></div>
            <input 
              type="text" placeholder="Cari nama murid..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FAFAFA', transition: 'all 0.2s' }} 
              onFocus={(e) => { e.target.style.borderColor = '#111827'; e.target.style.backgroundColor = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.05)'; }} 
              onBlur={(e) => { e.target.style.borderColor = '#EAEAEA'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', width: isMobile ? '100%' : 'auto', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#374151'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <IconPlus /> Buat Akses Murid
          </button>
        </div>

        {/* AREA TABEL */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #EAEAEA' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profil Murid</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Institusi / Kelas</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status Akses</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #EAEAEA', transition: 'backgroundColor 0.2s', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: '800', border: '1px solid #E5E7EB' }}>
                        {student.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '2px' }}>{student.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>ID Sistem: #{student.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#4B5563', fontWeight: '500' }}>
                    <span style={{ backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                      {student.class}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#059669', backgroundColor: '#ECFDF5', padding: '6px 12px', borderRadius: '20px', border: '1px solid #A7F3D0' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
                      Akses Aktif
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" style={{ padding: '60px 24px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                        <IconUser />
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>Belum Ada Murid</p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Klik "Buat Akses Murid" untuk mulai menambahkan.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL BUAT AKSES MURID (ENTERPRISE UI) */}
      {/* ========================================== */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '460px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transform: 'scale(1)', animation: 'scaleUp 0.2s ease-out' }}>
            
            <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #A7F3D0' }}>
                  <IconShield />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#111827', letterSpacing: '-0.3px' }}>Buat Akses Murid</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>Buat kredensial masuk (login) resmi untuk murid Anda. Data akan terikat dengan instansi Anda.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px', borderRadius: '6px', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <IconClose />
              </button>
            </div>

            <form onSubmit={handleAddStudent} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px' }}>NAMA LENGKAP MURID</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '12px' }}><IconUser /></div>
                    <input type="text" required placeholder="Contoh: Budi Santoso" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px' }}>EMAIL KREDENSIAL</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '12px' }}><IconMail /></div>
                    <input type="email" required placeholder="budi@viba.id" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px' }}>KATA SANDI AKSES (SEMENTARA)</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '12px' }}><IconLock /></div>
                    <input type="text" required minLength="6" placeholder="Buat sandi mudah (Min. 6 Karakter)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Sandi ini akan digunakan murid untuk masuk ke aplikasi.</p>
                </div>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 18px', background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Batal</button>
                
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: isSubmitting ? 'wait' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#374151'; }} onMouseOut={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#111827'; }}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan & Buat Akses'}
                </button>
              </div>
            </form>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}

    </main>
  );
}