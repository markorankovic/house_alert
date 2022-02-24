import React, { useContext, useEffect } from 'react'
import { LoginContext, LoginProvider } from './src/context/login-context'
import { PeopleContext, PeopleProvider } from './src/context/people-context'
import HomeScreen from './src/screens/home-screen'
import LoginScreen from './src/screens/login-screen'
import { Notifications } from 'react-native-notifications'
import HostIPScreen from './src/screens/hostip-screen'
import { NetworkContext, NetworkProvider } from './src/context/network-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReconnectScreen from './src/screens/reconnect-screen'

export default function App() {
  Notifications.registerRemoteNotifications({
    notificationCenter: true,
    lockScreen: true
  })

  return (
    <NetworkProvider>
      <PeopleProvider>
        <LoginProvider>
          <Content />
        </LoginProvider>
      </PeopleProvider>
    </NetworkProvider>
  )
}

function Content() {
  const loginContext = useContext(LoginContext)
  const networkContext = useContext(NetworkContext)
  const peopleContext = useContext(PeopleContext)

  console.log(networkContext)

  useEffect(() => {
    console.log('Run once')
    AsyncStorage.getItem('hostIP')
    .then((ip) => {
        networkContext.setHostIP(ip)
    })
  }, [])

  useEffect(() => {
    if (loginContext.loggedIn) {
      return
    }
    AsyncStorage.getItem('id')
    .then((id) => {
        console.log('ID: ', id)
        loginContext.login(id).then(() => {
            console.log('Logging in with cache')
        }).catch(error => console.log('Error logging in: ', error))
    })
    .catch(() => {
      console.log('No ID to log in with')
    })  
  }, [peopleContext.connected, peopleContext.people])

  function getScreen() {
    if (peopleContext.connected) {
      if (loginContext.loggedIn) {
        return <HomeScreen />
      } else {
        return <LoginScreen />
      } 
    } else {
      if (networkContext.hostIP) {
        return <ReconnectScreen />  
      } else {
        return <HostIPScreen />
      }
    }
  }

  return getScreen()
}