const axios = require('axios').default

const API_BASE = "https://ch.tetr.io/api"

const mapRecordData = record => {
  return {
    stream: record.stream,
    replayId: record.replay_id,
    ts: record.ts,
    endContext: {
      finalTime: record.endcontext.finalTime,
      inputs: record.endcontext.inputs,
      score: record.endcontext.score
    }
  }
}

module.exports = () => {
  return {
    async profile() {
      const { data } = await axios.get(`${API_BASE}/users/${process.env.TETRIO_USERNAME}`)
      const user = data.data.user
    
      return {
        username: user.username,
        verified: user.verified,
        xp: user.xp,
        supporter: user.supporter,
        supporterTier: user.supporter_tier,
        role: user.role,
        gamesPlayed: user.gamesplayed,
        gamesWon: user.gameswon,
        gameTime: user.gametime,
        friendCount: user.friend_count,
        country: user.country,
        bio: user.bio
      }
    },

    async league() {
      const { data } = await axios.get(`${API_BASE}/users/${process.env.TETRIO_USERNAME}`)
      const user = data.data.user

      return {
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
    },

    async records() {
      const { data } = await axios.get(`${API_BASE}/users/${process.env.TETRIO_USERNAME}/records`)
      const records = data.data.records
      const zen = data.data.zen

      return {
        fortyLines: {
          record: mapRecordData(records["40l"].record),
          rank: records["40l"].rank
        },
        blitz: {
          record: mapRecordData(records.blitz.record),
          rank: records.blitz.rank
        },
        zen: {
          level: zen.level,
          score: zen.score
        }
      }
    }
  }
}