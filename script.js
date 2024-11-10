console.log("script.js loaded!");

document.getElementById('fetch-cards').addEventListener('click', async function () {
  const username = document.getElementById('username').value.trim();

  console.log(`Entered username: "${username}"`); // Debugging username

  if (!username) {
    alert('Please enter a valid username.');
    return;
  }

  try {
    console.log(`Fetching data for user: ${username}`); // Confirm username fetch
    const collectionResponse = await fetch(`https://your-worker-name.workers.dev/?player=${username}`);
    const collectionData = await collectionResponse.json();

    console.log("Player data:", collectionData); // Debug fetched data

    if (!collectionData || !collectionData.cards || collectionData.cards.length === 0) {
      alert(`No cards found for player "${username}". Please check the username.`);
      return;
    }

    const detailsResponse = await fetch('https://api.splinterlands.io/cards/get_details');
    const cardDetails = await detailsResponse.json();

    displayCardsLazy(collectionData.cards, cardDetails);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch player data. Please try again later.');
  }
});
