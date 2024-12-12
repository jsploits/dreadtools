document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('playfab-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const titleId = document.getElementById('title-id').value;
    const numPlayers = parseInt(document.getElementById('num-players').value);
    const playerName = document.getElementById('player-name').value;
    const delay = parseInt(document.getElementById('delay').value);
    const statusDiv = document.getElementById('status');

    statusDiv.innerHTML = 'Creating accounts...';

    for (let i = 0; i < numPlayers; i++) {
      const displayName = `${playerName}_${i + 1}`;
      const requestData = {
        TitleId: titleId,
        CustomId: displayName,
        CreateAccount: true,
        Username: displayName,
        Password: "Password123!"
      };

      try {
        PlayFab.settings.titleId = titleId;
        PlayFabClient.RegisterPlayFabUser(requestData, (result, error) => {
          if (result !== null) {
            console.log(`Account ${displayName} created successfully`);
          } else {
            console.error(`Failed to create account ${displayName}:`, error);
          }
        });
      } catch (error) {
        console.error(`Failed to create account ${displayName}:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    }

    statusDiv.innerHTML = 'Accounts created successfully!';
  });
});
