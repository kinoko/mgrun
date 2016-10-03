import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AddRunner from './add-runner.js';
import ShowConfig from './show-config.js';

var counter = 0;

class Actions extends Component {
  componentWillMount() {
    this.id = counter++;
  }
  
  handleVerify(e) {
    Meteor.call('runners.verify', (err, res) => {
      Materialize.toast($(`<pre>${res}</pre>`), 5000);
    });
  }
  
  render() {
    var klassName = "actions";
    if(this.props.hide) klassName += " hide";
    return (
      <div className={ klassName }>
        <div className="actions-button fixed-action-btn">
          <a className="btn-floating btn-large red tooltipped modal-trigger" data-position="left" data-delay="50" data-tooltip="Add a new runner" href={`#add-runner${this.id}`}>
            <i className="large material-icons">add</i>
          </a>
          <ul>
            <li>
              <a className="btn-floating green tooltipped modal-trigger"  data-position="left" data-delay="50" data-tooltip="Show configurations" href={`#show-config${this.id}`}>
                <i className="material-icons">info_outline</i>
              </a>
            </li>
            <li>
              <a className="btn-floating green tooltipped"  data-position="left" data-delay="50" data-tooltip="Verify all runners" onClick={this.handleVerify.bind(this)}>
                <i className="material-icons">loop</i>
              </a>
            </li>
          </ul>
        </div>

        <AddRunner id={`add-runner${this.id}`}/>
        <ShowConfig id={`show-config${this.id}`}/>
      </div>
    );
  }
}

Actions.propTypes = {};

export default createContainer(() => {
  return {};
}, Actions);
