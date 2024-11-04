// Function to fetch data from the Cloudflare Worker using player name
async function fetchPlayerData(playerName) {
    try {
        // URL to your Cloudflare Worker, making sure the player name is passed as a query parameter
        const response = await fetch(`https://dry-bread-7ec1.dave-macd0426.workers.dev?player=${playerName}`);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) throw new Error('Failed to fetch player data');
        
        // Parse the response data (assuming JSON format)
        const data = await response.json();
        
        // Log or display the fetched data
        console.log('Player data:', data);
        // You could also populate this data into your HTML, e.g., updating a div with the data.
        document.getElementById('player-info').innerText = JSON.stringify(data, null, 2);

    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

// Example function to handle button click to fetch data
function handleFetchClick() {
    // Get the player name from an input field
    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        fetchPlayerData(playerName);
    } else {
        console.error('Player name is required.');
    }
}

// HTML Structure for interaction (to be added in your HTML file)
/*
<div>
    <label for="player-name">Player Name:</label>
    <input type="text" id="player-name" placeholder="Enter player name">
    <button onclick="handleFetchClick()">Fetch Player Data</button>
</div>
<pre id="player-info">Player data will appear here.</pre>
*/

// Example usage: you could call `fetchPlayerData("examplePlayer")` to test without the input field
