document.getElementById('webhook-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const webhookUrl = document.getElementById('webhook-url').value;
  const message = document.getElementById('message').value;
  const repeatCount = parseInt(document.getElementById('repeat-count').value);
  const statusDiv = document.getElementById('status');

  statusDiv.innerHTML = 'Sending messages...';

  for (let i = 0; i < repeatCount; i++) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    });
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  statusDiv.innerHTML = 'Messages sent successfully!';
});
