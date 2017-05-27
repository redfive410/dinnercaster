/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/
'use strict';
const Async = require('async');
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'DinnerCaster',
            GET_DINNER_MESSAGE: "Here's your dinner idea: ",
            HELP_MESSAGE: 'You can say tell me a dinner idea, or, you can say exit... What can I help you with?")',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetDinner');
    },
    'DinnerCasterIntent': function () {
        this.emit('GetDinner');
    },
    'GetDinner': function () {
      var _this = this;
      Async.waterfall([
        doStuff,
      ], function (err, randomDinner) {
        console.log(randomDinner);
        const speechOutput = _this.t('GET_DINNER_MESSAGE') + randomDinner;
        _this.emit(':tellWithCard', speechOutput, _this.t('SKILL_NAME'), randomDinner);
      });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

function readDynamoItems(params, callback) {
  // Get a random better dinner idea
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-east-1';

  var lambda = new AWS.Lambda();
  lambda.invoke({
      FunctionName: 'arn:aws:lambda:us-east-1:109613526816:function:dinnercaster-1-getdinnerslistFunction-103OVCC84RWNG',
      InvocationType: 'RequestResponse',
      Payload: '{}'
  }, (err, data) => {
    if (err) {
           console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           callback(data.Payload);
       }
  });
}

function doStuff(callback) {
  readDynamoItems(null, response => {
    var dinners = JSON.parse(response);
    var dinnersCount = dinners.Items.length;

    var dinnerIndex = Math.floor(Math.random() * dinnersCount);
    var dinner = dinners.Items[dinnerIndex];
    var randomDinner = dinner.dinnername['S'];
    callback(null, randomDinner)
  });
}
