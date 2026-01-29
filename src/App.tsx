
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Signal, Wifi } from 'lucide-react';
import { AppStep } from './types';
import { getBrasiliaTime } from './constants';
import { 
  IncomingCallV, 
  ActiveCallV, 
  HackedScreen, 
  Keypad, 
  OutgoingCallScreen, 
  ActiveCallEvey, 
  WhatsappIntro, 
  LockScreen, 
  WhatsappChat, 
  TikTokSecretScreen, 
  TikTokFeedScreen,
  SalesPage
} from './components/GameScreens';

const stepsOrder: AppStep[] = [
  'incoming-v',
  'active-v',
  'hacked',
  'keypad',
  'outgoing-call',
  'active-evey',
  'whatsapp-intro',
  'lock-screen',
  'whatsapp-chat',
  'tiktok-secret',
  'tiktok-feed',
  'sales-page'
];

export default function App() {
  const [step, setStep] = useState<AppStep>('incoming-v');

  const handleNextStep = () => {
    const currentIndex = stepsOrder.indexOf(step);
    const nextIndex = (currentIndex + 1) % stepsOrder.length;
    setStep(stepsOrder[nextIndex]);
  };

  const handlePrevStep = () => {
    const currentIndex = stepsOrder.indexOf(step);
    const prevIndex = (currentIndex - 1 + stepsOrder.length) % stepsOrder.length;
    setStep(stepsOrder[prevIndex]);
  };

  useEffect(() => {
    const setVh = () => { 
        let vh = window.innerHeight * 0.01; 
        document.documentElement.style.setProperty('--vh', `${vh}px`); 
    };
    setVh(); 
    window.addEventListener('resize', setVh); 
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const renderStep = () => {
    switch(step) {
      case 'incoming-v': return <IncomingCallV onAnswer={() => setStep('active-v')} />;
      case 'active-v': return <ActiveCallV onEnd={() => setStep('hacked')} />;
      case 'hacked': return <HackedScreen onComplete={() => setStep('keypad')} />;
      case 'keypad': return <Keypad onCall={() => setStep('outgoing-call')} />;
      case 'outgoing-call': return <OutgoingCallScreen onConnected={() => setStep('active-evey')} />;
      case 'active-evey': return <ActiveCallEvey onEnd={() => setStep('whatsapp-intro')} />;
      case 'whatsapp-intro': return <WhatsappIntro onNext={() => setStep('lock-screen')} />;
      case 'lock-screen': return <LockScreen onUnlock={() => setStep('whatsapp-chat')} />;
      case 'whatsapp-chat': return <WhatsappChat onAccessTikTok={() => setStep('tiktok-secret')} onGoToSales={() => setStep('sales-page')} />;
      case 'tiktok-secret': return <TikTokSecretScreen onLogin={() => setStep('tiktok-feed')} />;
      case 'tiktok-feed': return <TikTokFeedScreen onGoToSales={() => setStep('sales-page')} />;
      case 'sales-page': return <SalesPage />;
      default: return <IncomingCallV onAnswer={() => setStep('active-v')} />;
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative" style={{ touchAction: 'none' }}>
        <div className="hidden sm:block">
            <button 
                onClick={handlePrevStep}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] bg-white/10 hover:bg-white/20 text-white/50 hover:text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
                aria-label="Previous Step"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
                onClick={handleNextStep}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] bg-white/10 hover:bg-white/20 text-white/50 hover:text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
                aria-label="Next Step"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
        </div>

      <div 
        className="w-full h-[100dvh] sm:h-[90vh] max-w-[420px] bg-black sm:rounded-[3rem] sm:border-[8px] sm:border-[#333] relative overflow-hidden shadow-2xl flex flex-col" 
        style={{ 
            height: 'calc(var(--vh, 1vh) * 100)',
            overscrollBehaviorY: 'none' 
        }}
      >
        <div className="absolute top-0 w-full px-5 py-2 flex justify-between items-center z-50 pointer-events-none text-white h-[44px]">
            <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-wide">{getBrasiliaTime().slice(0, 5)}</span>
                <span className="text-[10px] font-medium opacity-80 tracking-tight">Claro BR | Vivo</span>
            </div>
            <div className="flex items-center gap-1">
                <Signal className="w-3.5 h-3.5 fill-current" />
                <Signal className="w-3.5 h-3.5 fill-current" />
                <Wifi className="w-3.5 h-3.5" />
                <div className="w-5 h-2.5 border border-white/40 rounded-[2px] p-[1px] relative ml-0.5">
                      <div className="w-full h-full bg-white rounded-[1px]"></div>
                </div>
            </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-black">
            {renderStep()}
        </div>
        
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none mb-2"></div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { 
  Phone, PhoneOff, MicOff, Grid3x3, Volume2, Plus, Video, Users, Lock, 
  Send, Mic, Camera, MoreVertical, Phone as PhoneIcon, Video as VideoIcon, 
  ArrowLeft, Sparkles, ChevronRight, Play, Pause, ShieldCheck, Terminal, 
  Cpu, Wifi, Eye, EyeOff, Signal, Heart, MessageCircle, Bookmark, Share2, 
  MoreHorizontal, Home, Search, ShoppingBag, Clapperboard, PlusSquare, 
  Disc, Music, X, DollarSign, Wallet, Star, CheckCircle2, TrendingUp, Zap, Globe, Shield, CreditCard, CheckCircle
} from 'lucide-react';
import { ASSETS, getBrasiliaTime, getBrasiliaDate } from '../constants';
import { callGemini } from '../services/geminiService';
import { Message, Post, Comment } from '../types';

/* --- SHARED SUB-COMPONENTS --- */

const AudioMessage = memo(({ 
    msg, 
    isPlaying, 
    onPlay, 
    currentProgress, 
    playbackRate, 
    onToggleSpeed 
}: {
    msg: Message;
    isPlaying: boolean;
    onPlay: (id: number, url: string) => void;
    currentProgress: number;
    playbackRate: number;
    onToggleSpeed: (id: number) => void;
}) => {
    const [duration, setDuration] = useState(msg.duration || "--:--");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!msg.audioUrl) return;
        const audio = new Audio(msg.audioUrl);
        audio.preload = 'metadata';
        
        const setAudioDuration = () => {
            if (isFinite(audio.duration)) {
                const mins = Math.floor(audio.duration / 60);
                const secs = Math.floor(audio.duration % 60).toString().padStart(2, '0');
                setDuration(`${mins}:${secs}`);
            }
        };

        audio.addEventListener('loadedmetadata', setAudioDuration);
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioDuration);
            audio.pause();
        };
    }, [msg.audioUrl]);

    return (
        <div className="flex items-center gap-3 min-w-[220px]">
            <div className="relative">
                <button 
                    type="button"
                    className="w-10 h-10 rounded-full bg-[#fa653e] flex items-center justify-center pl-1 cursor-pointer hover:scale-105 transition-transform touch-manipulation focus:outline-none"
                    onClick={() => onPlay(msg.id, msg.audioUrl || '')}
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5 text-white/80 fill-current" />
                    ) : (
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#d1d7db] border-b-[6px] border-b-transparent ml-1"></div>
                    )}
                </button>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#202c33] rounded-full flex items-center justify-center border-2 border-[#202c33]">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#00a884]"></div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <div className="h-1 bg-[#41515c] rounded-full w-full mb-1 relative overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-[#00a884] transition-[width] duration-150 ease-linear"
                                style={{ width: `${isPlaying ? currentProgress : 0}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[#8696a0] text-[10px] font-medium">
                            <span>{duration}</span>
                            <span>{msg.time}</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleSpeed(msg.id); }}
                        className="bg-[#202c33] text-white/90 text-[10px] font-bold px-2 py-1 rounded border border-white/5 min-w-[34px] text-center hover:bg-[#2a3942]"
                    >
                        {playbackRate}x
                    </button>
                </div>
            </div>
        </div>
    );
});

/* --- PRIMARY SCREENS --- */

export const IncomingCallV: React.FC<{ onAnswer: () => void }> = ({ onAnswer }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vibrateIntervalRef = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio(ASSETS.audio.vibration);
    audioRef.current.loop = true;
    
    const playAudio = () => audioRef.current?.play().catch(() => {});
    playAudio();

    if (navigator.vibrate) {
        navigator.vibrate([800, 400]);
        vibrateIntervalRef.current = window.setInterval(() => navigator.vibrate([800, 400]), 1200);
    }

    return () => {
        audioRef.current?.pause();
        if (vibrateIntervalRef.current) clearInterval(vibrateIntervalRef.current);
        if (navigator.vibrate) navigator.vibrate(0);
    };
  }, []);

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxDrag = rect.width - 68 - 12;
    let x = clientX - rect.left - 34;
    x = Math.max(0, Math.min(x, maxDrag));
    setDragX(x);

    if (x > maxDrag * 0.85) {
        setIsAnswered(true);
        setDragX(maxDrag);
        onAnswer();
    }
  }, [onAnswer]);

  return (
    <div className={`h-full w-full bg-black flex flex-col items-center justify-between py-12 px-6 animate-fade-in relative overflow-hidden select-none ${!isAnswered ? 'animate-vibrate-screen' : ''}`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-80 h-80 bg-red-600 rounded-full animate-ping"></div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-12 z-10">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
            <img src={ASSETS.images.avatarV} className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="text-center">
            <h1 className="text-white text-3xl font-bold tracking-tight">Número Privado</h1>
            <p className="text-[#34C759] text-lg font-medium animate-pulse mt-2">Chamada Criptografada...</p>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="w-full max-w-[300px] h-20 bg-white/10 backdrop-blur-xl rounded-full p-1.5 border border-white/10 relative overflow-hidden z-10"
        onTouchMove={(e) => handleDrag(e.touches[0].clientX)}
        onMouseMove={(e) => isDragging && handleDrag(e.clientX)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => { setIsDragging(false); if(!isAnswered) setDragX(0); }}
        onMouseLeave={() => { setIsDragging(false); if(!isAnswered) setDragX(0); }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
            <span className="text-white text-sm font-bold uppercase tracking-widest">deslize para aceitar</span>
        </div>
        <div 
            className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-xl transition-transform duration-75 ease-out cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(${dragX}px)` }}
        >
            <Phone className="w-8 h-8 text-[#34C759] fill-current" />
        </div>
      </div>
    </div>
  );
};

