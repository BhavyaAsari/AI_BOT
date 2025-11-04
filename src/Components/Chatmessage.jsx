import { Bot, User } from "lucide-react";

function BotChat({ darkMode, messages, formatTime }) {

    return (
        // Container aligns message based on sender
        <div className={`flex ${messages.sender === "user" ? "justify-end" : "justify-start"}`}>

            <div
                className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5

                // User message bubble 
                ${messages.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"

                    // Bot message bubble 
                    : darkMode
                    ? "bg-gray-800 text-gray-100 border-gray-700"
                    : "bg-white text-gray-800 shadow-md"
                }`}
            >

                {/* Icon section */}
                <div
                    className={`flex-shrink-0 mr-3 
                    ${messages.sender === "user"
                        ? "text-indigo-200"
                        : darkMode
                        ? "text-indigo-400"
                        : "text-indigo-600"
                    }`}
                >
                    {messages.sender === "user" ? <User size={30} /> : <Bot size={30} />}
                </div>

                {/* Message content */}
                <div className="flex-1">

                    {/* Name + Timestamp */}
                    <div className="mb-1 flex justify-between items-center">

                        <span className="font-medium">
                            {messages.sender === "user" ? "You" : "Ai Assistant"}
                        </span>

                        <span
                            className={`text-xs 
                            ${messages.sender === "user"
                                ? "opacity-70"
                                : darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            } ml-2`}
                        >
                            {formatTime(messages.timestamp)}
                        </span>

                    </div>

                    {/* Actual message text */}
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
                        {messages.text}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default BotChat;
