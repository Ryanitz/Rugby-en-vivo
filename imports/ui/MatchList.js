import React, { Component } from 'react';

import MatchPreview from './MatchPreview.js';
import CreateMatchCard from './CreateMatchCard.js';

class MatchList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.matches.length);
    return (
      <div className="row">
      {
        this.props.matches.length > 0 ? (
          this.props.matches.map((match) =>
            <MatchPreview key={match._id} match={ match } user={this.props.user} />
          )
        ) : (
          <div className="message col s12 card-panel indigo lighten-5 center-align hoverable flow-text">
            <span className="grey-text darken-4">No hay partidos en este momento.</span>
          </div>
        )
      }
      <CreateMatchCard user={this.props.user} />
      </div>
    );
  }
}

export default MatchList
