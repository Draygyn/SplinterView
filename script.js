// Function to fetch and display player collection
document.getElementById('collectionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const collectionResults = document.getElementById('collectionResults');
    collectionResults.innerHTML = '<p>Loading collection...</p>';

    try {
        // Use Cloudflare Worker to fetch collection data
        const response = await fetch(`https://black-sunset-c55b.dave-macd0426.workers.dev?api=https://game-api.splinterlands.com/cards/collection/${username}`);
        const data = await response.json();

        if (data.cards && data.cards.length > 0) {
            collectionResults.innerHTML = ''; // Clear loading message

            // Display each card
            data.cards.forEach((card) => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                // Add card image
                const cardImage = document.createElement('img');
                cardImage.src = `https://d36mxiodymuqjm.cloudfront.net/cards_v2/300x452/${card.card_detail_id}.png`; // Replace if needed
                cardImage.alt = card.card_name;
                cardDiv.appendChild(cardImage);

                // Append card to results
                collectionResults.appendChild(cardDiv);
            });
        } else {
            collectionResults.innerHTML = '<p>No cards found for this player.</p>';
        }
    } catch (error) {
        console.error('Error fetching collection:', error);
        collectionResults.innerHTML = '<p>Failed to load collection. Please try again later.</p>';
    }
});

// Function to fetch and display individual card details
document.getElementById('cardForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cardId = document.getElementById('cardId').value.trim();
    const cardResults = document.getElementById('cardResults');
    cardResults.innerHTML = '<p>Loading card details...</p>';

    try {
        // Use Cloudflare Worker to fetch card details
        const response = await fetch(`https://black-sunset-c55b.dave-macd0426.workers.dev?api=https://game-api.splinterlands.com/cards/find?id=${cardId}`);
        const data = await response.json();

        if (data && data.length > 0) {
            cardResults.innerHTML = ''; // Clear loading message

            // Display card details
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            // Add card image
            const cardImage = document.createElement('img');
            cardImage.src = `https://d36mxiodymuqjm.cloudfront.net/cards_v2/300x452/${data[0].image}.png`; // Replace if needed
            cardImage.alt = data[0].name;
            cardDiv.appendChild(cardImage);

            // Append card to results
            cardResults.appendChild(cardDiv);
        } else {
            cardResults.innerHTML = '<p>No details found for this card ID.</p>';
        }
    } catch (error) {
        console.error('Error fetching card details:', error);
        cardResults.innerHTML = '<p>Failed to load card details. Please try again later.</p>';
    }
});
