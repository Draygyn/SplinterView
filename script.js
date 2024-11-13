document.getElementById("fetch-cards").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        const response = await fetch(`https://late-bread-9bee.dave-macd0426.workers.dev/player?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from the worker.");
        }
        const data = await response.json();
        console.log("Player data:", data);
        displayCards(data.cards);
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the player data. Please try again.");
    }
});

function displayCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear previous results
    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}" />
            <h3>${card.name}</h3>
            <p>Level: ${card.level}</p>
            <p>Gold: ${card.gold ? "Yes" : "No"}</p>
        `;
        container.appendChild(cardElement);
    });
}
