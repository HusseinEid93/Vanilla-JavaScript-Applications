import Store from "./Store.js";


export default class UI {
   static list = document.getElementById('book-list');


   static displayStoredBooksOnLoading = () => {
      Store.retrieveStoredBooks().forEach(book => this.addBookToList(book));
   }


   static handleFormSubmitting(book) {
      const { title, author, isbn } = book;
      if (title === '' || author === '' || isbn === '') {
         this.showAlert('warning');
         return;
      }

      this.addBookToList(book);
      this.showAlert('adding');

      // Add the book to the local storage 
      Store.addToStoredBooks(book);

      this.clearFields();
   }


   static addBookToList(book) {
      const { title, author, isbn } = book;
      const row = document.createElement('div');
      row.className = 'book';
      row.innerHTML = `
         <div>${title}</div>
         <div>${author}</div>
         <div>${isbn}</div>
         <div class="delete">
            <i class="fas fa-trash-alt"></i>
         </div>
      `;

      row.querySelector('.delete').addEventListener('click', e => {
         this.handleDeletion(e.target.closest('.delete'));
      });

      this.list.append(row);
   }


   static handleDeletion(deleteBtn) {
      deleteBtn.parentElement.remove();
      this.showAlert('deletion');

      // Remove book from local storage 
      Store.removeFromStoredBooks(deleteBtn.closest('.book'))
   }


   static showAlert(type) {
      const alert = document.querySelector(`[data-type=${type}]`);
      alert.classList.add('show');
      setTimeout(() => {
         alert.classList.remove('show');
      }, 3000);
   }


   static clearFields() {
      document.querySelectorAll('input:not([type="submit"])').forEach(input => input.value = '');
   }

}