document.addEventListener("DOMContentLoaded", () => {
    const sliderPersons = document.querySelector('.persons__items');
    const prev = document.querySelector('.persons__arrow_prev');
    const next = document.querySelector('.persons__arrow_next');
    const currentEl = document.querySelector('.persons__current');
    const totalEl = document.querySelector('.persons__total');

    const participants = [
        { name: "Хосе-Рауль Капабланка", title: "Чемпион мира по шахматам", img: "img/person.png" },
        { name: "Эммануил Ласкер", title: "Чемпион мира по шахматам", img: "img/person.png" },
        { name: "Александр Алехин", title: "Чемпион мира по шахматам", img: "img/person.png" },
        { name: "Арон Нимцович", title: "Чемпион мира по шахматам", img: "img/person.png" },
        { name: "Рихард Рети", title: "Чемпион мира по шахматам", img: "img/person.png" },
        { name: "Остап Бендер", title: "Гроссмейстер", img: "img/person.png" }
    ];

    let currentSlide = 0;
    let visibleSlides = 3;
    let slideCount = participants.length;
    let autoScroll;

    const getVisibleSlides = () => {
        if (window.innerWidth < 699.98) return 1;
        if (window.innerWidth < 991.98) return 2;
        return 3;
    };

    const renderSlides = () => {
        sliderPersons.innerHTML = '';

        participants.forEach((participant) => {
            const slide = document.createElement('div');
            slide.classList.add('persons__item', 'person-slide');
            slide.innerHTML = `
                <div class="person-slide__image">
                    <img src="${participant.img}" alt="${participant.name}">
                </div>
                <div class="person-slide__content">
                    <div class="person-slide__name">${participant.name}</div>
                    <div class="person-slide__title">${participant.title}</div>
                    <a href="" class="btn btn_small">Подробнее</a>
                </div>
            `;
            sliderPersons.appendChild(slide);
        });

        updateLayout();
        update();
    };

    const updateLayout = () => {
        const slides = document.querySelectorAll('.persons__item');
        visibleSlides = getVisibleSlides();
        const slideWidthPercent = 100 / visibleSlides;

        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidthPercent}%`;
        });
    };

    const update = () => {
        const slides = document.querySelectorAll('.persons__item');
        const slideWidth = slides[0]?.offsetWidth || 0;
        sliderPersons.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        let lastVisibleIndex = currentSlide + visibleSlides;
        if (lastVisibleIndex > slideCount) lastVisibleIndex = slideCount;

        currentEl.textContent = lastVisibleIndex;
        totalEl.textContent = slideCount;
    };

    const nextSlide = () => {
        currentSlide += visibleSlides;
        if (currentSlide >= slideCount) currentSlide = 0;
        update();
    };

    const prevSlide = () => {
        currentSlide -= visibleSlides;
        if (currentSlide < 0) currentSlide = Math.max(0, slideCount - visibleSlides);
        update();
    };

    const resetAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            nextSlide();
        }, 4000);
    };

    next.addEventListener('click', () => {
        nextSlide();
        resetAutoScroll();
    });

    prev.addEventListener('click', () => {
        prevSlide();
        resetAutoScroll();
    });

    window.addEventListener('resize', () => {
        const prevVisible = visibleSlides;
        visibleSlides = getVisibleSlides();
        if (prevVisible !== visibleSlides) {
            renderSlides();
        } else {
            updateLayout();
            update();
        }
    });

    renderSlides();
    resetAutoScroll();
});
