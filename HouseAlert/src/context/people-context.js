import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const PeopleContext = React.createContext()

export async function fetchPeopleAsync(header = { protocol: "http", ip: "10.0.2.2", port: "3000" }) {
    const baseURL = header.protocol + "://" + header.ip + ":" + header.port
    return axios.get(baseURL + "/people/")
    .then(res => {
        console.log("People: ", res.data.people)
        return res.data.people
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
        <PeopleContext.Provider
            value={people}
        >
            {children}
        </PeopleContext.Provider>
    )
}