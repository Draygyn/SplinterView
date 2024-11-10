console.log("script.js loaded!");

// Event listener for the button
document.getElementById('fetch-cards').addEventListener('click', async function () {
  const username = document.getElementById('username').value.trim();

  if (!username) {
    alert('Please enter a valid username.');
    return;
  }

  try {
    console.log(`Fetching data for user: ${username}`); // Debugging username
    // Fetch player collection
    const collectionResponse = await fetch(`https://your-worker-name.workers.dev/?player=${username}`);
    const collectionData = await collectionResponse.json();

    if (!collectionData || !collectionData.cards || collectionData.cards.length === 0) {
      alert(`No cards found for player "${username}". Please check the username.`);
      return;
    }

    console.log("Player data:", collectionData); // Debugging fetched data

    // Fetch card details
    const detailsResponse = await fetch('https://api.splinterlands.io/cards/get_details');
    const cardDetails = await detailsResponse.json();

    displayCardsLazy(collectionData.cards, cardDetails);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch player data. Please try again later.');
  }
});

function displayCardsLazy(playerCards, allCardDetails) {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Clear previous results

  if (playerCards.length === 0) {
    container.innerHTML = '<p>No cards found for this player.</p>';
    return;
  }

  playerCards.forEach(card => {
    const cardDetail = allCardDetails.find(detail => detail.id == card.card_detail_id);
    if (cardDetail) {
      const cardElement = document.createElement('div');
      cardElement.style.border = "1px solid #ddd";
      cardElement.style.margin = "10px";
      cardElement.style.padding = "10px";
      cardElement.style.background = "#fff";

      cardElement.innerHTML = `
        <img data-src="https://d36mxiodymuqjm.cloudfront.net/cards_by_level/${cardDetail.name.toLowerCase().replace(/\s+/g, '_')}_lv${card.level}.png" alt="${cardDetail.name}" style="width:100px;">
        <h3>${cardDetail.name}</h3>
        <p>Level: ${card.level}</p>
        <p>Gold: ${card.gold ? "Yes" : "No"}</p>
      `;

      container.appendChild(cardElement);
    }
  });
}
