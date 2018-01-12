'use strict';
const Alexa = require("alexa-sdk");
const APP_ID = "amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17"
var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();
// var totalTips = process.env.TOTAL_TIP_COUNT;
// var tipsHeard = [];

var speechOutput;
const welcomeOutput = "Hello, tell me your name.";
var reprompt = "just tell me your name.";
const HowKindIntro = [
  "Okay, okay",
  "Cool"
];

var cardTitle = '';
var cardContent = '';
var imageObj = {
    // smallImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/yearsLeft(108x108)movedhourglass.png',
    // largeImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/yearsLeft(512x512)movedhourglass.png'
};

const handlers = {
  
  'LaunchRequest': function() {

    if(process.env.debugFlag){
      console.log('Launching LaunchRequest...')
    };

    if(process.env.debugFlag){console.log("Starting DaysLeftIntent...")}
    this.response.speak(welcomeOutput).listen(reprompt);
    this.emit(':responseReady');

  },
  'UserIntent': function() {
    var filledSlots = delegateSlotCollection.call(this);
    console.log("filled slots: " + JSON.stringify(filledSlots));
    var speechOutput = randomPhrase(HowKindIntro);

    var usersName=this.event.request.intent.slots.usersName.value;
    this.attributes['usersName'] = usersName;
    var usersGuess=this.event.request.intent.slots.usersGuess.value;
    this.attributes['usersGuess'] = usersGuess;

    speechOutput += "Your name is, " + usersName;

  },
    "AMAZON.HelpIntent": function() {
      speechOutput = "I'm going to ask you some questions, to be able to estimate how long you have to live. So just tell me when you're ready, to begin. ";
      this.response.speak(speechOutput).listen(reprompt);
      this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
      speechOutput = "Stopped";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
      speechOutput = "Cancelled";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    'Unhandled': function () {
      console.log("UNHANDLED");
    },
    'SessionEndedRequest': function() {
      speechOutput = "Session Ended";
      this.response.speak(speechOutput);
      console.log('session ended!');
      this.emit(':responseReady');
    }


}


exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = "amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17";
  alexa.dynamoDBTableName = 'HowKind';
  alexa.registerHandlers(handlers);
  alexa.execute();
};


function delegateSlotCollection(){
    if(process.env.debugFlag){
      console.log("in delegateSlotCollection")
      console.log("current dialogState: " + this.event.request.dialogState);
      console.log("current event object: " + JSON.stringify(this.event))
    };
      if (this.event.request.dialogState === "STARTED") {
        if(process.env.debugFlag){
            console.log("in Beginning");
            console.log("this.event.request.intent: " + JSON.stringify(this.event.request.intent));
          };
        var updatedIntent=this.event.request.intent;
        //optionally pre-fill slots: update the intent object with slot values for which
        //you have defaults, then return Dialog.Delegate with this updated intent
        // in the updatedIntent property
        this.emit(":delegate", updatedIntent);
      } else if (this.event.request.dialogState !== "COMPLETED") {
        if(process.env.debugFlag){console.log("in not completed")};
        // return a Dialog.Delegate directive with no updatedIntent property.
        this.emit(":delegate");
      } else {
        if(process.env.debugFlag){
          console.log("in completed")
          console.log("returning: "+ JSON.stringify(this.event.request.intent))
        };
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
      }
}
