import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

export default class SelectField extends Component {
  render() {
    let multiple = this.props.multiple;
    let defaultValue = this.props.defaultValue;
    return (
      <div className="row">
        <div className="input-field col s12">
          <select multiple={multiple} defaultValue={defaultValue}>
            { this.props.children }
          </select>
          <label>{this.props.label}</label>
        </div>
      </div>
    );
  }
}
