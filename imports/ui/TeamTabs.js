import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Matches } from '../api/matches.js';

// Task component - represents a single todo item
export default class MatchPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'local'
    }
  }

  componentDidMount() {
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  render() {
    const match = this.props.match;
    let finished = match.finished ? "Terminado" : "No ha terminado";
    return (
      <div className="match-preview-expand row">
        <div className="points_panel col s12">
          <div className="col s12 m6">
            <a class="col s12 waves-effect waves-light btn">Try convertido (7 puntos)</a>
          </div>
          <div className="col s12 m6">
            <a class=" col s12 waves-effect waves-light btn">Quitar try convertido</a>
          </div>
          <a class="col s12 m6 waves-effect waves-light btn">Try (5 puntos)</a>
          <a class="col s12 m6 waves-effect waves-light btn">Quitar try</a>
          <a class="col s12 m6 waves-effect waves-light btn">Penal (3 puntos)</a>
          <a class="col s12 m6 waves-effect waves-light btn">Quitar Penal</a>
          <a class="col s12 m6 waves-effect waves-light btn">Drop (3 puntos)</a>
          <a class="col s12 m6 waves-effect waves-light btn">Quitar drop</a>
          <a className="col s12 waves-effect waves-light btn">Terminar partido</a>
        </div>
      </div>
    );
  }
}
