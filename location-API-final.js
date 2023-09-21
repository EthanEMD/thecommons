document.addEventListener("DOMContentLoaded", function () {
    // Function to click on the div element based on the determined state
    function clickDivElement(state) {
        // Select the div element with a custom attribute "data-state"
        const divElements = document.querySelectorAll('[data-state="' + state + '"]');
        
        if (divElements.length > 0) {
            // Assuming you want to click the first matching element
            const divElement = divElements[0];
            
            // Trigger a click event on the selected div
            divElement.click();
            
            // Assuming the map section has an ID like "map-section"
            // Set its visibility to "visible" after the click
            const mapSection = document.getElementById("map-section");
            if (mapSection) {
                mapSection.style.visibility = "visible";
            }
        } else {
            // Log a message if the div element is not found
            console.log('Div element not found for state:', state);
        }
    }

    // Load the JSON data using the external script
    // This will invoke handleGeoJsJson with the JSON data when it's ready
    var geoJsScript = document.createElement("script");
    geoJsScript.src = "https://get.geojs.io/v1/ip/geo.js";
    document.head.appendChild(geoJsScript);

    // Define a callback function to handle the JSON data
    function handleGeoJsJson(json) {
        // Log the received JSON data to the console
        console.log('Received JSON data:', json);

        // Extract the region property from the JSON object
        var region = json.region;

        // Log the region to the console
        console.log('Region:', region);

        // Determine the state based on the region, default to "VIC" if not recognized
        var state = "VIC"; // Default to VIC

        // Map region names to states
        const regionToState = {
            "New South Wales": "NSW",
            "Victoria": "VIC",
        };

        // Check if the region is recognized in the mapping
        if (regionToState.hasOwnProperty(region)) {
            state = regionToState[region];
        } else {
            // Log a message if the region is not recognized
            console.log('Unrecognized region:', region);
        }

        // Log the determined state to the console
        console.log('Determined State:', state);

        // Click the div element based on the determined state
        clickDivElement(state);
    }
});
