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
        `;

        container.appendChild(cardElement);
    });
}
