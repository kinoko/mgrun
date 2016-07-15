import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
        <nav className="nav light-blue lighten-1" role="navigation">
            <div className="nav-wrapper container">
                <a id="logo-container" href="#" className="brand-logo">mgrun</a>
            </div>
        </nav>
    );
  }
}
