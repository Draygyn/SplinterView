document.getElementById('fetch-cards').addEventListener('click', async function() {
  const username = document.getElementById('username').value;
  if (!username) {
    alert('Please enter a username');
    return;
  }

  const response = await fetch(`https://api.splinterlands.io/cards/collection/${username}`);
  const data = await response.json();

  displayCards(data.cards);
});

function displayCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Clear previous results

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
      <h3>${card.card_detail_id}</h3>
      <p>Level: ${card.level}</p>
    `;
    container.appendChild(cardElement);
  });
}
