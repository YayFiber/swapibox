const callPeopleEndpoint = async () => {
  const response = await fetch('https://swapi.co/api/people')
  const peopleData = await response.json()
  const arrayOfPeople = await makePeopleObjects(peopleData.results)

  return arrayOfPeople 
}

const makePeopleObjects = async (peopleArray) => {
  const people = peopleArray.map(async person => {
    const species = await fetchSpecies(person.species)
    const homeworld = await fetchHomeworldData(person.homeworld)
    return {
      ...homeworld,
      species,
      name: person.name
    }
  })

  return Promise.all(people)
}

const fetchSpecies = async (speciesEndpoint) => {
  const speciesResponse = await fetch(speciesEndpoint)
  const species = await speciesResponse.json()
  return species.name
}

const fetchHomeworldData = async (homeworldEndpoint) => {
  const homeworldResponse = await fetch(homeworldEndpoint)
  const homeworld = await homeworldResponse.json()
  return {
    homeworld: homeworld.name,
    homeworldPop: homeworld.population
  }
}

export {
  callPeopleEndpoint
}