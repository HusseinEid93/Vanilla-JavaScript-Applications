export default class Slider {


   constructor(container) {
      this.slides = container.querySelectorAll('.slide');
      this.playPauseBtn = container.querySelector('.play-pause');
      this.playPauseIcon = this.playPauseBtn.querySelector('i');
      this.playPauseBtn.addEventListener('click', this.handlePlayPauseBtnClick);
      this.arrows = container.querySelectorAll('.arrow');
      this.arrows.forEach(arrow => {
         arrow.addEventListener('click', this.handleArrowClick);
      });
      this.current = 1;
      this.paused = false;
      this.interval = undefined;
   }


   changeSlides = () => {
      if (this.current > this.slides.length)
         this.current = 1;
      if (this.current < 1)
         this.current = this.slides.length;

      this.slides.forEach((slide, index) => {
         if (index + 1 === this.current) {
            slide.style.cssText = `opacity: 1`;
         }
         else {
            slide.style.cssText = `opacity: 0`;
         }
      });
   }


   runInfinitely = () => {
      // To show the first image 
      this.changeSlides();

      this.interval = setInterval(() => {
         this.current++;
         this.changeSlides();
      }, 3000);
   }


   handlePlayPauseBtnClick = () => {
      this.paused = !this.paused;
      this.arrows.forEach(arrow => arrow.classList.toggle('show'));

      if (this.paused) {
         this.playPauseIcon.className = 'fas fa-play';
         clearInterval(this.interval);
      } else {
         this.playPauseIcon.className = 'fas fa-pause';
         this.runInfinitely();
      }
   }


   handleArrowClick = e => {
      const arrow = e.target.closest('.arrow');
      const direction = arrow.dataset.direction;
      arrow.classList.add('show');
      this.paused = true;
      this.playPauseIcon.className = 'fas fa-play';
      clearInterval(this.interval);
      direction === "left" ? this.current-- : this.current++;
      this.changeSlides();
   }

}