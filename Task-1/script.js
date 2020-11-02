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


// Slide with pics

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
    
     controlClick = function (e) {
      if (e.target.classList.contains('fas')) {
        e.preventDefault();
        let direction = e.target.classList.contains('fa-chevron-right') ? 'right' : 'left';
        wrapperTransformItem(direction);
      }
    };

    let setUpListeners = function () {
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });

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
    
      mainContainer.addEventListener('touchstart', swipeStart)
      mainContainer.addEventListener('touchend', swipeEnd)
    }
    setUpListeners();
  }
}());

multiItemSlider('.top-products-slider', '.top-products__wrapper', '.top-products__item', '.top-product__slider-control')
multiItemSlider('.usage-photo__container', '.usage-slider', '.usage-photo__container-item')
multiItemSlider('.social-photos__container', '.social-slider', '.social-photos__container-item')







