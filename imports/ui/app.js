import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Nav from './nav.js';
import Main from './main.js';
import Actions from './actions.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav currentUser={this.props.currentUser} />
        <div className="container">
          <Main currentUser={this.props.currentUser} />
        </div>
        <Actions hide={!this.props.currentUser} />
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, App);
