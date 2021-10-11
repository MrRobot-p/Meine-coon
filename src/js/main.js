// import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';
import './script.js';
// import '../index.html';

var escKeyCode = 27;



var write_btn = document.querySelector(".contacts-button");
var write_popap = document.querySelector(".modal-write");
var write_close = write_popap.querySelector(".modal-close");
var overlay = document.querySelector(".overlay-modal");
var form = write_popap.querySelector("form");
var user_name = form.querySelector("input[type=text]");
var user_mail = form.querySelector("input[type=email]");

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("user_name");
} catch (err) {
    isStorageSupport = false;
}

write_btn.addEventListener("click", function(evt) {
    evt.preventDefault();
    write_popap.classList.add("modal-show");
    overlay.classList.add('active');
    if (storage) {
        user_name.value = storage;
        user_mail.focus();
    } else {
        user_name.focus();
    }
});

form.addEventListener("submit", function(evt) {
    if (!user_name.value || !user_mail.value) {
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
    write_popap.classList.remove("modal-show");
    write_popap.classList.remove("modal-error");
    overlay.classList.remove('active');
});


// Закрытие по нажатию Esc модального окна обратной связи или карты

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === escKeyCode) {
        evt.preventDefault();
        if (write_popap.classList.contains("modal-show")) {
            write_popap.classList.remove("modal-show");
            write_popap.classList.remove("modal-error");
            overlay.classList.remove('active');
        }
        if (map_popap.classList.contains("modal-show")) {
            map_popap.classList.remove("modal-show");
            overlay.classList.remove('active');
        }
    }
});

overlay.addEventListener('click', function() {
    document.querySelector('.modal.modal-show').classList.remove('modal-show');
    this.classList.remove('active');
});