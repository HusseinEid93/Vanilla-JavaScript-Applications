const tagsElement = document.querySelector('.tags');
const textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', e => {
   createTags(e.target.value);

   if (e.key === 'Enter') {
      e.target.value = '';
      randomSelect();
   }
});


function createTags(input) {
   // Get the tags after removing the spaces on both sides and the filtration process. 
   const tags = input.split(',')
      .map(item => item.trim())
      .filter(item => item !== "");

   // Clean up the container of the tags 
   tagsElement.innerHTML = '';

   // Loop over the tags 
   tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.textContent = tag;
      tagsElement.appendChild(tagElement);
   });
}


function randomSelect() {
   const times = 30;
   const interval = setInterval(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
   }, 100);


   setTimeout(() => {
      clearInterval(interval);
   }, times * 100);

}



function pickRandomTag() {
   const tags = document.querySelectorAll('.tag');
   const randomNumber = Math.floor(Math.random() * tags.length);
   return tags[randomNumber];
}

function highlightTag(tag) {
   document.querySelectorAll('.tag').forEach(tag => unhighlightTag(tag));

   tag.classList.add('highlight');
}

function unhighlightTag(tag) {
   tag.classList.remove('highlight');
}