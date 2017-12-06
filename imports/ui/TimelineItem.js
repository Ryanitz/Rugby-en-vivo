import React, { Component } from 'react';

class TimelineItem extends Component {
  constructor(props) {
    super(props);

  }

  convertTime() {
    let minutes = this.props.event.time - this.props.timeEvent.time;

    if(minutes > 40){
      return "40+" + (minutes - 40);
    }
    return minutes;
  }

  convertMinutes() {
    let time = this.props.event.time;
    let hours = Math.floor( time / 60);
    let minutes = time % 60;
    return this.addZero(hours) + ":" + this.addZero(minutes);
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


  render() {
    let event = this.props.event;

    return (
      <div className="event col s12 grey-text darken-4">
      {
        event.actuate == "time" ? (
          <p className="time-event center-align">{event.action} ({this.convertMinutes()})</p>
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
