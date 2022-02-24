import React, { useContext, useEffect, useState } from 'react'
import { Notifications } from 'react-native-notifications'
import { NetworkContext } from './network-context'

export const PeopleContext = React.createContext()

let client

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])
    const [connected, setConnected] = useState(false)

    const networkContext = useContext(NetworkContext)

    function notify(from, to) {
        console.log("Notifying from id: ", from, "to id: ", to)
        client.send(JSON.stringify({type: 'notification', data: { from: from, to: to }}))
    }

    function register(id) {
        console.log('Registering with id: ', id)
        client.send(JSON.stringify({type: 'register', data: {id: id, client: client}}))
    }

    function triggerAlertNotification(name) {
        Notifications.postLocalNotification({
            title: "",
            body: "You've got an alert from " + name,
        })
    }

    function initPeople(people) {
        setPeople(people)
    }

    async function disconnect() {
        client?.close()
    }

    async function connect(to = hostIP) {
        return new Promise(function (resolve, reject) {
            client = new WebSocket('ws://' + to + ':8082')
            networkContext.setHostIP(to)

            client.addEventListener('open', () => {
                console.log('Connected to the server!')
                setConnected(true)
                return resolve(true)
            })
    
            client.addEventListener('error', () => {
                return reject('Failed to connect to server')
            })

            client.addEventListener('close', () => {
                client = null
                setConnected(false)
            })
            
            client.addEventListener('message', message => {
                const payload = JSON.parse(message.data)
                switch (payload.type) {
                    case 'people': initPeople(payload.data.people); return
                    case 'notification': triggerAlertNotification(payload.data.from)
                }
            })
    
        })
    }

    return (
        <PeopleContext.Provider
            value={{people: people, notify: notify, register: register, connected: connected, connect: connect, disconnect: disconnect}}
        >
            {children}
        </PeopleContext.Provider>
    )
}