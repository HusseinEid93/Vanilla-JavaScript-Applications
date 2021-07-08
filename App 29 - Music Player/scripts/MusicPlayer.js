export default class {
   constructor(container) {
      this.container = container;
      this.previousBtn = document.getElementById('previous');
      this.playBtn = document.getElementById('play');
      this.nextBtn = document.getElementById('next');
      this.audio = document.getElementById('audio');
      this.progressBar = document.querySelector('.container__progress-bar');
      this.progress = document.querySelector('.container__progress');
      this.info = document.querySelector('.container__info');
      this.title = document.querySelector('.container__title');
      this.cover = document.getElementById('cover');
      // Song titles 
      this.songs = ['hey', 'summer', 'ukulele'];
      // Keep track of songs 
      this.songIndex = 2;

      // Initially load a song in the DOM 
      this.loadSong(this.songs[this.songIndex]);

      // playBtn event handler 
      this.playBtn.addEventListener('click', this.handlePlayBtnClick);
      // previousBtn event handler 
      this.previousBtn.addEventListener('click', this.playPreviousSong);
      // nextBtn event handler
      this.nextBtn.addEventListener('click', this.playNextSong);
      // audio timeupdate event handler 
      this.audio.addEventListener('timeupdate', this.updateProgress);
      // progress bar click event handler 
      this.progressBar.addEventListener('click', this.setProgress);
      // handle audio ending 
      this.audio.addEventListener('ended', this.playNextSong);
   }

   loadSong = song => {
      this.title.textContent = song;
      this.audio.src = `./music/${song}.mp3`;
      this.cover.src = `./images/${song}.jpg`;
   }

   handlePlayBtnClick = () => {
      const isPlaying = this.container.classList.contains('play');
      !isPlaying ? this.playSong() : this.pauseSong();
   }

   playPreviousSong = () => {
      this.songIndex -= 1;
      if (this.songIndex < 0)
         this.songIndex = this.songs.length - 1;

      this.loadSong(this.songs[this.songIndex]);
      this.playSong();
   }

   playNextSong = () => {
      this.songIndex += 1;
      if (this.songIndex > this.songs.length - 1)
         this.songIndex = 0;
      this.loadSong(this.songs[this.songIndex]);
      this.playSong();
   }

   playSong = () => {
      this.container.classList.add('play');
      this.audio.play();
      this.playBtn.firstElementChild.className = 'fas fa-pause';
   }

   pauseSong = () => {
      this.container.classList.remove('play');
      this.audio.pause();
      this.playBtn.firstElementChild.className = 'fas fa-play';
   }

   updateProgress = () => {
      const { duration, currentTime } = this.audio;
      const progressPercent = (currentTime / duration) * 100;
      this.progress.style.width = `${progressPercent}%`;
   }

   setProgress = e => {
      const width =
         parseFloat(getComputedStyle(this.progressBar).width)
      const offsetX = e.offsetX;
      const duration = this.audio.duration;
      this.audio.currentTime = (offsetX / width) * duration;
   }
}