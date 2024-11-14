document.getElementById("view-collection").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    try {
        const response = await fetch(`https://api.splinterlands.io/cards/collection/${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch collection data.");
        }

        const collectionData = await response.json();
        displayCards(collectionData.cards);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch player data. Please try again.");
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

        // Construct image URL dynamically
        const imageUrl = `https://d36mxiodymuqjm.cloudfront.net/cards_by_level/${card.edition}/${encodeURIComponent(card.card_detail_id)}_lv${card.level}${card.gold ? '_gold' : ''}.png`;

        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="${card.card_detail_id}">
            <h3>Card Detail ID: ${card.card_detail_id}</h3>
            <p>Level: ${card.level}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
        `;

        container.appendChild(cardElement);
    });
}
