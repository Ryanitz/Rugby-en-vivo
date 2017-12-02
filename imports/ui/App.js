import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Matches } from '../api/matches.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import MatchList from './MatchList.js';
import CreateMatch from './CreateMatch.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">Logo</a>
              <a data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><Link to={'/Partidos'}>Partidos</Link></li>
                <li><Link to={'/CrearPartido'}>Crear partido</Link></li>
                <li><a><AccountsUIWrapper /></a></li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><a><AccountsUIWrapper /></a></li>
                <li><Link to={'/Partidos'}>Partidos</Link></li>
                <li><Link to={'/CrearPartido'}>Crear partido</Link></li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Switch>
              <Route exact path='/' render={(props) => ( <MatchList matches={this.props.matches}/> )} />
              <Route exact path='/Partidos' render={(props) => ( <MatchList matches={this.props.matches}/> )} />
              <Route exact path='/CrearPartido' render={(props) => ( <CreateMatch user={this.props.currentUser}/> )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    matches: Matches.find({}, { sort: { finished: false, createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
