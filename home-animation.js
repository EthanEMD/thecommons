//if (window.innerWidth > 991){
//ENTRANCE ANIMATION
const introHeading = document.querySelectorAll('[home-intro="heading"]');
const introSub = document.querySelectorAll('[home-intro="sub"]');
const introImg = document.querySelectorAll('[home-intro="img"]');
const introHeadingSplit = new SplitType(introHeading, {types: 'lines, chars'});
const introSubSplit = new SplitType(introSub, {types: 'lines'});

let tlHome = gsap.timeline({ paused: true });

tlHome.from(introHeadingSplit.chars, 0.8, {
   yPercent: 100,
      opacity: 0,
      stagger: 0.01
});

tlHome.from(introSubSplit.lines, 0.8, {
  yPercent: 100,
    opacity: 0,
    stagger: 0.1
}, "<0.6");

tlHome.fromTo(
    introImg,
    {
      opacity: 0,
    },
    {
      opacity: 100,
      duration: 2,
      ease: "expo.inOut"
}, 0);

window.addEventListener('load', function() {
  // Show the intro elements
  introHeading.forEach(el => el.style.opacity = 1);
  introSub.forEach(el => el.style.opacity = 1);
  introImg.forEach(el => el.style.opacity = 1);

  // Trigger the animation
  tlHome.play();
});
//}

//SLIDER
$(".slider-main_component").each(function (index) {
  let loopMode = true;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 600;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    parallax: true,
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1.3,
    spaceBetween: "8%",
    rewind: false,
    autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1.3,
        spaceBetween: "4%"
      },
      // tablet
      768: {
        slidesPerView: 2.2,
        spaceBetween: "4%"
      },
      // desktop
      992: {
        slidesPerView: 3.75,
        spaceBetween: "3.5%"
      }
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });
});
