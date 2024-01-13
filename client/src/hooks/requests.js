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
    console.log("fetchedLaunches: ", fetchedLaunches)
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    })
  } catch (error) {
    console.log(error)
  }
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    })
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete',
    })
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};