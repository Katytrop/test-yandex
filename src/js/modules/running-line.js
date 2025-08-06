document.addEventListener("DOMContentLoaded", function () {
  const bodies = document.querySelectorAll(".running-line__body");

  bodies.forEach((body) => {
    const items = body.querySelector(".running-line__items");
    if (items) {
      const clone = items.cloneNode(true);
      body.appendChild(clone);
    }
  });
});