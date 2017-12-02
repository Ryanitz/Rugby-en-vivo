import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Matches } from '../api/matches.js';

// Task component - represents a single todo item
export default class MatchPreview extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const local = this.props.match.local;
    const visit = this.props.match.visit;
    return (
      <div className="match-preview">
        <strong>{ local.name }</strong> { local.points } - { visit.points } <strong>{ visit.name }</strong>
      </div>
    );
  }
}
