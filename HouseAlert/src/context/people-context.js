import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const PeopleContext = React.createContext()

export async function fetchPeopleAsync(ip = "10.0.2.2") {
    return axios.get("http://" + ip + ":3000/people/")
    .then(people => {
        console.log("People: ", people.data)
        return people.data
    })
    .catch(error => console.log("Error: ", error))
}

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchPeopleAsync().then(people => {
            setPeople(people)
        })
    }, [])

    return (
        <PeopleContext.Provider value={people}>
            {children}
        </PeopleContext.Provider>
    )
}