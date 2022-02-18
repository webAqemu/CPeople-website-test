import * as myFunctions from "./modules/functions.js"
myFunctions.isWebp();

// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper';

import nouislider from "nouislider";

import SmoothScroll from "smooth-scroll";

var scroll = new SmoothScroll('a[href*="#"]');

const proofesSlider = new Swiper(".proofes__slider", {
    modules: [Navigation, Pagination],
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 20,
    slideClass: "proofes__slide",
    navigation: {
        nextEl: '.proofes__arrow--next',
        prevEl: '.proofes__arrow--prev',
    },
    pagination: {
        el: ".proofes__pagination",
        type: "bullets"
    },
    breakpoints: {
        900: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4
        }
    }
    
})

// функция красивого вывода чисел (3500000 -> 3 500 000)
const beautyNum = function (num) {
    const k = (num + "").length % 3;
    const str = `${num}`;
    let newNum = "";
    let flag = false;
    if ((num + "").length >= 4) {
      for (let i = 0; i < k; i++) {
        newNum += `${str[i]}`;
        flag = true;
      }
      for (let i = 0; i < (num + "").length - k; i++) {
        if (i % 3 == 0 || flag) {
          newNum += " ";
          flag = false;
        }
        newNum += `${str[i + k]}`;
        //console.log(newNum);
      }
    } else {
      newNum = num;
    }

    return newNum
};

const calcPayment = function() {
    const sum = +document.getElementById("sum").dataset.sum
    const month = +document.getElementById("month").dataset.month
    const percent = +document.getElementById("percent").dataset.percent / 100 + 1
    const paymentEl = document.getElementById("payment")

    const payment = beautyNum(Math.trunc(sum * percent / month))

    paymentEl.innerHTML = `${payment} ₽`
};

const priceSliderEl = document.getElementById("price");
const priceFrom = document.getElementById("priceFrom").dataset.price
const priceTo = document.getElementById("priceTo").dataset.price

const priceSlider = nouislider.create(priceSliderEl, {
    start: [500000],
    connect: "lower",
    step: 1000,
    behaviour: "drag",
    range: {
        'min': +priceFrom,
        'max': +priceTo
    }
})

priceSlider.on("update", function(data) {
    const price = Math.trunc(+data)
    document.getElementById('sum').dataset.sum = price 
    const finalPrice = beautyNum(price)
    setValue(finalPrice + " ₽", 'sum')
    calcPayment()
})

const dateSliderEl = document.getElementById("date");
const dateFrom = document.getElementById("monthFrom").dataset.price
const dateTo = document.getElementById("monthTo").dataset.price

const dateSlider = nouislider.create(dateSliderEl, {
    start: [36],
    connect: "lower",
    step: 1,
    behaviour: "drag",
    range: {
        'min': +dateFrom,
        'max': +dateTo
    }
})

dateSlider.on("update", function(data) {
    const month = Math.trunc(data)
    document.getElementById('month').dataset.month = month 
    setValue(month + " мес.", 'month')
    calcPayment()
})

function setValue(value, id) {
    document.getElementById(id).innerHTML = value
}

const form = document.querySelector(".card__form")
const btn = document.querySelector(".promo__btn")
window.addEventListener("scroll", function(e) {
    if(window.innerWidth < 767 && form.getBoundingClientRect().top < window.innerHeight && form.getBoundingClientRect().bottom + 450 > window.innerHeight) {
        btn.classList.add("hiden")
    } else {
        btn.classList.remove("hiden")
    }
})