import { ChangeEvent, useEffect, useState, useRef, KeyboardEventHandler } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as SignalR from '@microsoft/signalr'
import './assets/css/index.css'

function App() {

  const [message, setMessage] = useState<String>("");
  const [messages, setMessages] = useState<String[]>([])

  let [connection, setConnection] = useState<SignalR.HubConnection | null>(null);

  const latestChat = useRef<String[] | null>(null);

  latestChat.current = messages;


  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl('http://localhost:5262/chathub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!');
          if (connection) {
            connection.on('Receive', message => {
              if (latestChat.current) {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);

                setMessages(updatedChat);
              }

            });
            connection.on("Users", message => {
              console.log(message);
            })
          }

        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);


  const handleClick = () => {
    if (connection) {
      connection.invoke("Send", message)
      setMessage("")
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    console.log(evt.key)
    if (evt.key === "Enter") {
      handleClick()
    }
  }

  const getUsers = () => {
    if(connection) {
      connection.invoke("GetUSers")
    }
  }



  return (
    <div className=" h-screen p-4">
      <h1 className="text-2xl text-white">ChatApp</h1>
      <Button onClick={getUsers}>get users</Button>
      {messages.map((el, idx) => <p className="block rounded bg-slate-500 mb-2 p-4 text-white" key={idx}>{el}</p>)}

      <div className="flex items-center">
        <TextField value={message} onKeyDown={handleKeyDown} fullWidth={true} id="standard-basic" label="Your message" variant="standard" onChange={handleChange} />
        <Button variant="contained" className="whitespace-nowrap" onClick={handleClick}>Send Message</Button>
      </div>

    </div>
  )
}

export default App
