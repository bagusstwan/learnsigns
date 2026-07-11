import { IconCheckCircle, IconStar } from './Icons';

export default function AssignmentCard({ task, onOpenEvalModal }) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '24px', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#F3F4F6', color: '#374151', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '800', border: '1px solid #E5E7EB' }}>
            {task.studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{task.studentName}</span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px', backgroundColor: task.status === 'Selesai Dinilai' ? '#ECFDF5' : '#FEF3C7', color: task.status === 'Selesai Dinilai' ? '#059669' : '#D97706', border: `1px solid ${task.status === 'Selesai Dinilai' ? '#A7F3D0' : '#FDE68A'}` }}>
          {task.status}
        </span>
      </div>
      
      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#111827' }}>{task.title}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', backgroundColor: '#F3F4F6', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E5E7EB' }}>Target: {task.target}</span>
      </div>
      
      {task.notes && (
        <div style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#4B5563', lineHeight: '1.6', backgroundColor: '#FAFAFA', padding: '12px 16px', borderRadius: '0 8px 8px 0', borderLeft: '3px solid #111827' }}>
          {task.notes}
        </div>
      )}

      {/* Area Evaluasi */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>
          {task.date}
        </div>
        
        {task.status === 'Belum Dikerjakan' ? (
          <button 
            onClick={() => onOpenEvalModal(task)}
            style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
          >
            <IconCheckCircle /> Beri Nilai
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontWeight: '800', fontSize: '14px', backgroundColor: '#FFFBEB', padding: '6px 12px', borderRadius: '20px', border: '1px solid #FEF3C7' }}>
            <IconStar /> +{task.stars_earned} Bintang
          </div>
        )}
      </div>

      {/* Menampilkan Umpan Balik */}
      {task.status === 'Selesai Dinilai' && task.feedback && (
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', color: '#374151' }}>
          <strong style={{ color: '#111827' }}>Catatan Evaluasi:</strong> <br/> {task.feedback}
        </div>
      )}
    </div>
  );
}