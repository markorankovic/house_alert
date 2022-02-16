import React, { useContext, useEffect, useState } from 'react'
import { Notifications } from 'react-native-notifications'
import { NetworkContext } from './network-context'

export const PeopleContext = React.createContext()

let client

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])

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

    function connected() {
        if (!client) {
            return false
        }
        return client.readyState === WebSocket.OPEN
    }

    function initPeople(people) {
        setPeople(people)
    }

    useEffect(() => {
        if (!networkContext.hostIP) {
            client?.close()
            client = null
            return
        }

        console.log('networkContext.hostIP: ', networkContext.hostIP)

        client = new WebSocket('ws://' + networkContext.hostIP + ':8082')

        client.addEventListener('open', () => {
            console.log('Connected to the server!')
        })
        
        client.addEventListener('message', message => {
            const payload = JSON.parse(message.data)
            switch (payload.type) {
                case 'people': initPeople(payload.data.people); return
                case 'notification': triggerAlertNotification(payload.data.from)
            }
        })        
    }, [networkContext.hostIP])

    return (
        <PeopleContext.Provider
            value={{people: people, notify: notify, register: register, connected: connected}}
        >
            {children}
        </PeopleContext.Provider>
    )
}