
export interface PrayerTiming {
  date: string;
  city: string;
  fajr: string;
  shurooq: string;
  duhur: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export type PrayerName = 'Fajr' | 'Shurooq' | 'Duhur' | 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerStatus {
  name: PrayerName;
  time: string;
  isNext: boolean;
}
