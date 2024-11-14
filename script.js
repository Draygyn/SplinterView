document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        const response = await fetch(`https://api.splinterlands.io/cards/collection/${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log("Player data:", data);
        displayCards(data.cards);
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the player data. Please try again.");
    }
});

function getImageUrl(card) {
    const baseUrl = "https://d36mxiodymuqjm.cloudfront.net";
    let setPath;

    switch (card.edition) {
        case 0: setPath = "cards_alpha"; break;
        case 1: setPath = "cards_beta"; break;
        case 2: setPath = "cards_promo"; break;
        case 3: setPath = "cards_reward"; break;
        case 4: setPath = "cards_untamed"; break;
        case 5: setPath = "cards_chaos"; break;
        case 6: setPath = "cards_gladius"; break;
        case 7: setPath = "cards_soulboundrb"; break;
        default: setPath = "cards_unknown"; break;
    }

    const goldSuffix = card.gold ? "_gold" : "";
    return `${baseUrl}/${setPath}/${encodeURIComponent(card.card_detail_id)}_lv${card.level}${goldSuffix}.png`;
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

        const imageUrl = getImageUrl(card);
        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="Card ${card.card_detail_id}" onerror="this.src='placeholder.png';">
            <h3>Card Detail ID: ${card.card_detail_id}</h3>
            <p>Level: ${card.level}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
        `;

        container.appendChild(cardElement);
    });
}
