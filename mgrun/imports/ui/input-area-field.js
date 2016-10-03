import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

export default class InputAreaField extends Component {
  render() {
    let id = this.props.id;
    var props = _.extend({}, this.props);
    props.children = undefined;
    let input = React.DOM.textarea(_.extend(props, {className: "materialize-textarea"}));
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
