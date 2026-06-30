import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* IKON MINIMALIS & PROFESIONAL */
const IconPlus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFileText = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconTarget = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;

// Kita mengabaikan isMobile dari props karena kita buat deteksi yang lebih canggih di dalam komponen ini
export default function EducatorPage() {
  
  /* --- SISTEM PENDETEKSI UKURAN LAYAR (RESPONSIVE HOOK) --- */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Variabel Breakpoints
  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobile = windowWidth < 768;

  // Nilai Dinamis Berdasarkan Layar
  const paddingMain = isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px';
  const layoutDirection = isDesktop ? 'row' : 'column';
  const gridInputKolom = isMobile ? '1fr' : '1fr 1fr';
  const gridMurid = isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(160px, 1fr))';
  const headerFontSize = isMobile ? '22px' : '28px';

  /* --- DATA MOCK & STATE --- */
  const MOCK_STUDENTS = [
    { id: 1, name: "Ahmad Rizky", class: "XI TKJ - 1", initials: "AR" },
    { id: 2, name: "Siti Aminah", class: "XI TKJ - 1", initials: "SA" },
    { id: 3, name: "Budi Santoso", class: "XI TKJ - 2", initials: "BS" },
    { id: 4, name: "Dina Pertiwi", class: "XI TKJ - 2", initials: "DP" },
  ];

  const [assignments, setAssignments] = useState([
    { id: 101, studentName: "Budi Santoso", title: "Remedial Huruf A & B", target: "A, B", notes: "Perhatikan kelenturan jari.", date: "24 Jun 2026", status: "Belum Dikerjakan" },
    { id: 102, studentName: "Siti Aminah", title: "Latihan Transisi", target: "Semua Abjad", notes: "Kerjakan dengan batas waktu 5 detik per huruf.", date: "22 Jun 2026", status: "Selesai" }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formTarget, setFormTarget] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!selectedStudent || !formTitle || !formTarget) {
      alert("Mohon pilih murid dan lengkapi data tugas!");
      return;
    }

    const newAssignment = {
      id: assignments.length + 200,
      studentName: selectedStudent.name,
      title: formTitle,
      target: formTarget,
      notes: formNotes,
      date: "Hari ini",
      status: "Belum Dikerjakan"
    };

    setAssignments([newAssignment, ...assignments]);
    setFormTitle(""); setFormTarget(""); setFormNotes(""); setSelectedStudent(null);
  };

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: paddingMain, boxSizing: 'border-box', backgroundColor: '#FAFAFA' }}>
      
      {/* HEADER COMMAND CENTER */}
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
        
        {/* KOLOM KIRI: FORMULIR PEMBUATAN MODUL KELAS ENTERPRISE */}
        <div style={{ flex: isDesktop ? '1.4' : 'none', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: isMobile ? '20px' : '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
          
          <div style={{ marginBottom: '24px', borderBottom: '1px solid #EAEAEA', paddingBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#111827' }}>Delegasi Tugas Baru</h3>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Konfigurasi sesi pembelajaran khusus untuk murid terpilih.</span>
          </div>
          
          <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* STEP 1: PEMILIHAN MURID */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  1. Pilih Murid
                </label>
                <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: '600', cursor: 'pointer' }}>Lihat Semua</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: gridMurid, gap: '12px' }}>
                {MOCK_STUDENTS.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    style={{ 
                      padding: '12px', borderRadius: '8px', border: `1px solid ${selectedStudent?.id === student.id ? '#111827' : '#EAEAEA'}`, 
                      backgroundColor: selectedStudent?.id === student.id ? '#FAFAFA' : '#FFFFFF', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', backgroundColor: selectedStudent?.id === student.id ? '#111827' : '#F3F4F6', color: selectedStudent?.id === student.id ? '#FFFFFF' : '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '700' }}>
                      {student.initials}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{student.name}</h4>
                      <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>{student.class}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!selectedStudent && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px', fontWeight: '500' }}>* Wajib memilih 1 murid.</p>}
            </div>

            {/* STEP 2: DETAIL MATERI */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '16px' }}>
                2. Konfigurasi Materi
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: gridInputKolom, gap: '16px', marginBottom: '16px' }}>
                
                {/* Input Judul */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '14px' }}><IconFileText /></div>
                  <input 
                    type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Judul Penugasan..." required
                    style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit', backgroundColor: '#FAFAFA' }}
                    onFocus={(e) => { e.target.style.borderColor = '#111827'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#EAEAEA'; e.target.style.backgroundColor = '#FAFAFA'; }}
                  />
                </div>

                {/* Input Target */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '14px' }}><IconTarget /></div>
                  <input 
                    type="text" value={formTarget} onChange={(e) => setFormTarget(e.target.value)}
                    placeholder="Target Huruf/Kata..." required
                    style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit', backgroundColor: '#FAFAFA' }}
                    onFocus={(e) => { e.target.style.borderColor = '#111827'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#EAEAEA'; e.target.style.backgroundColor = '#FAFAFA'; }}
                  />
                </div>
              </div>

              {/* Input Catatan (Textarea) */}
              <div style={{ position: 'relative' }}>
                <textarea 
                  value={formNotes} onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Instruksi tambahan atau pesan penyemangat untuk murid..." rows="3"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', resize: 'vertical', fontFamily: 'inherit', backgroundColor: '#FAFAFA' }}
                  onFocus={(e) => { e.target.style.borderColor = '#111827'; e.target.style.backgroundColor = '#FFFFFF'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#EAEAEA'; e.target.style.backgroundColor = '#FAFAFA'; }}
                ></textarea>
              </div>

            </div>

            {/* Tombol Submit Besar */}
            <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '24px' }}>
              <button 
                type="submit"
                disabled={!selectedStudent}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: selectedStudent ? '#111827' : '#E5E7EB', color: selectedStudent ? '#FFFFFF' : '#9CA3AF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: selectedStudent ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                <IconPlus /> Distribusikan Tugas Spesifik
              </button>
            </div>

          </form>
        </div>

        {/* KOLOM KANAN: MONITORING TUGAS */}
        <div style={{ flex: isDesktop ? '1' : 'none', display: 'flex', flexDirection: 'column', width: '100%', minHeight: isDesktop ? '520px' : 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pemantauan Delegasi Tugas</span>
            <div style={{ position: 'relative', width: isMobile ? '100%' : '160px' }}>
              <div style={{ position: 'absolute', left: '10px', top: '8px' }}><IconSearch /></div>
              <input type="text" placeholder="Cari murid..." style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '20px', border: '1px solid #EAEAEA', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {assignments.map((task) => (
              <div key={task.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '10px', padding: '20px', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                
                {/* Header Kartu: Nama Murid & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#111827', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '9px', fontWeight: '700' }}>
                      {task.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{task.studentName}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', backgroundColor: task.status === 'Selesai' ? '#E6F4EA' : '#F3F4F6', color: task.status === 'Selesai' ? '#1E8E3E' : '#4B5563' }}>
                    {task.status}
                  </span>
                </div>
                
                {/* Detail Penugasan */}
                <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#111827' }}>{task.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '4px 8px', borderRadius: '4px' }}>Target: {task.target}</span>
                </div>
                
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.5', backgroundColor: '#FAFAFA', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #EAEAEA' }}>
                  {task.notes}
                </p>
                
                <div style={{ marginTop: '16px', fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textAlign: 'right' }}>
                  Didelegasikan: {task.date}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}

EducatorPage.propTypes = {
  // isMobile dihapus dari props karena kita menggunakan deteksi window size internal
};