document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a valid username.");
        return;
    }

    try {
        const response = await fetch(`https://black-sunset-c55b.dave-macd0426.workers.dev?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Player data:", data);

        if (data.cards && data.cards.length > 0) {
            displayCards(data.cards);
        } else {
            document.getElementById("cards-container").innerHTML = "<p>No cards found for this player.</p>";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("There was an error fetching the player's data. Please try again.");
    }
});

function displayCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
            <p>Abilities: ${card.abilities.length > 0 ? card.abilities.join(', ') : 'None'}</p>
        `;
        container.appendChild(cardElement);
    });
}
