import React, { useContext, useState } from 'react'
import { PeopleContext } from './people-context'

export const LoginContext = React.createContext()

export const LoginProvider = ({children}) => {
    const [state, setState] = useState(null)

    const peopleContext = useContext(PeopleContext)

    const people = peopleContext.people

    async function login(id) {
        return new Promise(function(resolve, reject) {
            const connected = peopleContext.connected()
            if (!connected) {
                return reject("Login failure")
            }
            people.forEach(person => {
                if (person.id == id) {
                    setState({
                        user: {
                            id: person.id,
                            name: person.name,
                            connected: connected
                        }
                    })
                    return resolve("Login success")
                }
            })
            return reject("Login failure")
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
                    loggedIn: state != null && peopleContext.connected(), 
                    login: login, 
                    logout: logout
                }
            }
        >
            {children}
        </LoginContext.Provider>
    )
}