export const ActiveCallV: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    audioRef.current = new Audio(ASSETS.audio.callV);
    audioRef.current.play().catch(() => {});
    audioRef.current.onended = onEnd;
    return () => { clearInterval(timer); audioRef.current?.pause(); };
  }, [onEnd]);
  
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  return (
    <div className="h-full w-full bg-black flex flex-col items-center py-12 px-6 animate-fade-in">
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20"><img src={ASSETS.images.avatarV} className="w-full h-full object-cover" /></div>
        <div className="text-center">
            <h2 className="text-white text-3xl font-medium">Protocolo V</h2>
            <p className="text-white/60 mt-1 font-mono tracking-widest">{formatTime(duration)}</p>
        </div>
      </div>
      <div className="mt-auto w-full max-w-xs pb-12">
        <div className="grid grid-cols-3 gap-6 mb-12 opacity-50">
          {[MicOff, Grid3x3, Volume2, Plus, Video, Users].map((Icon, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center text-white"><Icon className="w-7 h-7" /></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center"><button onClick={onEnd} className="w-20 h-20 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-lg active:scale-95 transition-transform"><PhoneOff className="w-9 h-9 text-white fill-current" /></button></div>
      </div>
    </div>
  );
};

export const HackedScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>(["Iniciando desvio de protocolo..."]);
  
  useEffect(() => {
    const sequence = [
        { text: "Localizando Agente Evey...", delay: 1000 },
        { text: "Quebrando criptografia de nível 4...", delay: 2000 },
        { text: "ACESSO PRIORITÁRIO GARANTIDO", delay: 3500 },
        { text: "Estabelecendo túnel seguro...", delay: 4500 }
    ];

    const timeouts = sequence.map(({ text, delay }) => window.setTimeout(() => setLogs(p => [...p, text]), delay));
    const finalTimer = window.setTimeout(onComplete, 5500);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(finalTimer); };
  }, [onComplete]);

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="relative z-10 text-center animate-glitch w-full">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-red-600 flex items-center justify-center bg-red-900/10"><Lock className="w-10 h-10 text-red-600" /></div>
        <h1 className="text-red-600 text-2xl font-black tracking-widest uppercase mb-6">SISTEMA COMPROMETIDO</h1>
        <div className="text-left font-mono text-[10px] space-y-2 bg-red-900/5 p-4 rounded-lg border border-red-900/20 max-w-[280px] mx-auto">
            {logs.map((log, i) => (<p key={i} className="text-red-500 typewriter whitespace-nowrap overflow-hidden">{`> ${log}`}</p>))}
        </div>
      </div>
      <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none"></div>
    </div>
  );
};

