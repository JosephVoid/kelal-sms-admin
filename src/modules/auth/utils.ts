export function isPassed(now: Date, date2: Date) {
  const time1 =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const time2 =
    date2.getHours() * 3600 + date2.getMinutes() * 60 + date2.getSeconds();

  if (time1 > time2) return true;
  if (time1 < time2) return false;
  return false;
}
