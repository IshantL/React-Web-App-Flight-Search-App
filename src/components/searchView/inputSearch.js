import React, { Component} from 'react';
import Config from '../../Data/Config';
import './inputSearch.css';


class InputSearch extends Component{

  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);

    this.toggleContainer = React.createRef();
    this.state = {
      searchedItems: [],
      inputValue: '',
      isOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  fetchData (value) {
    //Simplify to show data
    const list = Config[this.props.listName];
    let filterItems = list.filter((item) => {
      const valueLowercase = value.toLowerCase();
      return (item.name.toLowerCase().search(valueLowercase) >= 0 ||
              item.country.toLowerCase().search(valueLowercase) >= 0 ||
                item.city.toLowerCase().search(valueLowercase) >= 0 ||
                  item.code.toLowerCase().search(valueLowercase) >= 0);
    });
    this.setState({
      searchedItems: filterItems
    });
  }

  clickHandler (e){
    //console.log(value);
    let value = e.target.value;
    if(value.length >= 1){
      this.fetchData(value);
    }else {
      this.setState({
        searchedItems: []
      });
    }
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  selectClickHandler (selectedValue, name){
    let elementId = document.getElementById(this.props.id);
    let elementName = document.getElementsByName(this.props.id);
    elementId.value = name;
    elementName.value = selectedValue;
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
    this.props.onClick(selectedValue);
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render (){
    return(
      <div className='ui-input-search'>
        <input type='text' id={this.props.id} placeholder='Type atleast 3 letters' onChange={this.clickHandler}></input>
        <input type='hidden' name={this.props.id}/>
        {this.state.isOpen ? <div ref={this.toggleContainer} className='ui-input-search-item'>
          <ul className="list-group">
            {this.state.searchedItems.map((item, key) => (
              <li onClick={() => this.selectClickHandler(item.code, item.name)} key={key} className="list-group-item" value={item.code}>
              {item.name}-{item.country}[{item.code}]
              </li>
            ))}
          </ul>
        </div> : null}
      </div>
    );
  }
}
export default InputSearch;
