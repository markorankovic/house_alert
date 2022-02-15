import React, { useEffect, useState } from 'react'

export const PeopleContext = React.createContext()

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        const client = new WebSocket('ws://10.0.2.2:8082')

        client.addEventListener('open', () => {
            console.log('We are connected!')
        })
        
        client.addEventListener('message', message => {
            const people = JSON.parse(message.data)
            setPeople(people)
            console.log(people)
        })        
    }, [])

    return (
        <PeopleContext.Provider
            value={people}
        >
            {children}
        </PeopleContext.Provider>
    )
}