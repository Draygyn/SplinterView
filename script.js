function getCardImage(card) {
    const baseUrl = "https://d36mxiodymuqjm.cloudfront.net";

    if (card.card_set === "alpha" || card.card_set === "beta") {
        return `${baseUrl}/cards_${card.card_set}/${encodeURIComponent(card.name)}${card.gold ? "_gold" : ""}.png`;
    } else if (card.card_set === "chaos" || card.card_set === "riftwatchers" || card.card_set === "untamed") {
        return `${baseUrl}/cards_${card.card_set}/${encodeURIComponent(card.name)}${card.gold ? "_gold" : ""}.jpg`;
    } else if (card.card_set === "soulboundrb") {
        return `${baseUrl}/cards_soulboundrb/${encodeURIComponent(card.name)}${card.gold ? "_gold" : ""}.jpg`;
    } else {
        return "placeholder.png"; // Fallback in case no match
    }
}

// Update displayCards Function:
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

        const imageUrl = getCardImage(card);

        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="${card.name || 'Unknown'}" onerror="this.src='placeholder.png'">
            <h3>${card.name || 'Unknown'}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${card.abilities ? card.abilities.join(", ") : 'None'}</p>
        `;

        container.appendChild(cardElement);
    });
}
