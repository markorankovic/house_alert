import React, { useContext, useState } from 'react'
import { Button, View, TextInput, StyleSheet } from 'react-native'
import { LoginContext } from '../context/login-context'
import { Notifications } from 'react-native-notifications'

export default function LoginScreen() {
    const loginContext = useContext(LoginContext) 
    
    const [id, setID] = useState(null)

    console.log("Login screen")

    function login() {
        console.log("Login with ID: ", id)
        loginContext.login(id).then(res => console.log(res))
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