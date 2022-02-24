import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useContext, useState } from 'react'
import { PeopleContext } from './people-context'

export const LoginContext = React.createContext()

export const LoginProvider = ({children}) => {
    const [state, setState] = useState(null)

    const peopleContext = useContext(PeopleContext)

    const people = peopleContext.people

    useEffect(() => {
        if (!state?.user?.id) {
            return
        }
        AsyncStorage.setItem('id', '' + state.user.id)
        .then(() => {
            console.log('Saving ID')
        })
        .catch(() => {
            console.log('Error saving ID')
        })
    }, [state])

    async function login(id) {
        return new Promise(function(resolve, reject) {
            if (!peopleContext.connected) {
                console.log('Error login: Not connected')
                return reject(reason => console.log("Login failure: " + reason))
            }
            console.log('people: ', people)
            people.forEach(person => {
                if (person.id == id) {
                    setState({
                        user: {
                            id: person.id,
                            name: person.name,
                            connected: peopleContext.connected
                        }
                    })
                    return resolve("Login success")
                }
            })
            return reject(reason => console.log("Login failure: " + reason))
        })
    }

    function logout() {
        console.log("Logout called")
        AsyncStorage.removeItem('id')
        .then(() => {
            console.log('Deleting ID')
        })
        .catch(error => {
            console.log('Failed to delete ID: ', error)
        })
        setState(null)
    }

    return (
        <LoginContext.Provider 
            value={
                { 
                    user: state ? state.user : null, 
                    loggedIn: state != null && peopleContext.connected, 
                    login: login, 
                    logout: logout
                }
            }
        >
            {children}
        </LoginContext.Provider>
    )
}