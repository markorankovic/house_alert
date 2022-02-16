import React, { useEffect, useState } from 'react'
import { Notifications } from 'react-native-notifications'

export const PeopleContext = React.createContext()

let client

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])

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

    useEffect(() => {
        client = new WebSocket('ws://10.0.2.2:8082')

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
    }, [])

    return (
        <PeopleContext.Provider
            value={{people: people, notify: notify, register: register}}
        >
            {children}
        </PeopleContext.Provider>
    )
}