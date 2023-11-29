# SP_GPT
## Javascript ChatGPT Clone
### JavaScript 
``` javascript 
const API_KEY = 'Beispiel Key'
``` 
Konstante wird erstellt um Anfragen an die OpenAI-API zu autorisieren

``` javascript
const submitButton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')
```
Hier werden DOM-Elemente (Document Object Model) erzeugt, um eine Schnittstelle zwichen HTML und JavaScript zu erzeugen.

``` javascript
function changeInput(value) {
    inputElement.value = value
}
```
Diese Funktion ändert den Wert des Eingabeelements.
Wird verwendet um auf Eingabehistorie zu klicken.

``` javascript
async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ${API_KEY}',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: inputElement.value}],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error) {
        console.error(error)
    }
}
```
Es wird eine asynchrone Funktion erzeugt, um eine Nachricht von GPT abzurufen. (Asynchrone Fubktion, erlaubt es Aufgaben parallel zu lösen)
Ein options Objekt wird erzeugt, dass die Konfigurationsdaten für die HTTP-Anfrage an die OpenAI-API enthält.
In dieser Funktion wird fetch verwendet, um eine POST-Anfrage an die OpenAI-API zu sende und eine Antwort zu erhalten. 
Die Antwort wird als JSON interpretiert und die generierte Textantwort wird im outputElement angezeigt.
Wenn eine Antwort generiert wurde und es eine Eingabe vorhanden ist, wird die Eingabe zur Eingabehistorie hinzugefügt.
Bei einem Klick auf die Eingabe in der Eingabehistorie wird diese ins Eingabefeld kopiert.

```javascript
submitButton.addEventListener('click', getMessage)
```
Klickereignis auf den "Absenden"-Button wird hinzugefügt.
Wenn geklickt, wird getMassage(); aufgerufen, um Textgenerierung durchzuführen.

```javascript
function clearInput() {
    inputElement.value = ''
}
```
Funktion wird definiert, um den Text im inputElement (Eingabefeld) zu löschen. 

``` javascript
buttonElement.addEventListener('click', clearInput)
```
Klickereignis auf "Löschen"-Button wird hinzugefügt.
Wenn geklickt, wird clearInput(); aufgerufen, um Eingabefeld zu leeren.

### HTML 
``` html
<!DOCTYPE html>
<html lang="en">
```
Handelt um eine HTML5 Seite und kennzeichtnet den Beginn des HTML-Dokuments und gibt Spraceh an. ("en" = Englisch)

``` html
<head>
  <meta charset="UTF-8">
  <title>JavaScript ChatGPT Clone</title>
  <link rel="stylesheet" href="styles.css">
</head>
```
Dieser Abschnitt enthält Informationen über die Website die nicht direkt angezeigt werden, sowie Zeichensatz, Titel der Website und Styling.

``` html
<body>
<section class="side-bar">
  <button>New Chat</button>
  <div class="history"></div>
  <nav>
    <p>Made by Phillip</p>
  </nav>
</section>
<section class="main">
  <h1>PhillipGPT</h1>
  <p id="output"></p>
  <div class="bottom-section">
    <div class="input-container">
      <input/>
      <div id="submit">➢</div>
    </div>
  </div>
  <p class="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
</section>

<script src="app.js"></script>
</body>
```
Dieser Abschnitt enthält tatsächlichen Inhalt der Website, der angezeigt wird. 
side-bar repräsentiert die Seitenleiste des Chat-Interfaces.
main repäsentiert den Hauptbereich des Chat-Interfaces.
info repräsntiert eine Informationsmeldung.
script verweist auf exzterne JavaScript-Datei.

### CSS
``` css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
```
Dieser Teil importiert eine Schriftart von Google Fonts, um sie in der gesamten Website zu verwenden.

``` css
* {
    color: #fff;
    font-family: 'Open Sans', sans-serif;
}
```
Dieser Selektor und seine Eigenschaften werden auf alle HTML-Elemente angewendet. 
Es wird immer Open Sans verwendet sonst sans-serif.

``` css
body {
    margin: 0;
    padding: 0;
    background-color: #343541;
    display: flex;
}
```
Dieser Abschnitt enthält die Stildefinition das body-Element .
flex wird verwendet, um Elemente in einer flexiblen Weise anzuordnen.

``` css
h1 {
    font-size: 33px;
    font-weight: 600;
    padding: 200px 0;
}
```
Hier wird die Darstellung von h1-Überschrift festgelegt. 

