import React, { Component } from 'react';

import Nav from './nav.js';
import Main from './main.js';

export default class App extends Component {
  render() {
    return (
        <div className="app">
        <Nav />
        <div className="container">
        <Main />
        </div>
        </div>
    );
  }
}
