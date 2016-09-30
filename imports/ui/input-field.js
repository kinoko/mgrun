import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

export default class InputField extends Component {
  render() {
    let id = this.props.id;
    var props = _.extend({}, this.props);
    props.children = undefined;
    let input = React.DOM.input(_.extend(props, {className: "validate"}));
    return (
      <div className="row">
        <div className="input-field col s12">
          { input }
          <label htmlFor={id}>{this.props.children}</label>
        </div>
      </div>
    );
  }
}
