let hamburger = document.querySelector(".header-navbar__hamburger")
let headerList = document.querySelector(".header-navbar__list");
let categoriaItem = document.querySelector(".subcat");
let blockwithSubcats = document.querySelector(".header-navbar__subcategories-container");
let shoppingCartIcon = document.querySelector(".header-cart");
let shoppingCartMenu = document.querySelector(".shoping-cart__container")
let login = document.querySelector(".header-login");
let menuCloseCross = document.querySelector(".fa-times")
let closeShopCart = document.querySelector(".continue-shopping-button")

// Open/Close Menu

function openMenu(e) {
  e.stopPropagation()
  headerList.style.display = "block";
}

hamburger.addEventListener("click", openMenu);


function closeHamburger() {
  headerList.style.display = "none";
}

menuCloseCross.addEventListener("click", closeHamburger)

// Open/Close Cart

function openCartMenu(e) {
  e.stopPropagation()

  if (shoppingCartMenu.style.display === "none" || shoppingCartMenu.style.display === "") {
    shoppingCartMenu.style.display = "block";
    login.style.display = "none"
  } else if (shoppingCartMenu.style.display === "block") {
    shoppingCartMenu.style.display = "none";
    login.style.display = "flex"
  }
}

shoppingCartIcon.addEventListener("click", openCartMenu)



document.addEventListener("click", closeShoppingCart)
closeShopCart.addEventListener("click", closeShopping)

function closeShopping(e) {
  e.stopPropagation()

  login.style.display = "flex"
  shoppingCartMenu.style.display = "none"
}


function closeShoppingCart(e) {
  let hasShoppingContainer = e.path.some((elem) => {
    if (!elem.classList) {
      return false
    }

    return elem.classList.contains('shoping-cart__container')
  })

  if (!hasShoppingContainer) {
    login.style.display = "flex"
    shoppingCartMenu.style.display = "none"
  }
}

// Open/close Subhead categories

let activeCategoria = document.querySelector(".active-categoria")
let subHeadContainer = document.querySelector(".header-navbar__subcategories-wrapper")
let openCloseCategoria = document.querySelector(".active-icon")
let menuSocialIcons = document.querySelector(".active-icons")
let lastElem = document.querySelector(".last")

activeCategoria.addEventListener("click", openCloseSubCategories)

function openCloseSubCategories(e) {
  e.stopPropagation()
  if (subHeadContainer.style.display === "block" || subHeadContainer.style.display === "") {
    subHeadContainer.style.display = "none";
    openCloseCategoria.innerHTML = "+"
    menuSocialIcons.style.display = "flex"

  } else if (subHeadContainer.style.display === "none") {
    subHeadContainer.style.display = "block";
    openCloseCategoria.innerHTML = "-"
    menuSocialIcons.style.display = "none"
  }
}

// Main Slider Logic

const slidesPics = document.getElementsByClassName("slide-pic");
const dotsPics = document.getElementsByClassName("dots");
const slidesText = document.getElementsByClassName("header-proposal__container-item");
const dotsText = document.getElementsByClassName("dot");
let slidePicIndex = 1;
let slideTextIndex = 1;


showSlides(slidePicIndex, slidesPics, dotsPics, slidePicIndex);
showSlides(slideTextIndex, slidesText, dotsText, slideTextIndex);


function currentSlidePic(n) {
  showSlides(slidePicIndex = n, slidesPics, dotsPics, slidePicIndex);
}

function currentSlide(n) {
  showSlides(slideTextIndex = n, slidesText, dotsText, slideTextIndex);
}

function showSlides(n, slidesElements, dotsElements, index) {
  if (n > slidesElements.length) { index = 1 }
  if (n < 1) { index = slidesElements.length }
  for (let i = 0; i < slidesElements.length; i++) {
    slidesElements[i].style.display = "none";
  }
  for (i = 0; i < dotsElements.length; i++) {
    dotsElements[i].className = dotsElements[i].className.replace(" active", "");
  }
  slidesElements[index - 1].style.display = "block";
  dotsElements[index - 1].className += " active";
}


// All sliders with pics having a left/right scroll

