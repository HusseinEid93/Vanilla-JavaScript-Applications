const container = document.querySelector('.container');
const text = document.getElementById('text');
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;


breatheAnimation();

setInterval(breatheAnimation, 7500);


function breatheAnimation() {
   text.textContent = 'Breathe In!';
   container.className = 'container grow';
   setTimeout(() => {
      text.textContent = 'Hold';
      setTimeout(() => {
         text.textContent = 'Breathe Out';
         container.className = 'container shrink';
      }, holdTime);
   }, breatheTime);
}

