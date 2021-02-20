

window.addEventListener('load', () => {

   const mealsContainer = document.querySelector('.meals');
   const favoriteContainer = document.querySelector('.fav-meals');
   const searchTerm = document.getElementById('search-term');
   const searchBtn = document.getElementById('search');
   const mealPopup = document.querySelector('.popup-container');
   const mealInfoElement = document.getElementById('meal-info');
   const popupCloseBtn = document.getElementById('close-popup');



   getRandomMeal();

   fetchFavMeals();


   function getRandomMeal() {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
         .then(response => response.json())
         .then(randomMeal =>
            addMeal(randomMeal.meals[0])
         );
   }


   function addMeal(mealData) {
      const meal = document.createElement("div");
      meal.classList.add("meal");
      meal.setAttribute('data-id', mealData.idMeal);

      meal.innerHTML = `
        <div class="meal-header" title='Click for info'>
            <span class="random"> Random Recipe </span>
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
            <div class='next-arrow' title='Next'>
               <i class="fas fa-chevron-right"></i>
            </div>

            <div class='previous-arrow' title='Previous'>
               <i class="fas fa-chevron-left"></i>
            </div>
        </div>
        <div class="meal-footer">
            <h4>${mealData.strMeal}</h4>
            <i class="fas fa-heart fav-btn" title='Add to favorites'></i>
        </div>
    `;


      mealHeaderOnClick(meal, mealData);

      favBtnOnClick(meal, mealData);

      nextArrowOnClick(meal, mealData);

      previousArrowOnClick(meal);



      mealsContainer.appendChild(meal);
   }


   function mealHeaderOnClick(mealElement, mealData) {
      mealElement.querySelector('.meal-header').addEventListener('click', () => {
         showMealInfo(mealData);
      });
   }


   function favBtnOnClick(mealElement, mealData) {
      const btn = mealElement.querySelector(".meal-footer .fav-btn");

      btn.addEventListener("click", () => {
         if (btn.classList.contains("active")) {
            removeMealFromLocalStorage(mealData.idMeal);
            btn.classList.remove("active");
         } else {
            addMealToLocalStorage(mealData.idMeal);
            btn.classList.add("active");
         }

         fetchFavMeals();
      });
   }


   function nextArrowOnClick(mealElement, mealData) {
      mealElement.querySelector('.next-arrow').addEventListener('click', e => {
         e.stopPropagation();
         let previousMeals = JSON.parse(localStorage.getItem('previous')) || [];
         previousMeals = [...previousMeals, mealData.idMeal];
         localStorage.setItem('previous', JSON.stringify(previousMeals));
         mealsContainer.firstElementChild.remove();
         getRandomMeal();
      });
   }


   function previousArrowOnClick(mealElement) {
      mealElement.querySelector('.previous-arrow').addEventListener('click', async function (e) {
         e.stopPropagation();
         let previousMeals = JSON.parse(localStorage.getItem('previous')) || [];
         const lastItem = previousMeals.pop();
         localStorage.setItem('previous', JSON.stringify(previousMeals));
         if (lastItem) {
            this.classList.remove('no-back');
            //Get meal by Id 
            const mealRetrieved = await getMealById(lastItem);
            mealsContainer.firstElementChild.remove();
            addMeal(mealRetrieved);
         } else {
            this.classList.add('no-back');
         }
      });
   }



   async function getMealById(mealId) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const responseData = await response.json();
      const meal = responseData.meals[0];

      return meal;
   }


   async function getMealsBySearch(term) {
      const resp = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);

      const respData = await resp.json();
      const meals = respData.meals;

      return meals;
   }




   function getMealsFromLocalStorage() {
      const mealIds = JSON.parse(localStorage.getItem('mealIds')) || [];

      return mealIds;
   }



   function addMealToLocalStorage(mealId) {
      const mealIds = getMealsFromLocalStorage();
      localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
   }



   function removeMealFromLocalStorage(mealId) {
      const mealIds = getMealsFromLocalStorage();
      localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
   }



   async function fetchFavMeals() {
      // Clear the container of favorites first
      favoriteContainer.innerHTML = '';

      const mealIds = getMealsFromLocalStorage();

      mealIds.forEach(async function (mealId) {
         const meal = await getMealById(mealId);
         addMealFav(meal);
      });
   }




   function addMealFav(mealData) {
      const favMeal = document.createElement('li');
      favMeal.innerHTML = `
         <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
            title='Click For info'
         />
         <i class="fas fa-times-circle clear" title='Remove from favorites'></i>
         `;

      favMeal.addEventListener('click', () => {
         showMealInfo(mealData)
      });


      favMeal.querySelector('.clear').addEventListener('click', (e) => {
         e.stopPropagation();
         removeMealFromLocalStorage(mealData.idMeal);
         fetchFavMeals();
         // Remove the class .active from the heart of the meal (if it is preset)

         // Get the meal 
         const meal = mealsContainer.querySelector(`[data-id="${mealData.idMeal}"]`);

         if (meal) {
            meal.querySelector('i.fav-btn').classList.remove('active');
         }
      });

      favoriteContainer.appendChild(favMeal);
   }




   function showMealInfo(mealData) {

      const ingredients = Object.entries(mealData)
         .filter(
            entry => entry[0].includes('strIngredient') && entry[1] && entry[1].trim()
         )
         .map(entry => entry[1]);


      const measures = Object.entries(mealData)
         .filter(
            entry => entry[0].includes('strMeasure') && entry[1] && entry[1].trim()
         ).map(entry => entry[1]);


      const ingredientsAndMeasures = ingredients.map((item, index) =>
         `<li>${item} / ${measures[index]}</li>`
      );


      mealInfoElement.innerHTML = `
                     <h1>${mealData.strMeal}</h1>
               <img
                  src="${mealData.strMealThumb}"
                  alt="${mealData.strMeal}"
               />

               <p>
                  ${mealData.strInstructions}
               </p>

               <h2>Ingredients:</h2>

               <ul> ${ingredientsAndMeasures.join('')} </ul>
   `;

      mealPopup.classList.remove('hidden');
   }



   searchBtn.addEventListener('click', findMatches);
   searchTerm.addEventListener('input', findMatches);


   async function findMatches() {
      const search = searchTerm.value;

      // If the search box is not empty 
      if (search) {
         const meals = await getMealsBySearch(search);

         if (meals) {
            mealsContainer.innerHTML = '';
            meals.forEach(meal => {
               addMeal(meal);
            });
         }
      } else {
         Array.from(mealsContainer.children).forEach(
            child => child.remove()
         );
         getRandomMeal();
      }
   }



   popupCloseBtn.addEventListener('click', () => {
      mealPopup.classList.add('hidden');
   });


});