``` css
.side-bar {
    background-color: #202123;
    width: 244px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```
Diese Klasse definiert den Stil der Seitenleiste. 
justify-content: verteilung auf der Hauptachse.
space-between bewirkt, dass der verfügbare Platz zwischen den Elementen gleichmäßig verteilt wird.

``` css
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
}
```
Dieser Abschnitt enthält Stildefinitionen für den Hauptinhalt der Webseite.

``` css
.bottom-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
```
Hier wird der Stil für den unteren Abschnitt der Seite definiert. 

``` css
.info {
    color: rgba(255,255,255,0.5);
    font-size: 11px;
    padding: 10px;
}
```
Dies ist der Stil für Text mit der Klasse info.

``` css
input {
    border: none;
    background-color: rgba(255,255,255,0.05);
    width: 100%;
    font-size: 20px;
    padding: 12px 15px;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.05) 0 54px 55px,
    rgba(0,0,0,0.05) 0 -12px 30px,
    rgba(0,0,0,0.05) 0 4px 6px,
    rgba(0,0,0,0.09) 0 -3px 5px;
}
```
Diese Definitionen gelten für Eingabefelder auf der Seite.
Keine Umrandung, leichte Hintergundfarbe...

``` css
input:focus {
    outline: none;
}
```
Styling des input-Elements wird geändert, wenn es aktiviert wird.

``` css
.input-container {
    position: relative;
    width: 100%;
    max-width: 650px;
}

.input-container #submit {
    position: absolute;
    right: 0;
    bottom: 15px;
    cursor: pointer;
}
```
Dieser Abschnitt definiert den Stil für ein Formularelement mit der Klasse input-container und das enthaltene Element mit der ID submit.
Submit-Element wird am rechten unteren Rand positioniert und enthält einen Cursor in Form einer Hand.

``` css
button {
    border: solid 0.5px rgba(255,255,255,0.5);
    background-color: transparent;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}
```
Dieser Stil wird auf allen button-Elementen angewendet.

``` css
nav {
    border-top: solid 0.5px rgba(255,255,255,0.5);
    padding: 10px;
    margin: 10px;
}
```
Hier wird der Stil für Navigationsleisten definiert.

``` css
.history {
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.history p {
    cursor: pointer;
}
```
Diese Definitionen sind für Elemente in einem Abschnitt mit der Klasse history.
history-Element enthält einen Cursor in Form einer Hand.
## React ChatGPT Clone
### Klasse "app.js"
```javascript
const [value, setValue] = useState(null) // Initialisiert eine Zustandsvariable 'value' mit dem Wert 'null'
const [message, setMessage] = useState(null) // Initialisiert eine Zustandsvariable 'message' mit dem Wert 'null'
const [previousChats, setPreviousChats] = useState([]) // Initialisiert eine Zustandsvariable 'previousChats' als leeres Array
const [currentTitle, setCurrentTitle] = useState(null) // Initialisiert eine Zustandsvariable 'currentTitle' mit dem Wert 'null'
```
Zustandsvariable wird durch die mitgegebene Methode verändert. 


```javascript
const createNewChat = () => {
    setMessage(null) // Setzt die Zustandsvariable 'message' auf 'null'
    setValue('') // Setzt die Zustandsvariable 'value' auf einen leeren String
    setCurrentTitle(null) // Setzt die Zustandsvariable 'currentTitle' auf 'null'
}
```
Mit dieser Funktion erstellt man eine neuen Chat.

```javascript
const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle) // Setzt die Zustandsvariable 'currentTitle' auf den übergebenen Wert 'uniqueTitle'
    setMessage(null) // Setzt die Zustandsvariable 'message' auf 'null'
    setValue('') // Setzt die Zustandsvariable 'value' auf einen leeren String
}
```
Ist eine Funktion, die aufgerufen wird, wenn auf ein Element geklickt wird.

```javascript
const getMessages = async () => {
    const options = { // Konfiguriert die Optionen für die Fetch Anfrage
        method: 'POST', // HTTP Methode der Anfrage
        body: JSON.stringify({
            message: value // Sendet die Nachricht im JSON Format
        }),
        headers: {
            'Content-Type': 'application/json' // Setzt den Content-Type-Header auf 'application/json'
        }
        }
    }
    try {
        const response = await fetch('http://localhost:8000/completions', options) // Führt eine Fetch-Anfrage zum Server durch
        const data = await response.json()  // Extrahiert Daten aus der Serverantwort im JSON-Format
        setMessage(data.choices[0].message) // Setzt die Zustandsvariable 'message' basierend auf den erhaltenen Daten
    } catch (error) {
        console.error(error)  // Behandelt Fehler, die während der Fetch Anfrage auftreten können
    }
}
```
Diese Funktion ruft Daten von einem Server ab. 

