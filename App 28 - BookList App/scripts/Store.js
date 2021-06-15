export default class Store {

   static retrieveStoredBooks() {
      return JSON.parse(localStorage.getItem('books')) || [];
   }


   static addToStoredBooks(book) {
      localStorage.setItem('books', JSON.stringify([...this.retrieveStoredBooks(), book]));
   }


   static removeFromStoredBooks(book) {
      const bookISBN = book.children[2].innerText;
      const remainingBooks = this.retrieveStoredBooks().filter(book => book.isbn !== bookISBN);

      localStorage.setItem('books', JSON.stringify(remainingBooks));
   }

}