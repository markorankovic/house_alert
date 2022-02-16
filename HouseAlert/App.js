import React, { useContext, useState } from 'react'
import { LoginContext, LoginProvider } from './src/context/login-context'
import { PeopleProvider } from './src/context/people-context'
import HomeScreen from './src/screens/home-screen'
import LoginScreen from './src/screens/login-screen'
import { Notifications } from 'react-native-notifications'
import HostIPScreen from './src/screens/hostip-screen'
import { NetworkContext, NetworkProvider } from './src/context/network-context'

export default function App() {
  Notifications.registerRemoteNotifications()

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

  console.log(networkContext)

  return (
    networkContext.hostIP ? loginContext.loggedIn ? <HomeScreen /> : <LoginScreen /> : <HostIPScreen />
  )
}