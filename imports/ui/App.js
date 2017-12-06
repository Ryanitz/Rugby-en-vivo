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
        <Body currentUser={this.props.currentUser} matches={this.props.matches} myMatches={this.props.myMatches} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches');

  return {
    currentUser: Meteor.user(),
    myMatches: Matches.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
    matches: Matches.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
