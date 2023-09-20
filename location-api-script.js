
    
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

        // // Function to select the div element based on the determined state
        // function clickDivElement(state) {
        //     const divElement = document.getElementById(state + '-radio');
        //     if (divElement) {
        //         divElement.click();
        //     } else {
        //         // Log a message if the div element is not found
        //         console.log('Div element not found for state:', state);
        //     }
        // }

        // // Click the div element based on the determined state
        // clickDivElement(state);
    }

    // Function to handle intersection changes for the map-section div
    function handleMapSectionIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Call the geoip function when the map-section div is in view
                geoip(/* your JSON data */);
                // Disconnect the observer to prevent further triggers
                observer.disconnect();
            }
        });
    }

    // Create an Intersection Observer to watch the map-section div
    const observer = new IntersectionObserver(handleMapSectionIntersection, {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when at least 50% of the element is in view
    });

    // Select the map-section div by its ID
    const mapSection = document.getElementById("map-section");

    if (mapSection) {
        // Start observing the map-section div
        observer.observe(mapSection);
    } else {
        // Log a message if the map-section div is not found
        console.log('Map section not found.');
    }

