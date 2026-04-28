import { useState } from "react";
import "../App.css";

function Translator() {
    const [text, setText] = useState("");
    const [translated, setTranslated] = useState("");
    const [language, setLanguage] = useState("hi");

    const translateText = async () => {
        if (!text) return;

        const url = "https://google-translate113.p.rapidapi.com/api/v1/translator/text";

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
            },
            body: JSON.stringify({
                from: "en",
                to: language,
                text: text,
            }),
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();

            console.log("DATA:", data);

            setTranslated(
                data.translatedText ||
                data.trans ||
                data.data ||
                "No translation found"
            );
        } catch (err) {
            console.error(err);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(translated);
        alert("Copied!");
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

export default Translator;