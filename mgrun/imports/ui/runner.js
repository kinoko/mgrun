import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class Runner extends Component {
  handleRemove() {
    Meteor.call('runners.delete', this.props.data, (err, res) => {
      Materialize.toast($(`<pre>${res}</pre>`), 2000);
    });
  }
  
  render() {
    let data = this.props.data;
    return (
      <tr className="runner">
        <td>{data.token}</td>
        <td>{data.name}</td>
        <td>{data.executor}</td>
        <td>{data.url}</td>
        <td><a className="waves-effect waves-light btn" onClick={this.handleRemove.bind(this)}>Remove</a></td>
      </tr>
    );
  }
}

Runner.propTypes = {
  data: PropTypes.object.isRequired
};
