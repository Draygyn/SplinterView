document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        // Fetch the player's card collection
        const collectionResponse = await fetch(`https://api.splinterlands.io/cards/collection/${username}`);
        if (!collectionResponse.ok) {
            throw new Error("Failed to fetch player collection.");
        }
        const collectionData = await collectionResponse.json();

        // Fetch card details for all cards
        const detailsResponse = await fetch("https://api.splinterlands.io/cards/get_details");
        if (!detailsResponse.ok) {
            throw new Error("Failed to fetch card details.");
        }
        const allCardDetails = await detailsResponse.json();

        // Merge card details with the player's collection
        const enrichedCards = collectionData.cards.map(card => {
            const cardDetails = allCardDetails.find(detail => detail.id === card.card_detail_id);
            return {
                ...card,
                ...cardDetails,
                image: getCardImage(cardDetails, card.gold), // Generates image URL
                name: cardDetails.name,
            };
        });

        console.log("Enriched cards:", enrichedCards);
        displayCards(enrichedCards);

    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching player data. Please try again.");
    }
});

function getCardImage(cardDetails, isGold) {
    const setPrefix = {
        "alpha": "cards_alpha",
        "beta": "cards_beta",
        "untamed": "cards_untamed",
        "chaos": "cards_chaos",
        "riftwatchers": "cards_riftwatchers",
        "soulbound": "cards_soulboundrb",
    }[cardDetails.editions.toLowerCase()] || "cards_v2.2"; // Default for newer sets

    const imageName = `${cardDetails.name.replace(/ /g, '%20')}${isGold ? '_gold' : ''}.jpg`;
    return `https://d36mxiodymuqjm.cloudfront.net/${setPrefix}/${imageName}`;
}

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
            <img src="${card.image}" alt="${card.name}" onerror="this.onerror=null;this.src='placeholder.png';">
            <h3>${card.name}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${card.stats?.abilities?.join(', ') || 'None'}</p>
        `;
        container.appendChild(cardElement);
    });
}
