console.log('Start Project');

const escKeyCode = 27;
const WindowBreakpoints = {
    TABLET: 767
};
const headerOpenedClass = 'header--menu-opened';
const AnswerOpenedClass = 'answers--answer-opened';


// МОДАЛЬНОЕ ОКНО

var write_btn = document.querySelector(".contacts-button");
var write_popap = document.querySelector(".modal");
var write_close = write_popap.querySelector(".modal__close-btn");
var overlay = document.querySelector(".overlay-modal");
var form = write_popap.querySelector("form");
var user_name = form.querySelector("input[type=text]");
var user_tel = form.querySelector("input[type=tel]");

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("user_name");
} catch (err) {
    isStorageSupport = false;
}

write_btn.addEventListener("click", function(evt) {
    evt.preventDefault();
    write_popap.classList.add("modal--show");
    overlay.classList.add('active');
    if (storage) {
        user_name.value = storage;
        user_tel.focus();
    } else {
        user_name.focus();
    }
});

form.addEventListener("submit", function(evt) {
    if (!user_name.value || !user_tel.value) {
        evt.preventDefault();
        write_popap.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("user_name", user_name.value);
        }
    }
});

write_close.addEventListener("click", function(evt) {
    evt.preventDefault();
    write_popap.classList.remove("modal--show");
    write_popap.classList.remove("modal-error");
    overlay.classList.remove('active');
});


// Закрытие по нажатию Esc модального окна обратной связи или карты

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === escKeyCode) {
        evt.preventDefault();
        if (write_popap.classList.contains("modal--show")) {
            write_popap.classList.remove("modal--show");
            write_popap.classList.remove("modal-error");
            overlay.classList.remove('active');
        }
    }
});

overlay.addEventListener('click', function() {
    document.querySelector('.modal.modal--show').classList.remove('modal--show');
    this.classList.remove('active');
});

// БУРГЕР-МЕНЮ

var burger = document.querySelector('.header__burger');
var menuBtn = document.querySelector('.header__menu-button');
var menu = document.querySelector('.header__nav');
var cross = document.querySelector('.header__cross');



const adjustDesktopAndTablet = () => {
    if (menu.classList.contains('header__menu--hidden')) {
        menu.classList.remove('header__menu--hidden');
    }
    if (menuBtn.classList.contains('header__menu--hidden')) {
        console.log('menu: hidden');
    } else {
        menuBtn.classList.add('header__menu--hidden');
    }
    if (cross.classList.contains('header__menu--hidden')) {
        console.log('cross:hidden');
    } else {
        cross.classList.add('header__menu--hidden')
    }
};

const adjustMobile = () => {
    if (menu.classList.contains('header__menu--hidden')) {
        console.log('menu: hidden');
    } else {
        menu.classList.add('header__menu--hidden');
    }
    if (burger.classList.contains('header__menu--hidden')) {
        burger.classList.remove('header__menu--hidden');
    }
    if (menuBtn.classList.contains('header__menu--hidden')) {
        menuBtn.classList.remove('header__menu--hidden');
    }
}

const checkWindowWidth = () => {
    if (window.matchMedia(`(max-width: ${WindowBreakpoints.TABLET}px)`).matches) {
        return WindowBreakpoints.TABLET;
    }
};

let lastWindowMode = -1;
const adjustMenu = () => {
    const currentWindowMode = checkWindowWidth();
    if (lastWindowMode !== currentWindowMode) {
        switch (currentWindowMode) {
            case WindowBreakpoints.TABLET:
                adjustMobile();
                break;
            default:
                adjustDesktopAndTablet();
                break;
        }
        lastWindowMode = currentWindowMode;
    }
};

let resizeTimeout;

function resizeThrottler() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
            adjustMenu();
        }, 10);
    }
}

window.addEventListener('resize', resizeThrottler, false);
adjustMenu();

const closeMenu = () => {
    menuBtn.classList.remove(headerOpenedClass);
    menu.classList.add('header__menu--hidden');
    burger.classList.remove('header__menu--hidden');
    cross.classList.add('header__menu--hidden');
};

const openMenu = () => {
    menuBtn.classList.add(headerOpenedClass);
    burger.classList.add('header__menu--hidden');
    cross.classList.remove('header__menu--hidden');
    menu.classList.remove('header__menu--hidden');
};

menuBtn.addEventListener('click', () => {
    if (menuBtn.classList.contains(headerOpenedClass)) {
        closeMenu();
    } else {
        openMenu();
    }
});


// АККОРДИОН

document.querySelectorAll('.answers__item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});






// СЛАЙДЕРЫЫЫЫЫ

class Slider {
    constructor(photoInner, photoWrapper, sliderContent, btnPrev, btnNext, activeClass) {
        this.photoInner = document.querySelector(photoInner);
        this.photoWrapper = document.querySelector(photoWrapper);
        this.sliderContent = document.querySelectorAll(sliderContent);
        this.sliderContentLength = this.sliderContent.length;
        this.btnPrev = document.querySelector(btnPrev);
        this.btnNext = document.querySelector(btnNext);
        this.activeClass = activeClass;
        this.offsetPhoto = 0;
        this.index = 0;
        this.photoWidth = window.getComputedStyle(this.photoWrapper).width;
        this.photoWidth = +this.photoWidth.slice(0, this.photoWidth.length - 2);
    }

    slider() {
        this.photoInner.style.width = 100 * this.sliderContentLength + '%';
        this.sliderContent[this.index].classList.add(this.activeClass);

        this.btnNext.addEventListener('click', () => {

            if (this.index == this.sliderContentLength - 1) {
                this.index = 0;
                this.offsetPhoto = 0;
            } else {
                this.index++;
                this.offsetPhoto += this.photoWidth;
            }

            this.photoInner.style.transform = `translateX(-${this.offsetPhoto}px)`;

            this.sliderContent.forEach(item => {
                item.classList.remove(this.activeClass);
            });

            this.sliderContent[this.index].classList.add(this.activeClass);

        });

        this.btnPrev.addEventListener('click', () => {

            if (this.index == 0) {
                this.index = this.sliderContentLength - 1;
                this.offsetPhoto = this.photoWidth * (this.sliderContentLength - 1);
            } else {
                this.index--;
                this.offsetPhoto -= this.photoWidth;
            }

            this.photoInner.style.transform = `translateX(-${this.offsetPhoto}px)`;

            this.sliderContent.forEach(item => {
                item.classList.remove(this.activeClass);
            });

            this.sliderContent[this.index].classList.add(this.activeClass);

        });
    }
}

// ДЛЯ КОМАНДЫ

new Slider(
        '.team__photo-inner',
        '.team__photo-wrapper',
        '.team__block-content',
        '.team__button--left',
        '.team__button--right',
        'team__block-content--active')
    .slider();

// ДЛЯ ОТЗЫВА

new Slider(
        '.feedback__photo-inner',
        '.feedback__photo-wrapper',
        '.feedback__block-content',
        '.feedback__button--left',
        '.feedback__button--right',
        'feedback__block-content--active')
    .slider();