import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as tf from '@tensorflow/tfjs';
import { getFeedbackFromAI } from '../utils/aiService';
import { speakText } from '../utils/ttsService';
import TutorialModal from '../components/TutorialModal';
import LevelSelector from '../components/LevelSelector';
import ModuleDrawer from '../components/ModuleDrawer';
import EvaluationPanel from '../components/EvaluationPanel';
import GestureReferenceCard from '../components/GestureReferenceCard';

const IconList = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconBack = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

const ALPHABET_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

  // STATE APLIKASI
  const [modules, setModules] = useState([]); 
  const [currentModule, setCurrentModule] = useState(null);
  const [signStatus, setSignStatus] = useState("System Standby");
  const [aiMessage, setAiMessage] = useState("Menghubungkan ke server EduSync...");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [tfModel, setTfModel] = useState(null);

  // REFERENCES UNTUK MEMORI LOGIKA
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const currentStatusRef = useRef("");
  const autoEvaluateTimer = useRef(null);
  const isAiLocked = useRef(false);
  const pendingStatusRef = useRef("");
  const consecutiveFrameCount = useRef(0);
  const isGestureCorrect = useRef(false);
  const latestConfidenceRef = useRef(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  // 1. EFEK: FETCH DATA & LOAD TENSORFLOW
  useEffect(() => {
    if (selectedLevel) {
      setAiMessage(`Menyiapkan mesin AI dan mengunduh modul ${selectedLevel}...`);
      
      const levelParam = selectedLevel === 'huruf' ? 'abjad' : selectedLevel;
      const folderModel = selectedLevel === 'kata' ? 'kosakata' : levelParam;

      fetch(`${API_BASE_URL}/modules?level=${levelParam}`)
        .then(res => {
          if (!res.ok) throw new Error("Terjadi kesalahan koneksi ke server.");
          return res.json();
        })
        .then(data => {
          if(data.status === 'success' && data.data.length > 0) {
            setModules(data.data);
            setCurrentModule(data.data[0]); 
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

      const loadModel = async () => {
        if (tfModel) {
            tfModel.dispose(); 
        }
        try {
          const modelUrl = `http://127.0.0.1:8000/serve-ai/${folderModel}/model.json?v=${new Date().getTime()}`;
          const loadedModel = await tf.loadLayersModel(modelUrl);
          setTfModel(loadedModel);
          setAiMessage(`Sistem AI ${folderModel} aktif. Mulai peragakan gestur.`);
        } catch (error) {
          console.error("Gagal memuat AI model:", error);
          setAiMessage(`Gagal memuat otak AI untuk ${folderModel}. Pastikan file sudah dipindah ke foldernya.`);
        }
      };
      loadModel();
    }
  }, [selectedLevel, API_BASE_URL]);

  // 2. EFEK: RESET STATE SAAT GANTI MODUL
  useEffect(() => {
    if (currentModule) {
      setSignStatus("System Standby");
      setAiMessage(`Modul Aktif: ${currentModule.title}. Menunggu input gestur...`);
      isAiLocked.current = false;
      currentStatusRef.current = "";
      pendingStatusRef.current = "";
      consecutiveFrameCount.current = 0;
      latestConfidenceRef.current = 0;
      isGestureCorrect.current = false;
      clearTimeout(autoEvaluateTimer.current);
      
      setIsTutorialModalOpen(true);
    }
  }, [currentModule]);

  // 3. EFEK: PENDETEKSI KAMERA MEDIAPIPE & PREDIKSI AI
  useEffect(() => {
    if (!selectedLevel || !currentModule || !tfModel) return;
    if (isTutorialModalOpen) return;
    
    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.85 });

    hands.onResults((results) => {
      if (!canvasRef.current || !webcamRef.current) return;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvasCtx = canvasRef.current.getContext("2d");
      
      canvasCtx.save(); 
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-videoWidth, 0);

      let baseStatus = "No Detection";
      let displayPercentage = 0;
      
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        let flattened = [];

        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#111827', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
          
          for (const point of landmarks) {
            flattened.push(point.x, point.y, point.z);
          }
        }
        
        while (flattened.length < 126) {
          flattened.push(0.0, 0.0, 0.0);
        }

        let detectedLabel = "-";
        
        tf.tidy(() => {
          const inputTensor = tf.tensor2d([flattened.slice(0, 126)]);
          const prediction = tfModel.predict(inputTensor);
          
          const maxIndex = prediction.argMax(-1).dataSync()[0];
          const maxConfidence = prediction.max().dataSync()[0];
          
          displayPercentage = Math.round(maxConfidence * 100);
          
          if (displayPercentage > 35) { 
             if (selectedLevel === 'abjad') {
                 detectedLabel = ALPHABET_LABELS[maxIndex];
             } 
          }
        });

        latestConfidenceRef.current = displayPercentage;

        const isCorrect = (currentModule && detectedLabel === currentModule.target_gesture);
        isGestureCorrect.current = isCorrect;
        baseStatus = isCorrect ? `Valid: ${currentModule?.target_gesture}` : `Terdeteksi: ${detectedLabel}`;
      } else {
        isGestureCorrect.current = false;
        latestConfidenceRef.current = 0;
      }

      canvasCtx.restore(); 

      if (baseStatus === pendingStatusRef.current) {
        consecutiveFrameCount.current += 1;
      } else {
        pendingStatusRef.current = baseStatus;
        consecutiveFrameCount.current = 1;
      }

      if (consecutiveFrameCount.current >= 3) {
        const finalUIStatus = displayPercentage > 0 
          ? `${baseStatus} (${displayPercentage}%)` 
          : baseStatus;
          
        setSignStatus(finalUIStatus);
        handleAutoEvaluationLogic(baseStatus); 
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
    
  }, [currentModule, selectedLevel, tfModel, isTutorialModalOpen]); 

  // SISTEM PENGUNCI DAN EVALUASI MUTLAK (DENGAN AUTO-NEXT)
  const handleAutoEvaluationLogic = (status) => {
    if (status !== currentStatusRef.current) {
      currentStatusRef.current = status;
      isAiLocked.current = false;
      clearTimeout(autoEvaluateTimer.current);
      
      if (status !== "No Detection" && status !== "System Standby") {
        autoEvaluateTimer.current = setTimeout(() => { 
          // Panggil fungsi tanpa parameter, biarkan fungsi mengambil dari memori Ref
          triggerVoiceEvaluation(); 
        }, 1000); 
      }
    }
  };

  const triggerVoiceEvaluation = async () => {
    if (isAiLocked.current || isLoading || !currentModule) return;
    
    const finalConfidence = latestConfidenceRef.current;
    const finalValidity = isGestureCorrect.current;
    
    isAiLocked.current = true;
    setIsLoading(true);

    // OTOMATIS REKAM PROGRESS KE DATABASE LARAVEL
    fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, 
        module_id: currentModule.id,
        accuracy: finalConfidence
      })
    })
    .then(res => res.json())
    .then(data => console.log('Progres tersimpan di database:', data))
    .catch(err => console.error('Gagal menyimpan progres ke database:', err));

    // TOTAL BYPASS API & LOGIKA AUTO-NEXT (JIKA AKURASI >= 90%)
    if (finalValidity && finalConfidence >= 90) {
      const perfectMessage = `Luar biasa! Gestur ${currentModule.target_gesture} Anda sudah 100% sempurna dan tepat sesuai standar BISINDO.`;
      
      setAiMessage(perfectMessage);
      setIsLoading(false);
      speakText(`Sempurna! Gestur ${currentModule.target_gesture} Anda sudah sangat tepat.`, 
        () => setIsSpeaking(true), 
        () => setIsSpeaking(false)
      );
      
      // LOGIKA AUTO-NEXT (Otomatis pindah huruf)
      const currentIndex = modules.findIndex(m => m.id === currentModule.id);
      if (currentIndex !== -1 && currentIndex < modules.length - 1) {
        const nextModule = modules[currentIndex + 1];
        setTimeout(() => {
          setCurrentModule(nextModule);
        }, 3500); 
      } else {
        setTimeout(() => {
          setAiMessage("Selamat! Anda telah menyelesaikan seluruh modul di level ini dengan sempurna!");
        }, 3500);
      }
      
      return; 
    }

    // Jika di bawah 90% atau salah arah, panggil AI pembantu
    setAiMessage("Menganalisis perbaikan gestur Anda...");
    const reply = await getFeedbackFromAI(finalValidity, currentModule.target_gesture, finalConfidence);
    
    setAiMessage(reply);
    setIsLoading(false);
    speakText(reply, () => setIsSpeaking(true), () => setIsSpeaking(false));
  };

  if (!selectedLevel) {
    return (
      <LevelSelector 
        isDesktop={isDesktop}
        isTablet={isTablet}
        setSelectedLevel={setSelectedLevel}
      />
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
      
      <div style={{ padding: isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
        
        <button onClick={() => setSelectedLevel(null)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
          <IconBack />
          Kembali ke Pilihan Level
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', boxSizing: 'border-box' }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: isMobileScreen ? '20px' : '24px', fontWeight: '600', color: '#111827', textTransform: 'capitalize', letterSpacing: '-0.5px' }}>
              Ruang Evaluasi: {selectedLevel === 'abjad' ? 'Level Abjad' : selectedLevel === 'kata' ? 'Level Kosa Kata' : 'Level Kalimat'}
            </h2>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Praktikkan gestur di depan kamera.</p>
          </div>
          {!isMobileScreen && (
            <div style={{ padding: '6px 12px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : signStatus.includes("Terdeteksi") ? '#FFF8E1' : '#FAFAFA', color: signStatus.includes("Valid") ? '#1E8E3E' : signStatus.includes("Terdeteksi") ? '#F57F17' : '#4B5563', border: `1px solid ${signStatus.includes("Valid") ? '#CEEAD6' : signStatus.includes("Terdeteksi") ? '#FFE082' : '#EAEAEA'}`, borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              {signStatus}
            </div>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'minmax(0, 1.3fr) minmax(0, 1fr)' : '1fr', gap: '32px', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
          
          {/* KOLOM KIRI (KAMERA & REFERENSI) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            
            {isMobileScreen && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Status Sensor</span>
                <span style={{ fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '4px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : signStatus.includes("Terdeteksi") ? '#FFF8E1' : '#FAFAFA', color: signStatus.includes("Valid") ? '#1E8E3E' : signStatus.includes("Terdeteksi") ? '#F57F17' : '#4B5563', border: `1px solid ${signStatus.includes("Valid") ? '#CEEAD6' : signStatus.includes("Terdeteksi") ? '#FFE082' : '#EAEAEA'}`}}>
                  {signStatus}
                </span>
              </div>
            )}
            
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000000', border: '1px solid #EAEAEA', boxSizing: 'border-box' }}>
              <Webcam ref={webcamRef} mirrored={true} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            </div>
            
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
              <span style={{ color: '#9CA3AF', fontWeight: '500' }}>Ubah Modul</span>
            </button>
            
            {/* KOMPONEN REFERENSI  */}
            <GestureReferenceCard 
              currentModule={currentModule} 
              onOpenTutorial={() => setIsTutorialModalOpen(true)} 
            />

          </div>
          
          {/* KOMPONEN PANEL AI  */}
          <EvaluationPanel 
            isDesktop={isDesktop} 
            isLoading={isLoading} 
            isSpeaking={isSpeaking} 
            aiMessage={aiMessage} 
          />

        </div>
      </div>

      {/* MODAL & DRAWER  */}
      <ModuleDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        modules={modules}
        currentModule={currentModule}
        onSelectModule={(mod) => {
          setCurrentModule(mod);
          setIsDrawerOpen(false); 
        }}
        isMobileScreen={isMobileScreen}
      />

      <TutorialModal 
        isOpen={isTutorialModalOpen} 
        onClose={() => setIsTutorialModalOpen(false)} 
        module={currentModule} 
      />

    </main>
  );
}

InteractiveModule.propTypes = {
  selectedLevel: PropTypes.string,
  setSelectedLevel: PropTypes.func.isRequired,
};