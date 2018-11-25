import React, { Component } from 'react';
import moment from 'moment';
import FlightDetails from './Flight-details';
import FlightData from '../../Data/flights-json'
import './flights.css';

class FlightsResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights:FlightData ,
      searchData:'',
      returnFlight:''
    };
    this.checkFlightAvailability=this.checkFlightAvailability.bind(this);
  }

  componentWillReceiveProps (nextProps){
    this.setState({searchData:nextProps.data});
  }


  checkFlightAvailability(flight) {
    let result=this.state.searchData;

       if((result.originCity===flight.from_code) &&(result.destinationCity===flight.to_code) && ((result.price.min<=flight.price)&&(flight.price<=result.price.max))){ 
      if(result.returnTrip){
        if((moment(result.startDate._d).format("D M YYYY") === moment(flight.arrive_date).format("D M YYYY"))){
          flight.returnTrip=true;
          flight.endDate=result.endDate;
           return flight
        }
      }
    
      else{
        if((moment(result.date._d).format("D M YYYY") === moment(flight.arrive_date).format("D M YYYY"))){
          flight.returnTrip=false;
           return flight
        }
        }
      }    

  }

  render() {

      var flightsAvailable;  
      if(this.state.searchData===''){
        flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails FlightData={flight}></FlightDetails>
      });
      }
      else{
       flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails FlightData={this.checkFlightAvailability(flight)}></FlightDetails>
      });
     }

     debugger;
       let flightDetails = this.state.searchData;
    if (flightDetails) {
      flightDetails = {
        depart_day: moment(flightDetails.startDate).format("Do MMM YYYY"),
        return_day: moment(flightDetails.endDate).format("Do MMM YYYY"),
        date:      moment(flightDetails.date).format("Do MMM YYYY")
      };    
    }

    return (
        <section className="flights">
       <div className="flight__container">
      
        <h2>Available Flights:</h2>
                {this.state.searchData &&
                <h2>
                  <span>{this.state.searchData.originCity}&raquo; </span> 
                  <span> {this.state.searchData.destinationCity} </span> 
                  
                  {
                  this.state.searchData.returnTrip &&
                  <span> &raquo; {this.state.searchData.originCity} </span> 
                  }
              </h2>}
              {this.state.searchData &&
                <h3>
                  <span>Date:{flightDetails.date}</span> <br/>                  
                  {
                  this.state.searchData.returnTrip &&<span>
                  <span>Depart:{flightDetails.depart_day} </span> 
                   <span>Return:{flightDetails.return_day} </span> </span>
                  }
              </h3>}
          {flightsAvailable}
        </div>
      </section>
    );
  }
}

export default FlightsResult;