export const Keypad: React.FC<{ onCall: () => void }> = ({ onCall }) => {
  const [input, setInput] = useState("52679588");
  return (
    <div className="h-full w-full bg-black flex flex-col py-10 px-6 animate-fade-in">
      <div className="flex-1 flex flex-col items-center justify-center"><div className="text-white text-5xl font-light tracking-widest mb-4 h-14">{input}</div><p className="text-[#34C759] text-xs font-bold tracking-widest uppercase">Pronto para Conexão</p></div>
      <div className="w-full max-w-[300px] mx-auto grid grid-cols-3 gap-5 mb-10">
        {['1','2','3','4','5','6','7','8','9','*','0','#'].map(k => (
            <button key={k} onClick={() => setInput(p => (p.length < 11 ? p + k : p))} className="w-full aspect-square rounded-full bg-white/5 text-white text-3xl font-light active:bg-white/20 transition-colors flex items-center justify-center">{k}</button>
        ))}
      </div>
      <div className="flex justify-center items-center gap-10">
          <div className="w-16"></div>
          <button onClick={onCall} className="w-20 h-20 rounded-full bg-[#34C759] flex items-center justify-center active:scale-95 transition-transform"><Phone className="w-10 h-10 text-white fill-current" /></button>
          <button onClick={() => setInput(p => p.slice(0, -1))} className="w-16 text-gray-500 active:text-white transition-colors"><ArrowLeft className="w-8 h-8" /></button>
      </div>
    </div>
  );
};

export const OutgoingCallScreen: React.FC<{ onConnected: () => void }> = ({ onConnected }) => {
    useEffect(() => {
        const audio = new Audio(ASSETS.audio.dialTone);
        audio.play().catch(() => {});
        audio.onended = onConnected;
        return () => audio.pause();
    }, [onConnected]);
    return (
        <div className="h-full w-full bg-black flex flex-col items-center justify-center animate-fade-in">
            <div className="flex flex-col items-center gap-8 animate-pulse">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl"><img src={ASSETS.images.avatarEvey} className="w-full h-full object-cover" /></div>
                <div className="text-center"><h1 className="text-white text-4xl font-light mb-2">52679588</h1><p className="text-white/40 text-lg">Chamando Agente Evey...</p></div>
            </div>
            <div className="mt-20"><div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center"><PhoneOff className="w-9 h-9 text-white fill-current" /></div></div>
        </div>
    );
};

