'use strict';
const Alexa = require("alexa-sdk");
const APP_ID = 'amzn1.ask.skill.98519029-9c30-464a-832a-705dfb3789f5';
var AWS = require('aws-sdk');
// var googleUA = 'UA-104151044-2'; //tracking ID

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var ua = require('universal-analytics');
var gUA = ua('UA-104151044-3'); // Tracking-ID

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('8eaa60e48fa8e49d3198f6dbab4f00d8'); // Token


// ID ====== 'UA-104151044-3'
// TRACKING SIGNATURE ===  intentTrackingID.event("Event Category", "Event Action").send()


var speechOutput;
const welcomeOutput = "Hello, I'm going to ask you some questions to find out how kind you are. All you have to do, is say: yes. no. or, sometimes. Tell me to begin when you are ready to start. ";
var reprompt = "Just tell me when you're ready, to begin. ";
const DaysLeftIntro = [
  "Okay. ",
  "Great. ",
  "Nice. ",
  "Alright. ",
  "Excellent. "
];

var cardTitle = '';
var cardContent = '';
var imageObj = {
    smallImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/PolyRed-Final04+108.png',
    largeImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/PolyRed-Final04+512.png'
};

const handlers = {
  'LaunchRequest': function() {

    // Make sure this is a locally-scoped var within each intent function.
    // var intentTrackingID = ua(googleUA, {https: true});
    // intentTrackingID.pageview("/").send();

    // Declare the intentTrackingID's Google Tracking ID

    // ANALYTICS

    // Make sure this is a locally-scoped var within each intent function.

    // // report a blank value
    // gUA.event("invalid request","misunderstood statement").send();
    // mixpanel.track("user error", {result: "misunderstood statement"});

    // report a success
    var utteranceValue = "SessionEndedRequest";
    var utteranceData = ("intent: " + utteranceValue).toString();
    gUA.event("user query","successful query", {query: utteranceData}).send();
    mixpanel.track("Successful Launch", {query: utteranceData});


    ///////////////////////////////////////////////////////////////////////

    if(process.env.debugFlag){
      console.log('Launching LaunchRequest...');
      console.log("Starting TestIntent...");
    };
    this.response.speak(welcomeOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'TestIntent': function() {


    var filledSlots = delegateSlotCollection.call(this);
    console.log("filled slots: " + JSON.stringify(filledSlots));
    var speechOutput = randomPhrase(DaysLeftIntro);



      var userName=this.event.request.intent.slots.userName.value;
      this.attributes['userName'] = userName;
      var userGuess=this.event.request.intent.slots.userGuess.value;
      this.attributes['userGuess'] = userGuess;
      var questionOne=this.event.request.intent.slots.questionOne.value;
      this.attributes['questionOne'] = questionOne;
      var questionTwo=this.event.request.intent.slots.questionTwo.value;
      this.attributes['questionTwo'] = questionTwo;
      var questionThree=this.event.request.intent.slots.questionThree.value;
      this.attributes['questionThree'] = questionThree;
      var questionFour=this.event.request.intent.slots.questionFour.value;
      this.attributes['questionFour'] = questionFour;
      var questionFive=this.event.request.intent.slots.questionFive.value;
      this.attributes['questionFive'] = questionFive;
      var questionSix=this.event.request.intent.slots.questionSix.value;
      this.attributes['questionSix'] = questionSix;
      var questionSeven=this.event.request.intent.slots.questionSeven.value;
      this.attributes['questionSeven'] = questionSeven;
      var questionEight=this.event.request.intent.slots.questionEight.value;
      this.attributes['questionEight'] = questionEight;
      // var questionNine=this.event.request.intent.slots.questionNine.value;
      // this.attributes['questionNine'] = questionNine;
      // var questionTen=this.event.request.intent.slots.questionTen.value;
      // this.attributes['questionTen'] = questionTen;


      var result = 0;


      // Q1 = When you're unsure about another person's motives, do you assume that his/her motives are good until you have evidence otherwise?

      if(questionOne === "yes") {
        result += 1;
      } else if (questionOne === "no") {
        result -= 1;
      } else if (questionOne === "sometimes") {
        result += 0;
      } else {
        result -= 10;
      }

      // Q2 = Do you consider yourself to have a high degree of self respect?

      if(questionTwo === "yes") {
        result += 1;
      } else if (questionTwo === "no") {
        result -= 1;
      } else if (questionTwo === "sometimes") {
        result += 0;
      } else {
        result -= 10;
      }

      // Q3 = Are you always trying to be as honest as possible?

      if(questionThree === "yes") {
        result += 2;
      } else if (questionThree === "no") {
        result -= 1;
      } else if (questionThree === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q4 = Do you help out a friend, even if your friend doesn't return the favor?

      if(questionFour === "yes") {
        result += 2;
      } else if (questionFour === "no") {
        result -= 1;
      } else if (questionFour === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q5 = When people begin to gossip, do you make an effort to change the subject?

      if(questionFive === "yes") {
        result += 1;
      } else if (questionFive === "no") {
        result += 0;
      } else if (questionFive === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q6 = Do you find it difficult to forgive those who have wronged you?

      if(questionSix === "yes") {
        result -= 1;
      } else if (questionSix === "no") {
        result += 2;
      } else if (questionSix === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q7 = Do you listen patiently when someone says the same old story, or same old stale joke?

      if(questionSeven === "yes") {
        result += 2;
      } else if (questionSeven === "no") {
        result -= 1;
      } else if (questionSeven === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q8 = Do you consider yourself to have control over your temper and emotions?

      if(questionEight === "yes") {
        result += 2;
      } else if (questionEight === "no") {
        result -= 1;
      } else if (questionEight === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // if(parseInt(questionNine) === "yes") {
      //   result += 1;
      // } else if (parseInt(questionNine) === "no") {
      //   result -= 3;
      // } else if (parseInt(questionNine) === "sometimes") {
      //   result += 2;
      // } else {
      //   result -= 10;
      // }
      //
      // if(parseInt(questionTen) === "yes") {
      //   result += 1;
      // } else if (parseInt(questionTen) === "no") {
      //   result -= 3;
      // } else if (parseInt(questionTen) === "sometimes") {
      //   result += 2;
      // } else {
      //   result -= 10;
      // }

      var realResult = result;
      var capitalName = capitalize(userName);

      this.attributes["realResult"] = realResult;

      if (parseInt(result) > 10) {
        result = 10;
      } else if (parseInt(result) < 0) {
        result = 0;
      }

      this.attributes["result"] = result;
      // this.attributes["userName"] = userName.toString();

        console.log("realResult = " + realResult);
        console.log("result = " + result);
        console.log("userName = " + userName);
        console.log("questionOne: " + questionOne);
        console.log("questionTwo: " + questionTwo);
        console.log("questionThree: " + questionThree);
        console.log("questionFour: " + questionFour);
        console.log("questionFive: " + questionFive);
        console.log("questionSix: " + questionSix);
        console.log("questionSeven: " + questionSeven);
        console.log("questionEight: " + questionEight);


      speechOutput += "<break time=\".6s\"/>Okay " + userName + ". Your guess, was, " + userGuess + ", out of ten.<break time=\".8s\"/> But really, your kindness, is about " + result + ", out of ten. "

      if(result > 7) {
        speechOutput += "You're really kind! You should be proud of that.";
      } else if(result < 5) {
        speechOutput += "I think that you should work on being kind to others. Love is all we really have in this, extremely temporary life.";
      }


      if(result >= 7) {
        cardTitle = "You're Extremely Kind " + capitalName + "!";
      } else if (result < 7) {
        cardTitle = "You're Kind " + capitalName + "!"
      } else if (result > 3) {
        cardTitle = "You aren't very Kind " + capitalName + " :(";
      } else if (result <= 3) {
        cardTitle = "You need to work on your Kindness " + capitalName + "!";
      }


      cardContent = "(I'm really sorry if I spelled your name wrong, Alexa isn't great with names yet.)\n...\nHow kind you thought you were: " + userGuess + '/10\nHow kind you really are: ' + result + '/10\n...'+ '\nIf you enjoyed this skill, please rate it 5 stars in the Alexa skill store!\n...\n All you need to do is: \n1. Go to the "Skills" section on your Alexa app\n 2. Tap "Your Skills" in the top right corner\n3. Find "How Kind Am I" \n4. Scroll to the bottom and tap "Write a Review"\n5. Show support!\n...\n That would really help out, Thank You!.\n~\n Enjoy the present moment! :)'; +
      '\n...\n If you have the time please check out my other Alexa Skill, My Days Left, to calculate how many days you have left to live based on your habits.'

      this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);

      this.response.speak(speechOutput);
      this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
      speechOutput = "I'm going to ask you some questions, to be able to estimate how long you have to live. So just tell me when you're ready, to begin. ";
      this.response.speak(speechOutput).listen(reprompt);
      this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
      gUA.event("exist","session ended").send();
      mixpanel.track("session ended");
      speechOutput = "Stopped";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
      gUA.event("exist","session ended").send();
      mixpanel.track("session ended");
      speechOutput = "Cancelled";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    'Unhandled': function () {
      console.log("UNHANDLED");
    },
    'SessionEndedRequest': function() {
      // report a failure
      var utteranceValue = "SessionEndedRequest";
      var utteranceData = ("intent: " + utteranceValue).toString();
      gUA.event("user query","failed query", utteranceData).send();
      mixpanel.track("Failed Launch", {query: utteranceData});

      speechOutput = "Session Ended";
      this.response.speak(speechOutput);
      console.log('session ended!');
      this.emit(':responseReady');
    }
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.98519029-9c30-464a-832a-705dfb3789f5';
  alexa.dynamoDBTableName = 'TestingHowKind';
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

        // report a success
        var utteranceValue = "TestIntent";
        var utteranceData = ("intent: " + utteranceValue).toString();
        gUA.event("user query","successful query", {query: utteranceData}).send();
        mixpanel.track("Successful Test", {query: utteranceData});

        if(process.env.debugFlag){
          console.log("returning ANALYTICS!")
          console.log("in completed")
          console.log("returning: "+ JSON.stringify(this.event.request.intent))
        };
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
      }
}

function randomPhrase(array) {
  var i = 0;
  i = Math.floor(Math.random() * array.length);
  return(array[i]);
}

function readItem(obj, pastTips, callback) {
  var table = "Tips";
  var id = getRandomTipWithExclusions(totalTips, tipsHeard, obj).toString();
  var params = {
    TableName: table,
    Key:{
      "Id": id
    }
  };
  if(process.env.debugFlag){console.log("GetItem Params: ", JSON.stringify(params))};
  docClient.get(params, function(err, data) {
    if(err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err));
    } else {
      if(process.env.debugFlag){console.log("GetItem succeeded:", JSON.stringify(data))};
      //
      callback(obj, data['Item']);
    }
  });
}

function getRandomTipWithExclusions(lengthOfArray = 0, arrayOfIndexesToExclude, obj) {
	var rand = 0;
	if (arrayOfIndexesToExclude.length == lengthOfArray) {
		arrayOfIndexesToExclude = [];
		obj.tipsHeard = [];
		if(process.env.debugFlag){
      console.log('RESET TIPSHEARD')
      console.log('TIPSHEARD = ' + obj.tipsHeard)
    };
	}
	var min = Math.ceil(1);
  var max = Math.floor(lengthOfArray);
	while (rand == 0 || arrayOfIndexesToExclude.includes(rand)) {
		rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("random number from loop: " + rand);
	}
  return rand;
}

function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
