import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { useSocket } from '../context/SocketProvider';
import Peere from '../servises/Peere';

const Rooms = () => {
    const socket = useSocket();

    const [remoteId, setRemteId] = useState(null)
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemotStream] = useState()
    const handleUserJoin = useCallback(({ email, id }) => {
        console.log(`email ${email} joined `)
        setRemteId(id)
    }, [])

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: true 
        })
        const offer= await Peere.gitOffer();
        socket.emit("user:call", {to: remoteId, offer})
        setMyStream(stream)
    }, [remoteId, socket])
    const handleIncommingCalld =useCallback(async ({from, offer}) => {
        setRemteId(from)
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: true 
        })
        setMyStream(stream)
        console.log(`incomming call `, from , offer)
        const ans= await Peere.getAnswer(offer);
        socket.emit("call:accepted", {to: from, ans})
    }, [socket])

    const sendStream=useCallback(() => {
        for(const track of myStream.getTracks()) {
            Peere.peer.addTrack(track, myStream)
        }
    },[myStream])
    const handleCallAccepted=useCallback( async ({from,ans}) => {
        Peere.setLocalDescription(ans)
        console.log("call Accepted")
       sendStream()
    }, [sendStream])

    const handleNegotiationneeded = useCallback( async () => {
        const offer=await Peere.gitOffer();
        socket.emit("peer:nego:needed", {offer, to:remoteId});
    }, [remoteId, socket])
    useEffect(() => {
        Peere.peer.addEventListener("negotiationneeded", handleNegotiationneeded)
        return () => {
            Peere.peer.removeEventListener("negotiationneeded", handleNegotiationneeded);
        };
    },[handleNegotiationneeded])

    const handleNegotiationIncomming = useCallback( async ({from, offer}) => {
        const ans =await Peere.getAnswer(offer);
        socket.emit("peer:nego:done", {to:from, ans});
    },[socket])

    const handleNegotiationFinal =useCallback(async ({ans}) => {
        await Peere.setLocalDescription(ans)
    },[])
    useEffect(() => {
        Peere.peer.addEventListener("track", async ev => {
            const remoteStream=ev.streams
            console.log("got Track")
            setRemotStream(remoteStream[0])
        })
    },[])
    useEffect(() => {
        socket.on("user:joined", handleUserJoin)
        socket.on("incomming:call", handleIncommingCalld)
        socket.on("call:accepted", handleCallAccepted)
        socket.on("peer:nego:needed", handleNegotiationIncomming)
        socket.on("peer:nego:final", handleNegotiationFinal)
        
        return () => {
            socket.off("user:joined", handleUserJoin)
            socket.off("incomming:call", handleIncommingCalld)
            socket.off("call:accepted", handleCallAccepted)
            socket.off("peer:nego:needed", handleNegotiationIncomming)
            socket.off("peer:nego:final", handleNegotiationFinal)
        }
    }, [socket, handleUserJoin, handleIncommingCalld, handleCallAccepted,handleNegotiationFinal,handleNegotiationIncomming])
    return (
        <div style={{background:"black", width:"100%", margin:"auto", height:"100vh"}}>
            <h4>
                {
                    remoteId ? "Connected" : "No one in Room"
                }
            </h4>
            <h3>
                {
                    myStream && <button onClick={sendStream}>Send stream</button>
                }
                {remoteId && <button onClick={handleCallUser}>call user</button>}
                <div style={{display:'flex'}}>

                <div style={{margin:"auto"}}>

                
                {
                    myStream && (
                        <>
                        <h2>my video</h2>
                        <ReactPlayer playing muted width="600px" height="450px" margin="center" url={myStream} />

                        </>
                    )
                }
                </div>
                <div style={{margin:"auto"}}>
                {
                     remoteStream && (
                        <>
                        <h2>remote video</h2>
                        <ReactPlayer playing muted width="600px" height="450px" margin="5%" url={remoteStream} />

                        </>
                    )
                }
                </div>
                </div>
            </h3>
            
        </div>
    )
}

export default Rooms;