import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Matches } from '../api/matches.js';

import TeamTabs from './TeamTabs.js';

// Task component - represents a single todo item
export default class MatchPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
    }
  }

  render() {
    const match = this.props.match;
    let finished = match.finished ? "Terminado" : "No ha terminado";
    let viewIcon = this.state.expand ? "expand_less" : "expand_more";
    return (
      <div id={this.props.match._id} className="match-preview col s12">
        <div className="match-preview-panel row card-panel indigo lighten-5 center-align hoverable">
          <span type="button" onClick={() => {this.setState({expand: !this.state.expand})}} className="grey-text darken-4 col s12 left-align">
            {match.startingTime}-{match.endingTime} ({finished})
            <i className="material-icons grey-text darken-4 right">{viewIcon}</i>
          </span>
          <span className="grey-text darken-4 flow-text">
            <p className="match-preview-text col s3 m4 left-align"><strong>{match.local.name}</strong></p>
            <p className="match-preview-text col s2 m1 center-align">{match.local.points}</p>
            <p className="match-preview-text col s2 m2 center-align">VS</p>
            <p className="match-preview-text col s2 m1 center-align">{match.visit.points}</p>
            <p className="match-preview-text col s3 m4 right-align"><strong>{match.visit.name}</strong></p>
          </span>
          {
            this.state.expand ? (
              <TeamTabs match={match}/>
            ) : ('')
          }
        </div>
      </div>
    );
  }
}
