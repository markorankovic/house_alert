import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { Button, View, TextInput, StyleSheet } from 'react-native'
import { LoginContext } from '../context/login-context'
import { NetworkContext } from '../context/network-context'

export default function LoginScreen() {
    const loginContext = useContext(LoginContext)
    const networkContext = useContext(NetworkContext)
    
    const [id, setID] = useState(null)

    console.log("Login screen")

    function login() {
        console.log("Login with ID: ", id)
        loginContext.login(id).then(res => console.log(res))
    }

    function changeHostIP() {
        AsyncStorage.removeItem('hostIP')
        networkContext.setHostIP(null)
        networkContext.disconnect()
    }

    return (
        <View style={styles.view}>
            <TextInput
                placeholder='ID'
                value={id ? id : ''}
                onChangeText={setID}
            />
            <Button 
                title='Login'
                onPress={login} 
            />
            <Button 
                title='Change Host IP'
                onPress={changeHostIP}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})