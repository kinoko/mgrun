import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import InputField from './input-field.js';
import InputAreaField from './input-area-field.js';
import InputListField from './input-list-field.js';
import SelectField from './select-field.js';

export default class AddRunner extends Component {
  handleAdd() {
    let vals = $(this.refs.form).find('input').filter(function(){
      return !/^\s*$/.test($(this).val());
    }).serializeJSON();
    Meteor.call('runners.add', vals, (err, res) => {
      Materialize.toast($(`<pre>${res}</pre>`), 2000);
      $(`#${this.props.id}`).closeModal();
    });
  }
  
  render() {
    let id = this.props.id;
    return (
      <div className="add-runner">
        <div id={this.props.id} className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Add a new runner</h4>
            <form ref="form">
              <input type="hidden" name="url" value={ Meteor.settings.public.gitlabHost } />
              <InputField name="registration-token" id={`registration-token${id}`} type="text" required aria-required="true">Registration Token</InputField>
              <InputField name="name" id={`name${id}`} type="text" required aria-required="true">Name</InputField>
              <InputListField name="env" id={`env${id}`}>Env</InputListField>
              <InputField name="executor" id={`executor${id}`} readOnly value="docker" type="text">Executor</InputField>
              <h5>Docker configurations</h5>
              <InputField name="docker-hostname" id={`docker-hostname${id}`} type="text">Hostname</InputField>
              <InputField name="docker-image" id={`docker-image${id}`} type="text" defaultValue="ubuntu" required>Image</InputField>
              <InputField name="docker-privileged:boolean" id={`docker-privileged${id}`} type="checkbox" value="true" data-unchecked-value="false">Privileged</InputField>
              <SelectField name="docker-pull-policy" label="Pull Policy" defaultValue="always">
                <option value="always">Always</option>
                <option value="if-not-present">If not present</option>
                <option value="never">Never</option>
              </SelectField>
              <InputListField name="docker-volumes" id={`docker-volumes${id}`}>Volumes</InputListField>
              <InputListField name="docker-links" id={`docker-links${id}`} defaultItems={ Meteor.settings.public.defaultLinks }>Links</InputListField>
              <InputListField name="docker-services" id={`docker-services${id}`}>Services</InputListField>
              <InputListField name="docker-extra-hosts" id={`docker-extra-hosts${id}`}>Extra Hosts</InputListField>
              <InputListField name="docker-allowed-images" id={`docker-allowed-images${id}`}>Allowed Images</InputListField>
              <InputListField name="docker-allowed-services" id={`docker-allowed-services${id}`}>Allowed Services</InputListField>
            </form>
          </div>
          <div className="modal-footer">
            <a className="modal-action waves-effect waves-green btn-flat" onClick={this.handleAdd.bind(this)}>Add</a>
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}
