import { PrayerTiming } from './types';

export const CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah'];

export const PRAYER_NAMES: { id: keyof Omit<PrayerTiming, 'date' | 'city'>; label: string }[] = [
  { id: 'fajr', label: 'Fajr' },
  { id: 'shurooq', label: 'Sunrise' },
  { id: 'duhur', label: 'Dhuhr' },
  { id: 'asr', label: 'Asr' },
  { id: 'maghrib', label: 'Maghrib' },
  { id: 'isha', label: 'Isha' },
];

export const RAW_PRAYER_DATA: PrayerTiming[] = [
  // --- DUBAI DECEMBER 2025 ---
  { date: '01-Dec-2025', city: 'Dubai', fajr: '05:25 am', shurooq: '06:43 am', duhur: '12:11 pm', asr: '03:09 pm', maghrib: '05:32 pm', isha: '06:50 pm' },
  { date: '02-Dec-2025', city: 'Dubai', fajr: '05:26 am', shurooq: '06:44 am', duhur: '12:11 pm', asr: '03:09 pm', maghrib: '05:32 pm', isha: '06:50 pm' },
  { date: '03-Dec-2025', city: 'Dubai', fajr: '05:26 am', shurooq: '06:45 am', duhur: '12:11 pm', asr: '03:10 pm', maghrib: '05:32 pm', isha: '06:50 pm' },
  { date: '04-Dec-2025', city: 'Dubai', fajr: '05:27 am', shurooq: '06:45 am', duhur: '12:12 pm', asr: '03:10 pm', maghrib: '05:32 pm', isha: '06:51 pm' },
  { date: '05-Dec-2025', city: 'Dubai', fajr: '05:28 am', shurooq: '06:46 am', duhur: '12:12 pm', asr: '03:10 pm', maghrib: '05:32 pm', isha: '06:51 pm' },
  { date: '06-Dec-2025', city: 'Dubai', fajr: '05:28 am', shurooq: '06:47 am', duhur: '12:13 pm', asr: '03:10 pm', maghrib: '05:33 pm', isha: '06:51 pm' },
  { date: '07-Dec-2025', city: 'Dubai', fajr: '05:29 am', shurooq: '06:47 am', duhur: '12:13 pm', asr: '03:10 pm', maghrib: '05:33 pm', isha: '06:51 pm' },
  { date: '08-Dec-2025', city: 'Dubai', fajr: '05:29 am', shurooq: '06:48 am', duhur: '12:14 pm', asr: '03:11 pm', maghrib: '05:33 pm', isha: '06:52 pm' },
  { date: '09-Dec-2025', city: 'Dubai', fajr: '05:30 am', shurooq: '06:49 am', duhur: '12:14 pm', asr: '03:11 pm', maghrib: '05:33 pm', isha: '06:52 pm' },
  { date: '10-Dec-2025', city: 'Dubai', fajr: '05:31 am', shurooq: '06:49 am', duhur: '12:14 pm', asr: '03:11 pm', maghrib: '05:33 pm', isha: '06:52 pm' },
  { date: '11-Dec-2025', city: 'Dubai', fajr: '05:31 am', shurooq: '06:50 am', duhur: '12:15 pm', asr: '03:12 pm', maghrib: '05:34 pm', isha: '06:53 pm' },
  { date: '12-Dec-2025', city: 'Dubai', fajr: '05:32 am', shurooq: '06:51 am', duhur: '12:15 pm', asr: '03:12 pm', maghrib: '05:34 pm', isha: '06:53 pm' },
  { date: '13-Dec-2025', city: 'Dubai', fajr: '05:32 am', shurooq: '06:51 am', duhur: '12:16 pm', asr: '03:12 pm', maghrib: '05:34 pm', isha: '06:53 pm' },
  { date: '14-Dec-2025', city: 'Dubai', fajr: '05:33 am', shurooq: '06:52 am', duhur: '12:16 pm', asr: '03:13 pm', maghrib: '05:35 pm', isha: '06:54 pm' },
  { date: '15-Dec-2025', city: 'Dubai', fajr: '05:34 am', shurooq: '06:52 am', duhur: '12:17 pm', asr: '03:13 pm', maghrib: '05:35 pm', isha: '06:54 pm' },
  { date: '16-Dec-2025', city: 'Dubai', fajr: '05:34 am', shurooq: '06:53 am', duhur: '12:17 pm', asr: '03:13 pm', maghrib: '05:36 pm', isha: '06:54 pm' },
  { date: '17-Dec-2025', city: 'Dubai', fajr: '05:35 am', shurooq: '06:54 am', duhur: '12:18 pm', asr: '03:14 pm', maghrib: '05:36 pm', isha: '06:55 pm' },
  { date: '18-Dec-2025', city: 'Dubai', fajr: '05:35 am', shurooq: '06:54 am', duhur: '12:18 pm', asr: '03:14 pm', maghrib: '05:36 pm', isha: '06:55 pm' },
  { date: '19-Dec-2025', city: 'Dubai', fajr: '05:36 am', shurooq: '06:55 am', duhur: '12:19 pm', asr: '03:15 pm', maghrib: '05:37 pm', isha: '06:56 pm' },
  { date: '20-Dec-2025', city: 'Dubai', fajr: '05:36 am', shurooq: '06:55 am', duhur: '12:19 pm', asr: '03:15 pm', maghrib: '05:37 pm', isha: '06:56 pm' },
  { date: '21-Dec-2025', city: 'Dubai', fajr: '05:37 am', shurooq: '06:56 am', duhur: '12:20 pm', asr: '03:16 pm', maghrib: '05:38 pm', isha: '06:57 pm' },
  { date: '22-Dec-2025', city: 'Dubai', fajr: '05:37 am', shurooq: '06:56 am', duhur: '12:20 pm', asr: '03:16 pm', maghrib: '05:38 pm', isha: '06:57 pm' },
  { date: '23-Dec-2025', city: 'Dubai', fajr: '05:38 am', shurooq: '06:57 am', duhur: '12:21 pm', asr: '03:17 pm', maghrib: '05:39 pm', isha: '06:58 pm' },
  { date: '24-Dec-2025', city: 'Dubai', fajr: '05:38 am', shurooq: '06:57 am', duhur: '12:21 pm', asr: '03:17 pm', maghrib: '05:39 pm', isha: '06:58 pm' },
  { date: '25-Dec-2025', city: 'Dubai', fajr: '05:39 am', shurooq: '06:58 am', duhur: '12:22 pm', asr: '03:18 pm', maghrib: '05:40 pm', isha: '06:59 pm' },
  { date: '26-Dec-2025', city: 'Dubai', fajr: '05:39 am', shurooq: '06:58 am', duhur: '12:22 pm', asr: '03:18 pm', maghrib: '05:40 pm', isha: '06:59 pm' },
  { date: '27-Dec-2025', city: 'Dubai', fajr: '05:40 am', shurooq: '06:59 am', duhur: '12:23 pm', asr: '03:19 pm', maghrib: '05:41 pm', isha: '07:00 pm' },
  { date: '28-Dec-2025', city: 'Dubai', fajr: '05:40 am', shurooq: '06:59 am', duhur: '12:23 pm', asr: '03:20 pm', maghrib: '05:42 pm', isha: '07:01 pm' },
  { date: '29-Dec-2025', city: 'Dubai', fajr: '05:41 am', shurooq: '06:59 am', duhur: '12:24 pm', asr: '03:20 pm', maghrib: '05:42 pm', isha: '07:01 pm' },
  { date: '30-Dec-2025', city: 'Dubai', fajr: '05:41 am', shurooq: '07:00 am', duhur: '12:24 pm', asr: '03:21 pm', maghrib: '05:43 pm', isha: '07:02 pm' },
  { date: '31-Dec-2025', city: 'Dubai', fajr: '05:41 am', shurooq: '07:00 am', duhur: '12:25 pm', asr: '03:21 pm', maghrib: '05:44 pm', isha: '07:02 pm' },

  // --- DUBAI JANUARY 2026 ---
  { date: '01-Jan-2026', city: 'Dubai', fajr: '05:42 am', shurooq: '07:00 am', duhur: '12:25 pm', asr: '03:22 pm', maghrib: '05:44 pm', isha: '07:03 pm' },
  { date: '02-Jan-2026', city: 'Dubai', fajr: '05:42 am', shurooq: '07:01 am', duhur: '12:26 pm', asr: '03:23 pm', maghrib: '05:45 pm', isha: '07:04 pm' },
  { date: '15-Jan-2026', city: 'Dubai', fajr: '05:45 am', shurooq: '07:02 am', duhur: '12:31 pm', asr: '03:31 pm', maghrib: '05:54 pm', isha: '07:12 pm' },
  { date: '31-Jan-2026', city: 'Dubai', fajr: '05:43 am', shurooq: '06:59 am', duhur: '12:35 pm', asr: '03:41 pm', maghrib: '06:06 pm', isha: '07:22 pm' },

  // --- ABU DHABI JANUARY 2026 ---
  { date: '01-Jan-2026', city: 'Abu Dhabi', fajr: '05:44 am', shurooq: '07:03 am', duhur: '12:28 pm', asr: '03:26 pm', maghrib: '05:49 pm', isha: '07:07 pm' },
  { date: '15-Jan-2026', city: 'Abu Dhabi', fajr: '05:47 am', shurooq: '07:05 am', duhur: '12:34 pm', asr: '03:35 pm', maghrib: '05:58 pm', isha: '07:15 pm' },
  { date: '31-Jan-2026', city: 'Abu Dhabi', fajr: '05:46 am', shurooq: '07:01 am', duhur: '12:38 pm', asr: '03:45 pm', maghrib: '06:10 pm', isha: '07:26 pm' },

  // --- SHARJAH JANUARY 2026 ---
  { date: '01-Jan-2026', city: 'Sharjah', fajr: '05:42 am', shurooq: '07:00 am', duhur: '12:24 pm', asr: '03:21 pm', maghrib: '05:43 pm', isha: '07:02 pm' },
  { date: '15-Jan-2026', city: 'Sharjah', fajr: '05:44 am', shurooq: '07:02 am', duhur: '12:30 pm', asr: '03:30 pm', maghrib: '05:53 pm', isha: '07:11 pm' },
  { date: '31-Jan-2026', city: 'Sharjah', fajr: '05:42 am', shurooq: '06:58 am', duhur: '12:34 pm', asr: '03:40 pm', maghrib: '06:05 pm', isha: '07:21 pm' },

  // --- DUBAI FEBRUARY 2026 ---
  { date: '01-Feb-2026', city: 'Dubai', fajr: '05:42 am', shurooq: '06:58 am', duhur: '12:35 pm', asr: '03:42 pm', maghrib: '06:07 pm', isha: '07:23 pm' },
  { date: '19-Feb-2026', city: 'Dubai', fajr: '05:33 am', shurooq: '06:47 am', duhur: '12:35 pm', asr: '03:50 pm', maghrib: '06:19 pm', isha: '07:33 pm' },
  { date: '28-Feb-2026', city: 'Dubai', fajr: '05:26 am', shurooq: '06:39 am', duhur: '12:34 pm', asr: '03:52 pm', maghrib: '06:24 pm', isha: '07:37 pm' },

  // --- DUBAI MARCH 2026 ---
  { date: '01-Mar-2026', city: 'Dubai', fajr: '05:26 am', shurooq: '06:39 am', duhur: '12:34 pm', asr: '03:52 pm', maghrib: '06:24 pm', isha: '07:37 pm' },
  { date: '20-Mar-2026', city: 'Dubai', fajr: '05:07 am', shurooq: '06:20 am', duhur: '12:29 pm', asr: '03:54 pm', maghrib: '06:33 pm', isha: '07:47 pm' },
  { date: '31-Mar-2026', city: 'Dubai', fajr: '04:55 am', shurooq: '06:09 am', duhur: '12:26 pm', asr: '03:52 pm', maghrib: '06:38 pm', isha: '07:52 pm' },
];