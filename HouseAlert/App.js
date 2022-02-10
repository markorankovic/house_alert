import React from 'react'
import { PeopleProvider } from './people-context';
import HomeScreen from './screens/home-screen'


export default function App() {
  return (
    <PeopleProvider>
      <HomeScreen />
    </PeopleProvider>
  );
}