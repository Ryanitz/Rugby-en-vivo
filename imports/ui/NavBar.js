import React, { Component } from 'react';

import AccountsUIWrapper from './accounts/AccountsUIWrapper'

class NavBar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a className="left brand-logo">Logo</a>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar
