
import React, { useState } from 'react';
import { parseCSV } from '../utils/csvParser';
import { PrayerTiming } from '../types';

interface AdminPanelProps {
  onDataUpdate: (newData: PrayerTiming[]) => void;
  onClose: () => void;
  currentDataCount: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onDataUpdate, onClose, currentDataCount }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingData, setPendingData] = useState<PrayerTiming[] | null>(null);

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith('.csv'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        try {
          const parsed = parseCSV(text);
          if (parsed.length === 0) throw new Error("No valid data found in CSV");
          setPendingData(parsed);
          setError(null);
        } catch (err) {
          setError("Failed to parse CSV. Expected format: Date, City, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onSave = () => {
    if (pendingData) {
      onDataUpdate(pendingData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Data Management</h2>
            <p className="text-sm text-slate-500">Upload your CSV timing records</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-all group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-10">
          <div className="mb-8 bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="text-sm text-amber-800 leading-relaxed">
              You have <span className="font-black underline">{currentDataCount}</span> records. 
              Uploading a new CSV will <span className="font-bold">replace all existing data</span>.
            </div>
          </div>

          {!pendingData ? (
            <form 
              onDragEnter={handleDrag} 
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative p-12 border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 ${
                dragActive ? 'border-[#b8860b] bg-[#b8860b]/10 scale-[0.98]' : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <input 
                type="file" 
                accept=".csv"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <div className="w-16 h-16 bg-[#b8860b]/10 rounded-3xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-700">Drop CSV file here</p>
              <p className="text-sm text-slate-400 mt-2 text-center">Or click to browse from your computer</p>
            </form>
          ) : (
            <div className="p-8 border-2 border-[#b8860b] bg-[#b8860b]/5 rounded-[2rem] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-800">File Ready!</h3>
              <p className="text-sm text-slate-600 mt-1">Successfully parsed {pendingData.length} records.</p>
              <button 
                onClick={() => setPendingData(null)}
                className="mt-4 text-xs font-bold text-[#b8860b] hover:underline"
              >
                Choose another file
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 font-bold flex items-center gap-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <div className="mt-10 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              disabled={!pendingData}
              className={`flex-1 px-8 py-4 rounded-2xl font-black transition-all active:scale-95 ${
                pendingData 
                ? 'bg-[#b8860b] text-white shadow-xl shadow-[#b8860b]/20 hover:bg-[#a0750a]' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
