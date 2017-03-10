/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

require("./lib/axios/dist/axios.standalone.js");
require("./lib/CryptoJS/rollups/hmac-sha256.js");
require("./lib/CryptoJS/rollups/sha256.js");
require("./lib/CryptoJS/components/hmac.js");
require("./lib/CryptoJS/components/enc-base64.js");
require("./lib/url-template/url-template.js");
require("./lib/apiGatewayCore/sigV4Client.js");
require("./lib/apiGatewayCore/apiGatewayClient.js");
require("./lib/apiGatewayCore/simpleHttpClient.js");
require("./lib/apiGatewayCore/utils.js");
require("./apigClient.js");

require("dinnercaster");

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            DINNERS: [
                'Ramen',
                'Trader Joes Indian',
                'Perogies',
            ],
            SKILL_NAME: 'DinnerCaster',
            GET_DINNER_MESSAGE: "Here's your dinner idea: ",
            HELP_MESSAGE: 'You can say tell me a dinner idea, or, you can say exit... What can I help you with?")',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetDinner');
    },
    'DinnerCasterIntent': function () {
        this.emit('GetDinner');
    },
    'GetDinner': function () {
        // Get a random dinner from the dinner list
        var apigClient = apigClientFactory.newClient();

        // Use this.t() to get corresponding language data
        const dinnerArr = this.t('DINNERS');
        const dinnerIndex = Math.floor(Math.random() * dinnerArr.length);
        const randomDinner = dinnerArr[dinnerIndex];

        // Create speech output
        const speechOutput = this.t('GET_DINNER_MESSAGE') + randomDinner;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomDinner);
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

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
