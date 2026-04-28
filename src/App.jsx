import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi");

  const translateText = async () => {
    if (!text) return;

    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`
    );
    const data = await res.json();
    setTranslated(data.responseData.translatedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translated);
  };

  return (
    <div className="container">

      <h1 className="heading">Text Translator</h1>

      <div className="center-box">

        <textarea
          className="textarea"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="controls">

          {/* LEFT */}
          <div className="left">
            <p className="label">Translate To:</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* RIGHT */}
          <div className="right">
            <button onClick={translateText}>Translate</button>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>

        <div className="output">
          <strong>Output:</strong>
          <p>{translated}</p>
        </div>

      </div>
    </div>
  );
}

export default App;