document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        const response = await fetch(`https://api.splinterlands.io/cards/collection/${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch card collection.");
        }

        const data = await response.json();
        const detailedCards = await fetchCardDetails(data.cards);
        displayCards(detailedCards);
    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching data: " + error.message);
    }
});

async function fetchCardDetails(cards) {
    try {
        const allDetailsResponse = await fetch('https://api.splinterlands.io/cards/get_details');
        const cardDetails = await allDetailsResponse.json();

        return cards.map(card => {
            const details = cardDetails.find(detail => detail.id === card.card_detail_id);
            return { ...card, ...details };
        });
    } catch (error) {
        console.error("Error fetching card details:", error);
        return cards; // fallback to original data
    }
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

        const imageUrl = `https://d36mxiodymuqjm.cloudfront.net/cards_v2.2/${card.name.replace(/\s/g, '%20')}${card.gold ? '_gold' : ''}.png`;

        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="${card.name}" onerror="this.src='placeholder.png';">
            <h3>${card.name || 'Unknown'} (Level: ${card.level || 'N/A'})</h3>
            <p>Gold: ${card.gold ? "Yes" : "No"}</p>
            <p>Abilities: ${card.abilities?.join(', ') || 'None'}</p>
        `;

        container.appendChild(cardElement);
    });
}
