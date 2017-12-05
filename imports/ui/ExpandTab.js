import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Matches } from '../api/matches.js';

import TeamPanel from './TeamPanel.js';
import Timeline from './Timeline.js';

// Task component - represents a single todo item
export default class ExpandTab extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  render() {
    const match = this.props.match;

    return (
      <div className="row">
        <div className="col s12">
          <ul className="match-preview-tabs tabs tabs-fixed-width">
            <li className="tab col s3"><a className="active" href={"#panel_" + match._id}>Panel</a></li>
            <li className="tab col s3"><a href={"#timeline_" + match._id}>Timeline</a></li>
          </ul>
        </div>
        <div id={"panel_" + match._id} className="col s12">
        {
          match.status !== 'finished' ? (
            <TeamPanel user={this.props.user} match={match}/>
          ) : (
            <div className="row">
              <div className="col s12">
                <div className="card-panel indigo lighten-5 center-align hoverable flow-text">
                  <span className="grey-text darken-4">El partido ya terminó.</span>
                </div>
              </div>
            </div>
          )
        }
        </div>
        <div id={"timeline_" + match._id} className="col s12">
        {
          match.status !== 'not started' ? (
            <Timeline timeline={match.timeline} />
          ) : (
            <div className="row">
              <div className="col s12">
                <div className="card-panel indigo lighten-5 center-align hoverable flow-text">
                  <span className="grey-text darken-4">El partido no empezó.</span>
                </div>
              </div>
            </div>
          )
        }
        </div>
      </div>
    );
  }
}
