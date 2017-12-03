import React, { Component } from 'react';

import TimelineItem from './TimelineItem.js';

class Timeline extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let eventNumber = 0;
    let index = 0;
    return (
      <div className="row">
      {
        this.props.timeline.length > 0 ? (
          this.props.timeline.map((event) =>
            event.action !== "Entretiempo" ? (
              event.action == "2do tiempo" ? this.eventNumber = this.index : this.index++,
              <TimelineItem key={event.id} event={event} firstEvent={this.props.timeline[0]} />
            ) : ('')
          )
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
