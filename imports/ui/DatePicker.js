import React, { Component } from 'react';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth(); //January is 0!

    let yyyy = today.getFullYear();

    let date = [yyyy, m, d];

    $('.datepicker').pickadate({
      selectMonths: false,//Creates a dropdown to control month
      selectYears: false,//Creates a dropdown of 15 years to control year
      //The title label to use for the month nav buttons
      labelMonthNext: 'Mes siguiente',
      labelMonthPrev: 'Mes anterior',
      //The title label to use for the dropdown selectors
      labelMonthSelect: 'Elige Mes',
      labelYearSelect: 'Elige Año',
      //Months and weekdays
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
      //Materialize modified
      weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      //Today and clear
      today: 'Hoy',
      clear: 'Borrar',
      close: 'Ok',
      format: 'yyyy/mm/dd',
      min: date,
      closeOnSelect: true, // Close upon selecting a date,
    });
  }

  render() {
    return (
      <input id={ this.props.id } type="text" className="datepicker" />
    );
  }
}

export default DatePicker
