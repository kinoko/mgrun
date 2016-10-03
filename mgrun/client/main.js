import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import JquerySerialization from 'jquery-serializejson';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import App from '../imports/ui/app.js';


Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

$(document).ready(function(){
  $('select').material_select();
  $('.modal-trigger').leanModal({
    starting_top: '2%',
    ending_top: '5%'
  });
});

AccountsTemplates.configure({
  forbidClientAccountCreation: true,
  hideSignUpLink: true
});
