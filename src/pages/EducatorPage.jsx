import { useState, useEffect } from 'react';
import { IconUsers, IconSearch, IconFileText, IconTarget, IconPlus, IconClose } from '../components/Icons';
import AssignmentCard from '../components/AssignmentCard';
import EvaluationModal from '../components/EvaluationModal';

// Local SVG Icons for specific UI needs
const IconUsersGroup = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconSearchWhite = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconSearchGray = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconChevronLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function EducatorPage() {
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
  const layoutDirection = isDesktop ? 'row' : 'column';

  // API and Data States
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form and Interaction States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formTarget, setFormTarget] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [searchTaskQuery, setSearchTaskQuery] = useState("");
  const [activeTab, setActiveTab] = useState('Delegasi Baru');

  // Modal States
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [searchStudentQuery, setSearchStudentQuery] = useState("");
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [taskToEvaluate, setTaskToEvaluate] = useState(null);
  const [evalStars, setEvalStars] = useState(10); 
  const [evalFeedback, setEvalFeedback] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  // Fetch dashboard data on component mount
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/educator/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok && resData.status === 'success') {
        setStudents(resData.data.students || []);
        setAssignments(resData.data.assignments || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, [API_BASE_URL, token]);

  // Handle new assignment submission
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !formTitle || !formTarget) {
      alert("Mohon pilih murid dan lengkapi data tugas!"); return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/educator/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ student_id: selectedStudent.id, title: formTitle, target: formTarget, notes: formNotes })
      });
      if (response.ok) {
        setFormTitle(""); setFormTarget(""); setFormNotes(""); setSelectedStudent(null);
        fetchDashboardData(); 
      } else { alert("Gagal menyimpan tugas."); }
    } catch (err) { alert("Terjadi kesalahan koneksi server."); } finally { setIsSubmitting(false); }
  };

  // Open evaluation modal
  const openEvalModal = (task) => {
    setTaskToEvaluate(task); setEvalStars(10); setEvalFeedback(""); setIsEvalModalOpen(true);
  };

  // Handle evaluation submission
  const submitEvaluation = async (e) => {
    e.preventDefault();
    setIsEvaluating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/educator/assignments/${taskToEvaluate.id}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ stars_earned: evalStars, feedback: evalFeedback })
      });
      if (response.ok) {
        setIsEvalModalOpen(false); setTaskToEvaluate(null); fetchDashboardData(); 
      } else { alert("Gagal mengirimkan penilaian."); }
    } catch (err) { alert("Terjadi kesalahan koneksi server."); } finally { setIsEvaluating(false); }
  };

  // Filter assignments based on search query and active tab
  const getFilteredAssignments = () => {
    let filtered = assignments.filter(task => 
      task.studentName?.toLowerCase().includes(searchTaskQuery.toLowerCase()) || 
      task.title?.toLowerCase().includes(searchTaskQuery.toLowerCase())
    );

    if (activeTab === 'Riwayat Tugas') {
      filtered = filtered.filter(task => task.status === 'evaluated' || task.status === 'completed');
    } else if (activeTab === 'Monitoring') {
      filtered = filtered.filter(task => task.status === 'pending' || task.status === 'submitted');
    }
    return filtered;
  };

  const processedAssignments = getFilteredAssignments();
  
  // Pagination calculation
  const totalPages = Math.ceil(processedAssignments.length / itemsPerPage);
  const paginatedAssignments = processedAssignments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset pagination when tab or search changes
  useEffect(() => { setCurrentPage(1); }, [activeTab, searchTaskQuery]);

  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchStudentQuery.toLowerCase())
  );

  const handleSelectStudent = (student) => {
    setSelectedStudent(student); setIsStudentModalOpen(false); setSearchStudentQuery("");
  };

  // Base input styles
  const inputStyleBase = { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#0F172A', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#FFFFFF' };
  const inputStyleWithIcon = { ...inputStyleBase, paddingLeft: '44px' };
  
  const inputFocus = (e) => { e.target.style.borderColor = '#0F172A'; e.target.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.05)'; };
  const inputBlur = (e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTop: '3px solid #0F172A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '16px' }}></div>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', padding: paddingMain, boxSizing: 'border-box', backgroundColor: '#F8FAFC' }}>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* Header and Capsule Tabs */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: isMobile ? '32px' : '42px', fontWeight: '800', letterSpacing: '-1px', color: '#0F172A' }}>
            Teacher Command Center
          </h1>
          
          {/* PERBAIKAN 1: Scroll Horizontal untuk Capsule Tabs di Mobile */}
          <div 
            className="hide-scrollbar" 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              flexWrap: isMobile ? 'nowrap' : 'wrap', 
              overflowX: isMobile ? 'auto' : 'visible',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: isMobile ? '4px' : '0'
            }}
          >
            {['Delegasi Baru', 'Riwayat Tugas', 'Monitoring', 'Pengaturan'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '8px 24px', 
                  borderRadius: '999px', 
                  border: '1px solid #E2E8F0', 
                  backgroundColor: activeTab === tab ? '#0F172A' : '#FFFFFF', 
                  color: activeTab === tab ? '#FFFFFF' : '#475569', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div style={{ display: 'flex', flexDirection: layoutDirection, gap: '40px', alignItems: 'flex-start', width: '100%' }}>
          
          {/* Left Column: Form (Sticky on Desktop) */}
          {activeTab === 'Delegasi Baru' ? (
            <div style={{ 
              flex: isDesktop ? '1.1' : 'none', 
              width: '100%', 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '24px', 
              padding: isMobile ? '24px' : '40px', 
              boxSizing: 'border-box',
              position: isDesktop ? 'sticky' : 'relative',
              top: isDesktop ? '24px' : 'auto'
            }}>
              
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Delegasi Penugasan</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748B', fontWeight: '400', lineHeight: '1.6' }}>
                  Pilih murid dan tentukan modul pembelajaran yang sesuai dengan kebutuhan evaluasi mereka.
                </p>
              </div>
              
              <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Student Selection Container */}
                <div>
                  {!selectedStudent ? (
                    <div 
                      onClick={() => setIsStudentModalOpen(true)}
                      style={{ border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                    >
                      <div style={{ width: '56px', height: '56px', backgroundColor: '#0F172A', color: 'white', borderRadius: '50%', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconUsersGroup />
                      </div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Cari & pilih murid dari kelas anda</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Daftar murid akan disesuaikan dengan otorisasi kelas Anda.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', border: '1px solid #E2E8F0', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: '800' }}>
                          {selectedStudent.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{selectedStudent.name}</h4>
                          <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Kelas: {selectedStudent.class}</p>
                        </div>
                      </div>
                      <button 
                        type="button" onClick={() => setIsStudentModalOpen(true)}
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      >
                        Ganti
                      </button>
                    </div>
                  )}
                </div>

                {/* Configuration Inputs */}
                <div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Konfigurasi Materi</h4>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconFileText /></div>
                      <input 
                        type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Judul penugasan..." required
                        style={inputStyleWithIcon} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconTarget /></div>
                      <input 
                        type="text" value={formTarget} onChange={(e) => setFormTarget(e.target.value)}
                        placeholder="Target huruf atau kata..." required
                        style={inputStyleWithIcon} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                  </div>

                  <textarea 
                    value={formNotes} onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Instruksi tambahan atau pesan penyemangat untuk murid..." rows="4"
                    style={{ ...inputStyleBase, resize: 'vertical', minHeight: '120px' }}
                    onFocus={inputFocus} onBlur={inputBlur}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={!selectedStudent || isSubmitting}
                  style={{ width: '100%', padding: '18px', backgroundColor: selectedStudent && !isSubmitting ? '#0F172A' : '#CBD5E1', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: selectedStudent && !isSubmitting ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
                  onMouseOver={(e) => { if(selectedStudent && !isSubmitting) e.currentTarget.style.backgroundColor = '#1E293B'; }}
                  onMouseOut={(e) => { if(selectedStudent && !isSubmitting) e.currentTarget.style.backgroundColor = '#0F172A'; }}
                >
                  {isSubmitting ? 'Memproses...' : 'Distribusikan tugas spesifik'}
                </button>

              </form>
            </div>
          ) : (
            <div style={{ flex: isDesktop ? '1.1' : 'none', display: activeTab === 'Pengaturan' ? 'block' : 'none', width: '100%' }}>
               {/* Placeholder for settings or future tabs */}
               <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px' }}>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#64748B' }}>Menu {activeTab} sedang dalam tahap pengembangan.</p>
               </div>
            </div>
          )}

          {/* Right Column: Assignment Monitoring Area */}
          {(activeTab !== 'Pengaturan') && (
            <div style={{ flex: isDesktop ? '1' : 'none', display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
              
              {/* Premium Search Bar */}
              <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: '999px', border: '1px solid #E2E8F0', padding: '6px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <input 
                  type="text" placeholder="Cari penugasan siswa..." 
                  value={searchTaskQuery} onChange={(e) => setSearchTaskQuery(e.target.value)} 
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 20px', fontSize: '14px', backgroundColor: 'transparent', color: '#0F172A', minWidth: '100px' }} 
                />
                <button style={{ backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '999px', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                  <IconSearchWhite /> {!isMobile && "Search"}
                </button>
              </div>

              {/* PERBAIKAN 2: Carousel Scroll Horizontal untuk Assignment Cards di Mobile */}
              <div 
                className={isMobile ? "hide-scrollbar" : ""} 
                style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'row' : 'column', 
                  gap: '20px',
                  overflowX: isMobile ? 'auto' : 'visible',
                  scrollSnapType: isMobile ? 'x mandatory' : 'none',
                  paddingBottom: isMobile ? '16px' : '0' // Ruang untuk bayangan kartu
                }}
              >
                {paginatedAssignments.length > 0 ? paginatedAssignments.map((task) => (
                  <div 
                    key={task.id} 
                    style={{ 
                      flex: isMobile ? '0 0 88%' : 'auto', 
                      scrollSnapAlign: isMobile ? 'center' : 'none' 
                    }}
                  >
                    <AssignmentCard task={task} onOpenEvalModal={openEvalModal} />
                  </div>
                )) : (
                  <div style={{ padding: '80px 24px', textAlign: 'center', width: '100%' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px auto' }}>
                      <IconSearchGray />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#64748B', margin: 0 }}>Belum ada data penugasan.</p>
                  </div>
                )}
              </div>
              
              {/* Functional Pagination UI */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ background: 'none', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#CBD5E1' : '#0F172A', display: 'flex' }}
                  >
                    <IconChevronLeft />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <span 
                      key={i} 
                      onClick={() => setCurrentPage(i + 1)}
                      style={{ cursor: 'pointer', color: currentPage === i + 1 ? '#0F172A' : '#64748B', fontWeight: currentPage === i + 1 ? '800' : '600' }}
                    >
                      {i + 1}
                    </span>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{ background: 'none', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#CBD5E1' : '#0F172A', display: 'flex' }}
                  >
                    <IconChevronRight />
                  </button>
                </div>
              )}
              
            </div>
          )}

        </div>
      </div>

      {/* Student Selection Modal */}
      {isStudentModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Pilih Murid Target</h3>
              </div>
              <button onClick={() => setIsStudentModalOpen(false)} style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <IconClose />
              </button>
            </div>
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconSearchGray /></div>
                <input 
                  type="text" placeholder="Cari nama murid..." 
                  value={searchStudentQuery} onChange={(e) => setSearchStudentQuery(e.target.value)}
                  style={inputStyleWithIcon} onFocus={inputFocus} onBlur={inputBlur}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <div 
                    key={student.id} onClick={() => handleSelectStudent(student)}
                    style={{ padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: '800', flexShrink: 0 }}>
                      {student.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{student.name}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B', fontWeight: '500' }}>{student.class}</p>
                    </div>
                  </div>
                )) : (
                  <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B' }}>Tidak ada murid ditemukan.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Drawer Modal */}
      <EvaluationModal 
        isOpen={isEvalModalOpen} onClose={() => setIsEvalModalOpen(false)} 
        task={taskToEvaluate} evalStars={evalStars} setEvalStars={setEvalStars} 
        evalFeedback={evalFeedback} setEvalFeedback={setEvalFeedback} 
        onSubmit={submitEvaluation} isEvaluating={isEvaluating} 
      />

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        /* CSS Sakti untuk Menyembunyikan Bilah Gulir (Scrollbar) */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* Untuk IE dan Edge */
          scrollbar-width: none;  /* Untuk Firefox */
        }
      `}</style>
    </main>
  );
}