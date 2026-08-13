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
import ModuleDrawer from '../components/ModuleDrawer';
import EvaluationPanel from '../components/EvaluationPanel';
import GestureReferenceCard from '../components/GestureReferenceCard';

const IconList = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconBack = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconStar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconAlertTriangle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const IconCheckCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

const ALPHABET_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const DYNAMIC_LABELS = ['BANYAK PIKIRAN', 'CEMAS', 'KECEWA', 'KELELAHAN', 'LUPA', 'MALAS', 'MANDIRI', 'MARAH', 'PENOLAKAN', 'SEMANGAT', 'SENANG', 'TAKUT'];

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

  const userStr = localStorage.getItem('user') || '';
  let isEducator = false;
  const isEducatorRef = useRef(false);
  
  if (userStr.toLowerCase().includes('teacher')) {
     isEducator = true;
     isEducatorRef.current = true;
  }
  
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

  const [modules, setModules] = useState([]); 
  const [currentModule, setCurrentModule] = useState(null);
  const [signStatus, setSignStatus] = useState("System Standby");
  const [aiMessage, setAiMessage] = useState("Menghubungkan ke peladen utama EduSync...");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [tfModel, setTfModel] = useState(null);

  const [studentsData, setStudentsData] = useState([]);
  const [isLiveEvalOpen, setIsLiveEvalOpen] = useState(false);
  const [evalSearchQuery, setEvalSearchQuery] = useState("");
  const [evalSelectedStudent, setEvalSelectedStudent] = useState(null);
  const [evalStars, setEvalStars] = useState(10);
  const [isSubmittingEval, setIsSubmittingEval] = useState(false);

  const [statusModal, setStatusModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const isAiLocked = useRef(false);
  const pendingStatusRef = useRef("");
  const consecutiveFrameCount = useRef(0);
  const latestConfidenceRef = useRef(0);
  const successFrameCount = useRef(0);

  const sequenceBufferRef = useRef([]);
  const isOverlayOpen = useRef(false);
  const missingHandCount = useRef(0);

  useEffect(() => {
      isOverlayOpen.current = isTutorialModalOpen || isLiveEvalOpen || statusModal.isOpen;
  }, [isTutorialModalOpen, isLiveEvalOpen, statusModal.isOpen]);

  const showNotification = (title, message, type) => {
    setStatusModal({ isOpen: true, title, message, type });
  };

  useEffect(() => {
    if (selectedLevel) {
      setAiMessage(`Menyiapkan mesin kecerdasan buatan untuk modul ${selectedLevel}`);
      
      const levelParam = selectedLevel === 'huruf' ? 'abjad' : selectedLevel;
      const folderModel = selectedLevel === 'kata' ? 'kosakata' : levelParam;

      fetch(`${API_BASE_URL}/modules?level=${levelParam}`)
        .then(res => {
          if (!res.ok) throw new Error("Terjadi kegagalan koneksi jaringan");
          return res.json();
        })
        .then(data => {
          if(data.status === 'success' && data.data.length > 0) {
            setModules(data.data);
            setCurrentModule(data.data[0]); 
          } else {
             setAiMessage("Modul untuk tingkatan ini belum tersedia di basis data");
             setModules([]);
             setCurrentModule(null);
          }
        })
        .catch(err => {
          console.error("System Error", err);
          setAiMessage("Gagal terhubung ke basis data utama");
        });

      const loadModel = async () => {
        if (tfModel) tfModel.dispose(); 
        try {
          const modelUrl = `http://127.0.0.1:8000/serve-ai/${folderModel}/model.json?v=${new Date().getTime()}`;
          const loadedModel = await tf.loadLayersModel(modelUrl);
          setTfModel(loadedModel);
          setAiMessage(`Mesin AI ${folderModel} aktif. Silakan mulai peragakan gestur.`);
        } catch (error) {
          console.error("Failed loading model", error);
          setAiMessage(`Kegagalan memuat parameter model untuk ${folderModel}`);
        }
      };
      loadModel();
    }
  }, [selectedLevel, API_BASE_URL]);

  useEffect(() => {
    if (isEducator && token) {
      fetch(`${API_BASE_URL}/educator/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStudentsData(data.data.students || []);
        }
      })
      .catch(err => console.error("Failed fetching student list", err));
    }
  }, [isEducator, token, API_BASE_URL]);

  useEffect(() => {
    if (currentModule) {
      setSignStatus("Menunggu input visual tangan...");
      setAiMessage(`Modul Terpilih: ${currentModule.title}. Menunggu input visual...`);
      isAiLocked.current = false;
      pendingStatusRef.current = "";
      consecutiveFrameCount.current = 0;
      successFrameCount.current = 0;
      latestConfidenceRef.current = 0;
      sequenceBufferRef.current = [];
      missingHandCount.current = 0;
      setIsTutorialModalOpen(true);
    }
  }, [currentModule]);

  useEffect(() => {
    if (!selectedLevel || !currentModule) return;
    
    let isRunning = true; 
    
    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.85 });

    hands.onResults((results) => {
      if (!isRunning) return; 

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

      const isDynamicMode = selectedLevel !== 'abjad' && selectedLevel !== 'huruf';
      let extractedFrame = new Array(126).fill(0.0);
      let isHandPresent = false;

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        isHandPresent = true;
        missingHandCount.current = 0; 
        
        let flattened = [];
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#0F172A', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
          for (const point of landmarks) {
            flattened.push(point.x, point.y, point.z);
          }
        }
        
        while (flattened.length < 126) {
          flattened.push(0.0, 0.0, 0.0);
        }
        extractedFrame = flattened.slice(0, 126);
      } else {
        missingHandCount.current += 1;
      }

      if (isOverlayOpen.current) {
          setSignStatus("Sensor Siaga (Menunggu Konfirmasi)");
          canvasCtx.restore();
          return;
      }

      /** MANAJEMEN BUFFER CERDAS ANTI-HALUSINASI */
      if (isDynamicMode) {
          if (isHandPresent) {
              sequenceBufferRef.current.push(extractedFrame);
          } else if (!isHandPresent && sequenceBufferRef.current.length > 0 && missingHandCount.current < 15) {
              // KUNCI PERBAIKAN 1: Gunakan Frame Terakhir (Freeze Position), BUKAN NOL!
              const lastFrame = sequenceBufferRef.current[sequenceBufferRef.current.length - 1];
              sequenceBufferRef.current.push(lastFrame);
          } else if (missingHandCount.current >= 15) {
              // Tangan hilang total, buang semua memori
              sequenceBufferRef.current = [];
              successFrameCount.current = 0;
              consecutiveFrameCount.current = 0;
          }

          if (sequenceBufferRef.current.length > 60) {
              sequenceBufferRef.current.shift();
          }
      }

      /** LOGIKA PREDIKSI AI */
      // KUNCI PERBAIKAN 2: Jangan tebak jika tangan hilang lebih dari 5 frame
      let shouldPredictDynamic = isDynamicMode && sequenceBufferRef.current.length === 60 && missingHandCount.current <= 5;
      let shouldPredictStatic = !isDynamicMode && isHandPresent;

      if (tfModel && (shouldPredictStatic || shouldPredictDynamic)) {
           let displayPercentage = 0;
           let detectedLabel = "Blank";

           try {
             if (!isDynamicMode) {
                 tf.tidy(() => {
                   const inputTensor = tf.tensor2d([extractedFrame]);
                   const prediction = tfModel.predict(inputTensor);
                   const maxIndex = prediction.argMax(-1).dataSync()[0];
                   displayPercentage = Math.round(prediction.max().dataSync()[0] * 100);
                   detectedLabel = ALPHABET_LABELS[maxIndex];
                 });
             } else {
                 tf.tidy(() => {
                   const inputTensor = tf.tensor3d([sequenceBufferRef.current]);
                   const prediction = tfModel.predict(inputTensor);
                   const maxIndex = prediction.argMax(-1).dataSync()[0];
                   displayPercentage = Math.round(prediction.max().dataSync()[0] * 100);
                   detectedLabel = DYNAMIC_LABELS[maxIndex];
                 });
             }
           } catch (e) { 
             console.error("Tensor Error", e); 
           }
           
           const isCorrect = (currentModule && detectedLabel === currentModule.target_gesture);
           let baseStatus = isCorrect 
                ? `Mendeteksi ${currentModule?.target_gesture}` 
                : `Menganalisis kecocokan gestur...`;

           // Setting threshold and required frames based on mode
           const confidenceThreshold = isDynamicMode ? 50 : 80;
          const requiredFrames = isDynamicMode ? 8 : 15;

           if (isCorrect && displayPercentage >= confidenceThreshold) {
             successFrameCount.current += 1;
             
             if (successFrameCount.current >= requiredFrames) {
                if (!isAiLocked.current) {
                   isAiLocked.current = true;
                   latestConfidenceRef.current = displayPercentage;
                   setSignStatus(`${baseStatus} ${displayPercentage} Persen`);
                   executeGradedEvaluation(displayPercentage);
                }
             } else {
                setSignStatus(`Memvalidasi Posisi ${successFrameCount.current} dari ${requiredFrames} (${displayPercentage}%)`);
             }
           } else {
             successFrameCount.current = 0;
             
             if (baseStatus === pendingStatusRef.current) {
                consecutiveFrameCount.current += 1;
             } else {
                pendingStatusRef.current = baseStatus;
                consecutiveFrameCount.current = 1;
             }

             if (consecutiveFrameCount.current >= 30 && displayPercentage > 40) {
                if (!isAiLocked.current) {
                   isAiLocked.current = true;
                   latestConfidenceRef.current = displayPercentage;
                   executeErrorAnalysis(detectedLabel, displayPercentage);
                }
             }
             
             if (consecutiveFrameCount.current >= 3) {
                setSignStatus(`${baseStatus} (${displayPercentage}%)`);
             }
           }
      } else {
          if (isDynamicMode) {
              if (sequenceBufferRef.current.length > 0 && sequenceBufferRef.current.length < 60) {
                  setSignStatus(`Mengumpulkan Matriks Gerakan ${sequenceBufferRef.current.length} dari 60`);
              } else if (missingHandCount.current > 5) {
                  setSignStatus("Kehilangan Jejak Sensor (Tangan Tidak Terlihat)");
              }
          } else {
              setSignStatus("Menunggu input visual tangan...");
          }
      }
      
      canvasCtx.restore(); 
    });

    let cameraInstance = null;
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      cameraInstance = new Camera(webcamRef.current.video, {
        onFrame: async () => { 
            if (isRunning && webcamRef.current && webcamRef.current.video) {
                try {
                    await hands.send({ image: webcamRef.current.video }); 
                } catch (err) {}
            }
        },
        width: 640, height: 480
      });
      cameraInstance.start();
    }
    
    return () => { 
        isRunning = false; 
        if (cameraInstance) cameraInstance.stop(); 
        try { hands.close(); } catch(e) {}
    };
    
  }, [currentModule, selectedLevel, tfModel]); 

  const executeGradedEvaluation = (confidence) => {
    setIsLoading(true);
    let message = "";
    let isPass = false;

    if (confidence >= 80) {
        message = `Sangat bagus dan sempurna! Gestur ${currentModule?.target_gesture} Anda terdeteksi dengan akurasi ${confidence} persen.`;
        setSignStatus(`Lulus Sempurna (${confidence}%)`);
        isPass = true;
    } else if (confidence >= 45 && confidence < 80) {
        message = `Sudah bagus! Gestur ${currentModule?.target_gesture} Anda terdeteksi dengan akurasi ${confidence} persen.`;
        setSignStatus(`Lulus Memuaskan (${confidence}%)`);
        isPass = true;
    } else {
        message = `Akurasi Anda ${confidence} persen. Anda harus lebih belajar lagi untuk gestur ${currentModule?.target_gesture}.`;
        setSignStatus(`Gagal Memenuhi Target (${confidence}%)`);
        isPass = false; 
    }
    
    setAiMessage(message);
    speakText(message, () => setIsSpeaking(true), () => setIsSpeaking(false));
    
    if (!isPass) {
        setTimeout(() => {
            setIsLoading(false);
            isAiLocked.current = false;
            setSignStatus("Silakan ulangi gerakan...");
            sequenceBufferRef.current = [];
        }, 4000);
    } else {
        if (isEducatorRef.current) {
           setTimeout(() => {
             setIsLoading(false);
             setIsLiveEvalOpen(true);
           }, 1500);
        } else {
           savePersonalProgress(confidence);
        }
    }
  };

  const executeErrorAnalysis = async (detectedLabel, confidence) => {
    setIsLoading(true);
    setAiMessage("Menganalisis perbaikan gerakan...");
    const reply = await getFeedbackFromAI(false, currentModule.target_gesture, confidence);
    
    setAiMessage(reply);
    setIsLoading(false);
    speakText(reply, () => setIsSpeaking(true), () => setIsSpeaking(false));
    
    setTimeout(() => { 
        isAiLocked.current = false; 
        sequenceBufferRef.current = [];
        setSignStatus("System Standby");
    }, 3500);
  };

  const executeNextModuleTransition = () => {
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);
    if (currentIndex !== -1 && currentIndex < modules.length - 1) {
      const nextModule = modules[currentIndex + 1];
      setTimeout(() => {
        setCurrentModule(nextModule);
      }, 2000); 
    } else {
      setTimeout(() => {
        setAiMessage("Selamat Anda telah menyelesaikan seluruh rangkaian modul pada tingkat ini.");
      }, 2000);
    }
  };

  const savePersonalProgress = (accuracy) => {
    fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ module_id: currentModule.id, accuracy: accuracy })
    })
    .then(res => res.json())
    .then(() => { setIsLoading(false); executeNextModuleTransition(); })
    .catch(err => { console.error('Data logging issue', err); setIsLoading(false); executeNextModuleTransition(); });
  };

  const handleLiveEvaluationSubmit = async (e) => {
    e.preventDefault();
    if (!evalSelectedStudent || evalStars < 1) {
       showNotification("Data Tidak Lengkap", "Harap lengkapi target murid dan jumlah bintang evaluasi sebelum menyimpan", "warning");
       return;
    }
    
    setIsSubmittingEval(true);
    try {
      const response = await fetch(`${API_BASE_URL}/educator/live-evaluate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          student_id: evalSelectedStudent.id, 
          module_id: currentModule.id, 
          stars_earned: evalStars, 
          accuracy: latestConfidenceRef.current 
        })
      });

      const responseText = await response.text(); 
      let responseData;
      
      try {
          responseData = JSON.parse(responseText);
      } catch (parseError) {
          console.error("Peladen merespons dengan HTML Format Tidak Valid", responseText);
          showNotification("Kesalahan Peladen Server", "Peladen utama menolak permintaan. Silakan periksa Terminal Laravel Anda", "error");
          setIsSubmittingEval(false);
          isAiLocked.current = false;
          return;
      }

      if (response.ok) {
        setIsLiveEvalOpen(false); 
        setEvalSelectedStudent(null); 
        setEvalSearchQuery(""); 
        setEvalStars(10); 
        showNotification("Evaluasi Berhasil", "Hasil praktikum murid berhasil direkam ke dalam sistem peladen", "success");
        executeNextModuleTransition();
      } else {
        showNotification("Gagal Menyimpan", responseData.message || "Pencatatan kelas gagal dieksekusi oleh peladen", "error");
      }
    } catch (error) {
      console.error("Fetch Network Error", error);
      showNotification("Koneksi Terputus", `Gagal menghubungi peladen. Pesan Sistem: ${error.message}`, "error");
    } finally {
      setIsSubmittingEval(false); 
      isAiLocked.current = false;
    }
  };

  const filteredStudents = (studentsData || []).filter(student => 
    (student?.name || '').toLowerCase().includes(evalSearchQuery.toLowerCase())
  );

  const inputStyleEnterprise = { width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#FFFFFF', color: '#0F172A' };

  const isSignValid = signStatus.includes("Lulus") || signStatus.includes("Valid") || signStatus.includes("Memvalidasi Posisi") || signStatus.includes("Mengumpulkan");
  const isSignDetected = signStatus.includes("Terdeteksi") || signStatus.includes("Gagal");
  const statusColor = isSignValid ? '#10B981' : (isSignDetected ? '#F59E0B' : '#64748B');

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#F8FAFC' }}>
      
      <div style={{ padding: isDesktop ? '40px 48px' : isTablet ? '32px 32px' : '24px 16px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
        
        <div style={{ display: 'flex', flexDirection: isMobileScreen ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobileScreen ? 'flex-start' : 'flex-end', gap: '20px', marginBottom: '32px' }}>
          <div>
            <span 
              onClick={() => setSelectedLevel(null)} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#64748B', fontStyle: 'italic', cursor: 'pointer', marginBottom: '8px', transition: '0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#0F172A'}
              onMouseOut={e => e.currentTarget.style.color = '#64748B'}
            >
              
            </span>
            <h1 style={{ margin: '0 0 8px 0', fontSize: isMobileScreen ? '28px' : '36px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>
              Sesi Penilaian Tingkat {selectedLevel === 'abjad' ? 'Abjad' : selectedLevel === 'kata' ? 'Kosa Kata' : 'Kalimat'}
            </h1>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '400', color: '#475569', lineHeight: '1.6', maxWidth: '600px' }}>
              Pantau akurasi gestur secara langsung dan berikan konfirmasi akhir atas hasil evaluasi sistem kecerdasan buatan.
            </p>
          </div>
          
          <button 
            onClick={() => setIsDrawerOpen(true)} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '999px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A', transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            <IconList /> Pilih modul lainnya
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1.2fr 450px' : '1fr', gap: '32px', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#000000', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 20, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                Umpan Video Sensor Aktif
              </div>

              {signStatus.includes("Memvalidasi") && (
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 15, backgroundColor: 'rgba(16, 185, 129, 0.8)', padding: '16px 24px', borderRadius: '16px', color: '#FFFFFF', fontSize: '20px', fontWeight: '800', textAlign: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}>
                    TAHAN POSISI ANDA<br/>
                 </div>
              )}

              <Webcam ref={webcamRef} mirrored={true} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            </div>

            {isEducator && (
              <button 
                onClick={() => setIsLiveEvalOpen(true)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 24px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '16px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1E293B'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0F172A'; }}
              >
                <span style={{ fontSize: '16px', fontWeight: '700' }}>Konfirmasi Pengiriman Penilaian</span>
              </button>
            )}
            
            <GestureReferenceCard currentModule={currentModule} onOpenTutorial={() => setIsTutorialModalOpen(true)} />
          </div>
          
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', minHeight: '560px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }}></div>
               <span style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  {signStatus}
               </span>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <EvaluationPanel isDesktop={isDesktop} isLoading={isLoading} isSpeaking={isSpeaking} aiMessage={aiMessage} />
            </div>
          </div>

        </div>
      </div>

      <ModuleDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} modules={modules} currentModule={currentModule} onSelectModule={(mod) => { setCurrentModule(mod); setIsDrawerOpen(false); }} isMobileScreen={isMobileScreen} />
      <TutorialModal isOpen={isTutorialModalOpen} onClose={() => setIsTutorialModalOpen(false)} module={currentModule} />

      {isLiveEvalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden', animation: 'scaleUp 0.2s ease-out' }}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>Evaluasi Praktikum Kelas</h3>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '400', color: '#64748B' }}>Beri nilai murid yang memperagakan gestur <strong style={{ color: '#10B981' }}>{currentModule?.target_gesture}</strong></p>
                </div>
                <button onClick={() => { setIsLiveEvalOpen(false); isAiLocked.current = false; }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><IconClose /></button>
              </div>
            </div>

            <form onSubmit={handleLiveEvaluationSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '12px', letterSpacing: '0.5px' }}>1 IDENTIFIKASI MURID PRAKTIKUM</label>
                {!evalSelectedStudent ? (
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '14px' }}><IconSearch /></div>
                    <input type="text" placeholder="Ketik nama murid kelas Anda" value={evalSearchQuery} onChange={(e) => setEvalSearchQuery(e.target.value)} style={inputStyleEnterprise} />
                    {evalSearchQuery && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', marginTop: '6px', maxHeight: '160px', overflowY: 'auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10 }}>
                        {filteredStudents.length > 0 ? filteredStudents.map(student => (
                          <div key={student.id} onClick={() => setEvalSelectedStudent(student)} style={{ padding: '12px 16px', borderBottom: '1px solid #F8FAFC', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>
                            {student.name} <span style={{ color: '#64748B', fontWeight: '500', marginLeft: '8px' }}>({student.class})</span>
                          </div>
                        )) : <div style={{ padding: '12px 16px', fontSize: '13px', color: '#94A3B8' }}>Murid tidak ditemukan</div>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#F8FAFC' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{evalSelectedStudent.name}</div>
                    <button type="button" onClick={() => setEvalSelectedStudent(null)} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Ubah Data</button>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '12px', letterSpacing: '0.5px' }}>2 ALOKASI POIN BINTANG</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '16px', top: '14px' }}><IconStar /></div>
                  <input type="number" min="1" max="50" value={evalStars} onChange={(e) => setEvalStars(parseInt(e.target.value) || '')} placeholder="Nilai maksimal 50" required style={{ ...inputStyleEnterprise, fontWeight: '700' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px' }}>
                <button type="submit" disabled={!evalSelectedStudent || isSubmittingEval} style={{ width: '100%', padding: '16px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: (!evalSelectedStudent || isSubmittingEval) ? 'not-allowed' : 'pointer' }}>
                  {isSubmittingEval ? 'Merekam ke Peladen' : 'Konfirmasi Penyelesaian Modul'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {statusModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s' }} onClick={() => setStatusModal({ ...statusModal, isOpen: false })}>
            <div style={{ backgroundColor: '#FFFFFF', width: isMobileScreen ? '90%' : '400px', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative', animation: 'scaleUp 0.2s', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: statusModal.type === 'success' ? '#ECFDF5' : statusModal.type === 'warning' ? '#FFFBEB' : '#FEF2F2', marginBottom: '20px' }}>
                    {statusModal.type === 'success' ? <IconCheckCircle /> : statusModal.type === 'warning' ? <IconStar /> : <IconAlertTriangle />}
                </div>
                
                <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>{statusModal.title}</h3>
                <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>{statusModal.message}</p>
                
                <button onClick={() => setStatusModal({ ...statusModal, isOpen: false })} style={{ width: '100%', padding: '14px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>
                    Tutup Pemberitahuan
                </button>
            </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      `}</style>
    </main>
  );
}

InteractiveModule.propTypes = {
  selectedLevel: PropTypes.string,
  setSelectedLevel: PropTypes.func.isRequired,
};