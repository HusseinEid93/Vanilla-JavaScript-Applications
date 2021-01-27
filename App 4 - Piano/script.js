const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const allKeys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');
const audios = document.querySelectorAll('audio');


allKeys.forEach(key => {
    key.addEventListener('click', () => {
        playAudio(key);
    });
});


window.addEventListener('keydown', e => {
    // In case the key is being hold down repeatedly.
    if (e.repeat) return;
    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) {
        playAudio(whiteKeys[whiteKeyIndex]);
    }
    if (blackKeyIndex > -1) {
        playAudio(blackKeys[blackKeyIndex]);
    }

});


function playAudio(key) {
    const audio = document.getElementById(key.dataset.note);
    key.classList.add('active');
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener('ended', () => {
        key.classList.remove('active');
    });
}