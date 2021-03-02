// Get all elements
const form = document.getElementById('issueInputForm');
const issueDescInput = document.getElementById('issueDescInput');
const severityOptions = document.getElementById('issueSeverityInput');
const issueAssignedToInput = document.getElementById('issueAssignedToInput');
const submitBtn = document.querySelector('button[type="submit"]');
const issuesList = document.getElementById('issuesList');



submitBtn.addEventListener('click', e => {
   e.preventDefault();
   createIssue();
   issueDescInput.value = '';
   issueAssignedToInput.value = '';
})



function createIssue() {
   const issue = document.createElement('div');

   const issueInfo = {
      id: chance.guid(),
      status: "Open",
      description: issueDescInput.value,
      severity: severityOptions.value,
      assignedTo: issueAssignedToInput.value,
      closed: false
   };


   issue.innerHTML = issueMarkup(issueInfo);

   issuesList.appendChild(issue);

   // Add to the local storage 
   const alreadySavedIssues = getSavedIssues();

   localStorage.setItem('issues', JSON.stringify([...alreadySavedIssues, issueInfo]));
}



function issueMarkup({ id, status, description, severity, assignedTo, closed }) {
   return (
      `<div class='issue rounded mb-4' id="${id}">
         <div>
            <span class='font-weight-bold'>
               Issue Id:
            </span>
            <span class='d-block d-sm-inline-block' >${id}</span>
         </div>

         <p class='status font-weight-bold text-white
            ${closed ? "bg-success" : "bg-primary"}'>
            ${status}
         </p>

         <h4>${description}</h4>

         <div>
            <i class='far fa-clock mr-1'></i>
            <span class='severity'>${severity}</span>
         </div>

         <p>
            <i class='fas fa-user mr-1'></i>
            ${assignedTo}
         </p>

         <div class='buttons'>
            <a href='#' 
               class='btn btn-warning text-white mr-2
               ${closed ? "disabled" : ""}'  onclick="setStatusClosed(event)">
               Close
            </a>

            <a href='#' 
            class='btn btn-danger mr-2' onclick="deleteIssue(event)">
               Delete
            </a>
         </div>
      </div>`
   )
}


function setStatusClosed(e) {
   e.preventDefault();
   e.target.classList.add('disabled');
   const issue = e.target.closest('.issue');
   const status = issue.querySelector('.status');
   status.classList.add('bg-success');
   status.textContent = 'Closed';

   updateLocalStorage(issue, true);
}


function deleteIssue(e) {
   e.preventDefault();
   const issue = e.target.closest('.issue');

   // Remove the issue 
   issue.remove();

   updateLocalStorage(issue, false, true);
}



function updateLocalStorage(issue, onSetStatusClosed, onDeleteIssue) {
   const savedIssues = getSavedIssues();
   const issueToBeUpdatedIndex = savedIssues.findIndex(item => issue.id === item.id);

   if (onSetStatusClosed) {
      savedIssues[issueToBeUpdatedIndex].status = "Closed";
      savedIssues[issueToBeUpdatedIndex].closed = true;
   } else if (onDeleteIssue) {
      savedIssues.splice(issueToBeUpdatedIndex, 1);
   }

   // Re-save in the local storage
   localStorage.setItem('issues', JSON.stringify(savedIssues));
}


// Show the saved issues when after page loading. 
window.addEventListener('load', () => {
   const savedIssues = getSavedIssues();

   issuesList.innerHTML = savedIssues.map(issue => issueMarkup(issue)).join("");
});



// Get the saved issues from the local storage 
function getSavedIssues() {
   return JSON.parse(localStorage.getItem('issues')) || [];
}