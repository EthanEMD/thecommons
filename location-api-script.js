// Wrap your code inside a DOMContentLoaded event handler
document.addEventListener("DOMContentLoaded", function () {
    // Your geoip function
    function geoip(json, event) {
        // Log the received JSON data to the console
        console.log('Received JSON data:', json);
        // Extract the region property from the JSON object
        var region = json.region;
        // Log the region to the console
        console.log('Region:', region);
        // Determine the state based on the region, default to VIC if not recognized
        var state = "VIC"; // Default to VIC (uppercase)
        if (region === "New South Wales" || region === "NSW") {
            state = "NSW"; // Uppercase
        } else if (region === "Victoria" || region === "VIC") {
            state = "VIC"; // Uppercase
        } else {
            // Log a message if the region is not recognized
            console.log('Unrecognized region:', region);
        }
        // Log the determined state to the console
        console.log('Determined State:', state);

        // Update the query parameter in the URL
        var currentURL = new URL(window.location.href);
        currentURL.searchParams.set('state', state);
        var newURL = currentURL.toString();

        // Prevent the default click behavior (prevents scrolling)
        if (event) {
            event.preventDefault();
        }

        // Change the URL without causing the page to jump
        window.history.replaceState({}, '', newURL);
    }

    // Example usage of geoip function
    var exampleJson = { region: "New South Wales" };
    geoip(exampleJson);
});
