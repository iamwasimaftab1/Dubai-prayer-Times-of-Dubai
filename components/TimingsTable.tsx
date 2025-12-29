import React from 'react';
import { PrayerTiming } from '../types';

interface TimingsTableProps {
  data: PrayerTiming[];
  currentDate: string;
}

const TimingsTable: React.FC<TimingsTableProps> = ({ data, currentDate }) => {
  if (data.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
        <p className="text-slate-400 font-bold italic">No records found for the selected month.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="sticky left-0 bg-slate-50 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest z-20 border-r border-slate-100">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fajr</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sunrise</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dhuhr</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asr</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Maghrib</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Isha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => {
              const isToday = row.date === currentDate;
              return (
                <tr 
                  key={`${row.date}-${idx}`} 
                  className={`transition-colors duration-200 group ${isToday ? 'bg-amber-50/70' : 'hover:bg-slate-50/50'}`}
                >
                  <td className={`sticky left-0 px-6 py-4 text-sm font-bold whitespace-nowrap z-10 border-r border-slate-100 transition-colors ${
                    isToday ? 'bg-amber-50 text-[#b8860b]' : 'bg-white text-slate-700 group-hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      {isToday && <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-ping"></span>}
                      {row.date}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm tabular-nums font-medium ${isToday ? 'text-[#b8860b]' : 'text-slate-600'}`}>{row.fajr}</td>
                  <td className="px-6 py-4 text-sm tabular-nums font-medium text-slate-400 italic">{row.shurooq}</td>
                  <td className={`px-6 py-4 text-sm tabular-nums font-medium ${isToday ? 'text-[#b8860b]' : 'text-slate-600'}`}>{row.duhur}</td>
                  <td className={`px-6 py-4 text-sm tabular-nums font-medium ${isToday ? 'text-[#b8860b]' : 'text-slate-600'}`}>{row.asr}</td>
                  <td className={`px-6 py-4 text-sm tabular-nums font-medium ${isToday ? 'text-[#b8860b]' : 'text-slate-600'}`}>{row.maghrib}</td>
                  <td className={`px-6 py-4 text-sm tabular-nums font-medium ${isToday ? 'text-[#b8860b]' : 'text-slate-600'}`}>{row.isha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden px-6 py-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            Scroll horizontally to view full day
          </p>
      </div>
    </div>
  );
};

export default TimingsTable;