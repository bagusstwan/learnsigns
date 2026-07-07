import PropTypes from 'prop-types';

const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconTarget = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;

export default function QuestCard({ quest, onClick }) {
  return (
    <div 
      onClick={quest.is_completed ? null : () => onClick(quest)}
      style={{ 
        backgroundColor: '#FFFFFF', 
        border: '1px solid #EAEAEA', 
        borderRadius: '12px', 
        padding: '28px 24px', 
        cursor: quest.is_completed ? 'not-allowed' : 'pointer', 
        transition: 'all 0.2s ease', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box',
        opacity: quest.is_completed ? 0.6 : 1,
        position: 'relative'
      }}
      onMouseOver={(e) => { 
        if(!quest.is_completed) {
          e.currentTarget.style.borderColor = '#000000'; 
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; 
        }
      }}
      onMouseOut={(e) => { 
        if(!quest.is_completed) {
          e.currentTarget.style.borderColor = '#EAEAEA'; 
          e.currentTarget.style.boxShadow = 'none'; 
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827' }}>
          <IconTarget />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: quest.is_completed ? '#E6F4EA' : '#FFFBEB', padding: '4px 8px', borderRadius: '4px' }}>
          <IconStar />
          <span style={{ fontSize: '12px', fontWeight: '700', color: quest.is_completed ? '#1E8E3E' : '#B45309' }}>
            {quest.is_completed ? 'Selesai' : `+${quest.reward_stars}`}
          </span>
        </div>
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#111827', lineHeight: '1.4' }}>{quest.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#6B7280', lineHeight: '1.6', flexGrow: 1 }}>{quest.description}</p>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827', backgroundColor: '#F3F4F6', padding: '8px 12px', borderRadius: '6px', alignSelf: 'flex-start' }}>
        Target: Gestur {quest.target_gesture}
      </div>
    </div>
  );
}

QuestCard.propTypes = {
  quest: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};