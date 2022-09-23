import { useRef, useCallback, useEffect } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import { socketInit } from "../socket"
import { ACTIONS } from "../actions"


export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({}) 
    const connections = useRef({})
    const localMediaStream = useRef(null)
    const socket = useRef(null)

    useEffect(() => {
        socket.current = socketInit()
    
      return () => {
        
      }
    }, [])
    

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );

            console.log('clients', clients, lookingFor);
            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );
    

    // Capture media 

    useEffect(() => {
      const startCapture = async () => {
        // Capturing local audio stream

        localMediaStream.current =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
            })
      } 

      startCapture().then(() => {
        addNewClient(user, () => {
            const localElement = audioElements.current[user.id]
            if (localElement) {
                localElement.volume = 0
                localElement.srcObject = localMediaStream.current
            }
            // socket emit JOIN
            socket.current.emit(ACTIONS.JOIN, {roomId, user})
        })
      })
    }, [])
    
    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    // setClients((prev) => {}, (state) => {

    // })

  return {clients, provideRef}
}