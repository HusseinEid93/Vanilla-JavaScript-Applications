const changeBtn = document.getElementById('change');
const colorText = document.getElementById('color');
const body = document.body;

// Get the background color from the local storage or set it to white if there is no local storage. 
body.style.backgroundColor
   = localStorage.getItem('bg') || 'white';


changeBtn.addEventListener('click', changeBackground);



function changeBackground() {
   const [red, green, blue]
      = [getRandomRGB(), getRandomRGB(), getRandomRGB()];

   const colorString = `rgb(${red}, ${green}, ${blue})`;

   body.style.backgroundColor = colorString;

   // Save the color in the local storage. 
   localStorage.setItem('bg', colorString);

   colorText.innerText = colorString;
}


function getRandomRGB() {
   return Math.floor(Math.random() * 256);
}