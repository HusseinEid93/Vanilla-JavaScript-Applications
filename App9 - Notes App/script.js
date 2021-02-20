const addBtn = document.querySelector('.add');
const notesContainer = document.querySelector('.notes-container');




addBtn.addEventListener('click', addNewNote);


function addNewNote() {

   let count = undefined;
   const notesSaved = getNotesStored();
   // get the last note number from local storage 
   let lastNoteSavedNumber = Object.keys(notesSaved).slice(-1).join('');
   if (lastNoteSavedNumber) { //If  any 
      count = +lastNoteSavedNumber + 1;
   } else {
      count = 0;
   }


   const note = document.createElement('div');
   note.classList.add('note');
   note.dataset.num = count;

   note.innerHTML = `
      <div class="tools">
         <i class="fas fa-edit edit" title="Edit" onclick='edit(event)'></i>
         <i class="fas fa-trash-alt delete" title="Delete" onclick='deleteNote(event)'></i>
      </div>
      <div class="main hidden"></div>
      <textarea placeholder="Type here" oninput='update(event)'></textarea>
   `;


   notesContainer.appendChild(note);
}



function edit(e) {
   const note = e.target.closest('.note');
   note.querySelector('.main').classList.toggle('hidden');
   note.querySelector('textarea').classList.toggle('hidden');
}


function deleteNote(e) {
   const note = e.target.closest('.note');
   note.remove();

   let notesSaved = getNotesStored();

   const noteNumber = note.dataset.num;
   delete notesSaved[noteNumber];
   localStorage.setItem('notes', JSON.stringify(notesSaved));
}


function update(e) {
   const value = e.target.value;

   const noteNumber = e.target.closest('.note').dataset.num;


   const noteOuterHTML = `
      <div class='note' data-num=${noteNumber}>
         <div class="tools">
            <i class="fas fa-edit edit" title="Edit" onclick='edit(event)'></i>
            <i class="fas fa-trash-alt delete" title="Delete" onclick='deleteNote(event)'></i>
         </div>
         <div class="main hidden"> ${marked(value)} </div>
         <textarea placeholder="Type here" oninput='update(event)'>${value}</textarea>
      </div>
      `;


   // Get the notes from the local storage  
   let notesStored = getNotesStored();

   // Modify or add 
   notesStored[noteNumber] = noteOuterHTML;

   // Re-save 
   localStorage.setItem('notes', JSON.stringify(notesStored));


   e.target.previousElementSibling.innerHTML = marked(value);

   formatLinks(e.target.previousElementSibling);
}


// Open links in new tabs (if any)
function formatLinks(note) {
   const links = note.querySelectorAll('a');
   if (links) {
      Array.from(links).forEach(link => link.target = '_blank');
   }
}


// Show the notes stored in the local storage 
window.addEventListener('load', () => {
   let notesSaved = getNotesStored();

   if (Object.keys(notesSaved)) { // If not empty 

      let wrappers =
         Object.values(notesSaved).map(stringNote => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = stringNote;
            formatLinks(wrapper);
            return wrapper.innerHTML;
         });


      notesContainer.innerHTML = wrappers.join('');
   }
});



function getNotesStored() {
   return JSON.parse(localStorage.getItem('notes')) || {};
}
