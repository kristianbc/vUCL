document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('details-form');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const subject = document.getElementById('subject').value;
      const details = document.getElementById('details').value;
  
      const data = {
        name,
        subject,
        details
      };
  
      // Replace 'DISCORD_WEBHOOK_URL' with your actual Discord webhook URL
      const webhookURL = 'https://discord.com/api/webhooks/1144594322453450862/CjOz5t0pdRHkMwCEGD0NGiZy3ZPao8tNRf1Z501n8CIkH7CCrtWikdYfgMDHEOoCfXxY';
  
      fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          alert('Details submitted successfully!');
        } else {
          alert('An error occurred while submitting details.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting details.');
      });
    });
  });
  