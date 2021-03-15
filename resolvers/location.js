const axios = require('axios').default

module.exports = async () => {
  const { data } = await axios.get(`${process.env.WHEREIS_BASE_URL}/api/v1/location`)

  return {
    at: data.at,
    coarseLocation: data.coarse_location,
    searchQuery: data.search_query,
    battery: data.battery
  }
}