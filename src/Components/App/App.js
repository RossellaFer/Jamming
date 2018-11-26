import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // {
        //   name: "Track 1",
        //   artist: "Artist 1",
        //   album: "Album 1",
        //   id: 1
        // },
        // {
        //   name: "Track 2",
        //   artist: "Artist 2",
        //   album: "Album 2",
        //   id: 2,
        // },
        // {
        //   name: "Track 3",
        //   artist: "Artist 3",
        //   album: "Album 3",
        //   id: 3
        //  }
       ],
       playlistName: "My playlist",
       playlistTracks: [
         // {
         //   name: "Playlist Track 1",
         //   artist: "Artist 1",
         //   album: "Album 1",
         //   id: 4,
         //   uri: "spotify:track:0ynF2svLpsCqkfcWwG03eo"
         // },
         // {
         //   name: "Playlist Track 2",
         //   artist: "Artist 2",
         //   album: "Album 2",
         //   id: 5,
         //   uri: "spotify:track:6HIM6FrIlHYCoPlKkDtgXn"
         // }
       ]
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
  }
  else {
    //makes a copy of the playlist we have in the state and then assigns the value of playlistTracks to that playlist + the new track
    let copy = this.state.playlistTracks;
    this.setState({playlistTracks: [...copy, track]});
  }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    });
  }

// Function that takes the value of the input box [in the playlist component]
//and sets the state of the playlist name to this value
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
    return trackURIs;
  }

  search(term) {
    Spotify.search(term).then(
      searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
        {/*This displays the search results and allows the user to add to the playlist*/}
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
                           />
                           {/*This displays the playlist tracks and allows the user to remove songs from the playlist*/}
            <Playlist searchResults={this.state.searchResults}
                      playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
