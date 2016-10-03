import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Runner from './runner.js';

class Runners extends Component {
  render() {
    let runners = this.props.runners.map((runner) => {
      var token = runner.token;
      return <Runner key={token} data={runner}/>;
    });
    return (
      <div className="runners">
        <table>
          <thead>
            <tr>
              <th data-field="token">Token</th>
              <th data-field="desc">Description</th>
              <th data-field="executor">Executor</th>
              <th data-field="url">URL</th>
              <th data-field="action"></th>
            </tr>
          </thead>
          <tbody>
            { runners }
          </tbody>
        </table>
      </div>
    );
  }
}


Runners.propTypes = {
  runners: PropTypes.array.isRequired
};

const Collection = new Mongo.Collection('runners');

export default createContainer(() => {
  Meteor.subscribe('runners');

  return {
    runners: Collection.find({}).fetch()
  };
}, Runners);