export const ActiveCallEvey: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    const audio = new Audio(ASSETS.audio.callEvey);
    audio.play().catch(() => {});
    audio.onended = () => setTimeout(onEnd, 1500);
    return () => { clearInterval(timer); audio.pause(); };
  }, [onEnd]);
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  return (
    <div className="h-full w-full bg-black flex flex-col items-center py-12 px-6 animate-fade-in">
      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><img src={ASSETS.images.avatarEvey} className="w-full h-full object-cover" /></div>
        <div className="text-center"><h2 className="text-white text-3xl font-bold">Agente Evey</h2><p className="text-blue-400 font-mono text-xs uppercase tracking-widest mt-2 animate-pulse">Vaga em Processamento</p><p className="text-white/40 mt-1 font-mono">{formatTime(duration)}</p></div>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-6 mb-20 opacity-30">{[MicOff, Grid3x3, Volume2, Plus, Video, Users].map((Icon, i) => (<div key={i} className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white"><Icon className="w-7 h-7" /></div>))}</div>
    </div>
  );
};

export const WhatsappIntro: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  useEffect(() => { const t = setTimeout(onNext, 2500); return () => clearTimeout(t); }, [onNext]);
  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center p-10 animate-fade-in">
      <div className="w-20 h-20 mb-10 relative"><div className="absolute inset-0 border border-[#34C759] rounded-full animate-ping opacity-20"></div><Lock className="w-full h-full text-[#34C759]" /></div>
      <h2 className="text-white text-xl font-bold mb-2">Canal Seguro</h2>
      <p className="text-center text-white/40 text-sm leading-relaxed mb-10">Inicializando ambiente de comunicação criptografado...</p>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#34C759] animate-[typing_2.5s_linear]"></div></div>
    </div>
  );
};

