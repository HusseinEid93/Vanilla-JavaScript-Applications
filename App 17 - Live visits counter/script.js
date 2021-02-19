const countEl = document.getElementById('count');

// Self invoked function. 
(async function () {
   let response = await fetch('https://api.countapi.xyz/hit/byhusseinEid');

   let json = await response.json();

   let value = json.value;

   countEl.innerText = (+value).toLocaleString();
})();

