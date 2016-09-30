import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Global extends Component {
  handleChange(e) {
    let val = $("#concurrent").val();
    Meteor.call('global.concurrent', val, (err, res) => {
      
    });
  }
  
  render() {
    const count = this.props.data ? this.props.data.count : 1;
    const current = this.props.data ? this.props.data.current : 1;
    return (
      <div className="global">
        <form>
          <label htmlFor="#concurrent">Concurrent</label>
          <p className="range-field">
            <input id="concurrent" type="range" min="1" max={ `${count}` } defaultValue={ `${current}` } onChange={ this.handleChange.bind(this) } />
          </p>
        </form>
      </div>
    );
  }
}

const Collection = new Mongo.Collection('global');

export default createContainer(() => {
  Meteor.subscribe('global');
  
  return {
    data: Collection.findOne(0)
  };
}, Global);
