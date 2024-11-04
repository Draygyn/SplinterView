async function fetchPlayerData() {
    // Get the player name entered by the user
    const playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert("Please enter a player name.");
        return;
    }

    try {
        // Fetch data from the Cloudflare Worker
        const response = await fetch(`https://your-worker-id.workers.dev?player=${playerName}`);
        if (!response.ok) throw new Error('Failed to fetch player data');
        
        // Parse JSON data
        const data = await response.json();
        
        // Display data in the HTML
        const playerInfo = document.getElementById('player-info');
        playerInfo.innerHTML = `
            <h2>Player: ${data.playerName}</h2>
            <p><strong>League:</strong> ${data.league}</p>
            <p><strong>Rank:</strong> ${data.rank}</p>
            <p><strong>Guild:</strong> ${data.guild}</p>
            <p><strong>Cards Owned:</strong> ${data.cardsOwned}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('player-info').innerHTML = `<p>Error fetching data. Please try again.</p>`;
    }
}
