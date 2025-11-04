import { Send } from "lucide-react";
import { Paperclip } from "lucide-react";

function ChatPanel({ darkMode, input, setInput, loading, handleSendMessage,handleFileUpload }) {

    return (

        // Top border + background based on theme
        <div className={`${darkMode
            ? "bg-gray-800 border-t border-gray-700"
            : "bg-white border-t border-gray-200"
        } p-4`}>

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center space-x-3">

                    {/* Text input for typing a message */}
                    <input
                        type="text"
                        value={input}

                        // Send message when Enter is pressed
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}

                        // Update input on typing
                        onChange={(e) => setInput(e.target.value)}

                        placeholder="type your message"

                        className={`flex-1 border 
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-800"
                        }
                        rounded-full px-5 py-3
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            id="fileInput"
                            accept=".txt,.pdf,.json,.csv,.md"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        {/* Paperclip Button */}
                        <label htmlFor="fileInput"
                            className={`p-2 rounded-full  hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition ${darkMode ? "text-white":"text-black"}`}>
                            <Paperclip size={22} />
                            </label>


                    {/* Send button */}
                    <button
                        className="p-3 rounded-full transition-colors shadow-md cursor-pointer"

                        onClick={handleSendMessage}

                        // Disable when loading OR input is empty
                        disabled={loading || !input.trim()}
                    >
                        <Send className={darkMode ? "text-white" : "text-gray-800"} />
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ChatPanel;
