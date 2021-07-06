const axios = require('axios').default

module.exports = async () => {
  const { data } = await axios.get(`https://ch.tetr.io/api/users/${process.env.TETRIO_USERNAME}`)

  const user = data.data.user

  return {
    username: user.username,
    verified: user.verified,
    xp: user.xp,
    supporter: user.supporter,
    role: user.role,
    gamesPlayed: user.gamesplayed,
    gamesWon: user.gameswon,
    gameTime: user.gametime,
    friendCount: user.friend_count,
    country: user.country,
    bio: user.bio,
    league: {
      apm: user.league.apm,
      decaying: user.league.decaying,
      gamesPlayed: user.league.gamesplayed,
      gamesWon: user.league.gameswon,
      glicko: user.league.glicko,
      nextAt: user.league.next_at,
      nextRank: user.league.next_rank,
      percentile: user.league.percentile,
      percentileRank: user.league.percentile_rank,
      pps: user.league.pps,
      prevAt: user.league.prev_at,
      prevRank: user.league.prev_rank,
      rank: user.league.rank,
      rating: user.league.rating,
      rd: user.league.rd,
      standing: user.league.standing,
      standingLocal: user.league.standing_local,
      vs: user.league.vs
    }
  }
}