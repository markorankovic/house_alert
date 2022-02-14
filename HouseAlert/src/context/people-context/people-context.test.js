import { fetchPeopleAsync } from './people-context'

test('Fetch people', async () => {
    const people = await fetchPeopleAsync("localhost")
    expect(people.length).toBe(5)
})