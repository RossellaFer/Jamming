import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
		const name = e.target.value;
		this.props.onNameChange(name);
	}

	render() {
		return (
			<div className="Playlist">
  			  <input onChange={this.handleNameChange} defaultValue="My Playlist"/>
  			  <Tracklist tracks={this.props.playlistTracks}
										 onRemove={this.props.onRemove}
										 isRemoval={true}
					/>
  		      <a className="Playlist-save" onSave={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
			)
	}
}

export default Playlist;
