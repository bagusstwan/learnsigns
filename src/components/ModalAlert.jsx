import PropTypes from 'prop-types';

const IconWarning = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default function ModalAlert({ isOpen, onClose, onConfirm, title, message, confirmText = 'Ya, Lanjutkan', cancelText = 'Batal', type = 'danger' }) {
  if (!isOpen) return null;

  // Menentukan tema warna berdasarkan tipe alert
  const isDanger = type === 'danger';
  const iconBgColor = isDanger ? '#FEE2E2' : '#E0E7FF';
  const iconColor = isDanger ? '#DC2626' : '#4F46E5';
  const confirmBgColor = isDanger ? '#DC2626' : '#0F172A';
  const confirmHoverColor = isDanger ? '#B91C1C' : '#1E293B';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Latar Belakang Blur */}
      <div 
        onClick={onClose} 
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', transition: 'opacity 0.3s' }}
      ></div>

      {/* Kotak Modal */}
      <div style={{ position: 'relative', backgroundColor: '#FFFFFF', borderRadius: '24px', width: '90%', maxWidth: '400px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>

        {/* Ikon Notifikasi */}
        <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: iconBgColor, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <IconWarning />
        </div>

        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.5px' }}>
          {title}
        </h3>
        <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#64748B', lineHeight: '1.6' }}>
          {message}
        </p>

        {/* Tombol Aksi */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button 
            onClick={onClose} 
            style={{ flex: 1, padding: '14px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
          >
            {cancelText}
          </button>
          
          <button 
            onClick={onConfirm} 
            style={{ flex: 1, padding: '14px', backgroundColor: confirmBgColor, color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = confirmHoverColor} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = confirmBgColor}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

ModalAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'info']),
};