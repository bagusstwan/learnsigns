import React from 'react';
import PropTypes from 'prop-types';

const IconClock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default function AssignmentCard({ task, onOpenEvalModal }) {
  // Pengecekan Status Tangguh (Anti-Bug / Toleransi Format API)
  const statusStr = String(task.status || '').toLowerCase();
  
  // Deteksi jika sudah dinilai: cek status text ATAU jika API mengembalikan ada nilai bintang (stars_earned)
  const isCompleted = statusStr === 'evaluated' || statusStr === 'completed' || statusStr === 'selesai' || task.stars_earned > 0 || task.is_evaluated;
  
  // Deteksi jika murid sudah mengumpulkan tapi guru belum menilai
  const isSubmitted = statusStr === 'submitted' || statusStr === 'menunggu';

  // Dinamisasi Warna Badge Status Enterprise
  let badgeText = 'Belum dikerjakan';
  let badgeColor = '#64748B'; // Slate 500 (Abu-abu)
  let badgeBorder = '#E2E8F0'; 
  let badgeBg = '#FFFFFF';

  if (isCompleted) {
    badgeText = 'Selesai Dinilai';
    badgeColor = '#10B981'; // Emerald 500 (Hijau)
    badgeBorder = '#A7F3D0';
    badgeBg = '#ECFDF5';
  } else if (isSubmitted) {
    badgeText = 'Menunggu Penilaian';
    badgeColor = '#F59E0B'; // Amber 500 (Oranye)
    badgeBorder = '#FDE68A';
    badgeBg = '#FFFBEB';
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
      
      {/* Header Kartu: Profil & Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Avatar Placeholder */}
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: '800' }}>
            {task.studentName?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{task.studentName}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', fontWeight: '500' }}>{task.studentName?.toLowerCase().replace(' ', '')}@gmail.com</p>
          </div>
        </div>
        
        {/* Badge Status Dinamis */}
        <div style={{ padding: '6px 14px', border: `1px solid ${badgeBorder}`, backgroundColor: badgeBg, borderRadius: '999px', fontSize: '11px', fontWeight: '800', color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {badgeText}
        </div>
      </div>

      {/* Info Modul */}
      <div>
        <span style={{ display: 'block', fontSize: '11px', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Modul Yang Dikerjakan</span>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{task.title}</h3>
      </div>

      {/* Kotak Catatan / Instruksi */}
      <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', fontSize: '14px', color: '#475569', fontWeight: '500', lineHeight: '1.6', border: '1px solid #F1F5F9' }}>
        {task.notes || 'Selesaikan tantangan ini dengan akurasi tinggi di depan kamera untuk mendapatkan penilaian terbaik.'}
      </div>

      {/* Tombol Aksi */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
        <button 
          style={{ flex: 1, padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#475569', cursor: 'pointer', transition: '0.2s' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
        >
          <IconClock /> Kirim Pengingat
        </button>
        <button 
          onClick={() => onOpenEvalModal(task)}
          disabled={isCompleted}
          style={{ flex: 1, padding: '12px', backgroundColor: isCompleted ? '#94A3B8' : '#0F172A', border: 'none', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#FFFFFF', cursor: isCompleted ? 'not-allowed' : 'pointer', transition: '0.2s', boxShadow: isCompleted ? 'none' : '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}
          onMouseOver={e => { if(!isCompleted) e.currentTarget.style.backgroundColor = '#1E293B' }}
          onMouseOut={e => { if(!isCompleted) e.currentTarget.style.backgroundColor = '#0F172A' }}
        >
          <IconCheck /> {isCompleted ? 'Sudah Dinilai' : 'Beri Penilaian'}
        </button>
      </div>

    </div>
  );
}

AssignmentCard.propTypes = {
  task: PropTypes.object.isRequired,
  onOpenEvalModal: PropTypes.func.isRequired,
};