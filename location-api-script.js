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

    // Function to select the div element based on the determined state
    function clickDivElement(state, event) {
        const divElement = document.getElementById(state + '-radio');
        if (divElement) {
            divElement.click();

            // Assuming the map section has an ID like "map-section"
            // Set its visibility to "visible" after the click
            const mapSection = document.getElementById("map-section");
            if (mapSection) {
                mapSection.style.visibility = "visible";
            }

            // Prevent the default click behavior (prevents scrolling)
            event.preventDefault();
        } else {
            // Log a message if the div element is not found
            console.log('Div element not found for state:', state);
        }
    }

    // Call clickDivElement with the event object
    clickDivElement(state, event);
}
