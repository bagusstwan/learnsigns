import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { detectSignA, detectSignB } from '../utils/gestureRecognizer';
import Mascot from '../components/Mascot';

const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconTarget = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const IconBack = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

export default function QuestPage() {
  /* --- SISTEM PENDETEKSI UKURAN LAYAR --- */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobileScreen = windowWidth < 768;

  /* DATA MOCK */
  const mockQuests = [
    { id: 1, title: "Pemanasan Isyarat", target: "A", reward: 50, desc: "Tunjukkan gestur huruf A dengan akurasi tinggi dan stabil." },
    { id: 2, title: "Tantangan Konsistensi", target: "B", reward: 100, desc: "Tahan gestur huruf B secara statis selama beberapa detik." },
    { id: 3, title: "Fokus Transisi", target: "A", reward: 250, desc: "Misi spesial: Bentuk isyarat secara cepat tanpa ragu." }
  ];

  const [activeQuest, setActiveQuest] = useState(null); 
  const [signStatus, setSignStatus] = useState("Menunggu input...");
  const [aiMessage, setAiMessage] = useState("Arahkan tangan ke kamera untuk memulai misi.");
  const [isThinking, setIsThinking] = useState(false);
  const [totalStars, setTotalStars] = useState(120);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const consecutiveFrameCount = useRef(0);
  const pendingStatusRef = useRef("");

  useEffect(() => {
    if (activeQuest) {
      setSignStatus("System Standby");
      setAiMessage(`Misi aktif: ${activeQuest.title}. Menunggu input gestur...`);
      consecutiveFrameCount.current = 0;
      pendingStatusRef.current = "";
    }
  }, [activeQuest]);

  useEffect(() => {
    if (!activeQuest) return;

    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.7 });

    hands.onResults((results) => {
      if (!canvasRef.current || !webcamRef.current) return;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

      let newStatus = "No Detection";
      
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#F59E0B', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
        }
        
        const landmarks = results.multiHandLandmarks[0];
        let isCorrect = false;
        
        if (activeQuest.target === "A") isCorrect = detectSignA(landmarks);
        else if (activeQuest.target === "B") isCorrect = detectSignB(landmarks);
        
        newStatus = isCorrect ? `Valid: Target ${activeQuest.target} Terdeteksi` : `Invalid Gesture`;
      }

      if (newStatus === pendingStatusRef.current) {
        consecutiveFrameCount.current += 1;
      } else {
        pendingStatusRef.current = newStatus;
        consecutiveFrameCount.current = 1;
      }

      if (consecutiveFrameCount.current >= 5) {
        setSignStatus(newStatus);
        if (newStatus.includes("Valid") && !isThinking) {
          setIsThinking(true);
          setAiMessage("Menganalisis stabilitas dan akurasi gestur...");
          setTimeout(() => {
            setAiMessage(`Misi Sukses! Anda mendapatkan +${activeQuest.reward} Bintang!`);
            setTotalStars(prev => prev + activeQuest.reward);
            setIsThinking(false);
          }, 2000);
        }
      }
    });

    let cameraInstance = null;
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      cameraInstance = new Camera(webcamRef.current.video, {
        onFrame: async () => { await hands.send({ image: webcamRef.current.video }); },
        width: 640, height: 480
      });
      cameraInstance.start();
    }
    
    return () => { if (cameraInstance) cameraInstance.stop(); hands.close(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuest, isThinking]);

  // =========================================================================
  // VIEW 1: DAFTAR MISI
  // =========================================================================
  if (!activeQuest) {
    return (
      <main style={{ flex: 1, padding: isDesktop ? '64px 80px' : isTablet ? '40px 48px' : '32px 20px', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h1 style={{ margin: '0 0 12px 0', fontSize: isDesktop ? '32px' : isTablet ? '28px' : '24px', fontWeight: '700', letterSpacing: '-1px', color: '#111827' }}>
                Papan Misi Harian
              </h1>
              <p style={{ margin: 0, fontSize: '15px', color: '#6B7280', maxWidth: '500px', lineHeight: '1.6' }}>
                Selesaikan tantangan di bawah ini untuk mengumpulkan bintang dan raih posisi puncak di Leaderboard EduSync.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '10px 20px', borderRadius: '50px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <IconStar />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#B45309' }}>{totalStars} Bintang</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '20px' }}>
            {mockQuests.map((quest) => (
              <div 
                key={quest.id}
                onClick={() => setActiveQuest(quest)}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '28px 24px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827' }}>
                    <IconTarget />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '4px' }}>
                    <IconStar />
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>+{quest.reward}</span>
                  </div>
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>{quest.title}</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#6B7280', lineHeight: '1.6', flexGrow: 1 }}>{quest.desc}</p>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827', backgroundColor: '#F3F4F6', padding: '8px 12px', borderRadius: '6px', alignSelf: 'flex-start' }}>
                  Target: Gestur {quest.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW 2: EKSEKUSI MISI (DIPERBAIKI AGAR TIDAK HORIZONTAL SCROLL)
  // =========================================================================
  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
      
      {/* Container ini dipastikan boxSizing border-box */}
      <div style={{ padding: isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Header Ruang Misi */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px', boxSizing: 'border-box' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <button 
              onClick={() => setActiveQuest(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: '0', marginBottom: '16px' }}
            >
              <IconBack /> Kembali ke Papan Misi
            </button>
            <h2 style={{ margin: '0 0 8px 0', fontSize: isMobileScreen ? '22px' : '28px', fontWeight: '700', letterSpacing: '-0.8px', color: '#111827' }}>
              Eksekusi Misi: {activeQuest.title}
            </h2>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>
              Selesaikan target gestur untuk mendapatkan hadiah bintang.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '10px 20px', borderRadius: '50px' }}>
            <IconStar />
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#B45309' }}>Total: {totalStars}</span>
          </div>
        </div>

        {/* WADAH UTAMA FLEKSIBEL (Kiri Kanan di Desktop, Atas Bawah di Mobile) */}
        <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: '24px', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
          
          {/* KOLOM KIRI: KAMERA SENSOR */}
          <div style={{ flex: isDesktop ? '1.3' : 'none', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vision Sensor</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : signStatus.includes("Invalid") ? '#FCE8E6' : '#F3F4F6', color: signStatus.includes("Valid") ? '#1E8E3E' : signStatus.includes("Invalid") ? '#D93025' : '#4B5563', border: `1px solid ${signStatus.includes("Valid") ? '#CEEAD6' : signStatus.includes("Invalid") ? '#FAD2CF' : '#E5E7EB'}`}}>
                {signStatus}
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000000', border: '1px solid #EAEAEA', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', boxSizing: 'border-box' }}>
              <Webcam ref={webcamRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            </div>

            {/* KOTAK INFO MISI SAAT INI (Ditambahkan boxSizing) */}
            <div style={{ marginTop: '4px', padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target: {activeQuest.target}</h3>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>Hadiah: +{activeQuest.reward}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>{activeQuest.desc}</p>
            </div>

          </div>

          {/* KOLOM KANAN: AI ASSISTANT PANEL (Ditambahkan boxSizing) */}
          <div style={{ flex: isDesktop ? '1' : 'none', display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '32px 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', minHeight: isDesktop ? '520px' : 'auto', boxSizing: 'border-box' }}>
            
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
              <Mascot isThinking={isThinking} />
            </div>

            <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '24px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quest Log Evaluator</span>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#111827', fontWeight: '500', backgroundColor: '#FAFAFA', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #F59E0B', boxSizing: 'border-box' }}>
                <span style={{ color: '#B45309', fontWeight: '700', display: 'block', marginBottom: '4px' }}>AI System:</span> 
                {aiMessage}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}