export function convertTimeToMilli(count) {
    const mainSeconds = parseInt(count / 100);
    const decimalSeconds = parseInt((count % 100).toFixed(2));
    return `${mainSeconds} : ${decimalSeconds}`;
  }
  
  export function convertTimeToProgress(count, time) {
    if (time === 0) return;
    return 100 - count / time;
  }
  
  export function convertTimeToMMSS(time) {
    const seconds = parseInt(time % 60);
    const minutes = parseInt((time - seconds) / 60);
    return `${pad(minutes)} : ${pad(seconds)}`;
  }
  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }
  