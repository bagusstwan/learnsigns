import PropTypes from 'prop-types';

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function TutorialModal({ isOpen, onClose, module }) {
  // Jika module tidak tersedia, jangan render modal
  if (!module) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(17, 24, 39, 0.6)', 
        backdropFilter: 'blur(4px)', 
        zIndex: 9999, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        // animasi transisi in/out untuk latar belakang (backdrop)
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      {/* Container Modal */}
      <div 
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          width: '100%', 
          maxWidth: '480px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
          display: 'flex', 
          flexDirection: 'column',
          // animasi transisi in/out untuk kotak modal (muncul dari bawah & membesar perlahan)
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
        }}
      >
        
        {/* Bagian Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #EAEAEA' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Panduan Gestur</h3>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Target: {module.target_gesture}</span>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px', transition: 'color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = '#111827'} 
            onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}
          >
            <IconClose />
          </button>
        </div>
        
        {/* Bagian Konten (Gambar & Deskripsi) */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '100%', height: '240px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #EAEAEA', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            {module.reference_image ? (
              <img 
                src={`http://127.0.0.1:8000/storage/${module.reference_image}`} 
                alt={module.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'block'; }} 
              />
            ) : null}
            <span style={{ display: module.reference_image ? 'none' : 'block', fontSize: '64px', fontWeight: '700', color: '#D1D5DB' }}>
              {module.target_gesture.substring(0, 2)}
            </span>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>
              {module.description || "Perhatikan gambar di atas dan ikuti bentuk gestur tangan dengan tepat di depan kamera."}
            </p>
          </div>
        </div>

        {/* Bagian Footer */}
        <div style={{ padding: '16px 24px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose} 
            style={{ padding: '10px 24px', backgroundColor: '#111827', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

TutorialModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  module: PropTypes.object
};