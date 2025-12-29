
import { PrayerTiming } from '../types';

export const parseCSV = (csvText: string): PrayerTiming[] => {
  const lines = csvText.split(/\r?\n/);
  const result: PrayerTiming[] = [];
  
  if (lines.length === 0) return [];

  // Robustly find starting line
  let startIdx = 0;
  for(let i = 0; i < Math.min(lines.length, 5); i++) {
    const lineLower = lines[i].toLowerCase();
    if (lineLower.includes('date') && lineLower.includes('fajr')) {
      startIdx = i + 1;
      break;
    }
  }

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split by comma, but handle quoted strings if necessary
    const parts = line.split(',').map(part => part.trim().replace(/^["']|["']$/g, ''));
    
    // Expected structure: Date, City, Fajr, Sunrise/Shurooq, Dhuhr, Asr, Maghrib, Isha
    if (parts.length >= 8) {
      result.push({
        date: parts[0],
        city: parts[1],
        fajr: parts[2],
        shurooq: parts[3],
        duhur: parts[4],
        asr: parts[5],
        maghrib: parts[6],
        isha: parts[7]
      });
    }
  }
  
  return result;
};
