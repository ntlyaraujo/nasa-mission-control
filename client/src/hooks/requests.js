const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  // Load planets and return as JSON.
  try {
    const response = await fetch(`${API_URL}/planets`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }

}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  try {
    const response = await fetch(`${API_URL}/launches`)
    const fetchedLaunches = await response.json()
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    })
  } catch (error) {
    console.log(error)
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};