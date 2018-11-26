const clientID = "f9e87b59959d4119b791de8cb11adb35";
const redirectURI = "http://localhost:3000/";
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let access_token;


const Spotify = {

  getAccessToken() {
    if (access_token) {
      return access_token;
    }
    let url = window.location.href;
    const foundAccessToken = url.match(/access_token=([^&]*)/);
    const foundExpiresIn = url.match(/expires_in=([^&]*)/);

    if(foundAccessToken && foundExpiresIn) {
          access_token = foundAccessToken[1];
          let expires_in = Number(foundExpiresIn[1]);
          window.setTimeout(() => foundAccessToken = '', foundExpiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return access_token;
    }
    else {
      window.location = spotifyUrl;
      return access_token;
    }
  },

search(searchTerm) {
  const access_token = Spotify.getAccessToken();
  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
  return fetch(endpoint, {headers: {
    Authorization: `Bearer ${access_token}`
  }}).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if(!jsonResponse.tracks){
        return [];
      }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      // artist: track.artist[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  })
}

}

export default Spotify;
