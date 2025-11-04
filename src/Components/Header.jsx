import React from "react";
import {Bot, BubblesIcon, MoonIcon, SparklesIcon, SunIcon, TornadoIcon} from "lucide-react";

function Header({darkMode,toggleDarkMode}) {

    return (
        
        <header className={`${
            darkMode ? "bg-gray-800 text-white":"bg-white"} shadow-lg py-4 px-6 border-b ${

                darkMode ? "bg-gray-700" : "bg-gray-2 00"
            }
        }`}>
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                {/* Left side Content */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from bg-purple-500 to indigo-600 rounded-full border border-black">
                        <Bot className="h-6 w-6 text-white"/>
                    </div>
                    <h1 className={`text-2xl`}><strong>Intelligent Chat</strong></h1>
                </div>
                {/* Right Side Content */}
                <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 px-3 py-1 rounded text-sm font-medium">
                    <SparklesIcon className={`${

                        darkMode ? "text-indigo-400" :  "text-indigo-600"
                    }` }/>
                    <span  className={`${darkMode ? "text-indigo-400":"text-indigo-700"} text-sm`}><strong>AI Integrated</strong></span>
                </div>
                <button className={`p-1 rounded-full cursor-pointer ${darkMode ? "bg-gray-700 bg-indigo-700 text-yellow-300 "
                        :"bg-indigo-100 text-indigo-700"} `}
                        onClick={toggleDarkMode}
                        >
                    {darkMode ?<SunIcon/> :<MoonIcon/>}
                </button>
                </div>
            </div>
        </header>
    )
}

export default Header;