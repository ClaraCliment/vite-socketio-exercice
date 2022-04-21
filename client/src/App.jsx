import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io.connect('http://localhost:3001')

function App() {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [affichage, setAffichage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { message: `Here is the message from the client side: ${message}`, })
    setAffichage(message)
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setResponse(data)
    })
  }, [socket]);

  return (
    <div className="App">
       <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)}/>
       <button onClick={sendMessage}>Send a message</button>
       <p>- {response}</p>
       {affichage && <p className='italic'>- {affichage}</p> }
    </div>
  )
}

export default App
