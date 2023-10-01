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




## React ChatGPT Clone
