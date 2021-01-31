const form = document.querySelector('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const popUp = document.querySelector('.popup');


async function getUser(username) {
   const response = await fetch(`https://api.github.com/users/${username}`);
   const responseData = await response.json();


   // If the user exists on Github 
   if (responseData.message !== 'Not Found') {
      createUserCard(responseData);
   } else {
      popUp.innerHTML = `${username} has no Github account.`;
      popUp.classList.remove('hide');
      popUp.classList.add('show');
   }

}


async function fetchRepos(username) {
   const response = await fetch(`https://api.github.com/users/${username}/repos`);

   const responseData = await response.json();

   return responseData;
}


async function createUserCard(user) {
   const cardHTML = `
      <div class='card'>
         <a href='${user.avatar_url}' target='_blank' >
            <img src='${user.avatar_url}' alt="${user.name}" class='avatar' />
         </a>

         <div class='user-info'>
            <h1>${user.name}</h1>
            <p>${user.bio ? user.bio : ""}</p>

            <ul>
               <li>
                  <span>Followers</span>
                  ${user.followers}
               </li>

               <li>
                  <span>Following</span>
                  ${user.following}
               </li>

               <li>
                  <span>Repositories</span>
                  ${user.public_repos}
               </li>
            </ul>

            <div class='repos-container'>
               <span>Repositories:</span>
               <div class='repos'>
                  ${await navigateToRepos(user.login)}
               </div>
            </div>

         </div>
      </div>
   `;

   main.innerHTML = cardHTML;
}


async function navigateToRepos(username) {
   // Get the repos and sort them ascendingly according to the date they pushed to Github 
   const reposRetrieved = (await fetchRepos(username)).sort((repo1, repo2) => new Date(repo1.pushed_at) - new Date(repo2.pushed_at));

   console.log(reposRetrieved);

   return reposRetrieved.map(repo =>
      `<a href='${repo.html_url}' target='_blank'>${repo.name}</a>`
   ).join('');

}


form.addEventListener('submit', e => {
   e.preventDefault();
   const searchValue = search.value;
   if (searchValue) {
      getUser(searchValue);
      search.value = '';
   }
})


// Hide the popup on typing a new username 
search.addEventListener('keydown', () => {
   popUp.classList.remove('show');
   popUp.classList.add('hide');
});
