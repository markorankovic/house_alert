import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet, Button } from 'react-native'
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    function cancel() {
        networkContext.stop()
    }

    return (
        <View style={styles.container}>
            <Text>Lost connection to server, reconnecting...</Text>
            <Button title='Cancel' onPress={cancel} />
        </View>
    )
}