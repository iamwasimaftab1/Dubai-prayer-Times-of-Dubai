import React from 'react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  icon?: React.ReactNode;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ name, time, isNext }) => {
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 rounded-[2rem] transition-all duration-500 ${
        isNext
          ? 'bg-slate-900 text-white shadow-[0_20px_40px_-15px_rgba(184,134,11,0.5)] scale-105 z-10 ring-2 ring-[#b8860b] active-prayer-pulse'
          : 'bg-white text-slate-800 border border-slate-100 hover:border-[#b8860b]/30'
      }`}
    >
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .active-prayer-pulse {
          animation: soft-pulse 3s ease-in-out infinite;
        }
      `}</style>
      
      {/* Dynamic Background Glow for Active State */}
      {isNext && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -inset-2 bg-[#b8860b] blur-2xl animate-pulse"></div>
        </div>
      )}

      <span 
        className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${
          isNext ? 'text-[#b8860b]' : 'text-slate-400'
        }`}
      >
        {name}
      </span>

      <span className={`text-2xl sm:text-3xl font-black tracking-tighter transition-all duration-300 ${
        isNext ? 'scale-110' : ''
      }`}>
        {time}
      </span>

      <div className={`mt-2 overflow-hidden transition-all duration-500 ${isNext ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <span className="text-[8px] sm:text-[9px] bg-[#b8860b]/10 text-[#b8860b] border border-[#b8860b]/20 px-2 sm:px-3 py-1 rounded-full font-black uppercase tracking-widest whitespace-nowrap animate-pulse">
          Active
        </span>
      </div>
      
      {!isNext && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-slate-100 rounded-t-full"></div>
      )}
    </div>
  );
};

export default PrayerCard;