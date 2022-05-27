import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PeopleContext } from './people-context'
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const NetworkContext = React.createContext()

export const NetworkProvider = ({children}) => {
    console.log('NetworkProvider')
    const [client, setClient] = useState(null)

    const peopleContext = useContext(PeopleContext)

    const [hostIP, setHostIP] = useState(null)

    useEffect(() => {
        messaging().onMessage((message) => {
            console.log("Remote message received: ", message)
            const notification = message.notification
            Alert.alert(notification.body)
        })
    }, [])

    function stop() {
        setHostIP(null)
    }

    function notify(from, to) {
        console.log("Notifying from id: ", from, "to id: ", to)
        client.send(JSON.stringify({type: 'notification', data: { from: from, to: to }}))
    }

    function register(id) {
        console.log('client: ', client)
        console.log('Registering with id: ', id)
        client.send(JSON.stringify({type: 'register', data: { id: id, client: client, deviceToken: global.deviceToken }}))
    }

    function triggerAlertNotification(name) {
    }

    async function disconnect() {
        client.close()
    }

    async function connect(to) {
        return new Promise(function (resolve, reject) {
            const addr = 'ws://' + to + ':6000'
            console.log(addr)
            const connection = new WebSocket(addr)

            connection.addEventListener('error', (ws, ev) => {
                console.log('Connection error: ', ev)
            })

            connection.addEventListener('open', () => {
                setHostIP(to)
                console.log('Connected to the server!')

                connection.addEventListener('close', () => {
                    console.log('Close')
                    setClient(null)
                })
                
                connection.addEventListener('message', message => {
                    const payload = JSON.parse(message.data)
                    switch (payload.type) {
                        case 'people': peopleContext.initPeople(payload.data.people); return
                        case 'notification': triggerAlertNotification(payload.data.from)
                    }
                })

                setClient(connection)
                return resolve(true)
            })    

            connection.addEventListener('error', () => {
                return reject('Failed to connect to server')
            })
        })
    }

    useEffect(() => {
        AsyncStorage.setItem('hostIP', hostIP)
        .then(() => {
            console.log('Saving host IP')
        })
        .catch(() => {
            console.log('Error saving host IP')
        })    
    }, [hostIP])

    return (
        <NetworkContext.Provider 
            value={
                {
                    hostIP: hostIP, 
                    setHostIP: setHostIP,
                    register: register, 
                    connected: client?.OPEN == 1, 
                    connect: connect, 
                    disconnect: disconnect,
                    notify: notify,
                    stop: stop,
                }
            }
        >
            {children}
        </NetworkContext.Provider>
    )
}