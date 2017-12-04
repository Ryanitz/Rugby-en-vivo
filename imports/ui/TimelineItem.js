import React, { Component } from 'react';

class TimelineItem extends Component {
  constructor(props) {
    super(props);

  }

  convertTime() {
    let minutes = this.props.event.time - this.props.firstEvent.time;
    if(minutes < 0) {
      alert("Event: " + this.props.event.time);
      alert("FistEvent: " + this.props.firstEvent.time);
    }
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
          <p className="left-align"><strong>{event.action}</strong> {this.convertTime() + "'"}</p>
        ) : ('')
      }
      {
        event.actuate == "visit" ? (
          <p className="right-align">{this.convertTime() + "'"} <strong>{event.action}</strong></p>
        ) : ('')
      }
      </div>
    );
  }
}

export default TimelineItem
