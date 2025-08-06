function animateFigure(el, toX, toY, duration = 1500, steps = 15) {
  const startX = 0;
  const startY = 0;
  let currentStep = 0;
  el.style.opacity = 1;

  const stepX = toX / steps;
  const stepY = toY / steps;

  const interval = setInterval(() => {
    const progressX = startX + stepX * currentStep;
    const progressY = startY + stepY * currentStep;

    const rotate = Math.sin(currentStep * 0.5) * 35;

    el.style.transform = `translate(${progressX}px, ${progressY}px) rotate(${rotate}deg)`;

    currentStep++;

    if (currentStep > steps) {
      clearInterval(interval);
      el.style.transform = `translate(${toX}px, ${toY}px) rotate(0deg)`;
    }
  }, duration / steps);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const pawn = document.querySelector('.chess-piece_pawn');
    const knight = document.querySelector('.chess-piece_knight');
    const queen = document.querySelector('.chess-piece_queen');
    const king = document.querySelector('.chess-piece_king');

    animateFigure(pawn, -408, -37);
    setTimeout(() => animateFigure(knight, -202, -217), 300);
    setTimeout(() => animateFigure(queen, -427, 446), 600);
    setTimeout(() => animateFigure(king, 325, 550), 900);
  }, 500);
});

//plant
document.addEventListener('DOMContentLoaded', function () {
    const target = document.querySelector('#steps');
    const plane = document.querySelector('.steps__image');

    if (!target || !plane) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          plane.classList.add('animate');
          observer.unobserve(target); 
        }
      },
      {
        threshold: 0.6, 
      }
    );

    observer.observe(target);
  });