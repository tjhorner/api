const Spotify = require('spotify-web-api-node')

const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
})

const refreshAccessToken = () => {
  spotify.refreshAccessToken((err, res) => {
    if(!err) spotify.setAccessToken(res.body.access_token)
    if(err) console.error(err)
  })
}

setInterval(() => {
  refreshAccessToken()
}, 1800000) // 30 minutes

refreshAccessToken()

const mapArtist = artist => {
  return {
    name: artist.name,
    link: artist.external_urls.spotify
  }
}

module.exports = async () => {
  const { body: playbackState } = await spotify.getMyCurrentPlaybackState()

  const response = {
    isPlaying: playbackState.is_playing || false
  }

  if (playbackState.is_playing) {
    response.track = {
      title: playbackState.item.name,
      artists: playbackState.item.artists.map(mapArtist),
      duration: playbackState.item.duration_ms,
      link: playbackState.item.external_urls.spotify,
      previewUrl: playbackState.item.preview_url
    }

    response.album = playbackState.item.album ? {
      title: playbackState.item.album.name,
      artists: playbackState.item.album.artists.map(mapArtist),
      link: playbackState.item.album.external_urls.spotify,
      imageUrl: playbackState.item.album.images[0].url
    } : { }

    response.state = {
      shuffle: playbackState.shuffle_state,
      repeat: playbackState.repeat_state.toUpperCase(),
      progress: playbackState.progress_ms
    }
  }
  
  return response
}