import PropTypes from 'prop-types';

const IconGuide = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const IconHelp = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

export default function GestureReferenceCard({ currentModule, onOpenTutorial }) {
  if (!currentModule) return null;

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: '72px', height: '72px', flexShrink: 0, backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {currentModule.reference_image ? (
            <img 
              src={`http://127.0.0.1:8000/storage/${currentModule.reference_image}`} 
              alt={currentModule.title} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'block'; }} 
            />
        ) : null}
        <span style={{ display: currentModule.reference_image ? 'none' : 'block', fontSize: '24px', fontWeight: '600', color: '#9CA3AF' }}>
          {currentModule.target_gesture.substring(0, 2)}
        </span>
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ color: '#6B7280' }}><IconGuide /></span>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Target: {currentModule.target_gesture}</h3>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.6', marginBottom: '12px' }}>{currentModule.description || "Deskripsi panduan belum tersedia di database."}</p>
        
        <button 
          onClick={onOpenTutorial}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #EAEAEA', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: '0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; }}
        >
          <IconHelp />
          Lihat Tutorial
        </button>
      </div>
    </div>
  );
}

GestureReferenceCard.propTypes = {
  currentModule: PropTypes.object,
  onOpenTutorial: PropTypes.func.isRequired,
};