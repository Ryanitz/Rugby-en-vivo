import React, { Component } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import MatchList from '../MatchList.js';

class Account extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className="row row-fixed message col s12 card-panel indigo lighten-5 center-align hoverable flow-text">
          <AccountsUIWrapper />
        </div>
        {
          this.props.user ? (
            <div className="my-matches">
              <MatchList title="Mis partidos" text={this.props.text} user={this.props.user} matches={this.props.matches}/>
            </div>
          ) : ('')
        }
      </div>
    );
  }
}

export default Account
