export function addZero(num) {
  return String(num).length === 1 ? `0${num}` : String(num);
}

export function getElapsedTime(timestamp) {
  const MS_IN_MINUTE = 60000;
  const MS_IN_DAY = 86400000;

  const now = Date.now();
  const date = new Date(timestamp);
  const timeElapsedMs = now - date.getTime();

  // long time processing
  if (timeElapsedMs >= 365 * MS_IN_DAY) {
    return `${[date.getDate(), date.getMonth() + 1, date.getFullYear()]
      .map(addZero)
      .join(".")}`; // more than a one year
  } else if (timeElapsedMs >= MS_IN_DAY) {
    return `${[date.getDate(), date.getMonth() + 1].map(addZero).join(".")}`; // more than a one day
  } else if (timeElapsedMs > 30 * MS_IN_MINUTE) {
    return `${[date.getHours(), date.getMinutes()].map(addZero).join(":")}`; // more than a half hour
  }

  // processing with minutes
  const minutesVariants = [1, 5, 10, 30];
  for (const minute of minutesVariants) {
    const minuteTextPostfix = minute === 1 ? "у" : "";
    if (timeElapsedMs <= minute * MS_IN_MINUTE) {
      return `${minute} минут${minuteTextPostfix} назад`;
    }
  }

  return "at unknown time";
}
