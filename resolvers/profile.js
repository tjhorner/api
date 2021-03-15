const profile = require('../data/profile.json')

const birthday = new Date(profile.birthday * 1000)
const ONE_YEAR = 31556900000

module.exports = () => {
  return {
    ...profile,
    age: Math.floor((new Date() - birthday) / ONE_YEAR),

    project({ id }) {
      return profile.projects.find(p => p.id === id)
    }
  }
}