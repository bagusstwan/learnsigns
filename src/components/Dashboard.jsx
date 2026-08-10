import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Icon SVG */
const IconTrophy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;
const IconUsers = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCheckCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconGrid = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconList = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconFilter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const IconSort = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const IconClock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconEmptyState = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>;
const IconChevronLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function Dashboard({ setSelectedLevel, isMobile, isDesktop }) {
  const [activeTab, setActiveTab] = useState('tugas_berjalan');
  
  /* State data API */
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: { active_students: 0, completed_modules: 0, pending_evaluations: 0 },
    active_modules: [],
    pending_students: []
  });

  /* Logic untuk rentetan tanggal */
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarStart, setCalendarStart] = useState(() => {
      const d = new Date(today);
      d.setDate(d.getDate() - 2);
      return d;
  });

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handlePrevDays = () => setCalendarStart(addDays(calendarStart, -5));
  const handleNextDays = () => setCalendarStart(addDays(calendarStart, 5));

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  const currentMonthYear = calendarStart.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  /* Logic Pengambilan Data (Fetch API) */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
        
        const response = await fetch(`${API_BASE_URL}/educator/dashboard-summary`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.status === 'success') {
            setDashboardData(result.data);
          }
        }
      } catch (error) {
        console.error("Terjadi kesalahan jaringan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const EmptyState = ({ title, message }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', backgroundColor: '#FFFFFF', border: '1px dashed #CBD5E1', borderRadius: '16px', textAlign: 'center' }}>
      <IconEmptyState />
      <h4 style={{ margin: '16px 0 8px 0', fontSize: '16px', fontWeight: '500', color: '#0F172A' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: '400', color: '#64748B', maxWidth: '300px' }}>{message}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: '#F8FAFC' }}>
        <div style={{ color: '#0F172A', fontSize: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <span className="loader"></span> Memuat Data Dasbor...
           <style>{`
             .loader { width: 20px; height: 20px; border: 3px solid #E2E8F0; border-bottom-color: #0F172A; border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; }
             @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
           `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: isDesktop ? 'row' : 'column', 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#F8FAFC',
      boxSizing: 'border-box'
    }}>
      
      {/* Arean Konten Utama */}
      <main style={{ 
        flex: 1, 
        padding: isMobile ? '24px 16px' : '40px 48px', 
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{ fontSize: '14px', fontWeight: '400', color: '#64748B', fontStyle: 'italic' }}>Pusat Kendali Pendidik</span>
          <h1 style={{ margin: '8px 0', fontSize: isMobile ? '28px' : '36px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>
            Tinjauan Akademik Kelas
          </h1>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '400', color: '#475569', lineHeight: '1.6', maxWidth: '600px' }}>
            Pantau aktivitas belajar siswa, evaluasi pencapaian modul, dan kelola penugasan bahasa isyarat harian dari satu tempat.
          </p>
        </div>

        {/* Card Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '100%' : '220px'}, 1fr))`, 
          gap: '24px', 
          marginBottom: '48px' 
        }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <IconUsers />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.active_students || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Total Siswa Aktif</span>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <IconCheckCircle />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.completed_modules || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Modul Diselesaikan</span>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <IconTrophy />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.pending_evaluations || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Evaluasi Tertunda</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '16px', marginBottom: '32px' }}>
          
          {/* Tabs Container - Capsule Shape */}
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '999px', padding: '6px', border: '1px solid #E2E8F0', width: 'fit-content' }}>
            <button 
              onClick={() => setActiveTab('tugas_berjalan')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 24px', borderRadius: '999px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'tugas_berjalan' ? '#0F172A' : 'transparent', color: activeTab === 'tugas_berjalan' ? '#FFFFFF' : '#64748B' }}
            >
              Tugas Berjalan 
              <span style={{ backgroundColor: activeTab === 'tugas_berjalan' ? '#FFFFFF' : '#CBD5E1', color: activeTab === 'tugas_berjalan' ? '#0F172A' : '#475569', padding: '2px 8px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                {dashboardData.active_modules?.length || 0}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('riwayat')}
              style={{ padding: '8px 24px', borderRadius: '999px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'riwayat' ? '#0F172A' : 'transparent', color: activeTab === 'riwayat' ? '#FFFFFF' : '#64748B' }}
            >
              Riwayat Modul
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
            <div style={{ display: 'flex', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '4px' }}>
              <button style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', cursor: 'pointer', display: 'flex' }}><IconGrid /></button>
              <button style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}><IconList /></button>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '42px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
              <IconFilter /> Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '42px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
              <IconSort /> Urutkan
            </button>
          </div>
        </div>

        {/* Active Modules */}
        {dashboardData.active_modules?.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '100%' : '320px'}, 1fr))`, gap: '24px' }}>
            {dashboardData.active_modules.map((mod, index) => (
              <div key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '500', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{mod.level || 'Modul'}</span>
                    <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600', color: '#0F172A' }}>{mod.title || 'Judul Penugasan'}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {(mod.tags || ['Pemula', 'Wajib']).map((tag, idx) => (
                    <span key={idx} style={{ padding: '6px 12px', backgroundColor: '#F1F5F9', borderRadius: '8px', fontSize: '12px', fontWeight: '500', color: '#475569' }}>{tag}</span>
                  ))}
                </div>

                <p style={{ margin: '0 0 24px 0', fontSize: '14px', fontWeight: '400', color: '#64748B', lineHeight: '1.6', flex: 1 }}>
                  {mod.desc || 'Pantau tingkat akurasi siswa dalam memperagakan gestur tangan ini menggunakan deteksi sensor AI.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                  <button 
                    onClick={() => setSelectedLevel(mod.level_key || 'huruf')} 
                    style={{ flex: 1, padding: '14px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s' }}
                  >
                    Tinjau Progres
                  </button>
                  <button style={{ flex: 1, padding: '14px', backgroundColor: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s' }}>
                    Edit Penugasan
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Belum Ada Penugasan Aktif" 
            message="Anda belum mendelegasikan tugas atau modul apapun kepada siswa di kelas ini." 
          />
        )}

      </main>

      {/* Panel Jadwal Evaluasi */}
      <aside style={{ 
        width: isDesktop ? '400px' : '100%', 
        backgroundColor: '#FFFFFF', 
        borderLeft: isDesktop ? '1px solid #E2E8F0' : 'none',
        borderTop: !isDesktop ? '1px solid #E2E8F0' : 'none',
        padding: '40px 32px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        
        <h2 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: '800', color: '#0F172A' }}>Jadwal Evaluasi</h2>
        
        {/* Indikator Bulan dan Tahun */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', textTransform: 'capitalize' }}>{currentMonthYear}</span>
        </div>

        {/* Kalendar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
           <button onClick={handlePrevDays} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px', display: 'flex' }}><IconChevronLeft /></button>
           
           {Array.from({length: 5}).map((_, i) => {
              const currentDay = addDays(calendarStart, i);
              const isActive = isSameDay(currentDay, selectedDate);
              const dayName = currentDay.toLocaleDateString('en-US', { weekday: 'short' });
              const dateNumber = currentDay.toLocaleDateString('id-ID', { day: '2-digit' });

              return (
                 <div 
                    key={i} 
                    onClick={() => setSelectedDate(currentDay)}
                    style={{ 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        backgroundColor: isActive ? '#0F172A' : 'transparent', 
                        color: isActive ? '#FFFFFF' : '#0F172A', 
                        padding: '12px 14px', 
                        borderRadius: '16px',
                        boxShadow: isActive ? '0 8px 16px -4px rgba(15, 23, 42, 0.3)' : 'none',
                        transition: 'all 0.2s ease'
                    }}
                 >
                    <div style={{ fontSize: '12px', fontWeight: '400', color: isActive ? 'rgba(255,255,255,0.8)' : '#64748B', marginBottom: '4px' }}>{dayName}</div>
                    <div style={{ fontSize: '18px', fontWeight: '500' }}>{dateNumber}</div>
                 </div>
              )
           })}

           <button onClick={handleNextDays} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px', display: 'flex' }}><IconChevronRight /></button>
        </div>

        {/* Tabs Evaluasi */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#0F172A', cursor: 'pointer', position: 'relative' }}>
            <IconTrophy /> Perlu Dinilai
            <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '3px', backgroundColor: '#0F172A', borderRadius: '3px 3px 0 0' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '400', color: '#94A3B8', cursor: 'pointer' }}>
            <IconTrophy /> Berjalan
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '400', color: '#94A3B8', cursor: 'pointer' }}>
            <IconTrophy /> Selesai
          </div>
        </div>

        {/* Daftar Siswa */}
        {dashboardData.pending_students?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {dashboardData.pending_students.map((student, index) => (
              <div key={index} style={{ border: '1px solid #E2E8F0', borderRadius: '20px', padding: '24px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || 'Student')}&background=F1F5F9&color=0F172A`} alt={student.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>{student.name || 'Nama Siswa'}</h4>
                      <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '400' }}>{student.email || 'Email tidak tersedia'}</span>
                    </div>
                  </div>
                  <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#64748B' }}>↗</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Tingkat Akurasi</span>
                    <span style={{ fontSize: '15px', fontWeight: '500', color: '#10B981' }}>{student.accuracy || '0%'} Valid</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Modul Aktif</span>
                    <span style={{ fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>{student.active_module || '-'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '13px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
                    <IconClock /> Pengingat
                  </button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '500', color: '#FFFFFF', cursor: 'pointer' }}>
                    <IconCheck /> Penilaian
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Belum Ada Evaluasi" 
            message="Semua tugas siswa telah dinilai atau belum ada rekaman evaluasi yang dikirim." 
          />
        )}

      </aside>

    </div>
  );
}

Dashboard.propTypes = {
  setSelectedLevel: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};