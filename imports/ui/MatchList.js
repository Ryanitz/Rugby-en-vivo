import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MatchPreview from './MatchPreview.js';
import CreateMatchCard from './CreateMatchCard.js';
import Loading from './Loading.js';

import { Matches } from '../api/matches.js';

class MatchList extends Component {

  constructor(props) {
    super(props);

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!

    let yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    let date = yyyy + '/' + mm + '/' + dd;

    this.state = {
      date: date
    };

    Meteor.subscribe('matches');

    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    $('#select_date').pickadate({
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
      min: this.state.date,
      closeOnSelect: true, // Close upon selecting a date,
      onClose: this.changeDate,
    });
  }

  changeDate() {
    if(document.getElementById("select_date").value){
      this.setState({
        date: document.getElementById("select_date").value,
      });
    }
  }

  render() {
    let selected_date = this.state.date;

    let matches = function() {
      if(window.location.pathname == "/Cuenta") {
        return Matches.find({ owner: Meteor.userId() }, { sort: { matchDate: 1, startingTime: 1 } }).fetch();
      } else if(window.location.pathname == "/Vivo") {
        return Matches.find({ started: true }, { sort: { startingTime: 1 } }).fetch();
      } else if(window.location.pathname == "/Partidos") {
        return Matches.find({ status: "not started", matchDate: selected_date }, { sort: { startingTime: 1 } }).fetch();
      } else if(window.location.pathname == "/Finalizados") {
        return Matches.find({ status: "finished" }, { sort: { startingTime: 1 } }).fetch();
      } else {
        return Matches.find({ status: "not started", matchDate: selected_date }, { sort: { startingTime: 1 } }).fetch();
      }
    }

    return (
      <div>
      {
        window.location.pathname === "/Partidos" ? (
          <div className="input-field row left-align">
            <input id="select_date" data-value={selected_date} type="text" className="col s12 m6 l4 datepicker" />
            <label htmlFor="select_date" className="active truncate">Elegir fecha</label>
          </div>
        ) : ('')
      }
      {
        this.props.loading ? (
          <Loading />
        ) : (
          <div className="row row-fixed">
          {
            matches().length > 0 ? (
              matches().map((match) =>
                <MatchPreview key={match._id} match={ match } user={this.props.user} />
              )
            ) : (
              <div className="message col s12 card-panel indigo lighten-5 center-align hoverable flow-text">
                <span className="grey-text darken-4">{this.props.text}</span>
              </div>
            )
          }
          {
            window.location.pathname == "/Cuenta" ? (
              <CreateMatchCard user={this.props.user} />
            ) : ('')
          }
          </div>
        )
      }
      </div>
    );
  }
}

export default MatchList = withTracker(() => {
  let matchesHandle = Meteor.subscribe('matches');
  let loading = !matchesHandle.ready();

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!

  let yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  let date = yyyy + '/' + mm + '/' + dd;

  return {
    loading,
    matches: Matches.find().fetch(),
  };
})(MatchList);
