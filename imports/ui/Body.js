import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AccountsUIWrapper from './accounts/AccountsUIWrapper.js';
import MatchList from './MatchList.js';
import Account from './accounts/Account.js';
import Loading from './Loading.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const myMatches = <FontIcon className="material-icons">list</FontIcon>;
const matches = <FontIcon className="material-icons">live_tv</FontIcon>;
const user = <FontIcon className="material-icons">person</FontIcon>;
const flag = <FontIcon className="material-icons">flag</FontIcon>;

class Body extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if(window.location.pathname == "/Finalizados") {
      this.setState({selectedIndex: 0});
    } else if(window.location.pathname == "/Partidos") {
      this.setState({selectedIndex: 2});
    }  else if(window.location.pathname == "/Cuenta") {
      this.setState({selectedIndex: 3});
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
          this.props.loading ? (
            <Loading />
          ) : (
            this.state.selectedIndex === 0 ? (
              <MatchList title="Finalizados" text="No se ha finalizado ningun partido." user={this.props.currentUser} matches={this.props.finished}/>
            ) : this.state.selectedIndex === 2 ? (
              <MatchList title="Sin empezar" text="No hay ningún partido sin empezar." user={this.props.currentUser} matches={this.props.notStarted}/>
            ) : this.state.selectedIndex === 1 ? (
              <MatchList title="En vivo" text="No hay partidos en vivo." user={this.props.currentUser} matches={this.props.started}/>
            ) : this.state.selectedIndex === 3 ? (
              <Account text="No has creado ningun partido." user={this.props.currentUser} matches={this.props.myMatches}/>
            ) : ('Wrong page')
          )
        }
        </div>
        <div className="bottom-nav">
          <MuiThemeProvider>
            <Paper zDepth={1}>
              <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem
                  label="Finalizados"
                  icon={flag}
                  onClick={
                    () => {
                      this.select(0);
                      history.replaceState( {} , 'Finalizados', '/Finalizados' );
                    }
                  }
                />
                <BottomNavigationItem
                  label="Vivo"
                  icon={matches}
                  onClick={
                    () => {
                      this.select(1);
                      history.replaceState( {} , 'Vivo', '/Vivo' );
                    }
                  }
                />
                <BottomNavigationItem
                  label="Partidos"
                  icon={myMatches}
                  onClick={
                    () => {
                      this.select(2);
                      history.replaceState( {} , 'Partidos', '/Partidos' );
                    }
                  }
                />
                <BottomNavigationItem
                  label={this.props.currentUser ? this.props.currentUser.profile.name : "Cuenta"}
                  icon={user}
                  onClick={
                    () => {
                      this.select(3);
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