```javascript
useEffect(() => {
    if (!currentTitle && value && message) {
        setCurrentTitle(value) // Setzt den aktuellen Titel auf den Wert (value)
    }
    if(currentTitle && value && message) {
        setPreviousChats(previousChats => (  // Aktualisiert den vorherigen Chatverlauf
            [...previousChats, {
                title: currentTitle,
                role: 'user',
                content: value
            }, {
                title: currentTitle,
                role: message.role,
                content: message.content
            }]
        ))
    }
}, [message, currentTitle])
```
Mit dieser Funktion soll ein Chatverlauf aktualisiert werden.

```javascript
const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle) 
const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
```
Dieie Variable currentChat enthält ein Array mit Chat-Nachrichten, die zum aktuellen Titel gehören. Die Variable uniqueTitles enthält ein Array, das die eindeutigen Titel aller vorherigen Chats aus previousChats enthält.

```javascript
<div className="app"> // Diese Struktur besteht aus zwei Abschnitten (<section>-Elementen), einem für die Seitenleiste (side-bar) und einem für den Hauptinhalt (main).
    <section className="side-bar"> // Enthält Button mit Text "+ New Chat", der bei Klick Funktion createNewChat aufruft, bei Klick Titel wird Funktion handleClick aufgerufen.
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
            <p>Made by Marco</p>
        </nav>
    </section>
    <section className="main">
        {!currentTitle && <h1>MarcoGPT</h1>} // Wenn kein Titel vorhanden ist, wird h1 eingesetzt
        <ul className="feed"> // Ist eine Liste von Chat Nachrichten
            {currentChat.map((chatMessage, index) => <li key={index}> // wird verwendet, um über das Array zu iterieren und für jede Chat Nachricht ein Listenelement zu erstellen.
                <p className='role'>{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
            </li>)}
        </ul>
        <div className="bottom-section">
            <div className="input-container"> // Container für die Benutzereingabe mit einem Eingabefeld (<input>), das den aktuellen Wert value darstellt
                <input value={value} onChange={(e) => setValue(e.target.value)}/>
                <div id="submit" onClick={getMessages}>➢</div>
            </div>
            <p className="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
        </div>
    </section>
</div>
```
Code visualisert Struktur und Verhalten eine Chat Anwendung

#### finale Version
```javascript
import {useState, useEffect} from "react";

function App() {
    const [value, setValue] = useState(null) // Speichert den aktuellen Benutzereingabe Text
    const [message, setMessage] = useState(null) // Speichert die empfangene Nachricht
    const [previousChats, setPreviousChats] = useState([]) // Speichert den bisherigen Chatverlauf als Array von Objekten
    const [currentTitle, setCurrentTitle] = useState(null) // Speichert den Titel des aktuellen Chats
 
    const createNewChat = () => { // Setzt Werte für Nachricht, Benutzereingabe und aktuellen Titel zurück, um neuen Chat zu starten
        setMessage(null)
        setValue('')
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => { // Wird aufgerufen, wenn auf Chat Titel in der Seitenleiste geklickt wird
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue('')
    }

    const getMessages = async () => { //  Sendet eine POST Anfrage an einen Server 
        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json() // Empfangene Server Nachricht wird hier gespeichert
            setMessage(data.choices[0].message)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { // Überwacht Änderungen an den Zustandsvariablen message und currentTitle
        if (!currentTitle && value && message) {
            setCurrentTitle(value) // aktuelle Titel wird auf den Wert (value) gesetzt
        }
        if(currentTitle && value && message) { 
            setPreviousChats(previousChats => ( // // vorherige Chatverlauf wird aktualisiert
                [...previousChats, {//wichtig
                    title: currentTitle,
                    role: 'user',
                    content: value
                }, {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }]
            ))
        }
    }, [message, currentTitle])

    const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle) // Filtert Chatverlauf
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title))) // Erstellt Array von Chat Titeln

  return ( // Gibt die Struktur der Benutzeroberfläche der Chat Anwendung zurück
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Marco</p>
        </nav>
      </section>
      <section className="main">
          {!currentTitle && <h1>MarcoGPT</h1>}
          <ul className="feed">
              {currentChat.map((chatMessage, index) => <li key={index}>
                  <p className='role'>{chatMessage.role}</p>
                  <p>{chatMessage.content}</p>
              </li>)}
          </ul>
          <div className="bottom-section">
              <div className="input-container">
                  <input value={value} onChange={(e) => setValue(e.target.value)}/>
                  <div id="submit" onClick={getMessages}>➢</div>
              </div>
              <p className="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
          </div>
      </section>
    </div>
  )
}

export default App
```
Diese Klasse handelt um eine Chat Anwendung mit Funktionen zum Erstellen neuer Chats, Anzeigen von Chatverläufen und Senden von Benutzereingaben an einen Server.

