document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a valid username.");
        return;
    }

    try {
        // Fetch player card collection
        const response = await fetch(`https://api2.splinterlands.io/cards/collection/${username}`);
        const data = await response.json();

        // Fetch card details to match images and stats
        const detailsResponse = await fetch('https://api.splinterlands.io/cards/get_details');
        const allCardDetails = await detailsResponse.json();

        displayCards(data.cards, allCardDetails);
    } catch (error) {
        console.error("Error:", error);
        alert("Could not fetch player data. Please try again later.");
    }
});

function displayCards(cards, allCardDetails) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (!cards || cards.length === 0) {
        container.innerHTML = "<p>No cards found for this player.</p>";
        return;
    }

    cards.forEach(card => {
        const cardDetail = allCardDetails.find(detail => detail.id === card.card_detail_id);

        const setPath = cardDetail.editions.includes("3") ? "chaos" : "unknown_set"; // Use more dynamic mapping
        const imgSrc = `https://d36mxiodymuqjm.cloudfront.net/cards_${setPath}/${cardDetail.name}.png`;

        const cardElement = document.createElement("div");
        cardElement.className = "card";

        cardElement.innerHTML = `
            <img src="${imgSrc}" alt="${cardDetail.name}">
            <h3>${cardDetail.name || 'Unknown'}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${cardDetail.stats?.abilities?.join(", ") || 'None'}</p>
        `;

        container.appendChild(cardElement);
    });
}
