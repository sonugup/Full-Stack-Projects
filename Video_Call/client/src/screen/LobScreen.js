import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useNavigate } from 'react-router-dom'
import   "./styles.css"

const LobScreen = () => {
    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const navigate=useNavigate();
    const socket = useSocket();
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        socket.emit("room:join", { email, room })
    }, [email, room, socket]);

    const handleJoinRoom =useCallback((data) => {
        const {email, room}=data;
        navigate(`/rooms/${room}`)
    },[navigate])

    useEffect(() => {
        socket.on("room:join",handleJoinRoom)
        return () => {
            socket.off("room:join", handleJoinRoom)
        }
    }, [socket, handleJoinRoom])


    return (
        <div className='form'>
            <h2>All Fild Required</h2>
            <form onSubmit={handleSubmit} className='form_in'>
                <input type='email' id='email' placeholder='Email ' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='text' id='room' placeholder='Room number' value={room} onChange={(e) => setRoom(e.target.value)} />
                <button>Join</button>
            </form>
        </div>
    )
}

export default LobScreen