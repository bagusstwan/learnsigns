import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { detectSignA, detectSignB } from '../utils/gestureRecognizer';
import { getFeedbackFromAI } from '../utils/aiService';
import { speakText } from '../utils/ttsService';
import Mascot from '../components/Mascot';

/* IKON MINIMALIS ENTERPRISE */
const IconGuide = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const IconLetter = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L12 4l4 16h4"></path><path d="M6.5 14h11"></path></svg>;
const IconWord = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const IconSentence = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const IconList = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function InteractiveModule({ selectedLevel, setSelectedLevel }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobileScreen = windowWidth < 768;

  /* STATE API & LOGIKA BISNIS */
  const [modules, setModules] = useState([]); 
  const [currentModule, setCurrentModule] = useState(null);
  const [signStatus, setSignStatus] = useState("System Standby");
  const [aiMessage, setAiMessage] = useState("Menghubungkan ke server EduSync...");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  /* STATE UNTUK SLIDE-OVER DRAWER MODUL */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const isGestureCorrect = useRef(false);
  const currentStatusRef = useRef("");
  const autoEvaluateTimer = useRef(null);
  const isAiLocked = useRef(false);
  const pendingStatusRef = useRef("");
  const consecutiveFrameCount = useRef(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  /* FETCHING DATA DARI LARAVEL BERDASARKAN LEVEL */
  useEffect(() => {
    if (selectedLevel) {
      setAiMessage("Mengunduh modul dari database pusat...");
      
      const levelParam = selectedLevel === 'huruf' ? 'abjad' : selectedLevel;

      fetch(`${API_BASE_URL}/modules?level=${levelParam}`)
        .then(res => {
          if (!res.ok) throw new Error("Terjadi kesalahan koneksi ke server.");
          return res.json();
        })
        .then(data => {
          if(data.status === 'success' && data.data.length > 0) {
            setModules(data.data);
            setCurrentModule(data.data[0]); 
            setAiMessage("Modul siap digunakan. Mulai peragakan gestur.");
          } else {
             setAiMessage("Modul untuk level ini belum tersedia di database.");
             setModules([]);
             setCurrentModule(null);
          }
        })
        .catch(err => {
          console.error("API Error:", err);
          setAiMessage("Gagal terhubung ke database. Pastikan server Laravel menyala.");
        });
    }
  }, [selectedLevel, API_BASE_URL]);

  useEffect(() => {
    if (currentModule) {
      setSignStatus("System Standby");
      setAiMessage(`Modul Aktif: ${currentModule.title}. Menunggu input gestur...`);
      isAiLocked.current = false;
      currentStatusRef.current = "";
      pendingStatusRef.current = "";
      consecutiveFrameCount.current = 0;
      clearTimeout(autoEvaluateTimer.current);
    }
  }, [currentModule]);

  useEffect(() => {
    if (!selectedLevel || !currentModule) return;
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
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#111827', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
        }
        
        const landmarks = results.multiHandLandmarks[0];
        let isCorrect = false;
        
        if (currentModule) {
          if (currentModule.target_gesture === "A") isCorrect = detectSignA(landmarks);
          else if (currentModule.target_gesture === "B") isCorrect = detectSignB(landmarks);
        }
        
        isGestureCorrect.current = isCorrect;
        newStatus = isCorrect ? `Valid: ${currentModule?.target_gesture}` : `Invalid Gesture`;
      } else {
        isGestureCorrect.current = false;
      }

      if (newStatus === pendingStatusRef.current) {
        consecutiveFrameCount.current += 1;
      } else {
        pendingStatusRef.current = newStatus;
        consecutiveFrameCount.current = 1;
      }

      if (consecutiveFrameCount.current >= 5) {
        setSignStatus(newStatus);
        handleAutoEvaluationLogic(newStatus);
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
    return () => { clearTimeout(autoEvaluateTimer.current); if (cameraInstance) cameraInstance.stop(); hands.close(); };
    
  }, [currentModule, selectedLevel]);

  const handleAutoEvaluationLogic = (status) => {
    if (status !== currentStatusRef.current) {
      currentStatusRef.current = status;
      isAiLocked.current = false;
      clearTimeout(autoEvaluateTimer.current);
      if (status !== "No Detection" && status !== "System Standby") {
        autoEvaluateTimer.current = setTimeout(() => { triggerVoiceEvaluation(); }, 3000); 
      }
    }
  };

  const triggerVoiceEvaluation = async () => {
    if (isAiLocked.current || isLoading || !currentModule) return;
    isAiLocked.current = true;
    setIsLoading(true);
    setAiMessage("Menganalisis matriks koordinat gestur...");
    const reply = await getFeedbackFromAI(isGestureCorrect.current, currentModule.target_gesture);
    setAiMessage(reply);
    setIsLoading(false);
    speakText(reply, () => setIsSpeaking(true), () => setIsSpeaking(false));
  };

  // =========================================================================
  // VIEW 1: HALAMAN PEMILIHAN LEVEL (Menu Utama Modul)
  // =========================================================================
  if (!selectedLevel) {
    return (
      <main style={{ flex: 1, padding: isDesktop ? '64px 80px' : isTablet ? '40px 48px' : '32px 20px', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          
          <h1 style={{ margin: '0 0 12px 0', fontSize: isDesktop ? '28px' : '24px', fontWeight: '600', letterSpacing: '-0.5px', color: '#111827' }}>
            Pilih Tingkat Pembelajaran
          </h1>
          <p style={{ margin: '0 0 48px 0', fontSize: '15px', color: '#6B7280', maxWidth: '600px', lineHeight: '1.6' }}>
            Platform EduSync dirancang bertahap. Silakan pilih level modul yang ingin Anda praktikkan hari ini bersama AI Assistant kami.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '20px' }}>
            {[
              {id: 'abjad', title: 'Level 1: Abjad', desc: 'Pelajari dasar pengenalan isyarat per huruf untuk membentuk fondasi yang kuat.', icon: <IconLetter />},
              {id: 'kata', title: 'Level 2: Kosa Kata', desc: 'Gabungkan huruf menjadi kata umum yang sering digunakan sehari-hari.', icon: <IconWord />},
              {id: 'kalimat', title: 'Level 3: Kalimat', desc: 'Praktik merangkai gestur secara berkesinambungan membentuk kalimat penuh.', icon: <IconSentence />}
            ].map((lvl) => (
              <div 
                key={lvl.id} 
                onClick={() => setSelectedLevel(lvl.id)} 
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '28px 24px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }} 
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }} 
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#111827' }}>
                  {lvl.icon}
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '600', color: '#111827' }}>{lvl.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>{lvl.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW 2: HALAMAN RUANG EVALUASI (KAMERA & AI)
  // =========================================================================
  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
      
      <div style={{ padding: isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
        
        {/* Navigasi Back */}
        <button onClick={() => setSelectedLevel(null)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
          ← Kembali ke Pilihan Level
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', boxSizing: 'border-box' }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: isMobileScreen ? '20px' : '24px', fontWeight: '600', color: '#111827', textTransform: 'capitalize', letterSpacing: '-0.5px' }}>
              Ruang Evaluasi: {selectedLevel === 'abjad' ? 'Level Abjad' : selectedLevel === 'kata' ? 'Level Kosa Kata' : 'Level Kalimat'}
            </h2>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>
              Praktikkan gestur di depan kamera.
            </p>
          </div>
          {!isMobileScreen && (
            <div style={{ padding: '6px 12px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : signStatus.includes("Invalid") ? '#FCE8E6' : '#FAFAFA', color: signStatus.includes("Valid") ? '#1E8E3E' : signStatus.includes("Invalid") ? '#D93025' : '#4B5563', border: `1px solid ${signStatus.includes("Valid") ? '#CEEAD6' : signStatus.includes("Invalid") ? '#FAD2CF' : '#EAEAEA'}`, borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              {signStatus}
            </div>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'minmax(0, 1.3fr) minmax(0, 1fr)' : '1fr', gap: '32px', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
          
          {/* KOLOM KIRI: KAMERA SENSOR & REFERENSI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            
            {isMobileScreen && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Status Sensor</span>
                <span style={{ fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '4px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : signStatus.includes("Invalid") ? '#FCE8E6' : '#FAFAFA', color: signStatus.includes("Valid") ? '#1E8E3E' : signStatus.includes("Invalid") ? '#D93025' : '#4B5563', border: `1px solid ${signStatus.includes("Valid") ? '#CEEAD6' : signStatus.includes("Invalid") ? '#FAD2CF' : '#EAEAEA'}`}}>
                  {signStatus}
                </span>
              </div>
            )}
            
            {/* KAMERA 4:3 PROPORSI DIBESARKAN KE BAWAH */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000000', border: '1px solid #EAEAEA', boxSizing: 'border-box' }}>
              <Webcam ref={webcamRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            </div>
            
            {/* Tombol Pemanggil Slide-Over Drawer Pembelajaran */}
            <button 
              onClick={() => setIsDrawerOpen(true)} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#111827' }}><IconList /></div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Pilih Modul Pembelajaran</h4>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Tersedia {modules.length} modul aktif di level ini.</span>
                </div>
              </div>
              <span style={{ color: '#9CA3AF', fontWeight: '500' }}>Ubah →</span>
            </button>
            
            {/* Detail Referensi */}
            {currentModule && (
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
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#6B7280' }}><IconGuide /></span>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Target: {currentModule.target_gesture}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.6' }}>{currentModule.description || "Deskripsi panduan belum tersedia di database."}</p>
                </div>
              </div>
            )}

          </div>
          
          {/* KOLOM KANAN: AI ASSISTANT PANEL */}
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
                <span style={{ fontSize: '12px', color: '#6B7280' }}>{isLoading ? "Memproses inferensi..." : isSpeaking ? "Menyampaikan umpan balik" : "Menunggu input gestur"}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER MODAL (Daftar Modul) */}
      {/* ========================================================================= */}
      
      {/* Backdrop */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, transition: 'all 0.3s ease-in-out',
          opacity: isDrawerOpen ? 1 : 0, pointerEvents: isDrawerOpen ? 'auto' : 'none'
        }}
      />

      {/* Panel Drawer */}
      <div style={{
        position: 'fixed', 
        top: 0, 
        bottom: 0, 
        right: 0, 
        width: isMobileScreen ? '100%' : '400px', 
        backgroundColor: '#FFFFFF', 
        borderLeft: '1px solid #EAEAEA', 
        boxShadow: '-8px 0 24px rgba(0,0,0,0.05)', 
        zIndex: 105, 
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)', 
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>Daftar Modul Tersedia</h3>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Pilih materi untuk dipelajari.</span>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: '4px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#9CA3AF'}><IconClose /></button>
        </div>

        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setCurrentModule(mod);
                setIsDrawerOpen(false); // Tutup drawer otomatis setelah milih
              }}
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

    </main>
  );
}

InteractiveModule.propTypes = {
  selectedLevel: PropTypes.string,
  setSelectedLevel: PropTypes.func.isRequired,
};