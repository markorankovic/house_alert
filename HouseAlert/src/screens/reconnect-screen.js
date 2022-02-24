import React, { useContext, useEffect } from "react"
import { View, Text } from 'react-native'
import { NetworkContext } from "../context/network-context"
import { PeopleContext } from "../context/people-context"

export default function ReconnectScreen() {
    const peopleContext = useContext(PeopleContext)
    const networkContext = useContext(NetworkContext)


    async function reconnect() {
        await peopleContext.connect(networkContext.hostIP).catch(() => {
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