// Function to select the div element based on the determined state
function clickDivElement(state) {
    const divElement = document.getElementById(state + '-radio');
    if (divElement) {
        divElement.click();
    } else {
        // Log a message if the div element is not found
        console.log('Div element not found for state:', state);
    }
}

// Callback function to handle intersection changes
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The target element (div with class "section_home-space") is in view
            // You can call your script here to click the element
            const state = "vic"; // Determine your state here as needed
            clickDivElement(state);
        }
    });
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection);

// Target the div with class "section_home-space"
const targetElement = document.querySelector('.section_home-space');

// Start observing the target element
if (targetElement) {
    observer.observe(targetElement);
}

// Your existing geoip function
function geoip(json) {
    // Log the received JSON data to the console
    console.log('Received JSON data:', json);
    // Extract the region property from the JSON object
    var region = json.region;
    // Log the region to the console
    console.log('Region:', region);
    // Determine the state based on the region, default to VIC if not recognized
    var state = "vic"; // Default to VIC
    if (region === "New South Wales" || region === "NSW") {
        state = "nsw";
    } else if (region === "Victoria" || region === "VIC") {
        state = "vic";
    } else {
        // Log a message if the region is not recognized
        console.log('Unrecognized region:', region);
    }
    // Log the determined state to the console
    console.log('Determined State:', state);
}
