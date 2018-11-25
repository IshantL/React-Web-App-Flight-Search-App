import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; 
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import InputSearch from './inputSearch'
import './search.css';
import moment from 'moment';

class Search extends Component {



  constructor(props) {
    super(props);
    this.inputSearchClickHandlerOrigin = this.inputSearchClickHandlerOrigin.bind(this);
    this.inputSearchClickHandlerDestination = this.inputSearchClickHandlerDestination.bind(this);
    this.onSearchSubmit= this.onSearchSubmit.bind(this);


    this.state = {
      originCity:'',
      destinationCity:'',
      startDate:moment(),
      endDate:moment(),
      date:moment(),
      returnTrip: true,
      passengers: 1,
      price: {
        min: 500,
        max: 5000,
      }      
    }
  }
  onSearchSubmit(){
    console.log(this.state);
    this.props.callback(this.state);

  }

  inputSearchClickHandlerOrigin (value){
    this.setState({originCity:value})
  }

    inputSearchClickHandlerDestination (value){
      this.setState({destinationCity:value})
    }

  tabSwitch(tab) {
    let returnTrip = (tab === 1) ? false : true;
    this.setState({returnTrip});
  }


  incrementPassengers() {
    this.setState({
      passengers: this.state.passengers + 1
    });
  }

  decrementPassengers() {
    if (this.state.passengers > 0) {
      this.setState({
        passengers: this.state.passengers - 1
      });   
    }
  }

  handleSearch(event) {
    console.log("tabs");
  }

  render() {

    return(
      <div className="search__box">

        <ul className="tabs">
          <li className={"tab" + (this.state.returnTrip ? '' : ' active')}
            onClick={()=>this.tabSwitch(1)}>One way</li>

          <li className={"tab" + (this.state.returnTrip ? ' active' : '')}
            onClick={()=>this.tabSwitch(2)}>Return</li>
        </ul>

        <div className="form" onSubmit={()=>this.handleSearch()}>

          Enter Origin City:<br />
        <InputSearch id='is1' listName='apts' onClick={this.inputSearchClickHandlerOrigin}/>          <br /> <br /> <br />
          Enter Destination City:<br />
        <InputSearch id='is2' listName='apts' onClick={this.inputSearchClickHandlerDestination}/>
            <br />
          
          {this.state.returnTrip ||
            <div>
            <label className="block">Departure date</label>  
                      <div className="DateRangePicker">
 
             <SingleDatePicker 
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date:moment(date) })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
          /> 
          </div>        
          </div>        
        }
          <br />          

          {this.state.returnTrip &&
          <div>
            <label className="block">Departure date > Return date</label>  
          <div className="DateRangePicker">
          <DateRangePicker 
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate:moment(startDate), endDate:moment(endDate) })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          /> 
          </div>          
          </div>
          }

          <div className="passengers">            
            <span className="passenger__count">{this.state.passengers} passenger</span>            
            
            <button 
              type="button" 
              className="button" 
              onClick={()=>this.decrementPassengers()}>
              -
            </button>            

            <button 
              type="button" 
              className="button" 
              onClick={()=>this.incrementPassengers()}>
              +
            </button>
          </div>

          <div className="price-range__label">
            <label>Refine Flight Search</label>
          </div>

          <InputRange
            className="price--range"
            maxValue={10000}
            minValue={0}
            formatLabel={price => `${price}`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={price => console.log(price)} />
          
            
          <button className="form__submit" type="submit" onClick={this.onSearchSubmit}>Search</button>
          
        </div>
      </div>
    )
  }
}

export default Search;