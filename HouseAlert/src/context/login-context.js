import React, { useContext, useState } from 'react'
import { PeopleContext } from './people-context'

export const LoginContext = React.createContext()

export const LoginProvider = ({children}) => {
    const [state, setState] = useState(null)

    const people = useContext(PeopleContext)

    async function login(id) {
        return new Promise(function(resolve, reject) {
            people.forEach(person => {
                if (person.id == id) {
                    setState({
                        user: {
                            id: person.id,
                            name: person.name
                        }
                    })
                    resolve("Login success")
                }
            })
            reject("Login failure")
        })
    }

    function logout() {
        console.log("Logout called")
        setState(null)
    }

    return (
        <LoginContext.Provider 
            value={
                { 
                    user: state ? state.user : null, 
                    loggedIn: state != null, 
                    login: login, 
                    logout: logout
                }
            }
        >
            {children}
        </LoginContext.Provider>
    )
}