import { useState, useEffect } from 'react';
import { IconUsers, IconSearch, IconFileText, IconTarget, IconPlus, IconClose } from '../components/Icons';
import AssignmentCard from '../components/AssignmentCard';
import EvaluationModal from '../components/EvaluationModal';

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

  const paddingMain = isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px';
  const layoutDirection = isDesktop ? 'row' : 'column';
  const gridInputKolom = isMobile ? '1fr' : '1fr 1fr';
  const headerFontSize = isMobile ? '22px' : '28px';

  /* Manajemen Status API */
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /* Status Formulir */
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formTarget, setFormTarget] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [searchTaskQuery, setSearchTaskQuery] = useState("");

  /* Status Modal Pemilihan Murid */
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [searchStudentQuery, setSearchStudentQuery] = useState("");

  /* Status Modal Penilaian (Evaluasi) */
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [taskToEvaluate, setTaskToEvaluate] = useState(null);
  const [evalStars, setEvalStars] = useState(10); 
  const [evalFeedback, setEvalFeedback] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  /* Mengambil Data Murid & Tugas */
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/educator/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok && resData.status === 'success') {
        setStudents(resData.data.students);
        setAssignments(resData.data.assignments);
      }
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [API_BASE_URL, token]);

  /* Menangani Pembuatan Penugasan Baru */
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !formTitle || !formTarget) {
      alert("Mohon pilih murid dan lengkapi data tugas!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/educator/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          student_id: selectedStudent.id,
          title: formTitle,
          target: formTarget,
          notes: formNotes
        })
      });

      if (response.ok) {
        setFormTitle(""); setFormTarget(""); setFormNotes(""); setSelectedStudent(null);
        fetchDashboardData(); 
      } else {
        alert("Gagal menyimpan tugas.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Menangani Evaluasi Tugas (Memberi Nilai) */
  const openEvalModal = (task) => {
    setTaskToEvaluate(task);
    setEvalStars(10);
    setEvalFeedback("");
    setIsEvalModalOpen(true);
  };

  const submitEvaluation = async (e) => {
    e.preventDefault();
    if (evalStars < 1 || evalStars > 50) {
      alert("Jumlah bintang harus antara 1 hingga 50!");
      return;
    }

    setIsEvaluating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/educator/assignments/${taskToEvaluate.id}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          stars_earned: evalStars,
          feedback: evalFeedback
        })
      });

      if (response.ok) {
        setIsEvalModalOpen(false);
        setTaskToEvaluate(null);
        fetchDashboardData(); 
      } else {
        alert("Gagal mengirimkan penilaian.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi server saat mengirim penilaian.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const filteredAssignments = assignments.filter(task => 
    task.studentName.toLowerCase().includes(searchTaskQuery.toLowerCase()) || 
    task.title.toLowerCase().includes(searchTaskQuery.toLowerCase())
  );

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchStudentQuery.toLowerCase())
  );

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(false);
    setSearchStudentQuery("");
  };

  /* TATA LETAK INPUT PREMIUM */
  const inputStyle = { width: '100%', padding: '12px 14px 12px 40px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' };
  const inputFocus = (e) => { e.target.style.borderColor = '#111827'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.1)'; };
  const inputBlur = (e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Menyiapkan Ruang Pendidik...</p>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: paddingMain, boxSizing: 'border-box', backgroundColor: '#FAFAFA' }}>
      
      {/* BAGIAN HEADER KONTROL GURU */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: headerFontSize, fontWeight: '800', letterSpacing: '-0.8px', color: '#111827' }}>
            Teacher Command Center
          </h2>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', maxWidth: '600px', lineHeight: '1.6' }}>
            Manajemen pembelajaran terpersonalisasi. Delegasikan materi khusus secara spesifik untuk masing-masing murid.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', padding: '10px 16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <IconUsers />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Akses Instruktur</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: layoutDirection, gap: '24px', alignItems: 'flex-start' }}>
        
        {/* KOLOM KIRI: FORMULIR DELEGASI */}
        <div style={{ flex: isDesktop ? '1.4' : 'none', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '24px' : '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
          
          <div style={{ marginBottom: '28px', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#111827' }}>Delegasi Tugas Baru</h3>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Konfigurasi sesi pembelajaran khusus untuk murid terpilih.</span>
          </div>
          
          <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* TAHAP 1: PEMILIHAN MURID */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>
                1. Pilih Murid Target
              </label>
              
              {!selectedStudent ? (
                <button 
                  type="button" 
                  onClick={() => setIsStudentModalOpen(true)}
                  style={{ width: '100%', padding: '16px', border: '1px dashed #D1D5DB', borderRadius: '8px', backgroundColor: '#F9FAFB', color: '#4B5563', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.color = '#111827'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#4B5563'; e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                >
                  <IconUsers /> Cari & Pilih Murid dari Kelas Anda
                </button>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #EAEAEA', borderRadius: '8px', backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#374151', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '800' }}>
                      {selectedStudent.initials}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>{selectedStudent.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{selectedStudent.class}</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsStudentModalOpen(true)}
                    style={{ background: 'none', border: '1px solid #D1D5DB', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer', backgroundColor: '#FFFFFF', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    Ganti
                  </button>
                </div>
              )}
            </div>

            {/* TAHAP 2: RINCIAN MATERI */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>
                2. Konfigurasi Materi
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: gridInputKolom, gap: '16px', marginBottom: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '14px' }}><IconFileText /></div>
                  <input 
                    type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Judul Penugasan..." required
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '14px' }}><IconTarget /></div>
                  <input 
                    type="text" value={formTarget} onChange={(e) => setFormTarget(e.target.value)}
                    placeholder="Target Huruf/Kata..." required
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <textarea 
                  value={formNotes} onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Instruksi tambahan atau pesan penyemangat untuk murid..." rows="3"
                  style={{ ...inputStyle, padding: '14px 16px', resize: 'vertical' }}
                  onFocus={inputFocus} onBlur={inputBlur}
                ></textarea>
              </div>
            </div>

            {/* Tombol Eksekusi Aksi */}
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
              <button 
                type="submit"
                disabled={!selectedStudent || isSubmitting}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: selectedStudent && !isSubmitting ? '#111827' : '#F3F4F6', color: selectedStudent && !isSubmitting ? '#FFFFFF' : '#9CA3AF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: selectedStudent && !isSubmitting ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: selectedStudent && !isSubmitting ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
                onMouseOver={(e) => { if(selectedStudent && !isSubmitting) e.currentTarget.style.backgroundColor = '#374151'; }}
                onMouseOut={(e) => { if(selectedStudent && !isSubmitting) e.currentTarget.style.backgroundColor = '#111827'; }}
              >
                {isSubmitting ? 'Menyimpan...' : <><IconPlus /> Distribusikan Tugas Spesifik</>}
              </button>
            </div>

          </form>
        </div>

        {/* KOLOM KANAN: MONITORING & PENILAIAN TUGAS */}
        <div style={{ flex: isDesktop ? '1' : 'none', display: 'flex', flexDirection: 'column', width: '100%', minHeight: isDesktop ? '520px' : 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pemantauan Delegasi Tugas</span>
            <div style={{ position: 'relative', width: isMobile ? '100%' : '200px' }}>
              <div style={{ position: 'absolute', left: '12px', top: '10px' }}><IconSearch /></div>
              <input type="text" placeholder="Cari penugasan..." value={searchTaskQuery} onChange={(e) => setSearchTaskQuery(e.target.value)} style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FFFFFF', transition: 'all 0.2s' }} onFocus={(e) => { e.target.style.borderColor = '#111827'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.05)'; }} onBlur={(e) => { e.target.style.borderColor = '#EAEAEA'; e.target.style.boxShadow = 'none'; }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredAssignments.length > 0 ? filteredAssignments.map((task) => (
              <AssignmentCard key={task.id} task={task} onOpenEvalModal={openEvalModal} />
            )) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px dashed #D1D5DB', borderRadius: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', margin: 0 }}>Belum ada data penugasan.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL PEMILIHAN MURID */}
      {isStudentModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', maxHeight: '85vh', overflow: 'hidden', animation: 'scaleUp 0.2s ease-out' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#111827' }}>Pilih Murid Target</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Hanya menampilkan murid dari institusi/kelas Anda.</p>
              </div>
              <button onClick={() => setIsStudentModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px', borderRadius: '6px', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <IconClose />
              </button>
            </div>
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <div style={{ position: 'absolute', left: '14px', top: '12px' }}><IconSearch /></div>
                <input 
                  type="text" placeholder="Cari nama murid atau kelas..." 
                  value={searchStudentQuery} onChange={(e) => setSearchStudentQuery(e.target.value)}
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #EAEAEA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: '800' }}>
                      {student.initials}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827' }}>{student.name}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Kelas: {student.class}</p>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '32px 0', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Tidak ada murid yang ditemukan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EVALUASI KINERJA (KOMPONEN EKSTERNAL) */}
      <EvaluationModal 
        isOpen={isEvalModalOpen} 
        onClose={() => setIsEvalModalOpen(false)} 
        task={taskToEvaluate} 
        evalStars={evalStars} 
        setEvalStars={setEvalStars} 
        evalFeedback={evalFeedback} 
        setEvalFeedback={setEvalFeedback} 
        onSubmit={submitEvaluation} 
        isEvaluating={isEvaluating} 
      />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}