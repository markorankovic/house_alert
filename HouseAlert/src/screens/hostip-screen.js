import React, { useContext, useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { NetworkContext } from '../context/network-context'

export default function HostIPScreen() {
    const [ip, setIP] = useState('')

    const networkContext = useContext(NetworkContext)

    function setHostIP() {
        console.log(ip)
        networkContext.setHostIP(ip)
    }

    return (
        <View>
            <TextInput placeholder='Type in the host IP address' value={ip} onChangeText={setIP} />
            <Button title='Continue' onPress={setHostIP} />
        </View>
    )
}