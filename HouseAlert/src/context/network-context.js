import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const NetworkContext = React.createContext()

export const NetworkProvider = ({children}) => {
    const [hostIP, setHostIP] = useState(null)

    useEffect(() => {
        if (hostIP) {
            return
        }
        AsyncStorage.getItem('hostIP').then((ip) => {
            setHostIP(ip)
        })
    }, [])

    useEffect(() => {
        AsyncStorage.setItem('hostIP', hostIP).then()
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