export const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [time, setTime] = useState(getBrasiliaTime());
  useEffect(() => { const t = setInterval(() => setTime(getBrasiliaTime()), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="h-full w-full bg-cover bg-center flex flex-col relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="relative z-10 flex flex-col items-center pt-20 w-full animate-fade-in"><div className="text-7xl font-thin text-white tracking-tighter">{time}</div><div className="text-sm text-white/70 font-bold uppercase tracking-widest mt-2">{getBrasiliaDate()}</div></div>
        <div className="relative z-10 w-full px-5 mt-16">
            <button onClick={onUnlock} className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl p-4 text-left border border-white/10 shadow-2xl animate-fade-in-up active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-2 mb-2"><div className="w-5 h-5 bg-[#25D366] rounded flex items-center justify-center"><PhoneIcon className="w-3 h-3 text-white fill-current" /></div><span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Whatsapp • Agora</span></div>
                <div className="flex gap-4"><div className="w-11 h-11 rounded-full overflow-hidden border border-white/20"><img src={ASSETS.images.avatarEvey} className="w-full h-full object-cover" /></div><div className="flex-1"><h4 className="text-white font-bold text-sm">Agente Evey</h4><p className="text-white/90 text-xs leading-snug mt-1">⚠️ <span className="font-bold">URGENTE:</span> Sua vaga de acesso foi aprovada. Responda imediatamente.</p></div></div>
            </button>
        </div>
        <div className="mt-auto pb-10 flex justify-center"><div className="w-36 h-1 bg-white/30 rounded-full"></div></div>
    </div>
  );
};

export const TikTokVideo = memo(({ src, isActive, onEnded, onButtonClick }: { src: string; isActive: boolean; onEnded?: () => void; onButtonClick: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isActive) {
            video.currentTime = 0;
            setShowButton(false);
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <div className="absolute inset-0 w-full h-full bg-black">
            <video 
                ref={videoRef}
                src={src} 
                className="w-full h-full object-cover"
                onEnded={() => { setShowButton(true); onEnded?.(); }}
                playsInline
                preload="metadata"
            />
            {showButton && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
                    <button 
                        onClick={onButtonClick}
                        className="bg-[#FE2C55] text-white font-black py-4 px-10 rounded-full shadow-[0_0_30px_rgba(254,44,85,0.6)] animate-bounce text-sm uppercase tracking-widest border-2 border-white/20 active:scale-95 transition-transform"
                    >
                        Acessar Ferramenta
                    </button>
                </div>
            )}
        </div>
    );
});

export const TikTokFeedScreen: React.FC<{ onGoToSales: () => void }> = ({ onGoToSales }) => {
    const [activeIndex, setActiveIndex] = useState(0); 
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const index = Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight);
        if (index !== activeIndex) setActiveIndex(index);
    }, [activeIndex]);

    const posts = useMemo(() => [
        { id: 1, videoUrl: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769622022/EDIT-TIKTOK_VIDEO_1_x0bjml.mp4", desc: "O segredo para 2026... 🤫 #vinganca #liberdade" },
        { id: 2, videoUrl: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769623060/Video_2_Editado_TIKTOK_soazbl.mp4", desc: "Eles escondem isso de você! 🚫 #hacking #renda" },
        { id: 3, videoUrl: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769640870/tiktokpraiaVideo3_btpdjp.mp4", desc: "Aprovado pelo protocolo Evey! 🚀 #oportunidade" },
        { id: 4, videoUrl: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769691504/Video_4_TikTOK_EDITADOPRAIA_rqhbld.mp4", desc: "Últimas vagas liberadas. Corra! 🏃‍♂️ #agora" },
    ], []);

    return (
        <div className="h-full w-full bg-black text-white font-sans flex flex-col overflow-hidden">
            <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                {posts.map((post, index) => (
                    <div key={post.id} className="h-full w-full snap-start relative">
                        <TikTokVideo src={post.videoUrl} isActive={index === activeIndex} onButtonClick={onGoToSales} />
                        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 z-20">
                            <div className="w-12 h-12 rounded-full border-2 border-white"><img src={ASSETS.images.avatarV} className="w-full h-full rounded-full object-cover" /></div>
                            <div className="flex flex-col items-center gap-1"><Heart className="w-8 h-8 fill-white" /><span className="text-[10px] font-bold">12K</span></div>
                            <div className="flex flex-col items-center gap-1"><MessageCircle className="w-8 h-8 fill-white" /><span className="text-[10px] font-bold">450</span></div>
                            <div className="flex flex-col items-center gap-1"><Bookmark className="w-8 h-8 fill-white" /><span className="text-[10px] font-bold">2K</span></div>
                        </div>
                        <div className="absolute left-4 bottom-24 z-20"><h3 className="font-bold">@agente_Vinganca</h3><p className="text-sm opacity-90">{post.desc}</p></div>
                    </div>
                ))}
            </div>
            <div className="bg-black border-t border-white/10 h-16 flex justify-around items-center px-4 shrink-0">
                <Home className="w-6 h-6" /><Search className="w-6 h-6 opacity-30" /><div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center"><Plus className="w-5 h-5 text-black" /></div><MessageCircle className="w-6 h-6 opacity-30" /><Users className="w-6 h-6 opacity-30" />
            </div>
        </div>
    );
};

export const WhatsappChat: React.FC<{ onAccessTikTok: () => void; onGoToSales: () => void }> = ({ onAccessTikTok, onGoToSales }) => {
    const [messages, setMessages] = useState<Message[]>([{ id: 0, type: 'system', text: '🔒 Conversa Segura Criptografada' }]);
    const [status, setStatus] = useState<'idle' | 'typing' | 'recording'>('idle'); 
    const [inputValue, setInputValue] = useState("");
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [audioProgress, setAudioProgress] = useState(0);
    const [showTikTokButton, setShowTikTokButton] = useState(false);
    const [playbackRates, setPlaybackRates] = useState<Record<number, number>>({});
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const toggleSpeed = useCallback((id: number) => {
        setPlaybackRates(p => {
            const next = p[id] === 2 ? 1 : (p[id] || 1) + 0.5;
            if (audioRef.current && playingId === id) audioRef.current.playbackRate = next;
            return { ...p, [id]: next };
        });
    }, [playingId]);

    const playAudio = useCallback((id: number, url: string) => {
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
            return;
        }
        audioRef.current?.pause();
        audioRef.current = new Audio(url);
        audioRef.current.playbackRate = playbackRates[id] || 1;
        audioRef.current.ontimeupdate = () => setAudioProgress((audioRef.current!.currentTime / audioRef.current!.duration) * 100);
        audioRef.current.onended = () => { setPlayingId(null); setAudioProgress(0); };
        audioRef.current.play().catch(() => {});
        setPlayingId(id);
    }, [playingId, playbackRates]);

    useEffect(() => {
        const sequence = async () => {
            const audios = [ASSETS.audio.whatsappAudio1, ASSETS.audio.whatsappAudio2, ASSETS.audio.whatsappAudio3];
            for (let i = 0; i < audios.length; i++) {
                setStatus('recording');
                await new Promise(r => setTimeout(r, 1200));
                setStatus('idle');
                const id = Date.now() + i;
                setMessages(p => [...p, { id, type: 'audio', sender: 'Agente Evey', time: getBrasiliaTime(), audioUrl: audios[i] }]);
                await new Promise(r => setTimeout(r, 1000));
            }
            setShowTikTokButton(true);
        };
        sequence();
    }, []);

    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, status]);

    return (
        <div className="h-full w-full flex flex-col bg-[#0b141a] relative animate-fade-in">
            <div className="bg-[#202c33] px-4 py-2 flex items-center gap-3 shrink-0">
                <ArrowLeft className="w-6 h-6 text-[#00a884]" />
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10"><img src={ASSETS.images.avatarEvey} className="w-full h-full object-cover" /></div>
                <div className="flex-1"><h3 className="text-white text-sm font-bold">Agente Evey</h3><p className="text-[#00a884] text-[10px] font-bold uppercase">{status || 'online'}</p></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'system' ? 'justify-center' : msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'system' ? (
                            <div className="bg-[#1f2c34] text-[#ffd279] text-[10px] px-3 py-1 rounded-full border border-white/5">{msg.text}</div>
                        ) : (
                            <div className={`rounded-lg p-2 max-w-[85%] shadow-lg ${msg.sender === 'user' ? 'bg-[#005c4b]' : 'bg-[#202c33]'}`}>
                                {msg.type === 'audio' ? (
                                    <AudioMessage msg={msg} isPlaying={playingId === msg.id} onPlay={playAudio} currentProgress={audioProgress} playbackRate={playbackRates[msg.id] || 1} onToggleSpeed={toggleSpeed} />
                                ) : (
                                    <p className="text-white text-sm pr-10 relative">{msg.text}<span className="absolute bottom-0 right-0 text-[8px] opacity-40">{msg.time}</span></p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            {showTikTokButton && (
                <div className="p-4 flex flex-col items-center gap-3 animate-fade-in-up">
                    <button onClick={onGoToSales} className="w-full bg-[#FE2C55] text-white font-black py-4 px-8 rounded-full shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"><Wallet className="w-5 h-5" /> ACESSAR FERRAMENTA</button>
                    <button onClick={onAccessTikTok} className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Acessar App Secreto (Modo Desenvolvedor)</button>
                </div>
            )}
            <div className="bg-[#202c33] p-2 flex items-center gap-2 shrink-0">
                <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2"><input type="text" placeholder="Mensagem" className="bg-transparent text-white text-sm outline-none w-full" /></div>
                <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center"><Mic className="w-5 h-5 text-white" /></div>
            </div>
        </div>
    );
};

export const TikTokSecretScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    return (
        <div className="h-full w-full bg-black flex flex-col items-center justify-center p-8 animate-fade-in">
            <svg className="w-20 h-20 fill-white mb-10" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>
            <h1 className="text-white text-2xl font-black mb-10 tracking-widest uppercase">Login Licenciado</h1>
            <div className="w-full space-y-4 mb-10">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10"><label className="text-[10px] text-white/40 font-bold uppercase block mb-1">ID Usuário</label><div className="text-white font-mono">@agente_Vinganca</div></div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10"><label className="text-[10px] text-white/40 font-bold uppercase block mb-1">Token de Acesso</label><div className="text-white font-mono">•••••••••••••</div></div>
            </div>
            <button onClick={onLogin} className="w-full bg-[#FE2C55] text-white font-black py-5 rounded-2xl shadow-2xl active:scale-[0.98] transition-transform">ACESSAR PAINEL</button>
        </div>
    );
};

export const UltraSecurityOverlay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => { const t = setTimeout(onComplete, 3000); return () => clearTimeout(t); }, [onComplete]);
    return (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-8 animate-fade-in font-mono">
            <ShieldCheck className="w-20 h-20 text-[#0aff0a] animate-bounce mb-6" />
            <h2 className="text-[#0aff0a] text-xl font-bold animate-pulse">VALIDANDO TOKEN...</h2>
            <div className="w-full max-w-[200px] h-1 bg-[#0aff0a]/20 mt-10 overflow-hidden"><div className="h-full bg-[#0aff0a] animate-[typing_3s_linear]"></div></div>
        </div>
    );
};

