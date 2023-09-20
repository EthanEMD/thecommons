mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5xIiwiYSI6ImNsazIwc3V6MDBiZnozbnFtd3Q1ODdjeWUifQ.b06Fc0rBTSM8Bquhg-cDXw';
var map = new mapboxgl.Map(
{container:'map',
style : 'mapbox://styles/ethanq/clk20w9tk003s01rj078oas6s',
center: [144.977731, -37.823803],
zoom: 13,
projection : 'globe' });

var current_popup, current_marker, current_item;

const markerImages = {
    theForum: 'https://uploads-ssl.webflow.com/64a4a8e46254432bea60e4e4/64c205db0b43fb0bc614bee9_the-forum.svg',
    centralHouse: 'https://uploads-ssl.webflow.com/64a4a8e46254432bea60e4e4/64c205dbc3eccac8b6412d82_commons-house.svg',
    theCommons: 'https://uploads-ssl.webflow.com/64a4a8e46254432bea60e4e4/64c205da6eead0e3db858411_commons.svg',
  };

$("input[name='state-filter']").on("change", function () {
  var selectedState = $(this).val();

  // Define the coordinates for VIC and NSW
  var vicCoordinates = [144.977731, -37.823803]; // Melbourne, VIC
  var nswCoordinates = [151.209290, -33.868820]; // Sydney, NSW

  // Check the selected state and set the map's center accordingly
  if (selectedState === "VIC") {
    map.flyTo({
      center: vicCoordinates,
      zoom: 13,
      essential: true
    });
  } else if (selectedState === "NSW") {
    map.flyTo({
      center: nswCoordinates,
      zoom: 13,
      essential: true
    });
  } else {
    console.log("Invalid state selection");
  }
});

$(".location").each(function (index) {
let cmsItem = $(this);
let img = cmsItem.find(".location-profile").css("background-image").slice(4, -1).replace(/["']/g, "");
let name = cmsItem.find(".location-name").text();
let type = cmsItem.find(".location-type").text(); 
let lat = cmsItem.find(".lat").text();
let lon = cmsItem.find(".lon").text();
let detail1 = cmsItem.find(".popup-detail").text();
let detail2 = cmsItem.find(".popup-detail-2").text();
let pop= this.popup;

let el = document.createElement('div');
    el.classList.add('marker');
    el.style.backgroundImage = `url('${markerImages[type]}')`;
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
      .addTo(map);
      
      // Add a hover event listener to the marker
  el.addEventListener('mouseenter', () => {
    // Add the .marker-inactive class immediately to all markers except the one being hovered
    $(".marker").not(el).addClass('marker-inactive');

    // After a short delay (e.g., 100ms), update the opacity for fade-out effect
    setTimeout(() => {
      $(".marker").not(el).css('opacity', '0.5');
    }, 100);
  });

  el.addEventListener('mouseleave', () => {
    // Restore the opacity of all markers when the mouse leaves the hovered marker
    $(".marker").removeClass('marker-inactive').css('opacity', '1');
  });

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
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// disable map zoom when using scroll
map.scrollZoom.disable();
