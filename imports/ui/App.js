import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Matches } from '../api/matches.js';
import AccountsUIWrapper from './accounts/AccountsUIWrapper.js';
import MatchList from './MatchList.js';
import Account from './accounts/Account.js';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const finished = <FontIcon className="material-icons">flag</FontIcon>;
const matches = <FontIcon className="material-icons">live_tv</FontIcon>;
const user = <FontIcon className="material-icons">person</FontIcon>;


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 1,
    };
  }

  componentWillMount() {
    if(window.location.pathname == "/Finalizados") {
      this.setState({selectedIndex: 0});
    } else if(window.location.pathname == "/Cuenta") {
      this.setState({selectedIndex: 2});
    } else {
      this.setState({selectedIndex: 1});
    }
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Router>
        <div>
          {/* TODO:
            <NavBar />
            <Body />
            <BottomNavBar />
          */}
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo">Logo</a>
                <ul className="right hide-on-med-and-down">
                  <li><Link to={'/Partidos'}>Partidos</Link></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="body">
            <div className="container">
              {
                this.state.selectedIndex === 0 ? (
                  <MatchList finished={true} user={this.props.currentUser} matches={this.props.finished}/>
                ) : this.state.selectedIndex === 1 ? (
                  <MatchList finished={false} user={this.props.currentUser} matches={this.props.matches}/>
                ) : this.state.selectedIndex === 2 ? (
                  <Account />
                ) : ('Wrong page')
              }
              {/*<Switch>
                <Route exact path='/Partidos' render={(props) => ( <MatchList finished={false} user={this.props.currentUser} matches={this.props.matches}/> )} />
                <Route exact path='/Finalizados' render={(props) => ( <MatchList finished={true} user={this.props.currentUser} matches={this.props.finished}/> )} />
                <Route render={(props) => ( <MatchList user={this.props.currentUser}  matches={this.props.matches}/> )} />
              </Switch>
              */}
            </div>
          </div>
          <div className="bottom-nav">
            <MuiThemeProvider>
              <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                  <BottomNavigationItem
                    label="Finalizados"
                    icon={finished}
                    onClick={
                      () => {
                        this.select(0);
                        history.replaceState( {} , 'Finalizados', '/Finalizados' );
                      }
                    }
                  />
                  <BottomNavigationItem
                    label="Partidos"
                    icon={matches}
                    onClick={
                      () => {
                        this.select(1);
                        history.replaceState( {} , 'Partidos', '/Partidos' );
                      }
                    }
                  />
                  <BottomNavigationItem
                    label={this.props.currentUser ? this.props.currentUser.username : "Cuenta"}
                    icon={user}
                    onClick={
                      () => {
                        this.select(2);
                        history.replaceState( {} , 'Cuenta', '/Cuenta' );
                      }
                    }
                  />
                </BottomNavigation>
              </Paper>
            </MuiThemeProvider>
          </div>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches');

  return {
    finished: Matches.find({finished: true}, { sort: { createdAt: -1 } }).fetch(),
    matches: Matches.find({finished: false}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