export const SalesPage: React.FC = () => {
    const handlePurchase = () => {
        window.open('https://checkout.ticto.app/O411A516B', '_blank');
    };

    return (
        <div className="h-full w-full bg-[#050505] text-white font-sans overflow-y-auto overflow-x-hidden animate-fade-in scroll-smooth pb-20">
            {/* Header / Sticky Progress */}
            <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-[#FE2C55] to-[#FEA0B0] rounded-lg flex items-center justify-center shadow-lg shadow-[#FE2C55]/20">
                        <Zap className="w-5 h-5 text-white fill-current" />
                    </div>
                    <span className="font-black text-lg tracking-tighter italic">VIRAL<span className="text-[#FE2C55]">FLUX</span></span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Users className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-bold text-green-400 animate-pulse">1.402 ativos</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="px-6 py-12 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#FE2C55]/5 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-6 animate-bounce">
                    <TrendingUp className="w-4 h-4 text-[#FE2C55]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Protocolo 2026 Ativado</span>
                </div>
                
                <h1 className="text-4xl font-black tracking-tighter leading-none mb-6 uppercase">
                    DOMINE O ALGORITMO E <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE2C55] to-[#FEA0B0]">SAQUE TODOS OS DIAS</span>
                </h1>
                
                <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs mx-auto">
                    A primeira inteligência artificial que hackeia as tendências virais e gera lucro automático direto na sua conta.
                </p>

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handlePurchase}
                        className="bg-[#FE2C55] text-white font-black py-5 rounded-2xl shadow-[0_15px_30px_rgba(254,44,85,0.4)] text-lg animate-pulse active:scale-95 transition-transform flex items-center justify-center gap-3"
                    >
                        QUERO ACESSO AGORA <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                        <Shield className="w-3 h-3" /> Acesso 100% Seguro e Criptografado
                    </div>
                </div>
            </div>

            {/* What you will receive section */}
            <div className="px-6 py-10 bg-white/[0.02] border-y border-white/5">
                <h3 className="font-bold text-lg mb-8 text-center text-white italic uppercase tracking-wider">O QUE VOCÊ VAI RECEBER:</h3>
                <div className="space-y-4">
                    {[
                        "Template de manyChat com API OFICIAL do IG + Agente de I.A",
                        "Agente de I.A que sobe campanhas no facebook ads",
                        "Agente de I.A que Otimiza campanhas com Chat GPT",
                        "Verifica saldos de pix no facebook ads e avisa no Whatsapp"
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                            <div className="shrink-0"><CheckCircle className="w-6 h-6 text-green-500 fill-green-500/10" /></div>
                            <span className="text-sm font-medium text-white/90">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Features Section */}
            <div className="px-6 py-16 space-y-12">
                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-[#FE2C55]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#FE2C55]/20">
                        <MessageCircle className="w-7 h-7 text-[#FE2C55]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">ManyChat API Oficial + I.A</h3>
                        <p className="text-sm text-white/50 leading-relaxed">Template pronto para automatizar directs e comentários. O Agente de I.A integrado responde como humano e fecha vendas 24h.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-[#00f2ea]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#00f2ea]/20">
                        <Shield className="w-7 h-7 text-[#00f2ea]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase">Agente de Campanhas I.A</h3>
                        <p className="text-sm text-white/50 leading-relaxed">Deixe que a inteligência artificial suba e configure suas campanhas de Facebook Ads com precisão militar.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-[#ffc107]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#ffc107]/20">
                        <Sparkles className="w-7 h-7 text-[#ffc107]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase">Otimização Chat GPT</h3>
                        <p className="text-sm text-white/50 leading-relaxed">O sistema utiliza o Chat GPT para analisar e otimizar seus anúncios, garantindo o menor custo por venda.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-[#34C759]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#34C759]/20">
                        <CreditCard className="w-7 h-7 text-[#34C759]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 uppercase">Monitoramento PIX WhatsApp</h3>
                        <p className="text-sm text-white/50 leading-relaxed">Receba notificações automáticas no seu WhatsApp sempre que houver saldo de PIX disponível no Facebook Ads.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="px-6 py-16 bg-[#FE2C55]/5">
                <h2 className="text-2xl font-black text-center mb-10 tracking-tight italic uppercase">Resultados Reais</h2>
                <div className="space-y-4">
                    {[
                        { name: "Lucas M.", msg: "O Viral Flux mudou meu jogo. Fiz R$ 4.200 na primeira semana sem aparecer.", color: "bg-blue-500" },
                        { name: "Sarah K.", msg: "Achei que era golpe, mas o Agente Evey realmente entrega o que promete. Surreal!", color: "bg-pink-500" },
                        { name: "André G.", msg: "Finalmente um app que não trava e paga de verdade. O suporte é 10/10.", color: "bg-purple-500" }
                    ].map((t, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm`}>{t.name[0]}</div>
                                <div>
                                    <h4 className="font-bold text-sm">{t.name}</h4>
                                    <div className="flex gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-current" /><Star className="w-3 h-3 text-yellow-500 fill-current" /><Star className="w-3 h-3 text-yellow-500 fill-current" /><Star className="w-3 h-3 text-yellow-500 fill-current" /><Star className="w-3 h-3 text-yellow-500 fill-current" /></div>
                                </div>
                            </div>
                            <p className="text-sm text-white/70 italic leading-relaxed">"{t.msg}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="px-6 py-20 text-center border-t border-white/5">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#FE2C55] to-[#FEA0B0] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#FE2C55]/40 rotate-12">
                    <Zap className="w-12 h-12 text-white fill-current" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter leading-none italic uppercase">O Futuro é Agora</h2>
                <p className="text-white/40 text-sm mb-12 px-4">As vagas para o protocolo Viral Flux são limitadas por servidor. Não perca sua chance.</p>
                
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <span className="text-white/30 text-xs line-through font-bold uppercase">DE R$ 997,00</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white/50 text-xl font-bold uppercase">POR</span>
                            <span className="text-5xl font-black text-[#FE2C55]">R$ 97</span>
                        </div>
                        <span className="text-white/30 text-[10px] font-bold mt-1 uppercase tracking-widest">OU 12X DE R$ 9,74</span>
                    </div>

                    <button 
                        onClick={handlePurchase}
                        className="w-full bg-[#FE2C55] text-white font-black py-5 rounded-3xl shadow-[0_20px_40px_rgba(254,44,85,0.4)] text-xl active:scale-95 transition-transform flex items-center justify-center gap-3 uppercase"
                    >
                        LIBERAR MEU ACESSO <Plus className="w-6 h-6" />
                    </button>

                    <div className="flex justify-center items-center gap-6 opacity-30 mt-8">
                        <CreditCard className="w-10 h-10" />
                        <Globe className="w-10 h-10" />
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-12 text-center text-[10px] text-white/20 font-bold uppercase tracking-widest border-t border-white/5 space-y-2">
                <p>© 2026 Viral Flux - Todos os direitos reservados</p>
                <p>Termos de Uso | Políticas de Privacidade</p>
            </div>
        </div>
    );
};

export const ASSETS = {
  audio: {
    vibration: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769209851/Som_de_Celular_Vibrando_-_Efeitos_Sonoros_HD_-_Sons_e_Efeitos_-_Efeitos_Sonoros_FX_youtube_hjkk8j.mp3",
    callV: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769599654/0127_vn9hda.mp4",
    callEvey: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769605600/agente_EVEY-_Part_2_Editado_dvevpg.mp3",
    whatsappAudio1: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769606859/Audio_1_Evey_Whatsapp_Editado_tgzbr0.mp4",
    whatsappAudio2: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769606882/Audio_2_Whatsapp_Evey_editado_uc6kt3.mp4", 
    whatsappAudio3: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769607254/Audio_3_Evey_Whatsapp_editado_mosfop.mp4",
    whatsappAudio4: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769608061/Audio_4_Whatsapp_EVEY_-EDITADO_dq8ube.mp4",
    whatsappAudio5: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769608074/Audio_5_Whatsapp_Evey_nnyka2.mp4",
    whatsappAudio6: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769284413/0124_1_1_edi7is.mp3",
    dialTone: "https://res.cloudinary.com/drcxtjbox/video/upload/v1769305013/ES_Telephone_Beep_Tone_Pick_Up_Vintage_-_Epidemic_Sound_issnk0.mp3",
    notification: "https://assets.mixkit.co/active_storage/sfx/2346/2346-preview.mp3" 
  },
  images: {
    avatarV: "https://res.cloudinary.com/drcxtjbox/image/upload/v1769448806/Gemini_Generated_Image_94ymws94ymws94ym_lsfsiy.png",
    avatarEvey: "https://res.cloudinary.com/drcxtjbox/image/upload/v1769449320/Gemini_Generated_Image_wsuh3iwsuh3iwsuh_a6xd5d.png",
    whatsappBg: "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
  }
};

export const getBrasiliaTime = () => {
  return new Date().toLocaleTimeString('pt-BR', { 
    timeZone: 'America/Sao_Paulo', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getBrasiliaDate = () => {
  return new Date().toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Vingança 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      /* Global Reset and mobile optimization */
      * {
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }
      
      body {
        background-color: black;
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100vh;
        height: 100dvh;
      }

      /* Custom Animations for the Game Experience */
      @keyframes typing { from { width: 0 } to { width: 100% } }
      @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #0aff0a; } }
      @keyframes glitch { 
        0% { transform: translate(0) } 
        20% { transform: translate(-2px, 2px) } 
        40% { transform: translate(-2px, -2px) } 
        60% { transform: translate(2px, 2px) } 
        80% { transform: translate(2px, -2px) } 
        100% { transform: translate(0) } 
      }
      @keyframes shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
      @keyframes vibrate-screen { 
        0% { transform: translate(0, 0); } 
        10% { transform: translate(-2px, -2px); } 
        20% { transform: translate(2px, 2px); } 
        30% { transform: translate(-2px, 2px); } 
        40% { transform: translate(2px, -2px); } 
        50% { transform: translate(-2px, 0); } 
        60% { transform: translate(2px, 0); } 
        70% { transform: translate(0, -2px); } 
        80% { transform: translate(0, 2px); } 
        90% { transform: translate(-1px, 1px); } 
        100% { transform: translate(0, 0); } 
      }
      @keyframes matrix { from { top: -10%; } to { top: 110%; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }

      .typewriter { 
        overflow: hidden; 
        border-right: .15em solid #0aff0a; 
        white-space: nowrap; 
        margin: 0 auto; 
        letter-spacing: .15em; 
        animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite; 
      }
      .animate-vibrate-screen { animation: vibrate-screen 0.4s infinite linear; }
      .animate-glitch { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
      .animate-matrix { animation: matrix linear infinite; }
      .animate-fade-in { animation: fadeIn 0.5s ease-out; }
      .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
      .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      .animate-spin-slow { animation: spin 4s linear infinite; }

      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .text-shadow-sm { text-shadow: 1px 1px 2px rgba(0,0,0,0.5); }
    </style>
  <script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "react/": "https://esm.sh/react@^19.2.4/",
    "@google/genai": "https://esm.sh/@google/genai@^1.38.0",
    "lucide-react": "https://esm.sh/lucide-react@^0.563.0"
  }
}
</script>
</head>
  <body>
    <div id="root"></div>
  </body>
</html>

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

{
  "name": "Vingança 2026 - Experiência Gamificada",
  "description": "Uma experiência interativa e imersiva de storytelling gamificado envolvendo protocolos de segurança, hacking simulado e comunicações criptografadas.",
  "requestFramePermissions": [
    "camera",
    "microphone"
  ]
}

import { GoogleGenAI } from "@google/genai";

export const callGemini = async (prompt: string, systemInstruction: string = "") => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    return "Erro de conexão segura. Tente novamente mais tarde.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "Você é a 'Agente Evey'. Responda curto e direto sobre como ganhar dinheiro com o app. Fale em Português."
      }
    });

    return response.text || "Sem resposta do sistema.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O sinal está instável. Protocolo de segurança redefinindo...";
  }
};

export interface Message {
  id: number;
  type: 'system' | 'text' | 'audio';
  sender?: 'Agente Evey' | 'user';
  text?: string;
  time?: string;
  duration?: string;
  audioUrl?: string;
  played?: boolean;
}

export interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
  likes: number;
}

export interface Post {
  id: number;
  videoUrl: string;
  desc: string;
  likes: string;
  comments: string;
  saves: string;
  placeholder?: string;
}

export type AppStep = 
  | 'incoming-v'
  | 'active-v'
  | 'hacked'
  | 'keypad'
  | 'outgoing-call'
  | 'active-evey'
  | 'whatsapp-intro'
  | 'lock-screen'
  | 'whatsapp-chat'
  | 'tiktok-secret'
  | 'tiktok-feed'
  | 'sales-page';
