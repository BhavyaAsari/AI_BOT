export const generateWithOpenRouter = async (message) => {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const API_URL = import.meta.env.VITE_OPENROUTER_API_URL;

  if (!API_KEY) {
    throw new Error("OpenRouter API key not defined");
  }

  const body = {
    model: "nvidia/nemotron-nano-12b-v2-vl:free",
    messages: [
      { role: "user", content: message }
    ]
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // optional but recommended
        "X-Title": "YourAppName"               // optional but recommended
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!data?.choices?.length) {
      return "No response from OpenRouter";
    }

    return data.choices[0].message.content;

  } catch (err) {
    console.error("OpenRouter API error:", err);
    return "Something went wrong with OpenRouter";
  }
};
