import React, { Component } from 'react';

import logo from '../../assets/images/flight.gif';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="header display--flex">
        <img src={logo} className="header__logo" alt="logo" />
        <h2 className="header__title">Flight Search</h2>
      </header>
    );
  }
}

export default Header;
