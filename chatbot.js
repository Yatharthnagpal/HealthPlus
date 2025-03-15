const API_URL = "https://api.together.ai/v1/chat/completions"; 
const API_KEY = "6359ec8148a88e2d5b30ee59aaea408ee117c4665170090b589652a1ffa7fd5a";

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    let chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Create User Message Bubble
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Add "typing..." effect for bot
    let botTyping = document.createElement("div");
    botTyping.classList.add("message", "bot-message", "typing");
    botTyping.textContent = "Typing...";
    chatBox.appendChild(botTyping);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-2-7b-chat-hf",
                messages: [{ role: "user", content: userInput }]
            })
        });

        if (!response.ok) throw new Error(`API Error ${response.status}: ${response.statusText}`);

        let data = await response.json();
        let botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";

        // Remove "typing..." effect
        chatBox.removeChild(botTyping);

        // Create Bot Message Bubble
        let botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = botResponse;
        chatBox.appendChild(botMessage);
        
    } catch (error) {
        chatBox.removeChild(botTyping);

        let errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");
        errorMessage.textContent = "Error: Unable to fetch response.";
        chatBox.appendChild(errorMessage);
        console.error("Chatbot error:", error);
    }

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
