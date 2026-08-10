import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

/* Komponen Ikon Vektor */
const IconTrendingUp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconCheckCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconBook = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const IconTarget = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconUser = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export default function ProgressPage() {
  /* Sistem Pendeteksi Ukuran Layar Dinamis */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobile = windowWidth < 768;

  const paddingMain = isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px';
  const gridStats = isMobile ? '1fr' : 'repeat(3, 1fr)';
  const gridLogs = isDesktop ? '1fr 1fr' : '1fr';

  /* Manajemen State Data Aplikasi */
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
  
  /* State Pengendali Modal Bintang */
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
        console.error("Kesalahan pengambilan data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [API_BASE_URL, token]);

  /* Kustomisasi Tooltip Recharts Untuk Menampilkan Murid Aktif */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dayData = payload[0].payload;
      const activeStudents = dayData.active_students || [];

      return (
        <div style={{ backgroundColor: '#111827', padding: '14px', borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#FFFFFF', fontSize: '14px', fontWeight: '700' }}>Hari {label}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#1F2937', padding: '10px', borderRadius: '6px' }}>
            <span style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Daftar Murid Aktif</span>
            {activeStudents.length > 0 ? (
              activeStudents.map((name, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontSize: '12px', fontWeight: '600' }}>
                  <IconUser /> {name}
                </div>
              ))
            ) : (
              <span style={{ color: '#6B7280', fontSize: '12px', fontStyle: 'italic' }}>Tidak ada aktivitas</span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Memuat data pemantauan...</p>
         <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (apiError) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <p style={{ color: '#DC2626', fontWeight: '600', backgroundColor: '#FEF2F2', padding: '16px 24px', borderRadius: '8px', border: '1px solid #FCA5A5' }}>{apiError}</p>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: paddingMain, boxSizing: 'border-box', minWidth: 0 }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
        
        <div style={{ boxSizing: 'border-box' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '24px' : '28px', fontWeight: '800', letterSpacing: '-0.8px', color: '#111827' }}>
            Monitoring Perkembangan Murid
          </h2>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>
            Pantau statistik akurasi, akumulasi perolehan bintang, dan riwayat aktivitas seluruh murid Anda.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: gridStats, gap: '20px', boxSizing: 'border-box' }}>
          
          {/* Kartu Bintang Interaktif */}
          <div 
            onClick={() => setIsStarModalOpen(true)}
            style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(245, 158, 11, 0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)'; }}
            title="Klik untuk melihat rincian perolehan bintang"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bintang Murid</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#FFFBEB' }}><IconStar /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.total_stars.toLocaleString('id-ID')}
            </h3>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#D97706', fontWeight: '600' }}>Klik untuk melihat rincian hari ini</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rata-rata Akurasi</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#ECFDF5' }}><IconCheckCircle /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.average_accuracy}%
            </h3>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Modul Diselesaikan</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB' }}><IconTrendingUp /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.completed_modules} <span style={{ fontSize: '16px', fontWeight: '500', color: '#9CA3AF' }}>modul</span>
            </h3>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: isMobile ? '24px 16px' : '32px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', width: '100%', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#111827' }}>Grafik Aktivitas Mingguan</h3>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Arahkan kursor ke grafik batang untuk melihat siapa saja murid yang aktif belajar.</span>
          </div>
          
          <div style={{ width: '100%', height: '280px', boxSizing: 'border-box', minWidth: 0, overflow: 'hidden' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weekly_activity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dx={-10} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#F3F4F6', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="skor" fill="#111827" radius={[6, 6, 0, 0]} barSize={isMobile ? 24 : 36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: gridLogs, gap: '24px', boxSizing: 'border-box', minWidth: 0 }}>
          
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '20px' : '28px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ color: '#6B7280' }}><IconBook /></div>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Log Penyelesaian Modul</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dashboardData.learning_logs.length > 0 ? (
                dashboardData.learning_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ minWidth: 0, paddingRight: '8px' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.module}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: '700', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>{log.studentName}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>{log.date}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: log.score >= 90 ? '#10B981' : '#111827' }}>{log.score}%</span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Akurasi AI</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '30px 0', fontWeight: '500' }}>Belum ada modul yang diselesaikan murid.</p>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '20px' : '28px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ color: '#6B7280' }}><IconTarget /></div>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Riwayat Pencapaian Quest</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dashboardData.quest_logs.length > 0 ? (
                dashboardData.quest_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ minWidth: 0, paddingRight: '8px' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.quest}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#D97706', fontWeight: '700', backgroundColor: '#FFFBEB', padding: '2px 8px', borderRadius: '4px' }}>{log.studentName}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>{log.date}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FEF3C7', padding: '6px 12px', borderRadius: '8px', flexShrink: 0 }}>
                      <IconStar />
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#B45309' }}>+{log.reward}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '30px 0', fontWeight: '500' }}>Belum ada quest yang diselesaikan.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Modal Rincian Bintang Harian */}
      {isStarModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.5)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '420px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden', animation: 'scaleUp 0.2s ease-out' }}>
            
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#111827' }}>Penerima Bintang Hari Ini</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Daftar murid yang Anda berikan nilai hari ini.</p>
              </div>
              <button onClick={() => setIsStarModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                <IconClose />
              </button>
            </div>
            
            <div style={{ padding: '24px', maxHeight: '50vh', overflowY: 'auto' }}>
              {dashboardData.today_star_receivers && dashboardData.today_star_receivers.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dashboardData.today_star_receivers.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>
                           {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <span style={{ fontWeight: '700', color: '#111827', fontSize: '14px' }}>{item.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: '800', backgroundColor: '#FFFBEB', padding: '4px 10px', borderRadius: '20px' }}>
                        <IconStar /> +{item.stars}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ display: 'inline-flex', padding: '12px', backgroundColor: '#FEF3C7', borderRadius: '50%', marginBottom: '12px', color: '#D97706' }}>
                    <IconStar />
                  </div>
                  <p style={{ color: '#4B5563', fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Belum ada bintang diberikan</p>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', margin: 0 }}>Evaluasi murid Anda untuk menambahkan bintang hari ini.</p>
                </div>
              )}
            </div>
            
            <div style={{ padding: '16px 24px', borderTop: '1px solid #EAEAEA', backgroundColor: '#FAFAFA', textAlign: 'right' }}>
               <button onClick={() => setIsStarModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Tutup Layar</button>
            </div>
            
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </main>
  );
}