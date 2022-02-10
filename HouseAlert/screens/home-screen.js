import React, { useContext } from 'react'
import { FlatList, Button, View, Text, StyleSheet } from 'react-native';
import { PeopleContext } from '../people-context'

export default function HomeScreen() {
    const people = useContext(PeopleContext)

    return (
        <View style={styles.container}>
            <Text>Who do you want to alert?</Text>
            <FlatList
                style={styles.list}
                data={people}
                renderItem={
                    ({item}) => (
                        <Button 
                            title={item.name}
                            onPress={
                                () => {
                                    console.log("Alerting " + item.name)
                                }
                            } 
                        />        
                    )
                }
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
    }
  });