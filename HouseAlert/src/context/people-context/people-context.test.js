import { fetchPeopleAsync } from './people-context'

test('Fetch people', async () => {
    const people = await fetchPeopleAsync({ protocol: "http", ip: "localhost", port: "3000" })
    expect(people.length).toBe(5)
})