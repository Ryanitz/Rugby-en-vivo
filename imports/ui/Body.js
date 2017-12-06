import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AccountsUIWrapper from './accounts/AccountsUIWrapper.js';
import MatchList from './MatchList.js';
import Account from './accounts/Account.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const myMatches = <FontIcon className="material-icons">list</FontIcon>;
const matches = <FontIcon className="material-icons">live_tv</FontIcon>;
const user = <FontIcon className="material-icons">person</FontIcon>;

class Body extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if(window.location.pathname == "/MisPartidos") {
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
      <div className="body">
        <div className="container">
        {
          this.state.selectedIndex === 0 ? (
            <MatchList finished={true} text="No has creado ningún partido." user={this.props.currentUser} matches={this.props.myMatches}/>
          ) : this.state.selectedIndex === 1 ? (
            <MatchList finished={false} text="No hay partidos en este momento." user={this.props.currentUser} matches={this.props.matches}/>
          ) : this.state.selectedIndex === 2 ? (
            <Account />
          ) : ('Wrong page')
        }
        </div>
        <div className="bottom-nav">
          <MuiThemeProvider>
            <Paper zDepth={1}>
              <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem
                  label="MisPartidos"
                  icon={myMatches}
                  onClick={
                    () => {
                      this.select(0);
                      history.replaceState( {} , 'Mis partidos', '/MisPartidos' );
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
    );
  }
}

export default Body
