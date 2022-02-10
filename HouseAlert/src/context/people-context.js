import React from 'react'

export const PeopleContext = React.createContext()

export const PeopleProvider = ({ children }) => {
    const people = require("../../mockPeople.json").people
    return (
        <PeopleContext.Provider value={people}>
            {children}
        </PeopleContext.Provider>
    )
}