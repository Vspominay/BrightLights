$(function () {
    $('.slider__items').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

})


let burgOpen = document.querySelector('.header__burger');
let closeBurg = document.querySelector('.header__menu-close');
let burger = document.querySelector('.header__menu-mob-block');
let menuBurgerItem = document.querySelector('.header__menu-items-burg');
var bodyNode = document.body || document.getElementsByTagName('body')[0];

burgOpen.addEventListener('click', () => {
    burger.classList.add('active');
    bodyNode.style.overflowY = "hidden";
})

closeBurg.addEventListener('click', () => {
    burger.classList.remove('active');
    bodyNode.style.overflowY = "auto";
})


const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

menuBurgerItem.addEventListener('click', (e) => {
    burger.classList.remove('active');
    bodyNode.style.overflowY = "scroll";

})

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('show');
        }
    });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('._anim-items');
for (let elm of elements) {
    observer.observe(elm);
}
