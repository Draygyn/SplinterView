document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        // Fetch the player's card collection
        const collectionUrl = `https://api.splinterlands.io/cards/collection/${encodeURIComponent(username)}`;
        const collectionResponse = await fetch(collectionUrl);
        if (!collectionResponse.ok) throw new Error("Failed to fetch card collection");

        const collectionData = await collectionResponse.json();
        const cards = collectionData.cards;

        // Fetch card details (for names, images, etc.)
        const detailsUrl = `https://api.splinterlands.io/cards/get_details`;
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) throw new Error("Failed to fetch card details");

        const cardDetails = await detailsResponse.json();

        // Merge card collection with card details
        const enrichedCards = cards.map(card => {
            const cardInfo = cardDetails.find(detail => detail.id === card.card_detail_id);
            return {
                ...card,
                name: cardInfo?.name || `Card Detail ID: ${card.card_detail_id}`,
                image: cardInfo?.image_url || '',
                abilities: cardInfo?.abilities?.join(', ') || 'None',
            };
        });

        displayCards(enrichedCards);
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
            <img src="${card.image || 'placeholder.png'}" alt="${card.name || 'Unknown'}">
            <h3>${card.name || 'Unknown'}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${card.abilities || 'None'}</p>
        `;

        container.appendChild(cardElement);
    });
}
