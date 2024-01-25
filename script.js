document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('details-form');
    let lastSubmitTime = 0; // Initialize with 0 to allow the first submission
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const currentTime = Date.now();
      const timeSinceLastSubmit = currentTime - lastSubmitTime;
      const oneMinute = 60 * 1000; // 1 minute in milliseconds
  
      if (timeSinceLastSubmit < oneMinute) {
        const remainingTime = (oneMinute - timeSinceLastSubmit) / 1000;
        alert(`Please wait ${remainingTime.toFixed(1)} seconds before submitting again.`);
        return;
      }
  
      const name = document.getElementById('name').value;
      const subject = document.getElementById('subject').value;
      const details = document.getElementById('details').value;
  
      const data = {
        content: '```\n' +
                 `Subject ID: (ID: ${generateUniqueId()}):\n` +
                 `Name: ${name}\n` +
                 '----------------------\n' +
                 `Subject: ${subject}\n` +
                 '----------------------\n' +
                 `Details: ${details}\n` +
                 '```'
      };
      
      const webhookURL = 'https://discord.com/api/webhooks/1144622253942775909/bmocpC9Gw_aah0uCMikGzmLyGkZrrSaQg0B5UoYXUpRB9Cpa7wFDkkbkjREut0FePifk';
      //const webhookURL = 'https://discord.com/api/webhooks/1144594322453450862/CjOz5t0pdRHkMwCEGD0NGiZy3ZPao8tNRf1Z501n8CIkH7CCrtWikdYfgMDHEOoCfXxY';
  
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
          lastSubmitTime = currentTime; // Update last submit time
        } else {
          response.json().then(errorData => {
            console.error('Error:', errorData);
            alert('An error occurred while submitting details: ' + errorData.message);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting details.');
      });
    });
  });
  
  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

//new code

document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('name');
  const form = document.getElementById('details-form');
  const submitButton = document.querySelector('button[type="submit"]');

  nameInput.addEventListener('input', function() {
    const nameValue = this.value;
    if (!isValidNameFormat(nameValue)) {
      this.classList.add('error');
      submitButton.style.display = 'none'; // Hide the submit button
    } else {
      this.classList.remove('error');
      submitButton.style.display = ''; // Show the submit button
    }
  });

  form.addEventListener('submit', function(event) {
    const nameValue = nameInput.value;
    if (!isValidNameFormat(nameValue)) {
      event.preventDefault(); // Prevent form submission
      nameInput.classList.add('error');
      alert('Please enter name in the correct format (e.g., John Example).');
    }
  });

  function isValidNameFormat(name) {
    // Check if the name starts with an uppercase letter followed by a space and then another word
    return /^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(name);
  }
});