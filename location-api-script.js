function geoip(json) {
    // Log the received JSON data to the console
    console.log('Received JSON data:', json);
    
    // Extract the region property from the JSON object
    var region = json.region;
    
    // Log the region to the console
    console.log('Region:', region);
    
    // Determine the state based on the region, default to "VIC" if not recognized
    var state = "VIC"; // Default to VIC
    
    if (region === "New South Wales" || region === "NSW") {
        state = "NSW";
    } else if (region === "Victoria" || region === "VIC") {
        state = "VIC";
    } else {
        // Log a message if the region is not recognized
        console.log('Unrecognized region:', region);
    }
    
    // Log the determined state to the console
    console.log('Determined State:', state);

    // Function to update the query parameter based on the determined state
    function updateQueryParam(state) {
        var currentUrl = window.location.href;
        var urlWithoutParams = currentUrl.split('?')[0];

        // Construct the new URL with the state query parameter
        var newUrl = urlWithoutParams + '?state=' + state;

        // Replace the current URL with the new URL
        window.history.replaceState({}, '', newUrl);
    }

    // Update the query parameter based on the determined state
    updateQueryParam(state);
}

// Define the fetchGeoData function
function fetchGeoData() {
    // Fetch user's location data from GeoJS
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(function(response) {
            return response.json();
        })
        .then(geoip)
        .catch(function(error) {
            console.error('Error fetching GeoJS data:', error);
            // Use default state on error (VIC)
            updateQueryParam("VIC");
        });
}

// Define the initializeGeoIp function
function initializeGeoIp() {
    // This function will be called once the page has fully loaded
    fetchGeoData();
}

// Call initializeGeoIp on window.onload
window.onload = function() {
    initializeGeoIp();
}
