// Returns one random predefined bot message
export const getRandomResponse = () => {

    // List of possible fallback or fun responses
    const botResponse = [
        "I understand your question. Let me think about it",
        "Hello, how's it going sir",
        "Captain O Captain",
        "It’s November & almost the end of the year"
    ];

    // Select a random index from the array
    const randomIndex = Math.floor(Math.random() * botResponse.length);

    // Return the randomly selected message
    return botResponse[randomIndex];
};


// Formats a Date object into HH:MM format
export const formatTime = (date) => {

    // Converts date into a readable hour:minute time string
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
};
