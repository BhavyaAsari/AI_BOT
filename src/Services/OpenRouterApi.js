export const generateWithOpenRouter = async (message) => {
  // Load API Key and Base URL from environment variables
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const API_URL = import.meta.env.VITE_OPENROUTER_API_URL;

  // Ensure the API key exists
  if (!API_KEY) {
    throw new Error("OpenRouter API key not defined");
  }

  // Build the request body as required by OpenRouter
  const body = {
    model: "openai/gpt-3.5-turbo", // You can change this to any OpenRouter-supported model
    messages: [
      { role: "user", content: message } // User message in Chat Completion format
    ]
  };

  try {
    // Make the API call with POST request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    // Parse the JSON returned by the API
    const data = await response.json();
    console.log("OpenRouter RAW:", data);

    // If no AI response returned
    if (!data?.choices?.length) {
      return "No response from OpenRouter";
    }

    // Return the generated AI text
    return data.choices[0].message.content;

  } catch (err) {
    // Handle any network or API errors
    console.error("OpenRouter API error:", err);
    return "Something went wrong with OpenRouter";
  }
};
