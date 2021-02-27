const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const layers = document.querySelectorAll('.nav');
const arrow = document.querySelector('.fa-chevron-down');
const dropdownMenu = document.querySelector('.dropdown-menu');


open_btn.addEventListener('click', () => {
   // Show the layers 
   layers.forEach(nav => nav.classList.add('visible'));
});


close_btn.addEventListener('click', () => {
   // Hide the layers 
   layers.forEach(nav =>
      nav.classList.remove('visible')
   );
});


arrow.addEventListener('click', () => {

   dropdownMenu.classList.remove('fadeOut');
   if (!dropdownMenu.classList.contains('show-dropdown')) {
      dropdownMenu.classList.add('show-dropdown');
   }
   else {
      dropdownMenu.classList.add('fadeOut');
      setTimeout(() => dropdownMenu.classList.remove('show-dropdown'), 500)
   }

   // rotate the arrow 
   arrow.classList.toggle('rotate-180');
});