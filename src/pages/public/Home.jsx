import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* IMPORT FILE ANIMATED SVG DARI FOLDER ASSETS */
import animAI from '../../assets/cam-scan.svg';
import animCamera from '../../assets/files.svg';
import animChart from '../../assets/scan-file.svg';

/* Komponen Ikon Fungsional */
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconPlay = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const IconCamera = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const IconData = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    setIsLoaded(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
    { id: 1, title: 'Pemilihan Modul', desc: 'Akses perpustakaan kurikulum terstruktur dari alfabet hingga kalimat interaktif.' },
    { id: 2, title: 'Validasi Gestur', desc: 'Kamera memindai dan memvalidasi koordinat matriks tangan Anda secara instan.' },
    { id: 3, title: 'Evaluasi Kelas', desc: 'Pendidik menerima laporan analitik menyeluruh dan memberikan poin akhir.' }
  ];

  const renderWavyText = (text) => {
    return text.split(' ').map((word, index) => (
      <span 
        key={index} 
        style={{ 
          display: 'inline-block', 
          opacity: isLoaded ? 1 : 0, 
          transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
          transition: `all 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.08}s`,
          marginRight: '14px'
        }}
      >
        {word}
      </span>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      
      {/* Pendaran Cahaya Khas Next.js (Elips Lembut di Atas) */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '600px', background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* BAGIAN 1: Sorotan Utama */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '80px 24px 40px' : '140px 48px 60px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        {/* Lencana Pengumuman ala Vercel */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)', color: '#111827', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', marginBottom: '32px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }}></span>
          Memperkenalkan Viba Enterprise V1.0
        </div>

        <h1 style={{ margin: '0 0 24px 0', fontSize: isMobile ? '42px' : '76px', fontWeight: '800', color: '#000000', letterSpacing: '-0.05em', lineHeight: '1.05', maxWidth: '960px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {renderWavyText('Infrastruktur Cerdas Untuk Pendidikan Inklusif.')}
        </h1>
        
        <p style={{ margin: '0 0 48px 0', fontSize: isMobile ? '16px' : '20px', color: '#4B5563', maxWidth: '600px', lineHeight: '1.6', fontWeight: '400', opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease 0.6s' }}>
          Sistem manajemen pembelajaran dengan integrasi kecerdasan buatan. Mengubah tangkapan visual menjadi validasi gestur secara instan.
        </p>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', width: isMobile ? '100%' : 'auto', opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '14px 32px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Mulai Penggunaan
          </button>
          <button onClick={() => navigate('/features')} style={{ padding: '14px 32px', backgroundColor: '#FFFFFF', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#D1D5DB'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }}>
            <IconPlay /> Pelajari Ekosistem
          </button>
        </div>

        {/* Gambar Pratinjau Dasbor (Elevated Shadow) */}
        <div style={{ marginTop: '80px', width: '100%', maxWidth: '1024px', height: isMobile ? '280px' : '600px', backgroundColor: '#FFFFFF', borderRadius: '16px', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -12px rgba(0,0,0,0.1), 0 18px 36px -18px rgba(0,0,0,0.1)', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}>
           <div style={{ height: '48px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
           </div>
           
           <div style={{ display: 'flex', height: 'calc(100% - 48px)', backgroundColor: '#FAFAFA' }}>
              <div style={{ width: '240px', borderRight: '1px solid #E5E7EB', padding: '24px', display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#FFFFFF' }}>
                 <div style={{ height: '24px', width: '70%', backgroundColor: '#F3F4F6', borderRadius: '4px', marginBottom: '24px' }}></div>
                 <div style={{ height: '12px', width: '100%', backgroundColor: '#F9FAFB', borderRadius: '4px' }}></div>
                 <div style={{ height: '12px', width: '85%', backgroundColor: '#F9FAFB', borderRadius: '4px' }}></div>
                 <div style={{ height: '12px', width: '90%', backgroundColor: '#F9FAFB', borderRadius: '4px' }}></div>
              </div>
              
              <div style={{ flex: 1, padding: isMobile ? '16px' : '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                 <div style={{ width: isMobile ? '80%' : '50%', opacity: 0.9 }}>
                   <img src={animAI} alt="Animasi AI" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                 </div>
                 
                 <div style={{ position: 'absolute', bottom: '32px', left: '32px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid #E5E7EB', borderRadius: '999px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 12px rgba(16,185,129,0.8)' }}></div>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#111827' }}>Sensor Optik Aktif</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* BAGIAN 2: Jejak Kemitraan */}
      <section style={{ padding: '60px 24px', borderBottom: '1px solid #EAEAEA', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
         <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>Dipercaya oleh institusi modern</p>
         <div style={{ display: 'flex', gap: isMobile ? '32px' : '80px', opacity: 0.5, flexWrap: 'wrap', justifyContent: 'center', filter: 'grayscale(100%)' }}>
            {['Akademik Global', 'Institut Inklusi', 'Pusat Riset AI', 'EduTech Masa Depan'].map((mitra, i) => (
              <span key={i} style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700', letterSpacing: '-0.5px', color: '#111827' }}>{mitra}</span>
            ))}
         </div>
      </section>

      {/* BAGIAN 3: Interaktif Cara Kerja */}
      <section style={{ padding: isMobile ? '100px 24px' : '160px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
        <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '800', color: '#000000', letterSpacing: '-0.04em', marginBottom: '80px', textAlign: 'center' }}>Alur Kerja Presisi.</h2>
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '64px', maxWidth: '1024px', width: '100%', alignItems: 'center' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {steps.map((step) => (
              <div 
                key={step.id} 
                onClick={() => setActiveTab(step.id)}
                style={{ padding: '24px 32px', borderRadius: '12px', borderLeft: activeTab === step.id ? '2px solid #000000' : '2px solid transparent', backgroundColor: activeTab === step.id ? '#FFFFFF' : 'transparent', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: activeTab === step.id ? '0 10px 15px -3px rgba(0,0,0,0.05)' : 'none' }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: activeTab === step.id ? '#000000' : '#6B7280', letterSpacing: '-0.02em' }}>
                  {step.id}. {step.title}
                </h3>
                <div style={{ 
                    maxHeight: activeTab === step.id ? '100px' : '0', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                    opacity: activeTab === step.id ? 1 : 0 
                }}>
                  <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1.5, width: '100%', height: '400px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
             <div style={{ width: '60%', position: 'absolute', opacity: activeTab === 1 ? 1 : 0, transform: activeTab === 1 ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: activeTab === 1 ? 'auto' : 'none' }}>
                <img src={animAI} alt="Langkah 1" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
             </div>
             <div style={{ width: '60%', position: 'absolute', opacity: activeTab === 2 ? 1 : 0, transform: activeTab === 2 ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: activeTab === 2 ? 'auto' : 'none' }}>
                <img src={animCamera} alt="Langkah 2" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
             </div>
             <div style={{ width: '60%', position: 'absolute', opacity: activeTab === 3 ? 1 : 0, transform: activeTab === 3 ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: activeTab === 3 ? 'auto' : 'none' }}>
                <img src={animChart} alt="Langkah 3" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
             </div>
          </div>

        </div>
      </section>

      {/* BAGIAN 4: Tata Letak Bento Grid ala Vercel */}
      <section style={{ padding: isMobile ? '100px 24px' : '160px 48px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '800', color: '#000000', letterSpacing: '-0.04em', marginBottom: '80px', textAlign: 'center' }}>Arsitektur Sistem Skala Penuh.</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gridTemplateRows: isMobile ? 'auto' : 'repeat(2, 280px)', gap: '16px', maxWidth: '1024px', width: '100%' }}>
          
          <div className="bento-card" style={{ gridColumn: isMobile ? 'span 1' : 'span 2', gridRow: isMobile ? 'auto' : 'span 2', background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)', border: '1px solid #EAEAEA', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s ease' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}><IconCamera /></div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: '800', color: '#000000', letterSpacing: '-0.03em' }}>Kecerdasan Visual<br/>TensorFlow</h3>
              <p style={{ margin: 0, fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>Pendeteksian multi frame dinamis untuk akurasi pengenalan gestur linguistik secara nyata.</p>
            </div>
          </div>

          <div className="bento-card" style={{ gridColumn: isMobile ? 'span 1' : 'span 2', background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)', border: '1px solid #EAEAEA', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'border-color 0.2s ease' }}>
             <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#000000', letterSpacing: '-0.02em' }}>Otoritas Pendidik</h3>
             <p style={{ margin: 0, fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>Sistem umpan balik tertutup yang memberikan pendidik kendali mutlak atas evaluasi dan penilaian akhir kelas.</p>
          </div>

          <div className="bento-card" style={{ backgroundColor: '#000000', border: '1px solid #000000', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             <div style={{ width: '40px', height: '40px', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconData /></div>
             <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Keamanan Log</h3>
          </div>

          <div className="bento-card" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)', border: '1px solid #EAEAEA', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'border-color 0.2s ease' }}>
             <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#000000', letterSpacing: '-0.02em' }}>UI Premium</h3>
             <p style={{ margin: 0, fontSize: '14px', color: '#4B5563', lineHeight: '1.5' }}>Pengalaman responsif tingkat korporat.</p>
          </div>

        </div>
      </section>

      {/* BAGIAN 5: Penutup Terakhir */}
      <section style={{ padding: isMobile ? '100px 24px' : '160px 48px', backgroundColor: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Pendaran Halus di Atas Background Hitam */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: isMobile ? '40px' : '64px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.05em', maxWidth: '800px', lineHeight: '1.05' }}>
            Kesiapan Inklusivitas di Ruang Kelas.
          </h2>
          <p style={{ margin: '0 auto 48px', fontSize: '18px', color: '#9CA3AF', maxWidth: '500px', lineHeight: '1.6' }}>
            Bergabunglah dengan ekosistem Viba.ai dan rasakan kemudahan teknologi validasi gestur hari ini.
          </p>
          <button onClick={() => navigate('/register')} style={{ padding: '16px 40px', backgroundColor: '#FFFFFF', color: '#000000', border: '1px solid #FFFFFF', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#000000'; }}>
            Daftarkan Akses Sekarang
          </button>
        </div>
      </section>

      {/* CSS Tambahan untuk Micro-interactions ala Tailwind/Next.js */}
      <style>{`
        .bento-card:hover {
          border-color: #D1D5DB !important;
        }
      `}</style>
    </div>
  );
}