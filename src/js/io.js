export /**
 * Typical Observer's registration
 */
let observer = IntersectionObserver(function (entries) {
  // entries: Array of observed elements
  entries.forEach(entry => {
    // Here we can do something with each particular entry
  });
});
const sentinel = document.querySelector('.sentinel');
// Now we should tell our Observer what to observe
observer.observe(sentinel);
