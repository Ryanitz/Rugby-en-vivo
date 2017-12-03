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
    $('.button-collapse').sideNav(
      {
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
      }
    );
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
                {
                  this.props.currentUser ? (
                    <li><div className="user-view">
                      <div className="background">
                        <img src="http://materializecss.com/images/office.jpg" />
                      </div>
                      <a><img className="circle" src="http://materializecss.com/images/yuna.jpg" /></a>
                      <a><span className="white-text name">{ this.props.currentUser.username }</span></a>
                      <a><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div></li>
                  ) : ('')
                }
                <li><a><AccountsUIWrapper /></a></li>
                <li><Link to={'/Partidos'}>Partidos</Link></li>
                <li><Link to={'/CrearPartido'}>Crear partido</Link></li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Switch>
              <Route exact path='/Partidos' render={(props) => ( <MatchList user={this.props.currentUser} matches={this.props.matches}/> )} />
              <Route exact path='/CrearPartido' render={(props) => ( <CreateMatch user={this.props.currentUser}/> )} />
              <Route render={(props) => ( <MatchList user={this.props.currentUser}  matches={this.props.matches}/> )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches');

  return {
    matches: Matches.find({}, { sort: { finished: false, createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
