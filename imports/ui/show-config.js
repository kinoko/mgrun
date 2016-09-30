import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ConfigItem extends Component {
  render() {
    return (
      <div className="config-item">
        <dt>{ this.props.name }</dt>
        <dd>{ this.props.children }</dd>
      </div>
    );
  }
}

class ConfigGroup extends Component {
  render() {
    return (
      <div className="config-group">
        <div className="divider"></div>
        <section className="section">
          <h3>{ this.props.title }</h3>
          <dl>
            { this.props.children }
          </dl>
        </section>
      </div>
    );
  }
}

export default class ShowConfig extends Component {
  render() {
    let id = this.props.id;
    let defaultLinks = Meteor.settings.public.defaultLinks.map((item, id) => {
      return (
        <li key={id}>{ item }</li>
      );
    });
    return (
      <div className="show-config">
        <div id={id} className="modal modal-fixed-footer">
          <article className="modal-content">
            <h2>Configurations</h2>
            <ConfigGroup title="Gitlab">
              <ConfigItem name="Callback URL">
                { Meteor.absoluteUrl() }_oauth/gitlab
              </ConfigItem>
              <ConfigItem name="Hostname">
                { Meteor.settings.public.gitlabHost }
              </ConfigItem>
            </ConfigGroup>
            <ConfigGroup title="Default runner configurations">
              <ConfigItem name="Default links">
                <ul>{ defaultLinks }</ul>
              </ConfigItem>
            </ConfigGroup>
          </article>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Ok</a>
          </div>
        </div>
      </div>
    );
  }
}
