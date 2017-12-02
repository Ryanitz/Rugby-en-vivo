import React, { Component } from 'react';

import MatchPreview from './MatchPreview.js';

class MatchList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
      {
        this.props.matches.length > 0 ? (
          this.props.matches.map((match) =>
            <MatchPreview match={ match } />
          )
        ) : (
          <div className="row">
            <div className="col s12">
              <div className="card-panel indigo lighten-5 center-align hoverable flow-text">
                <span className="grey-text darken-4">No hay partidos en este momento.</span>
              </div>
            </div>
          </div>
        )
      }
      </div>
    );
  }
}

export default MatchList
