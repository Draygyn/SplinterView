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
        console.log("API Response Data:", data);
        displayCards(data.cards);
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the data.");
    }
});

function displayCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear previous results

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
