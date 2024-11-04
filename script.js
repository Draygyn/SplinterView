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
        
