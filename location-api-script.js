
    function geoip(json) {
        // Log the received JSON data to the console
        console.log('Received JSON data:', json);
        // Extract the region property from the JSON object
        var region = json.region;
        // Log the region to the console
        console.log('Region:', region);
        // Determine the state based on the region
        var state = "";
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
        function clickDivElement(state) {
            const divElement = document.getElementById(state + '-radio');
            if (divElement) {
                divElement.click();
            } else {
                // Log a message if the div element is not found
                console.log('Div element not found for state:', state);
            }
        }
        // Click the div element based on the determined state
        clickDivElement(state);
    }
