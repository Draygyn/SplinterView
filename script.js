document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    try {
        // Fetch the player's collection
        const collectionResponse = await fetch(`https://api.splinterlands.io/cards/collection/${username}`);
        if (!collectionResponse.ok) throw new Error("Failed to fetch collection.");
        const collectionData = await collectionResponse.json();

        // Fetch all card details
        const detailsResponse = await fetch("https://api.splinterlands.io/cards/get_details");
        if (!detailsResponse.ok) throw new Error("Failed to fetch card details.");
        const cardDetails = await detailsResponse.json();

        // Enrich player cards with static details
        const enrichedCards = collectionData.cards.map(card => {
            const details = cardDetails.find(detail => detail.id === card.card_detail_id);

            return {
                ...card,  // Player-specific info (level, XP, gold, etc.)
                name: details.name,
                edition: details.editions,
                stats: details.stats,
                abilities: details.abilities,
                image: getCardImage(details, card.gold),
            };
        });

        displayCards(enrichedCards);
    } catch (error) {
        console.error("Error:", error);
        alert("Could not fetch player data. Try again.");
    }
});

// Generates the correct URL for card images
function getCardImage(cardDetails, isGold) {
    const setPrefixes = {
        alpha: "cards_alpha",
        beta: "cards_beta",
        untamed: "cards_untamed",
        chaos: "cards_chaos",
        riftwatchers: "cards_riftwatchers",
        soulbound: "cards_soulboundrb",
    };

    const set = setPrefixes[cardDetails.editions.toLowerCase()] || "cards_v2.2";
    const imageName = `${cardDetails.name.replace(/ /g, "%20")}${isGold ? "_gold" : ""}.jpg`;

    return `https://d36mxiodymuqjm.cloudfront.net/${set}/${imageName}`;
}

// Displays the cards dynamically
function displayCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear previous cards

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
            <p>Level: ${card.level || "N/A"}</p>
            <p>Gold: ${card.gold ? "Yes" : "No"}</p>
            <p>Abilities: ${(card.stats.abilities || []).join(", ") || "None"}</p>
        `;

        container.appendChild(cardElement);
    });
}
