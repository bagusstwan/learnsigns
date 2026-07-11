import { IconAward, IconClose, IconStar } from './Icons';

export default function EvaluationModal({ isOpen, onClose, task, evalStars, setEvalStars, evalFeedback, setEvalFeedback, onSubmit, isEvaluating }) {
  if (!isOpen || !task) return null;

  const inputStyle = { width: '100%', padding: '12px 14px 12px 40px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' };
  const inputFocus = (e) => { e.target.style.borderColor = '#111827'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.1)'; };
  const inputBlur = (e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; };

  const handleStarInput = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = '';
    else if (value > 50) value = 50;
    else if (value < 0) value = 0;
    setEvalStars(value);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
      <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '460px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'scaleUp 0.2s ease-out' }}>
        
        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #A7F3D0' }}>
              <IconAward />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#111827', letterSpacing: '-0.3px' }}>Beri Nilai & Evaluasi</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>Berikan apresiasi bintang untuk <strong style={{ color: '#111827' }}>{task.studentName}</strong> atas usahanya.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px', borderRadius: '6px', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <IconClose />
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ padding: '24px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>JUMLAH BINTANG (1 - 50)</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '12px' }}><IconStar /></div>
              <input 
                type="number" min="1" max="50" 
                value={evalStars} onChange={handleStarInput}
                placeholder="Contoh: 10" required
                style={{ ...inputStyle, fontWeight: '700', fontSize: '16px' }} 
                onFocus={inputFocus} onBlur={inputBlur}
              />
              <div style={{ position: 'absolute', right: '14px', top: '12px', fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>/ 50 Poin</div>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>CATATAN / APRESIASI (OPSIONAL)</label>
            <textarea 
              value={evalFeedback} onChange={(e) => setEvalFeedback(e.target.value)}
              placeholder="Bagus sekali, gerakan tanganmu sudah sangat tepat!" rows="3"
              style={{ ...inputStyle, padding: '14px 16px', resize: 'vertical' }}
              onFocus={inputFocus} onBlur={inputBlur}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 18px', background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Batal</button>
            <button type="submit" disabled={isEvaluating || evalStars < 1 || evalStars === ''} style={{ padding: '10px 24px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: (isEvaluating || evalStars < 1 || evalStars === '') ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!isEvaluating && evalStars >= 1) e.currentTarget.style.backgroundColor = '#374151'; }} onMouseOut={(e) => { if(!isEvaluating && evalStars >= 1) e.currentTarget.style.backgroundColor = '#111827'; }}>
              {isEvaluating ? 'Menyimpan...' : 'Kirim Penilaian'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}