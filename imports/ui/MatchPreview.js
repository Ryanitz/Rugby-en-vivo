import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Matches } from '../api/matches.js';

import ExpandTab from './ExpandTab.js';

// Task component - represents a single todo item
export default class MatchPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      render: true,
    }
  }

  toggleExpand() {
    let toggleExpand = !this.state.expand;

    this.setState({
      expand: toggleExpand,
    });
  }

  currentStatus() {
    switch(this.props.match.status) {
      case "not started":
        return "No empezó"
      case "first half":
        return "1er tiempo"
      case "halftime":
        return "Entretiempo"
      case "second half":
        return "2do tiempo"
      case "finished":
        return "Terminó el partido"
    }
  }

  removeMatch(matchId) {
    Meteor.call('matches.remove', this.props.match._id, this.props.match.owner);

    this.setState({
      render: false,
    });

    Materialize.toast('Partido borrado', 2000);
  }

  render() {
    const match = this.props.match;
    let status = this.currentStatus();
    let viewIcon = this.state.expand ? "expand_less" : "expand_more";

    return (
      this.state.render ? (
        <div id={match._id} className="match-preview col s12">
          <div className="match-preview-panel row card-panel indigo lighten-5 center-align">
            <span type="button" className="grey-text darken-4 col s12 left-align">
              {match.matchDate} {match.startingTime} {
                match.started ? (
                  <a className="live-text">VIVO</a>
                ) : ('')
              }
              {
                match.status === "finished" ? (
                  <i className="material-icons grey-text darken-4 end-flag">flag</i>
                ) : ('')
              }
              <i onClick={() => {this.toggleExpand()}} className="material-icons grey-text darken-4 right">{viewIcon}</i>
              {
                (window.location.pathname === "/Cuenta") ? (
                  <i onClick={() => {this.removeMatch()}} className="material-icons grey-text darken-4 right">delete</i>
                ) : ('')
              }
            </span>
            <span className="grey-text darken-4 flow-text">
              <p className="match-preview-text col s4 m5 left-align truncate"><strong>{match.local.name}</strong></p>
              <p className="match-preview-text col s4 m2 center-align">{match.local.points}  -  {match.visit.points}</p>
              <p className="match-preview-text col s4 m5 right-align truncate"><strong>{match.visit.name}</strong></p>
            </span>
            {
              this.state.expand ? (
                <ExpandTab user={this.props.user} match={match} timeline={match.timeline} />
              ) : ('')
            }
          </div>
        </div>
      ) : ('')
    );
  }
}
