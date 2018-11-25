import React, { Component } from 'react';
import './flights.css';
import moment from 'moment';
import FlightData from '../../Data/flights-json'


class FlightDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: false,
      bookingText: 'Book this flight'
    }
  }

  componentWillReceiveProps (nextProps){
      if(nextProps.FlightData!==undefined){
          if(nextProps.FlightData.returnTrip){
            this.setState({isReturnTrip:nextProps.FlightData.returnTrip});
          }else{
            this.setState({isReturnTrip:nextProps.FlightData.returnTrip});            
          }  
        }
      }
  render() {    
      if(this.props.FlightData!==undefined){
        let flight = this.props.FlightData;
      flight.depart_time = moment(this.props.FlightData.depart_date).format("hh:mm A");
      flight.arrive_time = moment(this.props.FlightData.arrive_date).format("hh:mm A");
      flight.date=moment(this.props.FlightData.depart_date).format("D M YYYY");
      let returnTrip={};
      if(this.state.isReturnTrip){
          FlightData.map((allFlight)=> {
               if((flight.to_code===allFlight.from_code) &&(flight.from_code===allFlight.to_code)
                && (moment(flight.endDate._d).format("D M YYYY") === moment(allFlight.arrive_date).format("D M YYYY")))
              {
              returnTrip.depart_time = moment(allFlight.depart_date).format("hh:mm A");
              returnTrip.arrive_time = moment(allFlight.arrive_date).format("hh:mm A"); 
              returnTrip.number=allFlight.number;
              returnTrip.from_code=allFlight.from_code;
              returnTrip.to_code=allFlight.to_code;
              returnTrip.price=allFlight.price;
              returnTrip.date=moment(allFlight.depart_date).format("D M YYYY");
              }
              return null;
            });
            }
   
    return (
      <div className="flight" ref="flightRef">
        <div className="flight__details">
          <div className="flight__timings">
              <div className="flight__departure">
              <h3 className="flight__number">₹ {this.props.FlightData.price}</h3>
              <p className="flight__number">{this.props.FlightData.number.toUpperCase()}</p>
              <p className="flight__codes">{this.props.FlightData.from_code} &raquo; {this.props.FlightData.to_code}</p>
              <p className="flight__depart__time">Date: {flight.date}</p>
              <p className="flight__depart__time">Depart: {flight.depart_time}</p>
              <p className="flight__arrive__time">Arrive: {flight.arrive_time}</p>
            </div>
             { 
              this.state.isReturnTrip &&
              <div className="flight__return">
                <h3 className="flight__number">₹ {returnTrip.price}</h3>
                <p className="flight__number">{returnTrip.number.toUpperCase()}</p>
                <p className="flight__codes">{returnTrip.from_code} &raquo; {returnTrip.to_code}</p>
                <p className="flight__depart__time">Date: {returnTrip.date}</p>
                <p className="flight__depart__time">Depart: {returnTrip.depart_time}</p>
                <p className="flight__arrive__time">Arrive: {returnTrip.arrive_time}</p>
              </div>
            }          
          </div>
        </div>
        <div className="flight__logo">
          <div className={`airline ${this.props.FlightData.airline_code}`}></div>
          <button 
            className="booking--button"
            onClick={() => this.setState({bookingText: 'Booked'})}>
            {this.state.bookingText}
          </button>
        </div>
      </div>    
      );
    }else{
      return(<span></span>
        )
    }
 }
}

export default FlightDetails;