### Klasse "server.js"
```javascript
const PORT = 8000 // Das ist der Port, auf dem der Server zuhören wird.
const express = require('express') // Importiert das Node.js-Modul express und erleichtert Erstellen von Servern und Routing
const cors = require('cors') // Cross-Origin Resource Sharing erlaubt  HTTP-Anforderungen von unterschiedlichen Ursprüngen
require('dotenv').config() // lädt Konfigurationsvariablen aus einer optionalen .env Datei in den Umgebungsvariablen
const app = express() // Erstellt eine Express-Anwendung, die alle Funktionen des Express-Frameworks nutzt
app.use(express.json()) // Funktion, die die Verarbeitung von JSON-Daten in den eingehenden Anforderungen ermöglicht
app.use(cors()) // Ermöglicht Ressourcen von einer anderen Domäne als der ursprünglichen Domäne der Anwendung anzufordern
```

```javascript
const API_KEY = process.env.API_KEY // rocess.env.API_KEY wird verwendet, um den Wert der Umgebungsvariable API_KEY zu extrahieren
```

```javascript
app.post('/completions', async (req, res) => { // Definiert die Konfigurationsoptionen für die Anfrage an die OpenAI API
    const options = {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`, // Setzt den API-Schlüssel als Authorization-Header
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // GPT-3-Modell, das verwendet werden soll
            messages: [{role: 'user', content: req.body.message}], // Benutzer-Nachricht für die Chat Interaktion
            max_tokens: 100, // Maximale Anzahl der generierten Tokens in der Antwort
        })
    }
    try { 
        const response = await fetch('https://api.openai.com/v1/chat/completions', options) // Sendet Anfrage an die OpenAI API
        const data = await response.json() // Verarbeitet die empfangene Antwort von der OpenAI API als JSON
        res.send(data) // Sendet die verarbeiteten Daten als Antwort auf die ursprüngliche Anfrage zurück
    } catch (error) {
        console.error(error) // Behandlet Fehler, falls die Anfrage an die OpenAI API fehlschlägt
    }
})
```

```javascript
app.listen(PORT, () => console.log('Your server is running on PORT' + PORT)) // verwendet die app.listen-Methode, um den Server zu starten und auf eingehende Anfragen auf einem bestimmten Port zu hören
```

#### finale Version
```javascript
const PORT = 8000 // Das ist der Port, auf dem der Server zuhören wird.
const express = require('express') // Importiert das Node.js-Modul express und erleichtert Erstellen von Servern und Routing
const cors = require('cors') // Cross-Origin Resource Sharing erlaubt  HTTP-Anforderungen von unterschiedlichen Ursprüngen
require('dotenv').config() // lädt Konfigurationsvariablen aus einer optionalen .env Datei in den Umgebungsvariablen
const app = express() // Erstellt eine Express-Anwendung, die alle Funktionen des Express-Frameworks nutzt
app.use(express.json()) Funktion, die die Verarbeitung von JSON-Daten in den eingehenden Anforderungen ermöglicht
app.use(cors()) // Ermöglicht Ressourcen von einer anderen Domäne als der ursprünglichen Domäne der Anwendung anzufordern

const API_KEY = process.env.API_KEY // rocess.env.API_KEY wird verwendet, um den Wert der Umgebungsvariable API_KEY zu extrahieren

