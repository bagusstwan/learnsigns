import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

/* Ikon  */
const IconTrendingUp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconCheckCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconBook = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const IconTarget = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;

export default function ProgressPage() {
  /* Sistem Pendeteksi Ukuran Layar */
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

  /* STATE MANAGEMENT API */
  const [dashboardData, setDashboardData] = useState({
    total_stars: 0,
    average_accuracy: 0,
    completed_modules: 0,
    weekly_activity: [],
    learning_logs: [],
    quest_logs: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

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
          setApiError("Gagal mengambil data dari server.");
        }
      } catch (err) {
        setApiError("Koneksi ke server terputus.");
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [API_BASE_URL, token]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#111827', padding: '8px 12px', borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: 0, color: '#FFFFFF', fontSize: '13px', fontWeight: '600' }}>{label}</p>
          <p style={{ margin: '4px 0 0 0', color: '#F3F4F6', fontSize: '12px' }}>
            Skor: <span style={{ fontWeight: '800', color: '#10B981' }}>{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Memuat data perkembangan Anda...</p>
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
        
        {/* HEADER */}
        <div style={{ boxSizing: 'border-box' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '24px' : '28px', fontWeight: '800', letterSpacing: '-0.8px', color: '#111827' }}>
            Monitoring Perkembangan
          </h2>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>
            Pantau statistik akurasi, perolehan bintang, dan riwayat aktivitas pembelajaran Anda secara real-time.
          </p>
        </div>

        {/* STATS KARTU (DATA DINAMIS) */}
        <div style={{ display: 'grid', gridTemplateColumns: gridStats, gap: '20px', boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bintang</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#FFFBEB' }}><IconStar /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.total_stars.toLocaleString('id-ID')}
            </h3>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rata-rata Akurasi</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#ECFDF5' }}><IconCheckCircle /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.average_accuracy}%
            </h3>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Modul Selesai</span>
              <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB' }}><IconTrendingUp /></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827' }}>
              {dashboardData.completed_modules} <span style={{ fontSize: '16px', fontWeight: '500', color: '#9CA3AF' }}>modul</span>
            </h3>
          </div>
        </div>

        {/* GRAFIK RECHARTS */}
        <div style={{ backgroundColor: '#FFFFFF', padding: isMobile ? '24px 16px' : '32px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', width: '100%', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#111827' }}>Grafik Aktivitas Mingguan</h3>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Skor performa berdasarkan latihan 7 hari terakhir.</span>
          </div>
          
          <div style={{ width: '100%', height: '280px', boxSizing: 'border-box', minWidth: 0, overflow: 'hidden' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weekly_activity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dx={-10} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#F9FAFB' }} content={<CustomTooltip />} />
                <Bar dataKey="skor" fill="#111827" radius={[4, 4, 0, 0]} barSize={isMobile ? 24 : 36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LOGS LIST */}
        <div style={{ display: 'grid', gridTemplateColumns: gridLogs, gap: '24px', boxSizing: 'border-box', minWidth: 0 }}>
          
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '20px' : '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ color: '#6B7280' }}><IconBook /></div>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Log Pembelajaran</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dashboardData.learning_logs.length > 0 ? (
                dashboardData.learning_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ minWidth: 0, paddingRight: '8px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.module}</h4>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{log.date}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: log.score >= 90 ? '#10B981' : '#111827' }}>{log.score}%</span>
                      <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>Akurasi</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '20px 0' }}>Belum ada log pembelajaran.</p>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '20px' : '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ color: '#6B7280' }}><IconTarget /></div>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Riwayat Quest</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dashboardData.quest_logs.length > 0 ? (
                dashboardData.quest_logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ minWidth: 0, paddingRight: '8px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.quest}</h4>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{log.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFBEB', padding: '4px 10px', borderRadius: '6px', flexShrink: 0 }}>
                      <IconStar />
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#B45309' }}>+{log.reward}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '20px 0' }}>Belum ada quest yang diselesaikan.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}