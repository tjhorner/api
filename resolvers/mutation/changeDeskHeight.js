const axios = require('axios').default
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const getCostForDelta = (delta) => {
  const abs = Math.abs(delta)
  return Math.round((Math.pow(abs, 2) + 1) * 100)
}

let lastRequest = 0

module.exports = async (_, { delta }) => {
  if (Math.abs(delta) < 0.1) {
    throw new Error("Delta must be at least 0.1 in either direction")
  }

  if (Math.abs(delta) > 25.6) {
    throw new Error("Delta must be less than 25.6 inches")
  }

  if (Date.now() - lastRequest < 10_000) {
    throw new Error("Cooldown in effect: wait at least 10 seconds before trying again")
  }

  const cost = getCostForDelta(delta)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cost,
    currency: "usd",
    description: `Change desk height by ${delta} inches`,
    automatic_payment_methods: {
      enabled: true
    },
    metadata: {
      delta
    }
  })

  return {
    cost,
    delta,
    paymentIntentClientSecret: paymentIntent.client_secret
  }

  // if (paymentIntent.status !== "succeeded") {
  //   throw new Error("The charge wasn't able to go through")
  // }

  // const { data: deskInfo } = await axios.get(`${process.env.HASS_BASE_URL}/api/states/input_number.standing_desk_target_height`, {
  //   headers: {
  //     "Authorization": `Bearer ${process.env.HASS_API_KEY}`
  //   }
  // })

  // const currentHeight = parseFloat(deskInfo.state)
  // const newHeight = clamp(currentHeight + delta, 25.2, 50.8)

  // lastRequest = Date.now()

  // const { data: newDeskInfo } = await axios.post(`${process.env.HASS_BASE_URL}/api/services/input_number/set_value`, {
  //   entity_id: "input_number.standing_desk_target_height",
  //   value: newHeight
  // }, {
  //   headers: {
  //     "Authorization": `Bearer ${process.env.HASS_API_KEY}`
  //   }
  // })

  // return {
  //   chargedAmount: cost,
  //   newTargetHeight: newHeight
  // }
}