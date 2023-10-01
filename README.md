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
