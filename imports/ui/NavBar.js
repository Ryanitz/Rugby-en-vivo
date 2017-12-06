import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a className="center brand-logo">Logo</a>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar
