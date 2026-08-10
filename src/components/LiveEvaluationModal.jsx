import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Ikon yang presisi sesuai desain */
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconStar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

export default function LiveEvaluationModal({ isOpen, onClose, studentsData, currentModule, onSubmit }) {
  const [evalSearchQuery, setEvalSearchQuery] = useState("");
  const [evalSelectedStudent, setEvalSelectedStudent] = useState(null);
  const [evalStars, setEvalStars] = useState(10);
  const [isSubmittingEval, setIsSubmittingEval] = useState(false);

  if (!isOpen) return null;

  const filteredStudents = (studentsData || []).filter(student => 
    (student?.name || '').toLowerCase().includes(evalSearchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!evalSelectedStudent || evalStars < 1) {
       alert("Harap pilih murid dan isi bintang terlebih dahulu.");
       return;
    }
    setIsSubmittingEval(true);
    await onSubmit(evalSelectedStudent.id, evalStars);
    setIsSubmittingEval(false);
    
    // Reset State
    setEvalSelectedStudent(null);
    setEvalSearchQuery("");
    setEvalStars(10);
  };

  /* Sabuk Pengaman Responsivitas Input */
  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 42px', // Ruang ekstra untuk ikon
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    fontSize: '15px',
    fontWeight: '500',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box', // MENCEGAH MELEBAR KELUAR BATAS
    backgroundColor: '#FFFFFF'
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 24, 39, 0.5)', zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
      
      {/* Container Utama - Lebar maksimal 500px, 100% responsif di HP */}
      <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '500px', maxHeight: '90vh', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', boxSizing: 'border-box' }}>
        
        {/* === HEADER MODAL === */}
        <div style={{ padding: '24px 24px 20px 24px', borderBottom: '1px solid #F3F4F6', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ paddingRight: '16px' }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                Evaluasi Praktikum Kelas
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                Beri nilai murid yang memperagakan gestur <strong style={{ color: '#10B981' }}>{currentModule?.target_gesture || 'A'}</strong>.
              </p>
            </div>
            <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
              <IconClose />
            </button>
          </div>
        </div>

        {/* === BODY/FORM MODAL === */}
        <div style={{ overflowY: 'auto', boxSizing: 'border-box' }}>
          <form onSubmit={handleSubmit} style={{ padding: '24px', boxSizing: 'border-box' }}>
            
            {/* Bagian 1: Identifikasi Murid */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4B5563', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                1. IDENTIFIKASI MURID PRAKTIKUM
              </label>
              
              {!evalSelectedStudent ? (
                <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                    <IconSearch />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Ketik nama murid kelas Anda..." 
                    value={evalSearchQuery} 
                    onChange={(e) => setEvalSearchQuery(e.target.value)}
                    style={inputStyle} 
                  />
                  
                  {/* Dropdown Pencarian */}
                  {evalSearchQuery && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', marginTop: '4px', maxHeight: '180px', overflowY: 'auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                      {filteredStudents.length > 0 ? filteredStudents.map(student => (
                        <div 
                          key={student.id} 
                          onClick={() => setEvalSelectedStudent(student)}
                          style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#111827' }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {student.name}
                        </div>
                      )) : (
                        <div style={{ padding: '12px 16px', fontSize: '14px', color: '#9CA3AF' }}>Murid tidak teridentifikasi.</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{evalSelectedStudent.name}</div>
                  <button type="button" onClick={() => setEvalSelectedStudent(null)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 'bold', color: '#3B82F6', cursor: 'pointer' }}>
                    Ubah
                  </button>
                </div>
              )}
            </div>

            {/* Bagian 2: Alokasi Bintang */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4B5563', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                2. ALOKASI POIN BINTANG
              </label>
              <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                  <IconStar />
                </div>
                <input 
                  type="number" 
                  min="1" 
                  max="50" 
                  value={evalStars} 
                  onChange={(e) => setEvalStars(parseInt(e.target.value) || '')}
                  placeholder="Maksimal 50" 
                  required
                  style={{ ...inputStyle, fontWeight: 'bold' }} 
                />
              </div>
            </div>

            {/* === FOOTER / BUTTON === */}
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '24px', marginTop: '8px', boxSizing: 'border-box' }}>
              <button 
                type="submit" 
                disabled={!evalSelectedStudent || isSubmittingEval} 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: '#111827', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '15px', 
                  fontWeight: 'bold', 
                  cursor: (!evalSelectedStudent || isSubmittingEval) ? 'not-allowed' : 'pointer', 
                  boxSizing: 'border-box',
                  opacity: (!evalSelectedStudent || isSubmittingEval) ? 0.7 : 1
                }}
              >
                {isSubmittingEval ? 'Merekam Data...' : 'Konfirmasi Penyelesaian Modul'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

LiveEvaluationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  studentsData: PropTypes.array.isRequired,
  currentModule: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};