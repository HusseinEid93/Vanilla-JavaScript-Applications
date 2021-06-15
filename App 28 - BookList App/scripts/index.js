import UI from "./UI.js";


// Variables 
const form = document.getElementById('book-form');


document.addEventListener('DOMContentLoaded', UI.displayStoredBooksOnLoading);


form.addEventListener('submit', e => {
   e.preventDefault();
   const title = form.querySelector('#title').value;
   const author = form.querySelector('#author').value;
   const isbn = form.querySelector('#isbn').value;
   const book = { title, author, isbn };

   UI.handleFormSubmitting(book);
});