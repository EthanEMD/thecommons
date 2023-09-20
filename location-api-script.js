// Wrap your code inside a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // Your geoip function
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
        
        // Function to handle intersection changes
        function handleIntersection(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // The element is now in view, click it
                    const divElement = document.getElementById(state + '-radio');
                    if (divElement) {
                        divElement.click();
                        observer.unobserve(entry.target); // Stop observing once clicked
                    } else {
                        // Log a message if the div element is not found
                        console.log('Div element not found for state:', state);
                    }
                }
            });
        }

        // Create an Intersection Observer
        const observer = new IntersectionObserver(handleIntersection);

        // Function to select the div element based on the determined state
        function watchDivElement(state) {
            const divElement = document.getElementById(state + '-radio');
            if (divElement) {
                // Start observing the element
                observer.observe(divElement);
            } else {
                // Log a message if the div element is not found
                console.log('Div element not found for state:', state);
            }
        }

        // Start observing the div element based on the determined state
        watchDivElement(state);
    }

    // Call the geoip function when the page is fully loaded
    geoip(/* your JSON data */);
});
