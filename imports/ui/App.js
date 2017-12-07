import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import NavBar from './NavBar.js';
import Body from './Body.js';

import { Matches } from '../api/matches.js';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <NavBar />
        <Body currentUser={this.props.currentUser} started={this.props.started} finished={this.props.finished} notStarted={this.props.notStarted} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches');

  return {
    currentUser: Meteor.user(),
    myMatches: Matches.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
    started: Matches.find({started: true}, { sort: { createdAt: -1 } }).fetch(),
    notStarted: Matches.find({ status: "not started" }, { sort: { createdAt: -1 } }).fetch(),
    finished: Matches.find({ status: "finished" }, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
