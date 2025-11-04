import React, { useState } from "react";
import Header from "./Components/Header";
import BotChat from "./Components/Chatmessage";
import { formatTime } from "../src/utils/chatUtil";
import LoadingSign from "./Components/LoadingIndicator";
import ChatPanel from "./Components/ChatPanel";
import { generateWithOpenRouter } from "./Services/OpenRouterApi";
import BotImg from "./assets/roboo.png"
import lightMode from "./assets/ligtmodeImg.png"

function App() {

  // Controls global dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Shows loading bubble (typing indicator)
  const [loading, setLoading] = useState(false);

  // Stores current text inside the input box
  const [input, setInput] = useState("");

  // Array of chat messages
  const [messages, setMessage] = useState([
    {
      id: 1,
      text: "Hellow Master, how can i serve you today ?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);

  // Switch UI theme
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle sending a message
  const handleSendMessage = async () => {

    // Prevent sending empty messages
    if (!input.trim()) return;

    // Create user message object
    const userMessage = {
      id: crypto.randomUUID(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessage((prev) => [...prev, userMessage]);

    // Clear textbox
    setInput("");

    // Show loading animation
    setLoading(true);

    // Call the OpenRouter API
    const botText = await generateWithOpenRouter(input);

    // Create bot message object
    const botMessage = {
      id: crypto.randomUUID(),
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };

    // Add bot message to chat
    setMessage((prev) => [...prev, botMessage]);

    // Hide loading animation
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">

      {/* Header with dark mode toggle */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
<div
  className="flex-1 overflow-y-auto p-4 md:p-6 bg-contain bg-center bg-no-repeat transition-all duration-100"
  style={{
    backgroundImage: `url(${darkMode ? BotImg:lightMode})`,
  }}
>
  <div className="max-w-5xl mx-auto space-y-4">

    {messages.map((message) => (
      <BotChat
        key={message.id}
        messages={message}
        darkMode={darkMode}
        formatTime={formatTime}
      />
    ))}

    {loading && <LoadingSign darkMode={darkMode} />}

  </div>
</div>


      {/* Input area */}
      <ChatPanel
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={loading}
        handleSendMessage={handleSendMessage}
      />

    </div>
  );
}

export default App;
