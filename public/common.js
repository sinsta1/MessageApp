// Common.js to handle shared functionalities for customer and agent pages

// Handling customer message submission
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerMessage = document.getElementById('customerMessage').value;

        // Validate input fields
        if (!customerName || !customerEmail || !customerMessage) {
            alert('Please fill in all fields');
            return;
        }

        // Send message to backend API (you will replace with actual backend URL)
        fetch('http://localhost:8080/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: customerName,
                customer_email: customerEmail,
                message: customerMessage,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Your message has been sent successfully!');
            messageForm.reset(); 
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });
}


const messagesList = document.getElementById('messagesList');
if (messagesList) {
    
    fetch('http://localhost:8080/api/messages')
        .then(response => response.json())
        .then(data => {
            
            if (data && data.length > 0) {
                data.forEach(message => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${message.customer_name}</strong>: ${message.message} 
                        <br><small>Received: ${new Date(message.created_at).toLocaleString()}</small>
                    `;
                    messagesList.appendChild(listItem);
                });
            } else {
                messagesList.innerHTML = '<li>No pending messages</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
        
}
