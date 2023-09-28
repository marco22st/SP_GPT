import {useState, useEffect} from "react";

function App() {
    const [value, setValue] = useState(null)//wichtig
    const [message, setMessage] = useState(null)//wichtig
    const [previousChats, setPreviousChats] = useState([])//wichtig
    const [currentTitle, setCurrentTitle] = useState(null)//wichtig

    const createNewChat = () => {
        setMessage(null)
        setValue('')
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue('')
    }

    const getMessages = async () => {
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
            const data = await response.json()
            setMessage(data.choices[0].message)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!currentTitle && value && message) {
            setCurrentTitle(value)
        }
        if(currentTitle && value && message) {
            setPreviousChats(previousChats => (
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

    const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle) //wichtig
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))//wichtig

  return (
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
