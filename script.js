document.getElementById('fetch-cards').addEventListener('click', async function() {
  // Get the username from the input field
  const username = document.getElementById('username').value.trim();
  
  if (!username) {
    alert('Please enter a username');
    return;
  }

  try {
    // Use CORS proxy for development if needed (remove when CORS is resolved)
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://api.splinterlands.io/cards/collection/${username}`;
    
    const response = await fetch(corsProxy + apiUrl); // Add CORS proxy for local testing
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayCards(data.cards);

  } catch (error) {
    console.error('Error fetching player data:', error);
    alert('Failed to fetch player data. Please check the username or try again later.');
  }
});

function displayCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Clear previous results

  if (cards.length === 0) {
    container.innerHTML = '<p>No cards found for this player.</p>';
    return;
  }

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
      <h3>Card ID: ${card.card_detail_id}</h3>
      <p>Level: ${card.level}</p>
    `;
    container.appendChild(cardElement);
  });
}
