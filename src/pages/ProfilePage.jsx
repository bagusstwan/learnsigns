import { useState, useEffect } from 'react';

/* IKON MINIMALIS VERCEL STYLE */
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconBriefcase = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconMapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconCalendar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconTrophy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconCrosshair = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>;

export default function ProfilePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;

  /* --- STATE MANAGEMENT API --- */
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', institution: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  /* --- STATE UNTUK GEOLOCATION BROWSER --- */
  const [locationName, setLocationName] = useState("Butuh Perizinan");
  const [isLocating, setIsLocating] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  /* --- 1. FETCH PROFILE DATA --- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const resData = await response.json();
        
        if (response.ok && resData.status === 'success') {
          setProfile(resData.data);
          setFormData({
            name: resData.data.name,
            institution: resData.data.institution
          });
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [API_BASE_URL, token]);

  /* --- 2. HANDLE SAVE PROFILE --- */
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const resData = await response.json();
      
      if (response.ok && resData.status === 'success') {
        setSaveMessage("Berhasil disimpan!");
        setProfile({ ...profile, name: formData.name, institution: formData.institution });
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("Gagal menyimpan data.");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (err) {
      setSaveMessage("Terjadi kesalahan koneksi.");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  /* --- 3. FUNGSI PELACAKAN LOKASI (GEOLOCATION API) --- */
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationName("Browser tidak mendukung GPS");
      return;
    }

    setIsLocating(true);
    setLocationName("Meminta izin...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLocationName("Mencari kota...");
          // Menggunakan Reverse Geocoding API gratis dari BigDataCloud
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`);
          const data = await res.json();
          
          const city = data.city || data.locality || "Kota Tidak Diketahui";
          const province = data.principalSubdivision || "Provinsi Tidak Diketahui";
          
          setLocationName(`${city}, ${province}`);
        } catch (e) {
          setLocationName("Gagal memuat alamat");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        // Jika pengguna menekan "Block/Deny"
        setLocationName("Akses Ditolak / Butuh Izin");
        setIsLocating(false);
      }
    );
  };

  if (isLoading || !profile) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Memuat data profil...</p>
         <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const progressToNextTier = profile.totalStars >= profile.nextTierStars 
    ? 100 
    : (profile.totalStars / profile.nextTierStars) * 100;

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: isDesktop ? '40px 60px' : '24px 16px', boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HEADER AREA */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Pengaturan Akun</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Kelola informasi publik dan pantau pencapaian belajar Anda.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 340px' : '1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* KOLOM KIRI: PERSONAL INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* CARD 1: IDENTITY */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Profil Publik</h3>
              </div>
              
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                  <div style={{ 
                    flexShrink: 0, 
                    width: '80px', height: '80px', 
                    minWidth: '80px', minHeight: '80px',
                    borderRadius: '50%', backgroundColor: '#111827', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: '800' 
                  }}>
                    {profile.name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase()}
                  </div>

                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#111827' }}>{profile.name}</h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Foto profil otomatis dihasilkan dari inisial nama Anda.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* INPUT BISA DI-EDIT */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', alignSelf: 'center' }}>Nama Lengkap</label>
                    <input 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
                      onFocus={(e) => e.target.style.borderColor = '#111827'}
                      onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    />
                  </div>
                  
                  {/* READ ONLY */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', alignSelf: 'center' }}>Peran Utama</label>
                    <input 
                      readOnly 
                      value={profile.role} 
                      style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #EAEAEA', backgroundColor: '#F9FAFB', color: '#6B7280', fontSize: '14px', outline: 'none', cursor: 'not-allowed' }} 
                    />
                  </div>
                  
                  {/* INPUT BISA DI-EDIT */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', alignSelf: 'center' }}>Institusi / Sekolah</label>
                    <input 
                      value={formData.institution} 
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
                      onFocus={(e) => e.target.style.borderColor = '#111827'}
                      onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    />
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Pastikan data Anda sudah benar untuk keperluan sertifikat.</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {saveMessage && (
                    <span style={{ fontSize: '12px', fontWeight: '600', color: saveMessage.includes('Gagal') ? '#DC2626' : '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {!saveMessage.includes('Gagal') && <div style={{ backgroundColor: '#10B981', borderRadius: '50%', padding: '2px', display: 'flex' }}><IconCheck /></div>}
                      {saveMessage}
                    </span>
                  )}
                  
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    style={{ 
                      padding: '8px 20px', backgroundColor: isSaving ? '#4B5563' : '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: isSaving ? 'wait' : 'pointer', transition: 'background-color 0.2s' 
                    }}
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Profil'}
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: CONTACT DETAIL & GEOLOCATION */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Informasi Akun Terverifikasi</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF' }}><IconMail /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Email Login</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>{profile.email}</p>
                  </div>
                </div>
                
                {/* --- LOKASI DINAMIS --- */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF', marginTop: '2px' }}><IconMapPin /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '2px' }}>Lokasi Akses</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: locationName.includes("Ditolak") || locationName.includes("Butuh") ? '#DC2626' : '#4B5563' }}>
                        {locationName}
                      </p>
                      {/* Tombol Pemantik GPS */}
                      <button 
                        onClick={handleDetectLocation} 
                        disabled={isLocating}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: '1px solid #EAEAEA', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: '#4B5563', cursor: isLocating ? 'wait' : 'pointer', transition: '0.2s' }}
                      >
                        <IconCrosshair /> {isLocating ? 'Melacak...' : 'Deteksi Lokasi'}
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF' }}><IconCalendar /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Tanggal Bergabung</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>{profile.joinDate}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: GAMIFICATION & RANKING */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ backgroundColor: '#111827', borderRadius: '12px', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden', zIndex: 1, border: '1px solid #1F2937' }}>
              <div style={{ position: 'absolute', right: '-20%', top: '-20%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.4)', filter: 'blur(50px)', zIndex: -1 }}></div>
              <div style={{ position: 'absolute', right: '10%', bottom: '-20%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', filter: 'blur(40px)', zIndex: -1 }}></div>
              
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Ranking Saat Ini</span>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '16px 0' }}>
                <h2 style={{ margin: 0, fontSize: '56px', fontWeight: '800', letterSpacing: '-2px' }}>#{profile.rank}</h2>
              </div>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(59, 130, 246, 0.15)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#60A5FA' }}>Berdasarkan perolehan Bintang</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Current Tier</p>
                  <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconTrophy /> {profile.tier}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Total Stars</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800', color: '#F59E0B' }}>{profile.totalStars.toLocaleString()}</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '10px' }}>
                  <span>{progressToNextTier >= 100 ? 'Tier Maksimal Dicapai!' : 'Menuju Tier Selanjutnya'}</span>
                  {progressToNextTier < 100 && <span style={{ color: '#111827' }}>{profile.nextTierStars - profile.totalStars} Stars lagi</span>}
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressToNextTier}%`, height: '100%', backgroundColor: '#111827', borderRadius: '10px', transition: 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#111827' }}>{profile.quests}</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>Quest Menang</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#10B981' }}>{profile.winRate}</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>Win Rate AI</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}