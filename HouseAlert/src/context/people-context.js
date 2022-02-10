import React from 'react'

export const PeopleContext = React.createContext()

export const PeopleProvider = ({ children }) => {
    return (
        <PeopleContext.Provider
            value={
                [
                    {id: 1, name: "Dad"},
                    {id: 2, name: "Mum"},
                    {id: 3, name: "Kat"},
                    {id: 4, name: "Tom"},
                    {id: 5, name: "Milan"}
                ]      
            }
        >
            {children}
        </PeopleContext.Provider>
    )
}