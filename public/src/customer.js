document.getElementById("messageForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const messageText = document.getElementById("messageText").value;

    const messageData = {
        customer_name: customerName,
        customer_email: customerEmail,
        message: messageText
    };

    fetch("/api/messages", {
        method: "POST",
        headers: {
            
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerHTML = data.message;
        document.getElementById("messageForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("responseMessage").innerHTML = "Failed to send message. Please try again.";
    });
});
