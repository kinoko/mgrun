import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

export default class InputListField extends Component {
  constructor(props) {
    super(props);
    if (props.defaultItems) {
      this.state = { items: props.defaultItems };
    } else {
      this.state = { items: [] };
    }
  }
  handleInputPress(e) {
    if (e.key == "Enter") {
      let val = $(this.refs.input).val();
      if (!_.isEmpty(val)) {
        $(this.refs.input).val('');
        this.setState({ items: this.state.items.concat([val]) });
      }
    }
  }
  handleDeleteItem(id, e) {
    this.state.items.splice(id, 1);
    this.setState({ items: this.state.items });
    e.preventDefault();
  }
  render() {
    let id = this.props.id;
    var props = _.omit(this.props, 'children', 'name', 'defaultItems');
    let input = React.DOM.input(_.extend(props, {type: "text", className: "validate", name: 'list-input:skip', ref: 'input', onKeyPress: this.handleInputPress.bind(this)}));
    let items = this.state.items.map((item, id) => {
      return (
        <li className="collection-item" key={id}>
          <div>
            <input type="hidden" name={`${this.props.name}[]`} value={item}/>
            { item }
            <a href="#" className="secondary-content red-text" onClick={this.handleDeleteItem.bind(this, id)}><i className="material-icons">delete</i></a>
          </div>
        </li>
      );
    });
    let collection = items.length == 0 ? "No item" : (
      <ul className="collection">
        { items }
      </ul>
    );
    return (
      <div className="input-list-field">
        <div className="row">
          <div className="input-field col s12">
            { input }
            <label htmlFor={id}>{this.props.children}</label>
          </div>
          { collection }
        </div>
      </div>
    );
  }
}
