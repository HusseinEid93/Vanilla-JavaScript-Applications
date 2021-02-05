const API_URL =
   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
   "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const form = document.querySelector('form');
const search = document.getElementById('search');
const main = document.querySelector('main');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');


let page = 1;
let switchToSearchPagination = false;
let searchTerm;


// Initial call 
getMovies(API_URL, 1);


async function getMovies(url, page) {
   const response = await fetch(url + page);
   const responseData = await response.json();


   // Save the number of pages in the local storage 
   localStorage.setItem('total_pages', responseData.total_pages);

   showMovies(responseData.results);
}




function showMovies(movies) {
   // Empty the main first 
   main.innerHTML = '';

   movies.
      filter(movie => movie.poster_path !== null).
      sort((a, b) => b.vote_average - a.vote_average).forEach(movie => {
         const { poster_path, title, vote_average, overview, release_date } = movie;

         const movieElement = document.createElement('div');
         movieElement.className = 'movie';
         movieElement.innerHTML = `
            <div class="image">
               <img
                  src="${IMG_PATH}${poster_path}"
                  alt="${title}"
               />
            </div>
            <div class="movie-info">
               <h2>${title}</h2>
               <span class="${getRateColor(vote_average)}">
                  ${vote_average}
               </span>
               <i class="fas fa-chevron-up" onclick='showOverview(event)' ></i>
            </div>

            <div class='overview hide'>
               <h2>Overview</h2>
               <p>${overview}</p>
               <h4>Release Date: <span>${release_date}</span> </h4>
               <i class="fas fa-chevron-down" onclick='hideOverview(event)' ></i>
            </div>
         `;


         // Append to the body 
         main.appendChild(movieElement);

      });
}


function showOverview(e) {
   const target = e.target;
   const overview = target.parentElement.nextElementSibling;
   const overviewHideIcon = overview.querySelector('i.fa-chevron-down');
   // target.classList.remove('show');
   target.classList.add('hide');
   overviewHideIcon.classList.remove('hide');
   overviewHideIcon.classList.add('show');
   overview.classList.remove('hide');
   overview.classList.add('show');
}


function hideOverview(e) {
   const target = e.target;
   const overview = target.parentElement;
   const showOverviewIcon = overview.previousElementSibling.querySelector('i.fa-chevron-up');
   // target.classList.remove('hide');
   target.classList.add('hide');
   showOverviewIcon.classList.remove('hide');
   showOverviewIcon.classList.add('show');
   overview.classList.remove('show');
   overview.classList.add('hide');
}


function getRateColor(vote_average) {
   return vote_average >= 8 ? 'green'
      : vote_average >= 5 ? 'orange'
         : 'red';
}



async function getMoviesBySearch(movieName, page) {
   const response = await fetch(`${SEARCH_API}${movieName}&page=${page}`);
   const responseData = await response.json();
   showMovies(responseData.results);

   //Save the number of pages in the local storage.  
   localStorage.setItem('total_pages', responseData.total_pages);
}


form.addEventListener('submit', e => {
   e.preventDefault();

   const searchValue = search.value;
   searchTerm = searchValue;

   if (searchValue) {
      switchToSearchPagination = true;

      // Reset the variable 'page'
      page = 1;

      getMoviesBySearch(searchValue, page)
   }

});



next.addEventListener('click', () => {
   const totalPages = localStorage.getItem('total_pages');
   if (switchToSearchPagination && page + 1 <= +totalPages) {
      getMoviesBySearch(searchTerm, ++page);
   } else if (page + 1 <= +totalPages) {
      getMovies(API_URL, ++page);
   }
});


previous.addEventListener('click', () => {
   if (switchToSearchPagination && page >= 2) {
      getMoviesBySearch(searchTerm, --page);
   } else if (page >= 2) {
      getMovies(API_URL, --page);
   }
});
