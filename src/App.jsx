import React, { useState } from "react";
import Header from "./Components/Header";
import BotChat from "./Components/Chatmessage";
import { formatTime } from "../src/utils/chatUtil";
import LoadingSign from "./Components/LoadingIndicator";
import ChatPanel from "./Components/ChatPanel";
import { generateWithOpenRouter } from "./Services/OpenRouterApi";

import BotImg from "./assets/roboo.png";
import lightMode from "./assets/ligtmodeImg.png";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  // ✅ FIXED — correct setter name (setMessages)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello Master, how can I serve you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // ✅ Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;

      const userFileMsg = {
        id: crypto.randomUUID(),
        sender: "user",
        text: `📄 Uploaded File: ${file.name}`,
        fileContent: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userFileMsg]);

      const aiReply = await generateWithOpenRouter(
        `The user uploaded a file named ${file.name}. Here is its content:\n\n${text}`
      );

      const botMsg = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: aiReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    };

    reader.readAsText(file);
  };

  // ✅ Send text message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await generateWithOpenRouter(input);

    const botMsg = {
      id: crypto.randomUUID(),
      text: botReply,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">

      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* ✅ Floating background animation */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-6 bg-contain bg-center bg-no-repeat transition-all duration-100 float-animation"
        style={{
          backgroundImage: `url(${darkMode ? BotImg : lightMode})`,
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

      <ChatPanel
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={loading}
        handleSendMessage={handleSendMessage}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
}

export default App;
