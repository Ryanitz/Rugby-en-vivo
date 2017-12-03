import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TimePicker from './TimePicker';
import { Matches } from '../api/matches.js';

class CreateMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      local: '',
      visit: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.id == "local_team") {
      this.setState({local: event.target.value});
    } else if(event.target.id == "visit_team") {
      this.setState({visit: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.user && this.state.local != "" && this.state.visit != ""){
      const match = {
        local: this.state.local,
        visit: this.state.visit,
        startingTime: document.getElementById("starting_time").value,
        endingTime: document.getElementById("ending_time").value,
        public: true,
      };

      Meteor.call('matches.insert', match);

      Materialize.toast('Partido creado!', 4000);

      window.location.pathname = "/Partidos";
    } else {
      Materialize.toast('Complete todos los campos', 4000);
    }
  }

  render() {
    return (
      <Router>
        {
          !this.props.user ? (
            <div className="row">
              <div className="col s12">
                <div className="card-panel indigo lighten-5 center-align hoverable flow-text">
                  <span className="grey-text darken-4">Inicie sesión para crear un partido.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <input id="local_team" value={this.state.local} onChange={this.handleChange} type="text" className="validate" />
                    <label htmlFor="local_team">Equipo local</label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input id="visit_team" value={this.state.visit} onChange={this.handleChange} type="text" className="validate" />
                    <label htmlFor="visit_team">Equipo visitante</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <TimePicker id="starting_time" />
                    <label htmlFor="starting_time">Hora de inicio</label>
                  </div>
                  <div className="input-field col s12 m6">
                    <TimePicker id="ending_time" />
                    <label htmlFor="ending_time">Hora estimada de fin</label>
                  </div>
                </div>
                <div className="row">
                  <button
                    className="col s12 m3 offset-m9 btn waves-effect waves-light"
                    type="submit"
                  >
                    Crear partido<i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          )
        }
      </Router>
    );
  }
}

export default CreateMatch
