import React, { useContext, useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { PeopleContext } from '../context/people-context'

export default function HostIPScreen() {
    const [ip, setIP] = useState('')

    const peopleContext = useContext(PeopleContext)

    function connectToIP() {
        console.log(ip)
        peopleContext.connect(ip)
    }

    return (
        <View style={styles.view}>
            <TextInput placeholder='Type in the host IP address' value={ip} onChangeText={setIP} />
            <Button title='Continue' onPress={connectToIP} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})