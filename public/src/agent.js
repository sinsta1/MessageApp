document.addEventListener('DOMContentLoaded', function () {
    const messageList = document.getElementById('message-list');

    fetch('http://localhost:8080/api/messages')  
        .then(response => response.json())
        .then(data => {

            if (data && data.length > 0) {
               
                data.forEach(message => {
                    const messageItem = document.createElement('li');
                    messageItem.innerHTML = `
                        <strong>${message.customer_name}</strong>: ${message.message} <br>
                        <small>Status: ${message.status}</small>
                        <button onclick="respondToMessage(${message.id})">Respond</button>
                    `;
                    messageList.appendChild(messageItem);
                });
            } else {
                messageList.innerHTML = '<li>No pending messages</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            messageList.innerHTML = '<li>Error fetching messages</li>';
        });
});

function respondToMessage(messageId) {
    const response = prompt("Enter your response to this message:");

    if (response) {
        const agentName = "Agent 1";  

       
        fetch(`http://localhost:8080/api/messages/${messageId}/respond`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                agent_name: agentName,
                response: response
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Response submitted successfully!');
            window.location.reload();  
        })
        .catch(error => {
            console.error('Error responding to message:', error);
            alert('Failed to submit response');
        });
    }
}

const UrgentMessages = (e) => {
    const keyword = e.target.value;
    console.log(keyword);
}

const inp = document.getElementById("searchBox");

inp.addEventListener("change", function (e) {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''
    console.log(inp.value)
    fetch(`http://localhost:8080/api/message/search?keyword=${inp.value}`)  
        .then(response => response.json())
        .then(data => {

            if (data && data.length > 0) {
               
                data.forEach(message => {
                    const messageItem = document.createElement('li');
                    messageItem.innerHTML = `
                        <strong>${message.customer_name}</strong>: ${message.message} <br>
                        <small>Status: ${message.status}</small>
                        <button onclick="respondToMessage(${message.id})">Respond</button>
                    `;
                    messageList.appendChild(messageItem);
                });
            } else {
                messageList.innerHTML = '<li>No pending messages with this keyword</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            messageList.innerHTML = '<li>Error fetching messages</li>';
        });
});