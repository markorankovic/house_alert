import React from 'react'
import TestRenderer from 'react-test-renderer'
import HomeScreen from "../src/screens/home-screen"

test('Renders correctly', () => {
    const tree = TestRenderer.create(<HomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
})