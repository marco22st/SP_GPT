import { useState, useEffect } from "react";

const App = () => {
    const [value, setValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [prevChats, setPrevChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [chatHistories, setChatHistories] = useState([]);
    const [chatHistoryID, setChatHistoryID] = useState(0);
    const fetchChatHistories = async () => {
        try {
            const resp = await fetch('http://localhost:8080/history');
            const data = await resp.json();
            setChatHistories(data._embedded.history);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchChatMessages = async (chatHistoryId) => {
        try {
            const resp = await fetch(`http://localhost:8080/history/${chatHistoryId}/messages`);
            const data = await resp.json();
            setPrevChats(data._embedded.message);
        } catch (error) {
            console.log(error);
        }
    };

    async function checkIfHistoryExists(titleToCheck) {
        const resp = await fetch('http://localhost:8080/history');
        const data = await resp.json();
        if (data._embedded && data._embedded.history && data._embedded.history.length > 0) {
            return data._embedded.history.some(history => history.title === titleToCheck);
        } else {
            return false;
        }
    }

    const handleClick = (uniqueTitle, chatHistoryId) => {
        setCurrentTitle(uniqueTitle);
        setMessage(null);
        setValue("");
        fetchChatMessages(chatHistoryId);
        setChatHistoryID(chatHistoryId);
    };

    const createNewChat = () => {
        setMessage(null);
        setValue("");
        setCurrentTitle(null);
        setPrevChats([]);
    };

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
            const resp = await fetch('http://localhost:8000/completions', options);
            const data = await resp.json();
            setMessage(data.choices[0].message);
        } catch (error) {
            console.log(error);
        }
    };

    const saveChatHistory = async (title) => {
        const options = {
            method: "POST",
            body: JSON.stringify({ title: title }),
            headers: { "Content-Type": "application/json" }
        };

        try {
            const resp = await fetch('http://localhost:8080/history', options);
            const data = await resp.json();
            return data._links.self.href;
        } catch (error) {
            console.log(error);
        }
    };

    const saveChatMessage = async (chatHistoryRef, role, content) => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                role: role,
                content: content,
                chatHistory: chatHistoryRef
            }),
            headers: { "Content-Type": "application/json" }
        };

        try {
            await fetch('http://localhost:8080/message', options);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChatHistories();
    }, []);

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
            })

            setPrevChats(prevChats => ([
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
            ]));
            setValue("");
        }
    }, [message, currentTitle]);

    const currentChat = prevChats;

    return (
        <div className="app">
            <section className="side-bar">
                <button onClick={createNewChat}>+ New chat</button>
                <ul className="history">
                    {chatHistories?.map((chatHistory, index) => (
                        <li key={index} onClick={() => handleClick(chatHistory.title, chatHistory._links.self.href.split('/').slice(-1)[0])}>
                            {chatHistory.title}
                        </li>
                    ))}
                </ul>
                <nav>
                    <p>Made by Marco</p>
                </nav>
            </section>
            <section className="main">
                {!currentTitle && <h1>Marco GPT</h1>}
                <ul className="feed">
                    {currentChat.map((chatMessage, index) => <li key={index}>
                        <p className='role'>{chatMessage.role}</p>
                        <p>{chatMessage.content}</p>
                    </li>)}
                </ul>
                <div className="bottom-section">
                    <div className="input-container">
                        <input value={value} onChange={(e) => setValue(e.target.value)} />
                        <div id="submit" onClick={getMessages}>➢</div>
                    </div>
                    <p className="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
                </div>
            </section>
        </div>
    );
}

export default App;