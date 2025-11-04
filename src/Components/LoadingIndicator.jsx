import { Bot } from "lucide-react";

function LoadingSign({ darkMode }) {

    return (

        // Align bubble to the left (bot side)
        <div className="flex justify-start">

            {/* Chat bubble container */}
            <div
                className={`
                    ${darkMode
                        ? "bg-gray-800 text-gray-100 border-gray-700"
                        : "bg-white text-gray-800 shadow-md"
                    }
                    rounded-2xl px-5
                    max-w-[80%] md:max-w-[70%]
                `}
            >

                {/* Icon + animated dots */}
                <div className="flex items-center space-x-3">

                    {/* Bot Icon */}
                    <Bot
                        className={`
                            h-7 w-7
                            ${darkMode ? "text-indigo-400" : "text-indigo-600"}
                        `}
                    />

                    {/* Single bouncing dot (typing indicator) */}
                    <div className="flex space-x-1">
                        <div
                            className={`
                                w-2.5 h-2.5 rounded-full animate-bounce
                                ${darkMode ? "bg-gray-400" : "bg-indigo-500"}
                            `}
                            style={{ animationDelay: "300ms" }}
                        ></div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default LoadingSign;
