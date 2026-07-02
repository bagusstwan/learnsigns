import PropTypes from 'prop-types';

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function ModuleDrawer({ isOpen, onClose, modules, currentModule, onSelectModule, isMobileScreen }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, transition: 'all 0.3s ease-in-out',
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none'
        }}
      />

      {/* Panel Drawer */}
      <div style={{
        position: 'fixed', top: 0, bottom: 0, right: 0, width: isMobileScreen ? '100%' : '400px', backgroundColor: '#FFFFFF', borderLeft: '1px solid #EAEAEA', boxShadow: '-8px 0 24px rgba(0,0,0,0.05)', zIndex: 105, 
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>Daftar Modul Tersedia</h3>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Pilih materi untuk dipelajari.</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: '4px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#9CA3AF'}><IconClose /></button>
        </div>

        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '8px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                borderColor: currentModule?.id === mod.id ? '#111827' : '#F3F4F6',
                backgroundColor: currentModule?.id === mod.id ? '#111827' : '#FAFAFA',
                color: currentModule?.id === mod.id ? '#FFFFFF' : '#111827'
              }}
              onMouseOver={(e) => { if(currentModule?.id !== mod.id) e.currentTarget.style.borderColor = '#D1D5DB'; }}
              onMouseOut={(e) => { if(currentModule?.id !== mod.id) e.currentTarget.style.borderColor = '#F3F4F6'; }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{mod.title}</span>
                <span style={{ fontSize: '12px', color: currentModule?.id === mod.id ? '#9CA3AF' : '#6B7280' }}>Target: {mod.target_gesture}</span>
              </div>
              {currentModule?.id === mod.id && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

ModuleDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modules: PropTypes.array.isRequired,
  currentModule: PropTypes.object,
  onSelectModule: PropTypes.func.isRequired,
  isMobileScreen: PropTypes.bool.isRequired,
};