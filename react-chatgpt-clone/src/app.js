import { useState, useEffect } from "react";

const App = () => {
    // State-Hooks zur Verwaltung des Anwendungsstatus
    const [value, setValue] = useState(null); // Eingabewert des Benutzers
    const [message, setMessage] = useState(null); // Antwortnachricht vom Modell
    const [prevChats, setPrevChats] = useState([]); // Vorherige Chat-Nachrichten
    const [currentTitle, setCurrentTitle] = useState(null); // Aktueller Chat-Titel
    const [chatHistories, setChatHistories] = useState([]); // Liste der Chat-Verläufe
    const [chatHistoryID, setChatHistoryID] = useState(0); // ID des aktuellen Chat-Verlaufs

    // Funktion zum Abrufen der Chat-Verläufe vom Server
    const fetchChatHistories = async () => {
        try {
            const resp = await fetch("http://localhost:8080/history");
            const data = await resp.json();
            setChatHistories(data._embedded.history);
        } catch (error) {
            console.error(error);
        }
    };

    // Funktion zum Abrufen der Chat-Nachrichten für einen bestimmten Verlauf
    const fetchChatMessages = async (chatHistoryId) => {
        try {
            const resp = await fetch(`http://localhost:8080/history/${chatHistoryId}/messages`);
            const data = await resp.json();
            setPrevChats(data._embedded.message);
        } catch (error) {
            console.error(error);
        }
    };

    // Funktion zum Überprüfen, ob ein Chat-Verlauf mit einem bestimmten Titel bereits existiert
    const checkIfHistoryExists = async (titleToCheck) => {
        try {
            const resp = await fetch("http://localhost:8080/history");
            const data = await resp.json();
            return data._embedded?.history?.some(history => history.title === titleToCheck) || false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // Handler für Klick-Ereignisse auf einen Chat-Verlauf in der Seitenleiste
    const handleClick = (uniqueTitle, chatHistoryId) => {
        setCurrentTitle(uniqueTitle);
        setMessage(null);
        setValue("");
        fetchChatMessages(chatHistoryId);
        setChatHistoryID(chatHistoryId);
    };

    // Funktion zum Erstellen eines neuen Chats, Rücksetzen relevanter Zustände
    const createNewChat = () => {
        setMessage(null);
        setValue("");
        setCurrentTitle(null);
        setPrevChats([]);
    };

    // Funktion zum Abrufen von Vervollständigungs-Nachrichten für die Benutzereingabe
    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const resp = await fetch("http://localhost:8000/completions", options);
            const data = await resp.json();
            setMessage(data.choices?.[0]?.message || null);
        } catch (error) {
            console.error(error);
        }
    };

    // Funktion zum Speichern eines neuen Chat-Verlaufs auf dem Server
    const saveChatHistory = async (title) => {
        const options = {
            method: "POST",
            body: JSON.stringify({ title }),
            headers: { "Content-Type": "application/json" }
        };

        try {
            const resp = await fetch("http://localhost:8080/history", options);
            const data = await resp.json();
            return data._links?.self?.href || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Funktion zum Speichern einer neuen Chat-Nachricht auf dem Server
    const saveChatMessage = async (chatHistoryRef, role, content) => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                role,
                content,
                chatHistory: chatHistoryRef
            }),
            headers: { "Content-Type": "application/json" }
        };

        try {
            await fetch("http://localhost:8080/message", options);
        } catch (error) {
            console.error(error);
        }
    };

    // Effekt für das Abrufen von Chat-Verläufen beim Laden der Komponente
    useEffect(() => {
        fetchChatHistories();
    }, []);

    // Effekt zur Aktualisierung von Chat-Verlauf und Nachrichten bei Benutzereingabe und Vervollständigung
    useEffect(() => {
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        }
        if (currentTitle && value && message) {
            checkIfHistoryExists(currentTitle).then((result) => {
                console.log(result);
                if (result) {
                    saveChatMessage(`http://localhost:8080/history/${chatHistoryID}`, "user", value);
                    saveChatMessage(`http://localhost:8080/history/${chatHistoryID}`, message.role, message.content);
                    fetchChatMessages(chatHistoryID);
                } else {
                    saveChatHistory(currentTitle).then(chatHistoryId => {
                        saveChatMessage(chatHistoryId, "user", value);
                        saveChatMessage(chatHistoryId, message.role, message.content);
                        fetchChatHistories();
                    });
                }
            });

            setPrevChats([
                {
                    title: currentTitle,
                    role: "user",
                    content: value
                },
                {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }
            ]);
            setValue("");
        }
    }, [message, currentTitle, value, chatHistoryID]);

    // JSX zum Rendern der Komponente
    return (
        <div className="app">
            <section className="side-bar">
                {/* Button zum Erstellen eines neuen Chats */}
                <button onClick={createNewChat}>+ Neuer Chat</button>
                {/* Liste der Chat-Verläufe in der Seitenleiste */}
                <ul className="history">
                    {chatHistories?.map((chatHistory, index) => (
                        <li key={index} onClick={() => handleClick(chatHistory.title, chatHistory._links?.self?.href?.split('/').slice(-1)[0])}>
                            {chatHistory.title}
                        </li>
                    ))}
                </ul>
                {/* Navigationsinformationen */}
                <nav>
                    <p>Erstellt von Marco</p>
                </nav>
            </section>
            <section className="main">
                {/* Anzeige des Titels, wenn kein aktueller Titel vorhanden ist */}
                {!currentTitle && <h1>Marco GPT</h1>}
                {/* Liste der Chat-Nachrichten im Hauptbereich */}
                <ul className="feed">
                    {prevChats.map((chatMessage, index) => (
                        <li key={index}>
                            {/* Anzeige von Rolle und Inhalt jeder Chat-Nachricht */}
                            <p className='role'>{chatMessage.role}</p>
                            <p>{chatMessage.content}</p>
                        </li>
                    ))}
                </ul>
                {/* Unterbereich mit Eingabefeld und Informationen */}
                <div className="bottom-section">
                    <div className="input-container">
                        {/* Eingabefeld für Benutzernachrichten */}
                        <input value={value} onChange={(e) => setValue(e.target.value)} />
                        {/* Button zum Auslösen der Nachrichtenvervollständigung */}
                        <div id="submit" onClick={getMessages}>➢</div>
                    </div>
                    {/* Informationen zur Forschungsvorschau */}
                    <p className="info">Freie Forschungsvorschau. ChatGPT kann ungenaue Informationen zu Personen, Orten oder Fakten liefern. ChatGPT Version vom 3. August</p>
                </div>
            </section>
        </div>
    );
};

export default App;
