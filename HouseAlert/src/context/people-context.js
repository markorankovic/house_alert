import React, { useState } from 'react'
export const PeopleContext = React.createContext()

export const PeopleProvider = ({ children }) => {

    const [people, setPeople] = useState([])

    function initPeople(people) {
        setPeople(people)
    }

    return (
        <PeopleContext.Provider
            value={{people: people, initPeople: initPeople}}
        >
            {children}
        </PeopleContext.Provider>
    )
}