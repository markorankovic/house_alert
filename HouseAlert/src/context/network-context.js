import React, { useState } from 'react'

export const NetworkContext = React.createContext()

export const NetworkProvider = ({children}) => {
    const [hostIP, setHostIP] = useState(null)

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