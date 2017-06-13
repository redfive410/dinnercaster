/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/
'use strict';
const Async = require('async');
const Http = require('http');
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
        getData,
        getWeatherAndDay,
        getDinnerIdea,
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

function getData(callback) {
  readDynamoItems( response => {
    callback(null, response);
  });
}

function readDynamoItems(callback) {
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
           callback(JSON.parse(data.Payload));
       }
  });
}

function getWeatherAndDay(dinners, callback) {
  var start = new Date();
  Http.get('http://api.wunderground.com/api/88f0a6fd8156bd5f/conditions/q/CA/Poway.json', function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      var day = parsed.current_observation.local_time_rfc822.substring(0, 3);
      var temp = parsed.current_observation.temp_f;
      callback(null, dinners, day, temp)
    });
  });
}

function getDinnerIdea(dinners, day, temp_f, callback) {
  //var randomDinner = getResultV0(dinners);
  var randomDinner = getResultV1(dinners, day, temp_f);
  callback(null, randomDinner)
}

function getResultV0(dinners) {
  var dinnersCount = dinners.Items.length;

  var dinnerIndex = Math.floor(Math.random() * dinnersCount);
  var dinner = dinners.Items[dinnerIndex];
  return dinner.dinnername['S'];
}

function getResultV1(dinners, day, temp_f) {
  var dinnersCount = dinners.Items.length;

  var names = [];
  var generalScores = [];
  var dayScores = [];

  for(var i=0; i < dinnersCount; i++) {
    var name = dinners.Items[i].dinnername['S'];
    names.push(name);

    var scores = JSON.parse(dinners.Items[i].scores['S']);
    generalScores.push(scores.GeneralScore);

    switch (day) {
      case "Sun":
        dayScores.push(scores.SundayScore);
        break;
      case "Mon":
        dayScores.push(scores.MondayScore);
        break;
      case "Tue":
        dayScores.push(scores.TuesdayScore);
        break;
      case "Wed":
        dayScores.push(scores.WednesdayScore);
        break;
      case "Thu":
        dayScores.push(scores.ThursdayScore);
        break;
      case "Fri":
        dayScores.push(scores.FridayScore);
        break;
      case "Sat":
        dayScores.push(scores.SaturdayScore);
    }
  }

  var finalScores = [];
  for(var i=0; i < dinnersCount; i++) {
    var score = generalScores[i] * dayScores[i];
    var score_object = {};
    score_object[names[i]] = score;
    finalScores.push(score_object);
  }

  var dinnerIndex = Math.floor(Math.random() * dinnersCount);
  var finalScore = finalScores[dinnerIndex];
  console.log(Object.keys(finalScore) + ":" + finalScore[Object.keys(finalScore)]);

  return Object.keys(finalScore);
}
