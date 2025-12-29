import React, { useState, useEffect, useMemo } from 'react';
import { RAW_PRAYER_DATA, PRAYER_NAMES, CITIES } from './constants';
import { getCurrentDateFormatted, getNextPrayer } from './utils/dateUtils';
import CitySelector from './components/CitySelector';
import PrayerCard from './components/PrayerCard';
import TimingsTable from './components/TimingsTable';
import AdminPanel from './components/AdminPanel';
import { PrayerTiming } from './types';

const STORAGE_KEY = 'uae_prayer_data_final_v2';

const App: React.FC = () => {
  const [prayerData, setPrayerData] = useState<PrayerTiming[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('Dubai');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Get current month-year for default view
  const currentMonthIdentifier = useMemo(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]}-${d.getFullYear()}`;
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthIdentifier);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPrayerData(JSON.parse(saved));
      } catch (e) {
        setPrayerData(RAW_PRAYER_DATA);
      }
    } else {
      setPrayerData(RAW_PRAYER_DATA);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = useMemo(() => getCurrentDateFormatted(), [currentTime]);

  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    prayerData.forEach(d => {
      const parts = d.date.split('-');
      if (parts.length === 3) monthsSet.add(`${parts[1]}-${parts[2]}`);
    });
    return Array.from(monthsSet).sort((a, b) => {
        const [mA, yA] = a.split('-');
        const [mB, yB] = b.split('-');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (yA !== yB) return Number(yA) - Number(yB);
        return months.indexOf(mA) - months.indexOf(mB);
    });
  }, [prayerData]);

  // Ensure selectedMonth is actually available, if not pick the first available
  useEffect(() => {
    if (availableMonths.length > 0 && !availableMonths.includes(selectedMonth)) {
        setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  const cityFilteredData = useMemo(() => 
    prayerData.filter(d => d.city === selectedCity), 
    [prayerData, selectedCity]
  );

  const monthFilteredData = useMemo(() => 
    cityFilteredData.filter(d => d.date.includes(selectedMonth)),
    [cityFilteredData, selectedMonth]
  );

  const todayTiming = useMemo(() => {
    const found = cityFilteredData.find(d => d.date === today);
    return found || null;
  }, [cityFilteredData, today]);

  const displayTiming = todayTiming || (cityFilteredData.length > 0 ? cityFilteredData[0] : null);

  const nextPrayerInfo = useMemo(() => {
    if (!displayTiming) return null;
    return getNextPrayer({
      fajr: displayTiming.fajr,
      shurooq: displayTiming.shurooq,
      duhur: displayTiming.duhur,
      asr: displayTiming.asr,
      maghrib: displayTiming.maghrib,
      isha: displayTiming.isha,
    });
  }, [displayTiming]);

  const handleDataUpdate = (newData: PrayerTiming[]) => {
    setPrayerData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  return (
    <article className="min-h-screen bg-[#f8fafc] text-slate-900 pb-12 sm:pb-20 selection:bg-[#b8860b]/30">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#b8860b] rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-[#b8860b]/20">P</div>
            <span className="text-xl font-black tracking-tight text-slate-800">UAE <span className="text-[#b8860b]">PRY</span></span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              aria-label="Manage Data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <time className="text-sm font-black text-slate-800 tabular-nums hidden xs:block">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </time>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <section className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[#b8860b] font-black uppercase tracking-widest text-[9px]">Official Daily Schedule</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
              Prayer Times in <span className="text-[#b8860b]">{selectedCity}</span>
            </h1>
            <p className="text-slate-500 font-bold text-lg">{today}</p>
          </div>
          <CitySelector activeCity={selectedCity} onCityChange={setSelectedCity} />
        </section>

        {nextPrayerInfo && (
          <section className="mb-8 p-6 sm:p-10 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group border border-white/5 ring-4 ring-slate-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b8860b] mb-3">Up Next</p>
                <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-2">{nextPrayerInfo.name}</h2>
                <div className="flex items-center gap-2 justify-center sm:justify-start text-slate-400">
                  <span className="text-sm font-medium">Starts at</span>
                  <time className="text-xl font-black text-white">{nextPrayerInfo.time}</time>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-3">
                <div className="bg-white/5 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/10">
                  <p className="text-base font-black text-white">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                </div>
                {nextPrayerInfo.isTomorrow && (
                  <span className="text-[10px] font-black uppercase bg-[#b8860b] text-white px-3 py-1 rounded-full tracking-widest animate-pulse">Coming Tomorrow</span>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {PRAYER_NAMES.map((p) => {
            const timeValue = displayTiming ? (displayTiming as any)[p.id] : '--:--';
            const isNext = nextPrayerInfo?.name === p.label && !nextPrayerInfo.isTomorrow;
            return (
              <PrayerCard
                key={p.id}
                name={p.label}
                time={timeValue}
                isNext={isNext}
              />
            );
          })}
        </section>

        <section id="full-schedule">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Monthly Timetable</h2>
              <p className="text-sm font-medium text-slate-500">Showing full schedule for {selectedMonth.split('-').join(' ')}</p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="month-select" className="text-xs font-black uppercase text-slate-400">Month:</label>
              <select 
                id="month-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#b8860b]/20 transition-all cursor-pointer"
              >
                {availableMonths.map(m => (
                  <option key={m} value={m}>{m.split('-').join(' ')}</option>
                ))}
              </select>
            </div>
          </div>
          <TimingsTable data={monthFilteredData} currentDate={today} />
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="font-bold text-slate-800 text-sm">Official UAE Prayer Timings Widget</p>
          <p className="text-[10px] mt-2 text-slate-400 uppercase tracking-widest italic">Accurate schedule for Dubai, Abu Dhabi & Sharjah</p>
        </footer>
      </main>

      {isAdminOpen && (
        <AdminPanel 
          currentDataCount={prayerData.length}
          onDataUpdate={handleDataUpdate}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </article>
  );
};

export default App;
