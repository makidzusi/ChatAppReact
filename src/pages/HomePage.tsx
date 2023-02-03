import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount } from '../store/sliceReduces'
import { ButtonBase } from '@mui/material';
import { ChangeEvent, useEffect, useState, useRef, KeyboardEventHandler } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as SignalR from '@microsoft/signalr'

export default function HomePage() {
    const count = useSelector(selectCount)
    const msgs = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const handleIncr = () => {
        dispatch(increment())
    }
    const handleDecr = () => {
        dispatch(decrement())
    }
    const [message, setMessage] = useState<String>("");
    const [messages, setMessages] = useState<String[]>([])

    let [connection, setConnection] = useState<SignalR.HubConnection | null>(null);

    const latestChat = useRef<String[] | null>(null);

    latestChat.current = messages;


    useEffect(() => {
        let token: string = localStorage.getItem("token")!;
        console.log(token);
        const newConnection = new SignalR.HubConnectionBuilder()
            .withUrl('http://localhost:5262/chat', {
                accessTokenFactory: () => token
            })
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

                                setMessages(() => {
                                    return updatedChat
                                });
                                if (msgs.current && msgs.current.scrollTop) {

                                    msgs.current.scrollTop = msgs.current?.scrollHeight + 100

                                }

                            }

                        });
                    }

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, msgs]);


    const handleClick = () => {
        if (connection) {
            connection.invoke("Send", message, 'sam@gmail.com').then(() => {
                if (msgs.current && msgs.current.scrollTop) {

                    msgs.current.scrollTop = msgs.current?.scrollHeight + 100

                }
            })
            setMessage("")
        }
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value)

    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (evt) => {

        if (evt.key === "Enter") {
            handleClick()

        }

    }

    const chats = Array.from({ length: 100 }, (_, idx) => {
        return {
            name: `Chat ${idx}`,
            message: `Chat message ${idx}`,
            icon: 'icon',
            id: idx
        }
    })

    // const messages = Array.from({ length: 100}, (_,idx) => {
    //     return {
    //         text: `Message ${idx}`
    //     }
    // })

    return (
        <div className="h-full bg-neutral-900 flex">
            <div className="w-1/4 max-h-screen border-r-neutral-800 border-r hidden md:block">
                {/* <div className='p-2 shadow h-[8%]'>
                    <TextField fullWidth={true} variant="outlined" placeholder='Search' className="text-white rounded-full" />
                </div> */}
                <div className='p-2 overflow-auto h-full'>
                    {chats.map(el => <ButtonBase className='w-full' key={el.id}>
                        <div className='flex w-full hover:bg-neutral-600 rounded p-2 transition-all cursor-pointer'>
                            <div className='bg-red-500 h-12 w-12 rounded-full mr-2'>

                            </div>
                            <div className='flex flex-col items-start'>
                                <h3 className='text-white font-bold'>{el.name}</h3>
                                <p className='text-gray-400'>{el.message}</p>
                            </div>
                        </div>
                    </ButtonBase>)}
                </div>
            </div>
            <div className='md:w-3/4 h-full flex flex-col p-8 w-full'>
                <div className='h-full overflow-auto pb-4' ref={msgs}>
                    <div>
                        {messages.map((el, idx) => <div className='text-white text-xl w-fit rounded bg-purple-400 mb-2 p-2' key={idx}>{el}</div>)}
                    </div>
                </div>
                <TextField onKeyDown={handleKeyDown} value={message} onChange={handleChange} placeholder='Message' fullWidth={true} />
            </div>
        </div>
    );
}