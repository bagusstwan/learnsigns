import Lottie from 'lottie-react';
import PropTypes from 'prop-types';

import catWaitingAnim from '../assets/Loader-cat.json';
import loadingAnim from '../assets/Scene.json';

export default function Mascot({ isThinking }) {
  
  if (isThinking) {
    return (
      <div style={{ width: '100%', maxWidth: '350px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1', overflow: 'visible' }}>
        <Lottie animationData={loadingAnim} loop={true} style={{ width: '100%', height: '100%', transform: 'scale(1.3)' }} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '350px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1', overflow: 'visible' }}>
      <Lottie animationData={catWaitingAnim} loop={true} style={{ width: '100%', height: '100%', transform: 'scale(1.6) translateY(-8%)', transformOrigin: 'center center' }} />
    </div>
  );
}

// Validasi PropTypes
Mascot.propTypes = {
  isThinking: PropTypes.bool.isRequired,
};