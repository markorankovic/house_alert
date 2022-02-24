import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const NetworkContext = React.createContext()

export const NetworkProvider = ({children}) => {
    const [hostIP, setHostIP] = useState(null)

    useEffect(() => {
        AsyncStorage.setItem('hostIP', hostIP)
        .then(() => {
            console.log('Saving host IP')
        })
        .catch(() => {
            console.log('Error saving host IP')
        })    
    }, [hostIP])

    return (
        <NetworkContext.Provider 
            value={
                {
                    hostIP: hostIP, 
                    setHostIP: setHostIP
                }
            }
        >
            {children}
        </NetworkContext.Provider>
    )
}