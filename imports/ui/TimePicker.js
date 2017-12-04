import React, { Component } from 'react';

class TimePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Borrar', // text for clear-button
      canceltext: 'Cancelar', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true // make AM PM clickable
    });
  }

  render() {
    return (
      <input id={ this.props.id } placeholder="Hora de inicio" type="text" className="timepicker" />
    );
  }
}

export default TimePicker
