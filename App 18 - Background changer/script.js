const changeBtn = document.getElementById('change');
const colorText = document.getElementById('color');
const body = document.body;


changeBtn.addEventListener('click', changeBackground);



function changeBackground() {
   const [red, green, blue]
      = [getRandomRGB(), getRandomRGB(), getRandomRGB()];

   const colorString = `rgb(${red}, ${green}, ${blue})`;

   body.style.backgroundColor = colorString;

   colorText.innerText = colorString;
}


function getRandomRGB() {
   return Math.floor(Math.random() * 256);
}