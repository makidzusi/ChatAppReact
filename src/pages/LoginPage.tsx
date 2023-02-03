import { Button } from '@mui/material';
import {ChangeEvent, useState} from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState<String>("tom@gmail.com")
    const [password, setPassword] = useState<String>("11111");
    const navigate = useNavigate()

    const handleEmail = (evt : ChangeEvent<HTMLInputElement>) => {
        setEmail(evt.target.value)
    }
    const handlePwd = (evt : ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value)
    }

    const handleLogin = () => {
        fetch('http://localhost:5262/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: password,
                email: email,
            })
        }).then(async (res: any) => {
            const data = await res.json();
            localStorage.setItem('token', data.access_token)
            navigate('/')
        })
    }

    return (
        <div className="h-full bg-neutral-900 flex items-center justify-center">
            <form onSubmit={event => event.preventDefault()} className='flex flex-col gap-5 max-w-xl border-neutral-600 border border-solid rounded p-8'>
                <TextField label="Email" value={email} variant="outlined" onChange={handleEmail} />
                <TextField label="Password" value={password} variant="outlined" onChange={handlePwd} />
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
            </form>
        </div>
    )
}