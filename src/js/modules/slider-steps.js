document.addEventListener("DOMContentLoaded", () => {
    const sliderSteps = document.querySelector('.steps__items');
    const slidesSteps = document.querySelectorAll('.steps__item');
    const prev = document.querySelector('.steps__arrow_prev');
    const next = document.querySelector('.steps__arrow_next');
    const dotsContainer = document.querySelector('.steps__dots');

    let index = 0;

    const update = () => {
        const slideWidth = slidesSteps[0].offsetWidth;
        sliderSteps.style.transform = `translateX(-${index * slideWidth}px)`;

        document.querySelectorAll('.steps__dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        if (prev) prev.classList.toggle('disabled', index === 0);
        if (next) next.classList.toggle('disabled', index === slidesSteps.length - 1);
    };

    const createDots = () => {
        dotsContainer.innerHTML = '';
        slidesSteps.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('steps__dot');
            if (i === index) dot.classList.add('active');
            dot.addEventListener('click', () => {
            index = i;
            update();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const checkSlider = () => {
        if (window.innerWidth < 992) {
            sliderSteps.style.width = `${slidesSteps.length * 100}%`; 
            slidesSteps.forEach(slide => {
            slide.style.flex = `0 0 ${100 / slidesSteps.length}%`; 
            });
            createDots();
            update();
        } else {
            sliderSteps.style.transform = '';
            sliderSteps.style.width = ''; 
            slidesSteps.forEach(slide => {
            slide.style.flex = '';
            });
            dotsContainer.innerHTML = '';
        }
    };

    next.addEventListener('click', () => {
        if (index < slidesSteps.length - 1) {
            index++;
            update();
        }
    });

    prev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    window.addEventListener('resize', checkSlider);
    checkSlider();
});