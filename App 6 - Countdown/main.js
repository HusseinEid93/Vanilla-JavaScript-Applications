const nextYear = 'Jan 1, 2022';

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function countdown() {
   const nextYearDate = new Date(nextYear);
   const currentDate = new Date();

   const totalSeconds = (nextYearDate - currentDate) / 1000;
   const days = Math.floor(totalSeconds / (3600 * 24));
   const hours = Math.floor(totalSeconds / 3600) % 24;
   const minutes = Math.floor((totalSeconds / 60) % 60);
   const remainingSeconds = Math.floor(totalSeconds % 60);

   daysElement.innerText = days;
   hoursElement.innerText = formatNumber(hours);
   minutesElement.innerText = formatNumber(minutes);
   secondsElement.innerText = formatNumber(remainingSeconds);
}


function formatNumber(number) {
   return number < 10 ? `0${number}` : number;
}


setInterval(countdown, 1000);