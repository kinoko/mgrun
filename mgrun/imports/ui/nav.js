import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class Nav extends Component {
  handleSignout(e) {
    e.preventDefault();
    Meteor.logout();
  }
  
  render() {
    let signout = this.props.currentUser ?
        <li><a onClick={this.handleSignout.bind(this)}>Sign out</a></li> : "";
    return (
      <nav className="nav light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="#" className="brand-logo">mgrun</a>
          <ul className="right">
            { signout }
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  currentUser: PropTypes.object
};
