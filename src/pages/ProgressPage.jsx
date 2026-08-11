import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

/* --- KOMPONEN IKON PREMIUM --- */
const IconStarWhite = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconCheckShieldWhite = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>;
const IconChartLineWhite = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconArrowUpRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconUser = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconStarOrange = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

export default function ProgressPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobile = windowWidth < 768;

  const paddingMain = isDesktop ? '40px 64px' : isTablet ? '32px 32px' : '24px 16px';
  const gridStats = isMobile ? '1fr' : 'repeat(3, 1fr)';
  const gridLogs = isDesktop ? '1fr 1fr' : '1fr';

  /* --- MANAJEMEN STATE API --- */
  const [dashboardData, setDashboardData] = useState({
    total_stars: 0,
    average_accuracy: 0,
    completed_modules: 0,
    weekly_activity: [],
    learning_logs: [],
    quest_logs: [],
    today_star_receivers: [] 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/progress/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const resData = await response.json();
        
        if (response.ok && resData.status === 'success') {
          setDashboardData(resData.data);
        } else {
          setApiError("Gagal mengambil data dari peladen utama.");
        }
      } catch (err) {
        setApiError("Koneksi jaringan terputus.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [API_BASE_URL, token]);

  /* Kustomisasi Tooltip Recharts */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dayData = payload[0].payload;
      const activeStudents = dayData.active_students || [];

      return (
        <div style={{ backgroundColor: '#0F172A', padding: '16px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 12px 0', color: '#FFFFFF', fontSize: '14px', fontWeight: '800' }}>Hari {label}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#1E293B', padding: '12px', borderRadius: '8px' }}>
            <span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daftar Murid Aktif</span>
            {activeStudents.length > 0 ? (
              activeStudents.map((name, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '13px', fontWeight: '700' }}>
                  <IconUser /> {name}
                </div>
              ))
            ) : (
              <span style={{ color: '#64748B', fontSize: '12px', fontStyle: 'italic' }}>Tidak ada aktivitas tercatat</span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
         <div style={{ width: '42px', height: '42px', border: '3px solid #E2E8F0', borderTop: '3px solid #0F172A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '20px' }}></div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
         <p style={{ color: '#EF4444', fontWeight: '700', backgroundColor: '#FEF2F2', padding: '16px 24px', borderRadius: '12px', border: '1px solid #FCA5A5' }}>{apiError}</p>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#F8FAFC', padding: paddingMain, boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '36px' }}>
        
        {/* SECTION 1: HEADER */}
        <div>
          <h1 style={{ margin: '0 0 12px 0', fontSize: isMobile ? '32px' : '42px', fontWeight: '800', letterSpacing: '-1px', color: '#0F172A' }}>
            Monitoring Perkembangan Murid
          </h1>
          <p style={{ margin: 0, color: '#475569', fontSize: '15px', maxWidth: '640px', lineHeight: '1.6' }}>
            Pantau statistik akurasi, akumulasi perolehan bintang, dan riwayat aktivitas seluruh murid Anda secara aktual.
          </p>
        </div>

        {/* SECTION 2: 3 STATS CARDS (ENTERPRISE DESIGN) */}
        <div style={{ display: 'grid', gridTemplateColumns: gridStats, gap: '24px' }}>
          
          {/* Card 1: Total Bintang */}
          <div 
            onClick={() => setIsStarModalOpen(true)}
            style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <IconStarWhite />
               </div>
               <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginLeft: '16px' }}>Total Bintang</span>
            </div>
            
            {/* Arrow Button Indicator */}
            <div style={{ position: 'absolute', top: '32px', right: '32px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
               <IconArrowUpRight />
            </div>

            <div style={{ marginTop: '36px', display: 'flex', alignItems: 'baseline' }}>
               <span style={{ fontSize: '48px', fontWeight: '800', color: '#0F172A', lineHeight: '1', letterSpacing: '-1px' }}>
                 {dashboardData.total_stars.toLocaleString('id-ID')}
               </span>
               <span style={{ fontSize: '18px', fontWeight: '600', color: '#475569', marginLeft: '12px' }}>Star Murid</span>
            </div>
          </div>

          {/* Card 2: Rata-Rata Akurasi */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <IconCheckShieldWhite />
               </div>
               <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginLeft: '16px' }}>Rata-Rata Akurasi</span>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', alignItems: 'baseline' }}>
               <span style={{ fontSize: '48px', fontWeight: '800', color: '#0F172A', lineHeight: '1', letterSpacing: '-1px' }}>
                 {dashboardData.average_accuracy} <span style={{ fontSize: '36px' }}>%</span>
               </span>
               <span style={{ fontSize: '18px', fontWeight: '600', color: '#475569', marginLeft: '12px' }}>Akurasi</span>
            </div>
          </div>

          {/* Card 3: Modul Diselesaikan */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <IconChartLineWhite />
               </div>
               <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginLeft: '16px' }}>Modul Selesai</span>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', alignItems: 'baseline' }}>
               <span style={{ fontSize: '48px', fontWeight: '800', color: '#0F172A', lineHeight: '1', letterSpacing: '-1px' }}>
                 {dashboardData.completed_modules}
               </span>
               <span style={{ fontSize: '18px', fontWeight: '600', color: '#475569', marginLeft: '12px' }}>Modul</span>
            </div>
          </div>

        </div>

        {/* SECTION 3: GRAFIK AKTIVITAS MINGGUAN */}
        <div style={{ backgroundColor: '#FFFFFF', padding: isMobile ? '24px 16px' : '40px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', width: '100%' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>Grafik Aktivitas Mingguan</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', fontWeight: '500' }}>Arahkan kursor ke grafik batang untuk melihat siapa saja murid yang aktif belajar.</p>
          </div>
          
          <div style={{ width: '100%', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weekly_activity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94A3B8', fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94A3B8', fontWeight: 600 }} dx={-15} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#F1F5F9', opacity: 0.6 }} content={<CustomTooltip />} />
                <Bar dataKey="skor" fill="#0F172A" radius={[6, 6, 0, 0]} barSize={isMobile ? 24 : 40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 4: LOG AKTIVITAS BAWAH (Disempurnakan ke Enterprise UI) */}
        <div style={{ display: 'grid', gridTemplateColumns: gridLogs, gap: '24px' }}>
          
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: isMobile ? '24px' : '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Log Penyelesaian Modul</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {dashboardData.learning_logs.length > 0 ? (
                dashboardData.learning_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{log.module}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '12px', color: '#0F172A', fontWeight: '700', backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '6px' }}>{log.studentName}</span>
                        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>{log.date}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: log.score >= 90 ? '#10B981' : '#0F172A' }}>{log.score}%</span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Akurasi AI</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '14px', color: '#94A3B8', textAlign: 'center', padding: '40px 0', fontWeight: '600' }}>Belum ada modul yang diselesaikan murid.</p>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: isMobile ? '24px' : '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Riwayat Pencapaian Quest</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {dashboardData.quest_logs.length > 0 ? (
                dashboardData.quest_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{log.quest}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '12px', color: '#D97706', fontWeight: '700', backgroundColor: '#FFFBEB', padding: '4px 10px', borderRadius: '6px' }}>{log.studentName}</span>
                        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>{log.date}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEF3C7', padding: '8px 14px', borderRadius: '10px' }}>
                      <IconStarOrange />
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#B45309' }}>+{log.reward}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '14px', color: '#94A3B8', textAlign: 'center', padding: '40px 0', fontWeight: '600' }}>Belum ada quest yang diselesaikan.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL RINCIAN BINTANG (UPGRADED UI) --- */}
      {isStarModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden', animation: 'scaleUp 0.2s ease-out' }}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#F8FAFC' }}>
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Penerima Bintang Hari Ini</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Daftar murid yang Anda berikan nilai pada hari ini.</p>
              </div>
              <button onClick={() => setIsStarModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', transition: 'color 0.2s', padding: '4px' }} onMouseOver={(e) => e.currentTarget.style.color = '#0F172A'} onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}>
                <IconClose />
              </button>
            </div>
            
            <div style={{ padding: '24px', maxHeight: '50vh', overflowY: 'auto' }}>
              {dashboardData.today_star_receivers && dashboardData.today_star_receivers.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dashboardData.today_star_receivers.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: '800' }}>
                           {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '15px' }}>{item.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontWeight: '800', backgroundColor: '#FFFBEB', padding: '6px 12px', borderRadius: '99px' }}>
                        <IconStarOrange /> +{item.stars}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#FFFBEB', borderRadius: '50%', marginBottom: '16px', color: '#D97706' }}>
                    <IconStarOrange />
                  </div>
                  <p style={{ color: '#0F172A', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>Belum ada bintang diberikan</p>
                  <p style={{ color: '#64748B', fontSize: '14px', margin: 0, fontWeight: '500' }}>Evaluasi murid Anda untuk menambahkan bintang hari ini.</p>
                </div>
              )}
            </div>
            
            <div style={{ padding: '20px 24px', borderTop: '1px solid #F1F5F9', backgroundColor: '#F8FAFC', textAlign: 'right' }}>
               <button onClick={() => setIsStarModalOpen(false)} style={{ padding: '12px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E293B'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}>
                 Tutup Layar
               </button>
            </div>
            
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}