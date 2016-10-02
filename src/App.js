import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); // makes this a React component
    this.state = {
      text: '',
      addedPhoto: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAddPhoto = this.toggleAddPhoto.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  toggleAddPhoto() {
    this.setState({
      addedPhoto: !this.state.addedPhoto
    });
  }

  render() {
    const addedPhotoLength = this.state.text.length + (this.state.addedPhoto ? 20 : 0);
    return (
      <div className="well clearfix">
        <textarea
          onChange={this.handleChange}
          className="form-control"></textarea><br/>
        <span>
          {300 - addedPhotoLength} remaining characters.
        </span>
        <button
          className="btn btn-primary pull-right"
          onClick={this.toggleAddPhoto}>
          {this.state.addedPhoto ? "Added Photo" : "Add Photo"}
        </button>
        <button
          disabled={addedPhotoLength === 0 || addedPhotoLength > 300}
          className="btn btn-primary pull-right">Comment</button>
      </div>
    );
  }
}

export default App;