let multiItemSlider = (function () {
  return function (selector, wrapperSelector, itemSelector, controlSelector) {
    let mainContainer = document.querySelector(selector)
    let sliderWrapper = mainContainer.querySelector(wrapperSelector)
    let sliderElement = mainContainer.querySelectorAll(itemSelector)
    let sliderControls = mainContainer.querySelectorAll(controlSelector)
    let wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width)
    let itemWidth = parseFloat(getComputedStyle(sliderElement[0]).width)
    let positionLeftItem = 0
    let wrapperTransform = 0
    let transformationStep = itemWidth / wrapperWidth * 100
    let arrayOfAllItems = [];

    sliderElement.forEach(function (item, index) {
      arrayOfAllItems.push({ item: item, position: index, transform: 0 });
    });

    let position = {
      getItemMin: function () {
        let indexItem = 0;
        arrayOfAllItems.forEach(function (item, index) {
          if (item.position < arrayOfAllItems[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
        arrayOfAllItems.forEach(function (item, index) {
          if (item.position > arrayOfAllItems[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return arrayOfAllItems[position.getItemMin()].position;
      },
      getMax: function () {
        return arrayOfAllItems[position.getItemMax()].position;
      }
    }

    let wrapperTransformItem = function (direction) {
      let nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          arrayOfAllItems[nextItem].position = position.getMax() + 1;
          arrayOfAllItems[nextItem].transform += arrayOfAllItems.length * 100;
          arrayOfAllItems[nextItem].item.style.transform = 'translateX(' + arrayOfAllItems[nextItem].transform + '%)';
        }
        wrapperTransform -= transformationStep;
      }
      if (direction === 'left') {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          arrayOfAllItems[nextItem].position = position.getMin() - 1;
          arrayOfAllItems[nextItem].transform -= arrayOfAllItems.length * 100;
          arrayOfAllItems[nextItem].item.style.transform = 'translateX(' + arrayOfAllItems[nextItem].transform + '%)';
        }
        wrapperTransform += transformationStep;
      }
      sliderWrapper.style.transform = 'translateX(' + wrapperTransform + '%)';
    }

    function controlClick(e) {
      if (e.target.classList.contains('fas')) {
        e.preventDefault();
        let direction = e.target.classList.contains('fa-chevron-right') ? 'right' : 'left';
        wrapperTransformItem(direction);
      }
    };

    let swipeStartX = null
    let swipeEndX = null

    function swipeStart(e) {
      swipeStartX = e.changedTouches[0].pageX
    }

    function swipeEnd(e) {
      swipeEndX = e.changedTouches[0].pageX
      if ((swipeStartX - swipeEndX) > 100) {
        wrapperTransformItem('right')
      } else if ((swipeStartX - swipeEndX) < -100) {
        wrapperTransformItem('left')
      }
    }

    let setUpListeners = function () {
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });

      mainContainer.addEventListener('touchstart', swipeStart)
      mainContainer.addEventListener('touchend', swipeEnd)
    }
    setUpListeners();

    return {
      destroy() {
        sliderElement.forEach(function (item) {
          if (item.style.transform) {
            item.style.transform = "none";
          }
        });
        if (sliderWrapper.style.transform) {
          sliderWrapper.style.transform = "none";
        }
        mainContainer.removeEventListener('touchstart', swipeStart);
        mainContainer.removeEventListener('touchend', swipeEnd);

        sliderControls.forEach(function (item) {
          item.removeEventListener('click', controlClick);
        });
      }
    }
  }
}());

function createTopProductSlider() {
  return multiItemSlider('.top-products-slider', '.top-products__wrapper', '.top-products__item', '.top-product__slider-control')
}

function createUsageSlider() {
  return multiItemSlider('.usage-photo__container', '.usage-slider', '.usage-photo__container-item')
}

function createSocialSlider() {
  return multiItemSlider('.social-photos__container', '.social-slider', '.social-photos__container-item')
}

// To avoid slider crash, all sliders lose their prev. changes when the screen is resized

let topProductSlider = createTopProductSlider()
let usagetSlider = createUsageSlider()
let socailSlider = createSocialSlider()

let resizeTimer = null

window.addEventListener('resize', function () {
  clearTimeout(resizeTimer)

  resizeTimer = setTimeout(function () {
    topProductSlider.destroy()
    usagetSlider.destroy()
    socailSlider.destroy()


    topProductSlider = createTopProductSlider()
    usagetSlider = createUsageSlider()
    socailSlider = createSocialSlider()
  }, 500)
})





