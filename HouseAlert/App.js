import React, { useContext, useEffect } from 'react'
import { LoginContext, LoginProvider } from './src/context/login-context'
import { PeopleProvider } from './src/context/people-context'
import HomeScreen from './src/screens/home-screen'
import LoginScreen from './src/screens/login-screen'

export default function App() {
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