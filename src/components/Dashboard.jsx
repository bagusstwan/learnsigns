import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/** Icon SVG Assets */
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
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

/** Additional Icons for Right Panel */
const IconListTask = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
const IconProgress = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconCheckEval = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconArrowOut = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const IconClipboard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;

export default function Dashboard({ setSelectedLevel, isMobile, isDesktop }) {
  
  /** Tab States for Main Left Panel */
  const [activeTab, setActiveTab] = useState('tugas_berjalan');
  
  /** Feature States for Layout View Mode Filter and Sort */
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('terbaru');
  
  /** Popup Visibility States */
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  /** Refs for Outside Click Detection */
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  /** States for Right Panel Evaluation Tabs */
  const [activeEvalTab, setActiveEvalTab] = useState('perlu_dinilai');
  
  /** States for Modal Detail Document */
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAssignmentDetail, setSelectedAssignmentDetail] = useState(null);

  /** API and Data Management States */
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: { active_students: 0, completed_modules: 0, pending_evaluations: 0 },
    active_modules: [],
    pending_students: []
  });

  /** Calendar Mechanism Configuration */
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

  /** Database Initialization Effect */
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
        console.error("Network Connectivity Issue:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /** Click Outside Detectors for Dropdowns */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) setIsFilterOpen(false);
      if (sortRef.current && !sortRef.current.contains(event.target)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Evaluates and processes data for the Main Module Section based on the selected tab filter and sorting criteria
   */
  const getProcessedModules = () => {
    if (activeTab === 'riwayat') return [];
    
    let processedList = dashboardData.active_modules || [];

    if (filterType !== 'Semua') {
      processedList = processedList.filter(mod => mod.level === filterType);
    }

    if (sortOrder === 'a-z') {
      processedList = [...processedList].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'z-a') {
      processedList = [...processedList].sort((a, b) => b.title.localeCompare(a.title));
    }

    return processedList;
  };

  /**
   * Filters pending students strictly based on the active evaluation tab selection
   */
  const getFilteredPendingStudents = () => {
    if (!dashboardData.pending_students) return [];
    if (activeEvalTab === 'selesai') return []; 
    if (activeEvalTab === 'berjalan') {
      return dashboardData.pending_students.filter(student => student.status === 'Belum Dikerjakan' || student.status === 'Sedang Dikerjakan');
    }
    return dashboardData.pending_students.filter(student => student.status === 'Menunggu Penilaian' || student.status === 'Belum Dinilai');
  };

  const EmptyState = ({ title, message, iconType = 'default' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', backgroundColor: '#FFFFFF', border: '1px dashed #CBD5E1', borderRadius: '16px', textAlign: 'center' }}>
      {iconType === 'clear' ? <IconCheckEval /> : <IconEmptyState />}
      <h4 style={{ margin: '16px 0 8px 0', fontSize: '16px', fontWeight: '500', color: '#0F172A' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: '400', color: '#64748B', maxWidth: '300px', lineHeight: '1.6' }}>{message}</p>
    </div>
  );

  const openAssignmentModal = (studentData) => {
    setSelectedAssignmentDetail(studentData);
    setIsDetailModalOpen(true);
  };

  const closeAssignmentModal = () => {
    setSelectedAssignmentDetail(null);
    setIsDetailModalOpen(false);
  };

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

  const displayedModules = getProcessedModules();
  const filteredStudents = getFilteredPendingStudents();

  return (
    <>
    <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', width: '100%', minHeight: '100vh', backgroundColor: '#F8FAFC', boxSizing: 'border-box' }}>
      
      <main style={{ flex: 1, padding: isMobile ? '24px 16px' : '40px 48px', overflowY: 'auto', boxSizing: 'border-box' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ margin: '8px 0', fontSize: isMobile ? '28px' : '36px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>
            Tinjauan Akademik Kelas
          </h1>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '400', color: '#475569', lineHeight: '1.6', maxWidth: '600px' }}>
            Pantau aktivitas belajar siswa, evaluasi pencapaian modul, dan kelola penugasan bahasa isyarat harian dari satu tempat.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '100%' : '220px'}, 1fr))`, gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}><IconUsers /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.active_students || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Total Siswa Aktif</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}><IconCheckCircle /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.completed_modules || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Modul Diselesaikan</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}><IconTrophy /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0F172A', lineHeight: '1.1' }}>{dashboardData.stats.pending_evaluations || 0}</h3>
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B', display: 'block', marginTop: '4px' }}>Evaluasi Tertunda</span>
            </div>
          </div>
        </div>

        {/** Tab Selection and Feature Controls */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '16px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '999px', padding: '6px', border: '1px solid #E2E8F0', width: 'fit-content' }}>
            <button 
              onClick={() => setActiveTab('tugas_berjalan')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 24px', borderRadius: '999px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'tugas_berjalan' ? '#0F172A' : 'transparent', color: activeTab === 'tugas_berjalan' ? '#FFFFFF' : '#64748B' }}
            >
              Tugas Berjalan 
              {activeTab === 'tugas_berjalan' && (
                <span style={{ backgroundColor: '#FFFFFF', color: '#0F172A', padding: '2px 8px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                  {dashboardData.active_modules?.length || 0}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('riwayat')}
              style={{ padding: '8px 24px', borderRadius: '999px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'riwayat' ? '#0F172A' : 'transparent', color: activeTab === 'riwayat' ? '#FFFFFF' : '#64748B' }}
            >
              Riwayat Modul
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: isMobile ? 'space-between' : 'flex-end', flexWrap: 'wrap' }}>
            
            {/** View Mode Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '4px' }}>
              <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'grid' ? '#0F172A' : 'transparent', color: viewMode === 'grid' ? '#FFFFFF' : '#94A3B8', cursor: 'pointer', display: 'flex', transition: '0.2s' }}><IconGrid /></button>
              <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'list' ? '#0F172A' : 'transparent', color: viewMode === 'list' ? '#FFFFFF' : '#94A3B8', cursor: 'pointer', display: 'flex', transition: '0.2s' }}><IconList /></button>
            </div>
            
            {/** Filter Button Dropdown */}
            <div ref={filterRef} style={{ position: 'relative' }}>
              <button onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '42px', backgroundColor: isFilterOpen ? '#F1F5F9' : '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#0F172A', cursor: 'pointer', transition: '0.2s' }}>
                <IconFilter /> {filterType === 'Semua' ? 'Filter' : filterType.replace('Modul ', '')}
              </button>
              {isFilterOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', zIndex: 10, width: '180px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', animation: 'fadeIn 0.2s' }}>
                  <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Pilih Kategori</div>
                  {['Semua', 'Modul Dasar', 'Modul Menengah'].map(opt => (
                    <div key={opt} onClick={() => { setFilterType(opt); setIsFilterOpen(false); }} style={{ padding: '10px 12px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600', backgroundColor: filterType === opt ? '#F8FAFC' : 'transparent', color: filterType === opt ? '#0F172A' : '#475569', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.backgroundColor = filterType === opt ? '#F8FAFC' : 'transparent'}>
                      {opt === 'Modul Dasar' ? 'Modul Abjad' : opt === 'Modul Menengah' ? 'Modul Kosa Kata' : opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/** Sort Button Dropdown */}
            <div ref={sortRef} style={{ position: 'relative' }}>
              <button onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '42px', backgroundColor: isSortOpen ? '#F1F5F9' : '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#0F172A', cursor: 'pointer', transition: '0.2s' }}>
                <IconSort /> {sortOrder === 'terbaru' ? 'Urutkan' : sortOrder === 'a-z' ? 'A - Z' : 'Z - A'}
              </button>
              {isSortOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', zIndex: 10, width: '180px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', animation: 'fadeIn 0.2s' }}>
                  <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Metode Urutan</div>
                  {[ {val: 'terbaru', label: 'Terbaru Ditambahkan'}, {val: 'a-z', label: 'Abjad A - Z'}, {val: 'z-a', label: 'Abjad Z - A'} ].map(opt => (
                    <div key={opt.val} onClick={() => { setSortOrder(opt.val); setIsSortOpen(false); }} style={{ padding: '10px 12px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600', backgroundColor: sortOrder === opt.val ? '#F8FAFC' : 'transparent', color: sortOrder === opt.val ? '#0F172A' : '#475569', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.backgroundColor = sortOrder === opt.val ? '#F8FAFC' : 'transparent'}>
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/** Modules Display Area respecting Grid and List mode variables */}
        {displayedModules.length > 0 ? (
          <div style={{ 
            display: viewMode === 'grid' ? 'grid' : 'flex', 
            flexDirection: viewMode === 'list' ? 'column' : 'unset',
            gridTemplateColumns: viewMode === 'grid' ? `repeat(auto-fill, minmax(${isMobile ? '100%' : '320px'}, 1fr))` : 'none', 
            gap: '24px' 
          }}>
            {displayedModules.map((mod, index) => (
              <div key={index} style={{ 
                backgroundColor: '#FFFFFF', borderRadius: '16px', padding: viewMode === 'list' && !isMobile ? '20px 24px' : '24px', border: '1px solid #E2E8F0', 
                display: 'flex', flexDirection: viewMode === 'list' && !isMobile ? 'row' : 'column', 
                alignItems: viewMode === 'list' && !isMobile ? 'center' : 'stretch', justifyContent: 'space-between',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.02)', gap: viewMode === 'list' && !isMobile ? '20px' : '0' 
              }}>
                
                {/** Column 1 Icon and Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: viewMode === 'list' && !isMobile ? '0' : '20px', flex: viewMode === 'list' && !isMobile ? '0 0 28%' : 'auto', minWidth: 0 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{mod.level || 'Modul'}</span>
                    <h3 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: '#0F172A', whiteSpace: viewMode === 'list' && !isMobile ? 'nowrap' : 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title || 'Judul Penugasan'}</h3>
                  </div>
                </div>

                {/** Column 2 Tags */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: viewMode === 'list' && !isMobile ? '0' : '16px', flexWrap: 'wrap', flex: viewMode === 'list' && !isMobile ? '0 0 15%' : 'auto' }}>
                  {(mod.tags || ['Pemula', 'Wajib']).map((tag, idx) => (
                    <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#F1F5F9', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#475569', whiteSpace: 'nowrap' }}>{tag}</span>
                  ))}
                </div>

                {/** Column 3 Description */}
                <div style={{ margin: viewMode === 'list' && !isMobile ? '0' : '0 0 24px 0', flex: viewMode === 'list' && !isMobile ? '1 1 auto' : 'auto', paddingRight: viewMode === 'list' && !isMobile ? '20px' : '0' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#64748B', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: viewMode === 'list' && !isMobile ? 2 : 'unset', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {mod.desc || 'Pantau tingkat akurasi siswa dalam memperagakan gestur tangan ini menggunakan deteksi sensor AI.'}
                  </p>
                </div>

                {/** Column 4 Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: viewMode === 'grid' && !isMobile ? 'auto' : '0', flex: viewMode === 'list' && !isMobile ? '0 0 15%' : 'auto', justifyContent: viewMode === 'list' && !isMobile ? 'flex-end' : 'flex-start', flexShrink: 0 }}>
                  <button onClick={() => setSelectedLevel(mod.level_key || 'huruf')} style={{ width: '100%', flex: viewMode === 'grid' || isMobile ? 1 : 'none', padding: '12px 16px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    Tinjau Progres
                  </button>
                  {viewMode === 'grid' && (
                    <button style={{ flex: 1, padding: '12px 16px', backgroundColor: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s', textAlign: 'center' }}>
                      Edit
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title={activeTab === 'riwayat' ? "Belum Ada Riwayat Modul" : "Modul Tidak Ditemukan"} 
            message={activeTab === 'riwayat' ? "Belum ada riwayat pengerjaan modul atau tugas yang selesai direkam di sistem." : "Tidak ada penugasan aktif yang sesuai dengan kriteria filter Anda saat ini."} 
          />
        )}

      </main>

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
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', textTransform: 'capitalize' }}>{currentMonthYear}</span>
        </div>

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

        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '32px' }}>
          <button onClick={() => setActiveEvalTab('perlu_dinilai')} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: activeEvalTab === 'perlu_dinilai' ? '600' : '500', color: activeEvalTab === 'perlu_dinilai' ? '#0F172A' : '#94A3B8', cursor: 'pointer', position: 'relative', background: 'none', border: 'none', padding: 0 }}>
            <IconListTask /> Perlu Dinilai
            {activeEvalTab === 'perlu_dinilai' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '3px', backgroundColor: '#0F172A', borderRadius: '3px 3px 0 0' }}></div>}
          </button>
          
          <button onClick={() => setActiveEvalTab('berjalan')} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: activeEvalTab === 'berjalan' ? '600' : '500', color: activeEvalTab === 'berjalan' ? '#0F172A' : '#94A3B8', cursor: 'pointer', position: 'relative', background: 'none', border: 'none', padding: 0 }}>
            <IconProgress /> Berjalan
            {activeEvalTab === 'berjalan' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '3px', backgroundColor: '#0F172A', borderRadius: '3px 3px 0 0' }}></div>}
          </button>
          
          <button onClick={() => setActiveEvalTab('selesai')} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: activeEvalTab === 'selesai' ? '600' : '500', color: activeEvalTab === 'selesai' ? '#0F172A' : '#94A3B8', cursor: 'pointer', position: 'relative', background: 'none', border: 'none', padding: 0 }}>
            <IconCheckEval /> Selesai
            {activeEvalTab === 'selesai' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '3px', backgroundColor: '#0F172A', borderRadius: '3px 3px 0 0' }}></div>}
          </button>
        </div>

        {filteredStudents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredStudents.map((student, index) => (
              <div key={index} style={{ border: '1px solid #E2E8F0', borderRadius: '20px', padding: '24px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || 'Student')}&background=F1F5F9&color=0F172A`} alt={student.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>{student.name || 'Nama Siswa'}</h4>
                      <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '400' }}>{student.email || 'Email tidak tersedia'}</span>
                    </div>
                  </div>
                  <button onClick={() => openAssignmentModal(student)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#64748B', transition: 'all 0.2s' }} className="arrow-out-btn">
                    <IconArrowOut />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Tingkat Akurasi</span>
                    <span style={{ fontSize: '15px', fontWeight: '500', color: student.accuracy && student.accuracy !== '0%' ? '#10B981' : '#64748B' }}>
                      {student.accuracy || '0%'} Valid
                    </span>
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
            title={activeEvalTab === 'selesai' ? "Clear Semua!" : activeEvalTab === 'berjalan' ? "Tidak Ada Tugas Berjalan" : "Pekerjaan Selesai!"}
            message={activeEvalTab === 'selesai' ? "Kerja bagus, semua tugas di tab ini sudah bersih." : activeEvalTab === 'berjalan' ? "Saat ini tidak ada siswa yang sedang mengerjakan penugasan baru." : "Hore! Semua tugas siswa telah Anda nilai atau belum ada kiriman baru."} 
            iconType={activeEvalTab === 'selesai' ? 'clear' : 'default'}
          />
        )}

      </aside>

    </div>

    {isDetailModalOpen && selectedAssignmentDetail && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s' }} onClick={closeAssignmentModal}>
            <div style={{ backgroundColor: '#FFFFFF', width: isMobile ? '90%' : '480px', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)', position: 'relative', animation: 'scaleUp 0.2s' }} onClick={e => e.stopPropagation()}>
                
                <button onClick={closeAssignmentModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}><IconClose /></button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                    <img src={selectedAssignmentDetail.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAssignmentDetail.name || 'Student')}&background=F1F5F9&color=0F172A&size=64`} alt={selectedAssignmentDetail.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#0F172A' }}>{selectedAssignmentDetail.name}</h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748B' }}>Detail Penugasan Terkini</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #C7D2FE' }}><IconClipboard/></div>
                        <div>
                            <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Judul Modul</span>
                            <span style={{ fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>{selectedAssignmentDetail.active_module || '-'}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #6EE7B7' }}><IconCheckEval/></div>
                        <div>
                            <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Akurasi</span>
                            <span style={{ fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>Minimal {selectedAssignmentDetail.target || '90% Valid'}</span>
                        </div>
                    </div>
                    
                    <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '8px 0' }}></div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Catatan Penugasan</span>
                        <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>{selectedAssignmentDetail.notes || 'Fokus pada kelancaran gerakan tangan untuk abjad S, I, dan B. Jaga pencahayaan saat merekam.'}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Status Saat Ini</span>
                        <span style={{ padding: '6px 12px', backgroundColor: '#FEF3C7', borderRadius: '99px', fontSize: '12px', fontWeight: '600', color: '#D97706' }}>
                           {selectedAssignmentDetail.status || 'Menunggu Penilaian'}
                        </span>
                    </div>

                </div>

                <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                    <button onClick={closeAssignmentModal} style={{ flex: 1, padding: '14px', backgroundColor: '#FFFFFF', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Batal</button>
                    <button onClick={() => { closeAssignmentModal(); alert('Fitur evaluasi akan segera hadir Pak Bagus!'); }} style={{ flex: 2, padding: '14px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Mulai Evaluasi</button>
                </div>

            </div>
        </div>
    )}

    <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .arrow-out-btn:hover {
            border-color: #CBD5E1 !important;
            color: #0F172A !important;
            background-color: #F1F5F9 !important;
        }
    `}</style>
    </>
  );
}

Dashboard.propTypes = {
  setSelectedLevel: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};