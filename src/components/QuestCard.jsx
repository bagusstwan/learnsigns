import React from 'react';
import PropTypes from 'prop-types';

const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

export default function QuestCard({ quest, index, isActive, onClick }) {
  const number = (index + 1).toString().padStart(2, '0');

  return (
    <div 
      onClick={quest.is_completed ? null : () => onClick(quest)}
      style={{ 
        backgroundColor: isActive ? '#000000' : '#FFFFFF', 
        border: `1px solid ${isActive ? '#000000' : '#E2E8F0'}`, 
        borderRadius: '12px', 
        padding: '16px', 
        cursor: quest.is_completed ? 'not-allowed' : 'pointer', 
        transition: 'all 0.2s ease', 
        display: 'flex', 
        alignItems: 'flex-start',
        gap: '16px',
        boxSizing: 'border-box',
        opacity: quest.is_completed ? 0.6 : 1,
      }}
      onMouseOver={(e) => { 
        if(!quest.is_completed && !isActive) {
          e.currentTarget.style.borderColor = '#CBD5E1'; 
          e.currentTarget.style.backgroundColor = '#F8FAFC';
        }
      }}
      onMouseOut={(e) => { 
        if(!quest.is_completed && !isActive) {
          e.currentTarget.style.borderColor = '#E2E8F0'; 
          e.currentTarget.style.backgroundColor = '#FFFFFF';
        }
      }}
    >
      {/* Kotak Nomor (01, 02, dst) */}
      <div style={{ 
        width: '40px', height: '40px', borderRadius: '8px', flexShrink: 0,
        backgroundColor: isActive ? '#FFFFFF' : '#F1F5F9', 
        border: isActive ? 'none' : '1px solid #E2E8F0', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        color: '#0F172A', fontSize: '15px', fontWeight: '800'
      }}>
        {number}
      </div>

      {/* Konten Teks */}
      <div style={{ flex: 1, marginTop: '2px' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: isActive ? '#FFFFFF' : '#0F172A' }}>
          {quest.title}
        </h3>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: '400', color: isActive ? '#CBD5E1' : '#64748B', lineHeight: '1.5' }}>
          {quest.description}
        </p>
      </div>

      {/* Lencana Bintang Kanan Atas */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
        backgroundColor: isActive ? '#FFFFFF' : '#FFFBEB', 
        padding: '4px 8px', borderRadius: '99px' 
      }}>
        <IconStar />
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>
          {quest.is_completed ? 'Selesai' : `+${quest.reward_stars}`}
        </span>
      </div>
    </div>
  );
}

QuestCard.propTypes = {
  quest: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};