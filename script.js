
document.getElementById("playerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const playerName = document.getElementById("playerName").value;
  const response = await fetch(`https://<YOUR-WORKER-DOMAIN>.workers.dev?playerName=${playerName}`);
  
  if (!response.ok) {
    document.getElementById("playerData").textContent = "Error fetching player data.";
    return;
  }

  const data = await response.json();
  document.getElementById("playerData").innerHTML = `
    <h3>Player Details</h3>
    <p><strong>Rank:</strong> ${data.rank}</p>
    <p><strong>League:</strong> ${data.league}</p>
    <p><strong>Guild:</strong> ${data.guild || 'N/A'}</p>
    <p><strong>Land Owned:</strong> ${data.landOwned || 'None'}</p>
  `;
});
