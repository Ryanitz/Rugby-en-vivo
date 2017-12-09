import React, { Component } from 'react';

import MatchPreview from './MatchPreview.js';
import CreateMatchCard from './CreateMatchCard.js';

class MatchList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="row row-fixed">
      {
        this.props.matches.length > 0 ? (
          <span className="title flow-text">{this.props.title}</span>,
          this.props.matches.map((match) =>
            <MatchPreview key={match._id} match={ match } user={this.props.user} />
          )
        ) : (
          <div className="message col s12 card-panel indigo lighten-5 center-align hoverable flow-text">
            <span className="grey-text darken-4">{this.props.text}</span>
          </div>
        )
      }
      {
        window.location.pathname == "/Cuenta" ? (
          <CreateMatchCard user={this.props.user} />
        ) : ('')
      }
      </div>
    );
  }
}

export default MatchList
