document.getElementById('fetch-cards').addEventListener('click', async function() {
  // Get the username from the input field
  const username = document.getElementById('username').value.trim();

  if (!username) {
    alert('Please enter a username');
    return;
  }

  try {
    // Fetch data from your Cloudflare Worker
    const response = await fetch(`https://your-worker-name.workers.dev/?player=${username}`);
    
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
