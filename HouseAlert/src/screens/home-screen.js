import React, { useContext } from 'react'
import { FlatList, Button, View, Text, StyleSheet } from 'react-native'
import { LoginContext } from '../context/login-context'
import { PeopleContext } from '../context/people-context'

export default function HomeScreen() {
    const people = useContext(PeopleContext)
    const login = useContext(LoginContext)

    function logout() {
        login.logout()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>{'Welcome ' + login.user.name + '!'}</Text>
            <Text>Who do you want to alert?</Text>
            <FlatList
                style={styles.list}
                data={people.filter(person => person.id !== login.user.id)}
                renderItem={
                    ({item}) => (
                        <View style={styles.button}>
                            <Button
                                title={item.name}
                                onPress={
                                    () => {
                                        console.log("Alerting " + item.name)
                                    }
                                } 
                            />
                        </View>
                    )
                }
            />
            <Button 
                title='Log Out'
                onPress={logout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
        flexGrow: 0,
        padding: 100
    },
    button: {
        paddingBottom: 10,
    },
    welcome: {
        fontSize: 30,
        paddingBottom: 10
    }
  })