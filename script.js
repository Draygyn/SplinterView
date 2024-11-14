document.getElementById("view-collection").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    try {
        const collectionResponse = await fetch(`https://black-sunset-c55b.dave-macd0426.workers.dev?username=${encodeURIComponent(username)}`);
        if (!collectionResponse.ok) {
            throw new Error("Failed to fetch collection data.");
        }
        const collectionData = await collectionResponse.json();
        const cardDetailIds = collectionData.cards.map(card => card.card_detail_id);
        
        // Fetch card details for each card detail ID
        const cardDetailsResponse = await fetch(`https://api.splinterlands.io/cards/get_details`);
        if (!cardDetailsResponse.ok) {
            throw new Error("Failed to fetch card details.");
        }
        const cardDetails = await cardDetailsResponse.json();
        
        const cardsWithDetails = collectionData.cards.map(card => {
            const details = cardDetails.find(detail => detail.id === card.card_detail_id);
            return {
                ...card,
                name: details ? details.name : 'Unknown',
                image: details ? `https://d36mxiodymuqjm.cloudfront.net/cards_${details.editions}/${encodeURIComponent(details.name)}${card.gold ? '_gold' : ''}.png` : 'placeholder.png',
                abilities: details ? details.stats.abilities || [] : []
            };
        });

        displayCards(cardsWithDetails);
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the player data. Please try again.");
    }
});

function displayCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (!cards || cards.length === 0) {
        container.innerHTML = "<p>No cards found for this player.</p>";
        return;
    }

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";

        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
            <p>Level: ${card.level}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${card.abilities.length > 0 ? card.abilities.join(', ') : 'None'}</p>
        `;

        container.appendChild(cardElement);
    });
}
