const form = document.querySelector('form');
const input = document.querySelector('form input');
const todosContainer = document.querySelector('.todos');


form.addEventListener('submit', e => {
   e.preventDefault();
   if (input.value) {
      const todoNumber = getLastTodoIndex();
      const todoCreated = makeTodo(input.value, todoNumber);

      todosContainer.appendChild(todoCreated);

      // Empty the input 
      input.value = '';

      // Add the newly created todo to the todos stored in the local storage 
      addToTodosStored(todoCreated);
   }

});



function makeTodo(todoText, todoNumber) {
   if (todoText) {
      const todo = document.createElement('li');
      todo.innerHTML = todoText;

      const todoWrapper = document.createElement('div');
      todoWrapper.className = 'wrapper';
      todoWrapper.dataset.num = todoNumber;
      todoWrapper.innerHTML = `
         <input type='checkbox' onclick='toggleCompleteness(event)'></input>
         <li>${todoText}</li> 
         <i class="fas fa-times close" onclick='removeTodo(event)'></i>
      `;

      return todoWrapper;
   }
}


function toggleCompleteness(e) {
   const target = e.target;
   const listItem = e.target.nextElementSibling;

   if (target.classList.contains('checked')) {
      target.classList.remove('checked');
      target.checked = false;
      listItem.classList.remove('done');
   }


   // Add/Remove the class .done depending on the condition specified 
   listItem.classList.toggle('done', target.checked);

   // Update the local storage 
   updateTodosStored(e.target.closest('.wrapper').dataset.num, e.target.checked);
}


function getTodosStored() {
   return JSON.parse(localStorage.getItem('todos')) || [];
}


function addToTodosStored(newTodo) {
   // Check whether the input is checked or not 
   const isChecked = newTodo.querySelector('input').checked;
   const todoText = newTodo.querySelector('li').innerText;
   // Get todos stored 
   let todosStored = getTodosStored();
   // Update the todos stored 
   todosStored = [...todosStored, { "checked": isChecked, "todoText": todoText }];

   localStorage.setItem('todos', JSON.stringify(todosStored));
}


function updateTodosStored(index, isChecked) {
   // Get the array of todos 
   let todosStored = getTodosStored();

   console.log(index);

   todosStored[index].checked = isChecked;

   // Re-save 
   localStorage.setItem('todos', JSON.stringify(todosStored));
}



function getLastTodoIndex() {
   const todosStored = getTodosStored();
   return todosStored.length > 0 ? todosStored.length : 0;
}


function removeTodo(e) {
   const target = e.target;
   const todoNumber = target.closest('.wrapper').dataset.num;
   target.closest('.wrapper').remove();

   // Update the local storage 
   let todosStored = getTodosStored();

   // Remove the todo from the local storage 
   todosStored.splice(todoNumber, 1);

   // Re-save in the local storage 
   localStorage.setItem('todos', JSON.stringify(todosStored));

   showTodosStored();
}



/* ################################################ */

// Show the todos stored in the local storage on loading. 

window.addEventListener('load', showTodosStored);

function showTodosStored() {
   // Get all todos stored 
   const todos = getTodosStored();
   const todosRevived = todos.map((todo, index) => {
      const todoRevived = makeTodo(todo.todoText, index)
      if (todo.checked) {
         todoRevived.querySelector('input').classList.add('checked');

         todoRevived.querySelector('li').classList.add('done');
      }
      return todoRevived.outerHTML;
   });

   todosContainer.innerHTML = todosRevived.join('');
}