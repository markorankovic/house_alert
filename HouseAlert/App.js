import React from 'react'
import { PeopleProvider } from './src/context/people-context';
import HomeScreen from './src/screens/home-screen'

export default function App() {
  return (
    <PeopleProvider>
      <HomeScreen />
    </PeopleProvider>
  );
}