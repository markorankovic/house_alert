import React, { useContext, useEffect } from "react"
import { View, Text } from 'react-native'
import { NetworkContext } from "../context/network-context"

export default function ReconnectScreen() {
    const networkContext = useContext(NetworkContext)

    async function reconnect() {
        console.log("Reconnecting with: ", networkContext.hostIP)
        await networkContext.connect(networkContext.hostIP)
        .then(() => {
            console.log('Reconnection success')
        })
        .catch(() => {
            console.log("Reconnecting")
            reconnect()
        })
    }

    useEffect(() => {
        reconnect()
    }, [])

    return (
        <View>
            <Text>Lost connection to server, reconnecting...</Text>
        </View>
    )
}