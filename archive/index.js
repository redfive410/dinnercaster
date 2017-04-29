/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask DinnerCaster for a dinner idea"
 *  Alexa: "Here's your dinner idea: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var DINNERS = [
    "Perogies",
    "Pizza",
    "Fish Tacos",
    "Eggplant Parmesan",
    "Pho",
    "Ramen",
    "Sushi",
    "Shrimp Scampi",
    "Shrimp Tacos",
    "Indian",
    "Thai",
    "Italian"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DinnerCaster is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DinnerCaster = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DinnerCaster.prototype = Object.create(AlexaSkill.prototype);
DinnerCaster.prototype.constructor = DinnerCaster;

DinnerCaster.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

DinnerCaster.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
DinnerCaster.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

DinnerCaster.prototype.intentHandlers = {
    "DinnerCasterIntent": function (intent, session, response) {
        handleDinnerCasterRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a dinner idea, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleDinnerCasterRequest(response) {
    // Get a random space fact from the space facts list
    var dinnerIndex = Math.floor(Math.random() * DINNERS.length);
    var randomDinner = DINNERS[dinnerIndex];

    // Create speech output
    var speechOutput = "Here's your dinner idea: " + randomDinner;
    var cardTitle = "DinnerCaster";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the DinnerCaster skill.
    var dinnerCaster = new DinnerCaster();
    dinnerCaster.execute(event, context);
};
