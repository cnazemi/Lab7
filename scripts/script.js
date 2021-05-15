// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let currEntryNum = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = currEntryNum
        newPost.addEventListener("click", () => {
          setState({'page': "entry", 'num': newPost.id, 'entry': entry}, false)
          // alert("test")
        });
        document.querySelector('main').appendChild(newPost);
        currEntryNum = currEntryNum + 1;
      });
      
    });
});

document.getElementsByTagName("img")[0].addEventListener("click", () => {
  setState({'page': "settings"}, false)
  // alert("test")
});

document.getElementsByTagName("h1")[0].addEventListener("click", () => {
  setState({'page': "home"}, false)
  // alert("test")
});

window.onpopstate = function(event) {
  setState({'page': "entry"}, true)
  // alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
}