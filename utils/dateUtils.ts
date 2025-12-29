
export const getCurrentDateFormatted = (): string => {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export const parseTimeString = (timeStr: string): Date => {
  const lowerTime = timeStr.toLowerCase();
  const isPM = lowerTime.includes('pm');
  const isAM = lowerTime.includes('am');
  
  // Extract only the numbers (HH:mm)
  const timeOnly = lowerTime.replace(/[ap]m/g, '').trim();
  let [hours, minutes] = timeOnly.split(':').map(Number);

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};

export const getNextPrayer = (timings: Record<string, string>) => {
  const now = new Date();
  const prayerSequence: { name: string; key: string }[] = [
    { name: 'Fajr', key: 'fajr' },
    { name: 'Sunrise', key: 'shurooq' },
    { name: 'Dhuhr', key: 'duhur' },
    { name: 'Asr', key: 'asr' },
    { name: 'Maghrib', key: 'maghrib' },
    { name: 'Isha', key: 'isha' },
  ];

  for (const prayer of prayerSequence) {
    const prayerTime = parseTimeString(timings[prayer.key]);
    if (prayerTime > now) {
      return { name: prayer.name, time: timings[prayer.key] };
    }
  }

  // If all prayers passed today, next is Fajr tomorrow
  return { name: 'Fajr', time: timings.fajr, isTomorrow: true };
};
