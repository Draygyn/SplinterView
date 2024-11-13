// Function to fetch and display player cards
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
        alert("There was an error fetching the player data. Please try again.");
    }
});

// Function to generate image URLs dynamically based on card set and type
function getCardImageUrl(card) {
    const baseUrl = "https://d36mxiodymuqjm.cloudfront.net/";
    let setPath = "";
    let fileExtension = ".jpg"; // Default to .jpg unless specified otherwise

    switch (card.card_set.toLowerCase()) {
        case "alpha":
        case "beta":
        case "chaos":
        case "rebellion":
        case "riftwatchers":
            setPath = `cards_${card.card_set.toLowerCase()}`;
            break;
        case "untamed":
            setPath = "cards_untamed";
            fileExtension = ".png"; // Untamed uses .png
            break;
        case "reward":
        case "soulbound":
            setPath = "cards_soulboundrb";
            break;
        case "v2.2":
            setPath = "cards_v2.2";
            fileExtension = ".png"; // Special v2.2 cards
            break;
        default:
            setPath = "cards_v2.2"; // Fallback path for unknown sets
    }

    const name = card.gold ? `${card.name}_gold` : card.name;
    return `${baseUrl}${setPath}/${encodeURIComponent(name)}${fileExtension}`;
}

// Function to display the player's cards
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

        const imageUrl = getCardImageUrl(card);

        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="${card.name || 'Unknown'}" onerror="this.onerror=null;this.src='placeholder.png';">
            <h3>${card.name || 'Unknown'}</h3>
            <p>Level: ${card.level || 'N/A'}</p>
            <p>Gold: ${card.gold ? 'Yes' : 'No'}</p>
        `;

        container.appendChild(cardElement);
    });
}
