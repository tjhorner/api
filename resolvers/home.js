const axios = require('axios').default

module.exports = async () => {
  const { data: deskInfo } = await axios.get(`${process.env.HASS_BASE_URL}/api/states/sensor.standing_desk_height`, {
    headers: {
      "Authorization": `Bearer ${process.env.HASS_API_KEY}`
    }
  })

  return {
    deskHeight: parseFloat(deskInfo.state)
  }
}