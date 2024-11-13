document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a valid username.");
        return;
    }

    try {
        const response = await fetch(`https://late-bread-9bee.dave-macd0426.workers.dev?username=${username}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Player data:", data);

        if (data.cards && data.cards.length > 0) {
            renderCards(data.cards);
        } else {
            document.getElementById("cards-container").innerHTML = "<p>No cards found for this player.</p>";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("There was an error fetching the player's data. Please try again.");
    }
});

function renderCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}" onerror="this.onerror=null;this.src='placeholder.png';">
            <h3>${card.name}</h3>
            <p>Level: ${card.level}</p>
            <p>Gold: ${card.gold ? "Yes" : "No"}</p>
        `;
        container.appendChild(cardElement);
    });
}
