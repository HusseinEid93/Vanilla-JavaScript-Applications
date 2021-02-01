const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const form = document.querySelector('form');
const search = document.querySelector('input');
const main = document.querySelector('main');

const url = (city) =>
   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


async function getWeatherByLocation(location) {
   const response = await fetch(url(location));
   const responseData = await response.json();

   addWeatherToPage(responseData);
}


function KelvinToCelsius(kelvin) {
   return Math.floor((kelvin - 273.15));
}


function addWeatherToPage(data) {
   const temperature = KelvinToCelsius(data.main.temp);

   const weather = document.createElement('div');
   weather.classList.add('weather');
   weather.innerHTML = `
      <section class='temperature' >
         <h2>${temperature}°</h2>
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      </section>

      <p>${data.weather[0].main}</p>
   `;

   main.innerHTML = '';
   main.appendChild(weather);
}


form.addEventListener('submit', e => {
   e.preventDefault();

   const location = search.value;
   search.value = '';

   if (location) { //If the search input is not empty 
      getWeatherByLocation(location);
   }

})