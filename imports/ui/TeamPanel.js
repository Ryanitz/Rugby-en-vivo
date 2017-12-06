import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Matches } from '../api/matches.js';

// Task component - represents a single todo item
export default class TeamPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateMatch: ''
    };
  }

  componentDidMount() {
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  updateStatus() {
    if (!this.props.user) {
      Materialize.toast('Usuario no logueado', 4000);
    } else {
      let newStatus = this.nextStatus();
      let translateStatus = this.currentStatus(newStatus);

      const date = new Date();
      const time = date.getHours() * 60 + date.getMinutes();

      const newEvent = {
        id: this.props.match.timeline.length + 1,
        actuate: 'time',
        action: translateStatus,
        time: time
      };

      Meteor.call('matches.setStatus', this.props.match._id, newStatus, newEvent);

      Materialize.toast(translateStatus, 4000);
    }

  }

  updateMatch(action, points, team, side) {
    if (!this.props.user) {
      Materialize.toast('Usuario no logueado', 4000);
    } else {
      let update = action + " " + team;
      this.setState({
        updateMatch: update
      });

      const date = new Date();
      const time = date.getHours() * 60 + date.getMinutes();

      const newEvent = {
        id: this.props.match.timeline.length + 1,
        actuate: side,
        action: action,
        time: time
      };

      if (this.props.match.local.name == team) {
        let newPoints = this.props.match.local.points + points;
        Meteor.call('matches.setPointsLocal', this.props.match._id, newPoints, newEvent);
      } else if (this.props.match.visit.name == team) {
        let newPoints = this.props.match.visit.points + points;
        Meteor.call('matches.setPointsVisit', this.props.match._id, newPoints, newEvent);
      }
      Materialize.toast(update, 4000);
    }
  }

  currentStatus(status) {
    switch(status) {
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
  buttonStatus() {
    switch(this.props.match.status) {
      case "not started":
        return "Empezar partido"
      case "first half":
        return "Terminar 1er tiempo"
      case "halftime":
        return "Empezar 2do tiempo"
      case "second half":
        return "Terminar partido"
    }
  }
  nextStatus() {
    switch(this.props.match.status) {
      case "not started":
        return "first half"
      case "first half":
        return "halftime"
      case "halftime":
        return "second half"
      case "second half":
        return "finished"
    }
  }

  render() {
    const match = this.props.match;

    return (
      <div className="match-preview-expand">
        <div className="points_panel col s12">
          <div className="col s12">
            <a onClick={() => {this.updateStatus()}} className="col s12 waves-effect waves-light btn">{this.buttonStatus()}</a>
          </div>
          {
            (this.props.match.status == 'first half' || this.props.match.status == 'second half') ? (
              <div>
                <div className="local-panel col s12 m6">
                  <a onClick={() => {this.updateMatch("Try", 5, match.local.name, "local")}} className="col s12 waves-effect waves-light btn">Try {match.local.name}</a>
                  {
                    this.state.updateMatch == "Try " + match.local.name ? (
                      <a onClick={() => {this.updateMatch("Conversion", 2, match.local.name, "local")}} className="col s12 waves-effect waves-light btn">Conversion {match.local.name}</a>
                    ) : ('')
                  }
                  <a onClick={() => {this.updateMatch("Penal", 3, match.local.name, "local")}} className="col s12 waves-effect waves-light btn">Penal {match.local.name}</a>
                  <a onClick={() => {this.updateMatch("Drop", 3, match.local.name, "local")}} className="col s12 waves-effect waves-light btn">Drop {match.local.name}</a>
                </div>
                <div className="visit-panel col s12 m6">
                  <a onClick={() => {this.updateMatch("Try", 5, match.visit.name, "visit")}} className="col s12 waves-effect waves-light btn">Try {match.visit.name}</a>
                  {
                    this.state.updateMatch == "Try " + match.visit.name ? (
                      <a onClick={() => {this.updateMatch("Conversion", 2, match.visit.name, "visit")}} className="col s12 waves-effect waves-light btn">Conversion {match.visit.name}</a>
                    ) : ('')
                  }
                  <a onClick={() => {this.updateMatch("Penal", 3, match.visit.name, "visit")}} className="col s12 waves-effect waves-light btn">Penal {match.visit.name}</a>
                  <a onClick={() => {this.updateMatch("Drop", 3, match.visit.name, "visit")}} className="col s12 waves-effect waves-light btn">Drop {match.visit.name}</a>
                </div>
              </div>
            ) : ('')
          }
        </div>
      </div>
    );
  }
}
