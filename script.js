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
clipPath: "polygon(0% 102%, 100% 102%, 100% 102%, 0% 102%)",
},
{
clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
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

//SLIDER
$(".slider-main_component").each(function (index) {
let loopMode = false;
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
slidesPerView: 1,
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
slidesPerView: 1.2,
spaceBetween: "4%"
},
// tablet
768: {
slidesPerView: 2.2,
spaceBetween: "4%"
},
// desktop
992: {
slidesPerView: 3.2,
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


const monument=[12.65147, 55.608166];
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5xIiwiYSI6ImNsazIwc3V6MDBiZnozbnFtd3Q1ODdjeWUifQ.b06Fc0rBTSM8Bquhg-cDXw';
var map = new mapboxgl.Map(
{container:'map',
style : 'mapbox://styles/ethanq/clk20w9tk003s01rj078oas6s',
center: [144.94, -37.84],
zoom: 12,
projection : 'globe' });

var current_popup, current_marker, current_item;

$(".location").each(function (index) {
let cmsItem = $(this);
let img = cmsItem.find(".location-profile").css("background-image").slice(4, -1).replace(/["']/g, "");
let name = cmsItem.find(".location-name").text();
let lat = cmsItem.find(".lat").text();
let lon = cmsItem.find(".lon").text();
let detail1 = cmsItem.find(".popup-detail").text();
let detail2 = cmsItem.find(".popup-detail-2").text();
let pop= this.popup;

let el = document.createElement('div');
el.classList.add('star');
let body=cmsItem.find(".pre-popup");

pop= new mapboxgl.Popup({
  offset: 25,
  closeButton: false,
  maxWidth: "auto"
})
.setHTML(body[0].outerHTML);

let mark = this.marker;
mark = new mapboxgl.Marker(el)
  .setLngLat([lon, lat])
  .setPopup(pop)
  .addTo(map)

map.on('click', (e) =>{
		if(e.originalEvent.srcElement.ariaLabel==="Map"){
    current_marker.classList.remove('show');
  };
});

//MARKERS EVENT

el.addEventListener('click', () => {
  pop.addTo(map)// show popup
	if(current_marker!=undefined){
  	current_item.classList.remove('active');
  	current_marker.classList.remove('show')// we also come back to the original marker's image for the previous active marker
  	pop.remove() // remove the previous active popup if it's existing
	}
  current_item=this;
  current_item.classList.add('active');
	current_marker=el; // set the current popup active
	current_marker.classList.add('show'); // add class to marker to change the image
	map.flyTo({center: [lon, lat],
		zoom:15,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
});

el.addEventListener('mouseover', () => {
  pop.addTo(map)// show popup
	el.classList.add('show'); // add class show to manage the marker's image
});

el.addEventListener('mouseout', () => {
	if(current_marker!==el){
  	pop.remove();
  	el.classList.remove('show'); // we also come back to the original marker's image
		}
});

//LIST ITEMS EVENT
	this.addEventListener('click', () => {
	map.flyTo({
  center: [lon, lat],
  zoom: 15,
  essential: true // this animation is considered essential with respect to prefers-reduced-motion
 })

 if(current_marker!=undefined){
 		current_item.classList.remove('active');
  	current_marker.classList.remove('show')// we also come back to the original marker's image for the previous active marker
  	current_popup.remove() // remove the previous active popup if it's existing
	}
pop.addTo(map); // toggle popup open or closed
el.classList.add('show');
	current_marker=el;
	current_popup=pop;
	current_item=this;
	current_item.classList.add('active');
});

this.addEventListener('mouseover', () => {
  pop.addTo(map)// toggle popup open or closed
	el.classList.add('show');
});

this.addEventListener('mouseout', () => {
	 // toggle popup open or closed
  if(current_marker!==el){
  	pop.remove()
  	el.classList.remove('show');
  }
});
})
