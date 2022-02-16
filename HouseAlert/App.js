import React, { useContext, useEffect } from 'react'
import { LoginContext, LoginProvider } from './src/context/login-context'
import { PeopleProvider } from './src/context/people-context'
import HomeScreen from './src/screens/home-screen'
import LoginScreen from './src/screens/login-screen'
import { Notifications } from 'react-native-notifications'

export default function App() {
  console.log('Notifications: ', Notifications)

  Notifications.registerRemoteNotifications()

  return (
    <PeopleProvider>
      <LoginProvider>
        <Content />
      </LoginProvider>
    </PeopleProvider>
  )
}

function Content() {
  const loginContext = useContext(LoginContext)

  return (
    loginContext.loggedIn ? <HomeScreen /> : <LoginScreen />
  )
}