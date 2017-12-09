import React, { Component } from 'react';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: false, // Creates a dropdown to control month
      selectYears: null, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  render() {
    return (
      <input id={ this.props.id } type="text" className="datepicker" />
    );
  }
}

export default DatePicker
