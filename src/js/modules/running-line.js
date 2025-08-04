console.log('fdlkgnsljg');

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector(".running-line__body");
  const items = document.querySelector(".running-line__items");
  const clone = items.cloneNode(true);
  body.appendChild(clone);
});