import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class Main extends Component {
  render() {
    let content =  Meteor.userId() == null ?
          <Blaze template="loginButtons" /> :
          "Logged in";
    return (
        <div className="main section">
        { content }
        </div>
    );
  }
}