app.post('/completions', async (req, res) => { // Definiert die Konfigurationsoptionen für die Anfrage an die OpenAI API
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`, // Setzt den API-Schlüssel als Authorization-Header
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // GPT-3-Modell, das verwendet werden soll
            messages: [{role: 'user', content: req.body.message}], // Benutzer-Nachricht für die Chat Interaktion
            max_tokens: 100, // Maximale Anzahl der generierten Tokens in der Antwort
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options) // Sendet Anfrage an die OpenAI API
        const data = await response.json() // Verarbeitet die empfangene Antwort von der OpenAI API als JSON
        res.send(data) // Sendet die verarbeiteten Daten als Antwort auf die ursprüngliche Anfrage zurück
    } catch (error) {
        console.error(error) // Behandlet Fehler, falls die Anfrage an die OpenAI API fehlschlägt
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT' + PORT)) // verwendet die app.listen-Methode, um den Server zu starten und auf eingehende Anfragen auf einem bestimmten Port zu hören
```
Diese Klasse ermöglicht es dem Server, Benutzeranfragen für Chat Anfrage an die OpenAI GPT-3-API zu senden und die generierten Antworten an den Client zurückzugeben.

## Klasse "index.css"
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'); /* verwendet @import, um eine externe Schriftart von Google Fonts in unsere Webseite einzubinden */
```

```css
* { /* wählt alle HTML-Elemente auf der Seite aus */
    color: #fff; /* setzt die Textfarbe (color) aller ausgewählten Elemente auf Weiß (#fff) */
    font-family: 'Open Sans', sans-serif; /* legt die Schriftart (font-family) für alle ausgewählten Elemente fest */
}
```

```css
body {
    margin: 0; /* Dies setzt den Außenabstand (margin) des body Elements auf 0 */
    padding: 0; /* Dies setzt den Innenabstand (padding) des body Elements auf 0 */
}
```

```css
.app {
    background-color: #343541; /* setzt die Hintergrundfarbe (background-color) der ausgewählten Elemente auf #343541 */
    display: flex; /* Flexbox ist ein modernes Layout-Modell in CSS, das es ermöglicht, Elemente flexibel in einer Zeile oder Spalte
                      anzuordnen und zu verteilen. */
}
```

```css
.side-bar {
    background-color: #202123; /*  setzt die Hintergrundfarbe */
    height: 100vh; /* Setzt die Höhe */
    width: 244px; /* Setzt die Breite */
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    flex-direction: column; /*  Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: space-between; /* Verfügbare Platz wird gleichmäßig auf die Elemente auf der Hauptachse verteilt wird */
}
```

```css
button {
    border: solid 0.5px rgba(255,255,255,0.5); /* Setzt die Stilregeln für den Rahmen des Buttons */
    background-color: transparent; /* Setzt die Hintergrundfarbe des Buttons */
    border-radius: 5px; /* Setzt den Radius der abgerundeten Ecken des Buttons  */
    padding: 10px; /* Setzt den Innenabstand (padding) des Buttons auf */
    margin: 10px; /* Setzt den Ausßenabstand (margin) des Buttons auf */
}
```

```css
nav {
    border-top: solid 0.5px rgba(255,255,255,0.5); /* Setzt die Stilregeln für die obere Begrenzung */
    padding: 10px; /* Setzt den Innenabstand */
    margin: 10px; /* Setzt den Außenabstand */
}
```

```css
.history {
    padding: 10px; /* Setzt den Innenabstand */
    margin: 10px; /* Setzt den Außenabstand */
    height: 100%; /* Setzt die Höhe */
}
```

```css
.history li {
    list-style-type: none; /* Setzt den Stil für die Listendarstellung */
    padding: 15px 0; /* Setzt den Innenabstand */
    cursor: pointer; /* Setzt den Mauszeiger-Stil */
}
```

```css
.main {
    height: 100vh; /* Setzt die Höhe */
    width: 100%; /* Setzt die Breite */
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    flex-direction: column; /*  Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: space-between; /* Verfügbare Platz wird gleichmäßig auf die Elemente auf der Hauptachse verteilt wird */
    align-items: center; /* Setzt die Ausrichtung der Elemente auf der Querachse auf center */
    text-align: center; /* Setzt die horizontale Ausrichtung des Texts */
}
```

```css
.info {
    color: rgba(255,255,255,0.5); /* Setzt die Textfargbe */
    font-size: 11px; /* Setzt den Schriftgröße */
    padding: 10px; /* Setzt den Innenabstand */
}
```

```css
.bottom-section {
    width: 100%; /* Setzt die Breite */
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    flex-direction: column; /*  Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: center; /* Horizontale Ausrichtung von Flexbox-Containern und ihren Elementen zu steuern */
    align-items: center; /* Vertikale Ausrichtung von Flexbox-Containern und ihren Elementen zu steuern */
}
```

```css
.input-container {
    position: relative; /*  Die position-Eigenschaft wird auf relative gesetzt */
    width: 100%; /* Setzt die Breite */
    max-width: 650px; /* Setzt die maximale Breite */
}
```

```css
input {
    width: 100%; /* Setzt die Breite */
    border: none; /* entfernt den Rahmen */
    font-size: 20px; /* Setzt die Schriftgröße */
    background-color: rgba(255,255,255,0.05); /* Setzt die Hintergrundfarbe */
    padding: 12px 15px; /* Setzt den Innenabstand */
    border-radius: 5px; /* Setzt den Radius der abgerundeten Ecken */
    box-shadow: rgba(0,0,0,0.05) 0 54px 55px, /* Setzt eine Schatten-Effek */
    rgba(0,0,0,0.05) 0 -12px 30px,
    rgba(0,0,0,0.05) 0 4px 6px,
    rgba(0,0,0,0.05) 0 12px 3px,
    rgba(0,0,0,0.05) 0 -3px 5px;
}
```

```css
input:focus {
    outline: none; /* Anweisung outline: none; wird oft verwendet, um diese standardmäßige Umrisslinie zu entfernen */
}
```

```css
#submit {
    position: absolute; /* Element relativ zum nächsten positionierten Elternelement positioniert wird */
    bottom: 15px; /* Setzt den Abstand vom unteren Rand */
    right: 0; /* Setzt den Abstand vom rechten Rand */
    cursor: pointer; /* Setzt den Mauszeiger-Stil  */
}
```

```css
.feed {
    overflow: scroll; /* Setzt die Regel für das Überlaufverhalten  */
    width: 100%; /* Setzt die Breite */
    padding: 0; /* Setzt den Innenabstand */
}
```

```css
.feed li {
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    background-color: #444654; /* Setzt die Hintergrundfarbe */
    width: 100%; /* Setzt die Breite */
    padding: 20px; /* Setzt den Innenabstand */
    margin: 20px 0; /* Setzt den Außenabstand */
}
```

```css
.feed p {
    color: rgba(255,255,255,0.8); /* Setzt die Textfarbe */
    font-size: 14px;  /* Setzt die Schriftgröße */
    text-align: left; /* Horizontale Ausrichtung des Textes innerhalb eines Elements zu steuern */
}
```

```css
.feed p.role {
    min-width: 100px; /* Minimale Breite eines Elements festzulegen */
}
```

#### finale Version
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'); /* verwendet @import, um eine externe Schriftart von Google Fonts in unsere Webseite einzubinden */

* {
    color: #fff; /* setzt die Textfarbe (color) aller ausgewählten Elemente auf Weiß (#fff) */
    font-family: 'Open Sans', sans-serif; /* legt die Schriftart (font-family) für alle ausgewählten Elemente fest */
}

body {
    margin: 0; /* Dies setzt den Außenabstand (margin) des body Elements auf 0 */
    padding: 0; /* Dies setzt den Innenabstand (padding) des body Elements auf 0 */
}

.app {
    background-color: #343541; /* setzt die Hintergrundfarbe (background-color) der ausgewählten Elemente auf #343541 */
    display: flex; /* Flexbox ist ein modernes Layout-Modell in CSS, das es ermöglicht, Elemente flexibel in einer Zeile oder Spalte
                      anzuordnen und zu verteilen. */
}

.side-bar {
    background-color: #202123; /*  setzt die Hintergrundfarbe */
    height: 100vh; /* Setzt die Höhe */
    width: 244px; /* Setzt die Breite */
    display: flex; /* Flexbox-Layout-Modell aktiviert */
    flex-direction: column; /*  Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: space-between; /* Verfügbare Platz wird gleichmäßig auf die Elemente auf der Hauptachse verteilt wird */
}

button {
    border: solid 0.5px rgba(255,255,255,0.5); /* Setzt die Stilregeln für den Rahmen des Buttons */
    background-color: transparent; /* Setzt die Hintergrundfarbe des Buttons */
    border-radius: 5px; /* Setzt den Radius der abgerundeten Ecken des Buttons  */
    padding: 10px;  /* Setzt den Innenabstand (padding) des Buttons auf */
    margin: 10px; /* Setzt den Ausßenabstand (margin) des Buttons auf */
}

nav {
    border-top: solid 0.5px rgba(255,255,255,0.5); /* Setzt die Stilregeln für die obere Begrenzung */
    padding: 10px; /* Setzt den Innenabstand */
    margin: 10px; /* Setzt den Ausßenabstand (margin) des Buttons auf */
}

.history {
    padding: 10px; /* Setzt den Innenabstand (padding) des Buttons auf */
    margin: 10px; /* Setzt den Ausßenabstand (margin) des Buttons auf */
    height: 100%; /* Setzt die Höhe */
}

.history li {
    list-style-type: none; /* Setzt den Stil für die Listendarstellung */
    padding: 15px 0; /* Setzt den Innenabstand (padding) des Buttons auf */
    cursor: pointer; /* Setzt den Mauszeiger-Stil */
}

.main {
    height: 100vh; /* Setzt die Höhe */
    width: 100%; /* Setzt die Breite */
    display: flex; /* Flexbox-Layout-Modell aktiviert */
    flex-direction: column; /* Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: space-between; /* Verfügbare Platz wird gleichmäßig auf die Elemente auf der Hauptachse verteilt wird */
    align-items: center; /* Setzt die Ausrichtung der Elemente auf der Querachse auf center */
    text-align: center; /* Setzt die horizontale Ausrichtung des Texts */
}

.info {
    color: rgba(255,255,255,0.5); /* Setzt die Textfargbe */
    font-size: 11px; /* Setzt den Schriftgröße */
    padding: 10px; /* Setzt den Innenabstand */
}

.bottom-section {
    width: 100%; /* Setzt die Breite */
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    flex-direction: column; /*  Elemente werdem in einer Spalte von oben nach unten angeordnet. */
    justify-content: center; /* Horizontale Ausrichtung von Flexbox-Containern und ihren Elementen zu steuern */
    align-items: center; /* Vertikale Ausrichtung von Flexbox-Containern und ihren Elementen zu steuern */
}

.input-container {
   position: relative; /*  Die position-Eigenschaft wird auf relative gesetzt */
    width: 100%; /* Setzt die Breite */
    max-width: 650px; /* Setzt die maximale Breite */
}

input {
    width: 100%; /* Setzt die Breite */
    border: none; /* entfernt den Rahmen */
    font-size: 20px; /* Setzt die Schriftgröße */
    background-color: rgba(255,255,255,0.05); /* Setzt die Hintergrundfarbe */
    padding: 12px 15px; /* Setzt den Innenabstand */
    border-radius: 5px; /* Setzt den Radius der abgerundeten Ecken */
    box-shadow: rgba(0,0,0,0.05) 0 54px 55px, /* Setzt eine Schatten-Effek */
    rgba(0,0,0,0.05) 0 -12px 30px,
    rgba(0,0,0,0.05) 0 4px 6px,
    rgba(0,0,0,0.05) 0 12px 3px,
    rgba(0,0,0,0.05) 0 -3px 5px;
}

input:focus {
   outline: none; /* Anweisung outline: none; wird oft verwendet, um diese standardmäßige Umrisslinie zu entfernen */
}

#submit {
   position: absolute; /* Element relativ zum nächsten positionierten Elternelement positioniert wird */
    bottom: 15px; /* Setzt den Abstand vom unteren Rand */
    right: 0; /* Setzt den Abstand vom rechten Rand */
    cursor: pointer; /* Setzt den Mauszeiger-Stil  */
}

.feed {
    overflow: scroll; /* Setzt die Regel für das Überlaufverhalten  */
    width: 100%; /* Setzt die Breite */
    padding: 0; /* Setzt den Innenabstand */
}

.feed li {
    display: flex; /* Lexbox-Layout-Modell aktiviert */
    background-color: #444654; /* Setzt die Hintergrundfarbe */
    width: 100%; /* Setzt die Breite */
    padding: 20px; /* Setzt den Innenabstand */
    margin: 20px 0; /* Setzt den Außenabstand */
}

.feed p {
   color: rgba(255,255,255,0.8); /* Setzt die Textfarbe */
    font-size: 14px;  /* Setzt die Schriftgröße */
    text-align: left; /* Horizontale Ausrichtung des Textes innerhalb eines Elements zu steuern */
}

.feed p.role {
   min-width: 100px; /* Minimale Breite eines Elements festzulegen */
}
```
