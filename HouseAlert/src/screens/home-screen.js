import React, { useContext, useEffect } from 'react'
import { FlatList, Button, View, Text, StyleSheet, Image } from 'react-native'
import { LoginContext } from '../context/login-context'
import { NetworkContext } from '../context/network-context'
import { PeopleContext } from '../context/people-context'

export default function HomeScreen() {
    const peopleContext = useContext(PeopleContext)
    const people = peopleContext.people
    const login = useContext(LoginContext)
    const network = useContext(NetworkContext)
    const notify = peopleContext.notify
    const register = peopleContext.register

    function logout() {
        login.logout()
    }

    useEffect(() => {
        if (login?.user?.id) {
            register(login.user.id)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>{'Welcome ' + login?.user?.name ?? "Test" + '!'}</Text>
            <Text>Who do you want to alert?</Text>
            <FlatList
                style={styles.list}
                data={people?.filter(person => person.id !== login.user.id) ?? []}
                renderItem={
                    ({item}) => (
                        <View>
                            <Image style={{width: 50, height: 50}} source={{uri: 'http://' + network.hostIP + ':3000/avatar/' + item.avatar}} />
                            <View style={styles.button}>
                                <Button
                                    title={item.name}
                                    onPress={
                                        () => {
                                            console.log("Alerting " + item.name)
                                            notify(login.user.id, item.id)
                                        }
                                    } 
                                />
                            </View>
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