import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1",
          id: 1
        },
        {
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2",
          id: 2,
        },
        {
          name: "Track 3",
          artist: "Artist 3",
          album: "Album 3",
          id: 3
         }
       ],
       playlistName: "My playlist",
       playlistTracks: [
         {
           name: "Playlist Track 1",
           artist: "Artist 1",
           album: "Album 1",
           id: 4
         },
         {
           name: "Playlist Track 2",
           artist: "Artist 2",
           album: "Album 2",
           id: 5,
         }
       ]
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
                           />
            <Playlist searchResults={this.state.searchResults}
                      playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
