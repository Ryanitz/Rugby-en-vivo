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
        <Body
          loading={this.props.loading}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const matchesHandle = Meteor.subscribe('matches');
  const loading = !matchesHandle.ready();

  return {
    loading,
    currentUser: Meteor.user(),
  };
})(App);
