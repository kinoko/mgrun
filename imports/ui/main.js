import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';

import Runners from './runners.js';
import Global from './global.js';

export default class Main extends Component {
  render() {
    let content =  this.props.currentUser ?
        (
          <div>
            <Global />
            <Runners />
          </div>
        ) : <Blaze template="atForm" state="signIn" />;
    return (
      <div className="main section">
        { content }
      </div>
    );
  }
}

Main.propTypes = {
  currentUser: PropTypes.object
};
