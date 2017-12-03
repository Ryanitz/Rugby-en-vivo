import React, { Component } from 'react';

class TimelineItem extends Component {
  constructor(props) {
    super(props);

  }

  convertTime() {
    let minutes = this.props.event.time - this.props.firstEvent.time;
    if(minutes > 40){
      return "40+" + (minutes - 40);
    }
    return minutes;
  }

  render() {
    let event = this.props.event;
    // let time = this.convertTime();
    return (
      <div className="event col s12 grey-text darken-4">
      {
        event.actuate == "time" ? (
          <p className="center-align"><hr/>{event.action}</p>
        ) : ('')
      }
      {
        event.actuate == "local" ? (
          <p className="left-align">{event.action} {this.convertTime()}min</p>
        ) : ('')
      }
      {
        event.actuate == "visit" ? (
          <p className="right-align">{this.convertTime()}min {event.action}</p>
        ) : ('')
      }
      </div>
    );
  }
}

export default TimelineItem
