// Wrap your code inside a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOMContentLoaded event triggered.'); // Log a message when the DOMContentLoaded event is triggered

    // Your geoip function
    function geoip(json) {
        // Log the received JSON data to the console
        console.log('Received JSON data:', json);
        // Extract the region property from the JSON object
        var region = json.region;
        // Log the region to the console
        console.log('Region:', region);
        // Determine the state based on the region, default to VIC if not recognized
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

        // Update the query parameter based on the determined state
        var queryParams = new URLSearchParams(window.location.search);
        queryParams.set('state', state);

        // Update the URL with the new query parameter
        var newURL = window.location.pathname + '?' + queryParams.toString();
        history.replaceState(null, '', newURL);

        // You can optionally trigger any other actions or update the UI as needed here
    }

    // Call the geoip function when the DOM is ready
    geoip({ region: 'Victoria' }); // Replace with your actual GeoIP data
});
