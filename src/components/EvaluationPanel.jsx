import PropTypes from 'prop-types';
import Mascot from './Mascot';

export default function EvaluationPanel({ isDesktop, isLoading, isSpeaking, aiMessage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '32px 24px', minHeight: isDesktop ? '500px' : 'auto', boxSizing: 'border-box', minWidth: 0, position: isDesktop ? 'sticky' : 'static', top: '24px' }}>
      
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
        <Mascot isThinking={isLoading} />
      </div>
      
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '24px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Log Analisis AI</span>
        <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#111827', backgroundColor: '#FAFAFA', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #111827', boxSizing: 'border-box' }}>
          <span style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>EduSync AI:</span>
          {aiMessage}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isLoading ? '#F59E0B' : isSpeaking ? '#111827' : '#D1D5DB' }}></div>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>
            {isLoading ? "Memproses inferensi..." : isSpeaking ? "Menyampaikan umpan balik" : "Menunggu input gestur"}
          </span>
        </div>
      </div>

    </div>
  );
}

EvaluationPanel.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSpeaking: PropTypes.bool.isRequired,
  aiMessage: PropTypes.string.isRequired,
};