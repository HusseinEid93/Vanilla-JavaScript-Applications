//Get all elements
const boxes = document.querySelectorAll('.box'),
   headings = document.querySelectorAll('h1'),
   spanElements = document.querySelectorAll('span'),
   audios = document.querySelectorAll('audio');

const LETTERS =
   ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']


function playAudio(e) {
   if (e.repeat) return;
   const key = e.key.toLowerCase();
   if (LETTERS.includes(key)) {
      const index = LETTERS.indexOf(key);
      boxes[index].classList.add('active');
      headings[index].classList.add('active');
      spanElements[index].classList.add('active');
      resetAudios();
      audios[index].play();
   }
}

function resetAudios() {
   audios.forEach(audio => {
      audio.currentTime = 0;
      audio.pause();
      removeChangesAfterPause();
   });
}

function removeChangesAfterPause() {
   audios.forEach((audio, index) => {
      audio.addEventListener('pause', () => {
         const parentBox = boxes[index];
         parentBox.classList.remove('active');
         Array.from(parentBox.children).forEach(child => child.classList.remove('active'));
      });
   })
}


function removeChangesAfterEnding(index) {
   const parentBox = boxes[index];
   parentBox.classList.remove('active');
   Array.from(parentBox.children).forEach(child => child.classList.remove('active'));
}

audios.forEach((audio, index) => {
   audio.addEventListener('ended', () => {
      removeChangesAfterEnding(index);
   });
});

window.addEventListener('keydown', playAudio);