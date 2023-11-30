// Importiere benötigte Module und erstelle eine Express-Anwendung
const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch"); // Stelle sicher, dass node-fetch installiert ist (braucht V2 "npm install node-fetch@2")

const app = express();
app.use(express.json());
app.use(cors());

// Lese den OpenAI API-Schlüssel aus der Umgebungsvariable
const API_KEY = process.env.API_KEY;

// Endpoint für die Anfrage an OpenAI GPT-3
app.post("/completions", async (req, res) => {
    // Optionen für die Anfrage an die OpenAI-API
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`, // Setze den API-Schlüssel im Authorization-Header
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            max_tokens: 100,
            messages: [{ content: req.body.message, role: "user" }],
            model: "gpt-3.5-turbo"
        }),
    };

    try {
        // Sende eine Anfrage an die OpenAI-API und warte auf die Antwort
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);

        // Wandele die Antwort von der OpenAI-API in JSON um
        const data = await response.json();

        // Sende die OpenAI-Antwort zurück an den Client
        res.send(data);

        // Der nachfolgende Code wird nicht ausgeführt, da er nach res.send() steht.
        // Wenn du "historydata" verwenden möchtest, platziere diesen Code vor res.send().
        // Zum Beispiel:
        // let historydata = {
        //     "role": data.choices[0].message.role,
        //     "message": data.choices[0].message.content,
        // };
    } catch (error) {
        // Behandle Fehler, falls die Anfrage an die OpenAI-API fehlschlägt
        console.error(error);
    }
});

// Starte den Server und höre auf Anfragen auf dem angegebenen Port
app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
