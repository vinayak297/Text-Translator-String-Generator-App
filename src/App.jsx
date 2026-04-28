import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    if (!text) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`
      );
      const data = await res.json();

      setTranslated(data.responseData.translatedText);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">
          🌍 Translator App
        </h1>

        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>

        <button
          onClick={translateText}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 p-2 bg-gray-50 rounded">
          <strong>Output:</strong>
          <p>{translated}</p>
        </div>
      </div>
    </div>
  );
}

export default App;