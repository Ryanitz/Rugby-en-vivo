import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TimePicker from './TimePicker.js';
import AccountsUIWrapper from './accounts/AccountsUIWrapper.js';

import { Matches } from '../api/matches.js';

class CreateMatchCard extends Component {
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
        public: true
      };

      Meteor.call('matches.insert', match);

      Materialize.toast('Partido creado!', 4000);

      this.setState({
        local: '',
        visit: ''
      });
      document.getElementById("starting_time").value = '';
    } else {
      Materialize.toast('Complete todos los campos', 4000);
    }
  }

  render() {
    return (
      <Router>
        {
          !this.props.user ? (
            <div className="message col s12 card-panel indigo lighten-5 center-align hoverable flow-text">
              {/* <span className="grey-text darken-4">Inicie sesión para crear un partido.</span> */}
              <AccountsUIWrapper />
            </div>
          ) : (
            <div className="match-preview col s12 flow-text">
              <div className="match-preview-panel indigo lighten-5 row card-panel center-align ">
                <form className="col s12" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s3 left-align">
                      <TimePicker id="starting_time" />
                      <label htmlFor="starting_time" className="truncate">Hora de inicio</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field match-preview-text col s5 left-align">
                      <input id="local_team" placeholder="Equipo local" value={this.state.local} onChange={this.handleChange} type="text" className="validate" />
                      <label htmlFor="local_team">Equipo local</label>
                    </div>
                    <h4 className="match-preview-text col s2 center-align">-</h4>
                    <div className="input-field match-preview-text col s5 right-align">
                      <input id="visit_team" placeholder="Equipo visitante" value={this.state.visit} onChange={this.handleChange} type="text" className="validate" />
                      <label htmlFor="visit_team">Equipo visitante</label>
                    </div>
                  </div>
                  <button
                    className="col s12 btn waves-effect waves-light"
                    type="submit"
                  >
                    Crear partido<i className="material-icons right">send</i>
                  </button>
                </form>
              </div>
            </div>
          )
        }
      </Router>
    );
  }
}

export default CreateMatchCard
