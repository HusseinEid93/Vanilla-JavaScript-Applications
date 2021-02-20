// Self-invoked arrow function 
(() => {
   const burger = document.querySelector('.burger');
   const nav = document.querySelector('.nav-links');
   const navLinks = document.querySelectorAll('nav .nav-links li');


   burger.addEventListener('click', () => {
      burger.classList.toggle('active');

      nav.classList.toggle('active');

      // Animate links 
      navLinks.forEach((link, index) => {
         link.style.setProperty('animation-delay', `${index / 7 + 0.3}s`);

         link.classList.toggle('slideIn');
      });
   });

})();


