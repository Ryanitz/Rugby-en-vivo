import React, { Component } from 'react';

import TimelineItem from './TimelineItem.js';

class Timeline extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let timeEvent = this.props.timeline[0];
    return (
      <div className="row">
      {
        this.props.timeline.length > 0 ? (
          this.props.timeline.map((event) => (
            event.action === "2do tiempo" ? (
              timeEvent = event
            ) : (''),
            <TimelineItem key={event.id} event={event} timeEvent={timeEvent} />
          ))
        ) : (
          <div className="row">
            <div className="col s12">
              <div className="card-panel indigo lighten-5 center-align hoverable flow-text">
                <span className="grey-text darken-4">No ha comenzado el partido.</span>
              </div>
            </div>
          </div>
        )
      }
      </div>
    );
  }
}

export default Timeline
