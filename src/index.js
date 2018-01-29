'use strict';
const Alexa = require("alexa-sdk");
const APP_ID = 'amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17'
var AWS = require('aws-sdk');
// var ua = require('universal-analytics');
// var googleUA = 'UA-104151044-2'; //tracking ID

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();
// var totalTips = process.env.TOTAL_TIP_COUNT;
// var tipsHeard = [];

var speechOutput;
const welcomeOutput = "Hello, I'm going to ask you some questions to find out how kind you are. All you have to do, is say: yes. no. or, sometimes. Tell me to begin when you are ready to start. ";
var reprompt = "Just tell me when you're ready, to begin. ";
const DaysLeftIntro = [
  "Okay. ",
  "Great. ",
  "Nice. ",
  "Alright. ",
  "Excellent. ",
  "Thank you! ",
  "Splendid! "
];

var cardTitle = '';
var cardContent = '';
var imageObj = {
    smallImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/APP_ICON.png',
    largeImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/PolyRed-Final02+512.png'
};

const handlers = {
  'LaunchRequest': function() {

    // Make sure this is a locally-scoped var within each intent function.
    // var intentTrackingID = ua(googleUA, {https: true});
    // Google Analytics
    // intentTrackingID.pageview("/").send();

    if(process.env.debugFlag){
      console.log('Launching LaunchRequest...')
      console.log('this.attributes["daysLeft"] = ' + this.attributes['daysLeft'])
    };
    // if(this.attributes['daysLeft'] !== undefined) {
    //   if(process.env.debugFlag){console.log('this.attributes["tipsHeard"] = ' + this.attributes["tipsHeard"])};
    //   tipsHeard = this.attributes["tipsHeard"];
    //   if (tipsHeard === undefined) {
    //     tipsHeard = [];
    //   }
    //   readItem(this, tipsHeard, function(obj, data) {
    //     if(process.env.debugFlag){console.log("data in readItem: " + data)};
    //
    //     tipsHeard.push(data['Id']);
    //     obj.attributes['tipsHeard'] = tipsHeard;
    //
    //     var average_YearsLeft = numberWithCommas(obj.attributes['averageYearsLeft']);
    //     var days_Left = numberWithCommas(obj.attributes['daysLeft']);
    //     var hoursLeft = numberWithCommas(average_YearsLeft*8760);
    //     var minutesLeft = numberWithCommas(average_YearsLeft*525600);
    //     var secondsLeft = numberWithCommas(average_YearsLeft*31557600);
    //
    //     cardTitle = 'Welcome back!\n';
    //     cardContent = 'Years left: ' + average_YearsLeft + '\nDays left: ' + days_Left + '\nHours left: ' + hoursLeft + '\nMinutes left: ' + minutesLeft + '\nSeconds left: ' + secondsLeft + '\n...\nHere is your tip: '+ data['tipSimple'] + '\n...\nIf you enjoyed this skill, please rate it 5 stars in the Alexa skill store!\n.\n All you need to do is: \n1. Go to the "Skills" section on your Alexa app\n 2. Tap "Your Skills" in the top right corner\n3. Find "My Years Left" \n4. Scroll to the bottom and tap "Write a Review"\n5. Show support! \n~\n Enjoy the present moment! :)';
    //
    //     obj.response.cardRenderer(cardTitle, cardContent, imageObj);
    //     obj.response.speak("Welcome back, you have " + obj.attributes['daysLeft'] + " days left to live." +
    //       " Here is a tip, to help you live a longer and healthier life. " + data['tip'] + '<break time="1s"/> I added this tip, and more information, on your Alexa skill.<break time=".6s"/>' + " Please don't be afraid to come back for more tips." +  '<break time=".6s"/>Thank you!');
    //     obj.emit(':responseReady');
    //
    //     if(process.env.debugFlag){
    //       console.log("Tips so far: " + tipsHeard)
    //       console.log("TOTAL TIPS HEARD: " + tipsHeard.length)
    //     };
    //   });
    // if (this.attributes['daysLeft'] == undefined) {
    //   if(process.env.debugFlag){}
    //
    // };
    console.log("Starting TestIntent...")
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
      // this.attributes['questionSix'] = questionSix;
      // var questionSeven=this.event.request.intent.slots.questionSeven.value;
      // this.attributes['questionSeven'] = questionSeven;
      // var questionEight=this.event.request.intent.slots.questionEight.value;
      // this.attributes['questionEight'] = questionEight;
      // var questionNine=this.event.request.intent.slots.questionNine.value;
      // this.attributes['questionNine'] = questionNine;
      // var questionTen=this.event.request.intent.slots.questionTen.value;
      // this.attributes['questionTen'] = questionTen;


      var result = 0;
      // var today = new Date();
      // var currentDate = today.getFullYear() + '-'
      // + (today.getMonth()+1) + '-' + today.getDate();
      // var age = parseInt(currentDate) - parseInt(dateOfBirth);
      // var bodyMassIndex = (parseInt(weight)*703)/(parseInt(height)*parseInt(height));


      // Q1 = Do you listen patiently, when someone says the same tired old story, or the same stale joke?

      if(questionOne === "yes") {
        result += 3;
      } else if (questionOne === "no") {
        result -= 1;
      } else if (questionOne === "sometimes") {
        result += 2;
      } else {
        result -= 10;
      }

      // Q2 = When people begin to gossip, do you make strenuous efforts to change the subject quickly?

      if(questionTwo === "yes") {
        result += 2;
      } else if (questionTwo === "no") {
        result -= 3;
      } else if (questionTwo === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q3 = When someone insults you, do you (before you respond, to the insult) call to mind how many times God has forgiven you, and then resolve to be just as forgiving?

      if(questionThree === "yes") {
        result += 1;
      } else if (questionThree === "no") {
        result -= 3;
      } else if (questionThree === "sometimes") {
        result += 2;
      } else {
        result -= 10;
      }

      // Q4 = When you're not sure about another person's motives, do you assume that his motives are good until you have evidence otherwise?

      if(questionFour === "yes") {
        result += 2;
      } else if (questionFour === "no") {
        result -= 1;
      } else if (questionFour === "sometimes") {
        result += 1;
      } else {
        result -= 10;
      }

      // Q5 = Do you make efforts to be reconciled with persons who have wronged you?

      if(questionFive === "yes") {
        result += 4;
      } else if (questionFive === "no") {
        result -= 2;
      } else if (questionFive === "sometimes") {
        result += 2;
      } else {
        result -= 10;
      }

      // if(parseInt(questionSix) === "yes") {
      //   result += 1;
      // } else if (parseInt(questionSix) === "no") {
      //   result -= 3;
      // } else if (parseInt(questionSix) === "sometimes") {
      //   result += 2;
      // } else {
      //   result -= 10;
      // }
      //
      // if(parseInt(questionSeven) === "yes") {
      //   result += 1;
      // } else if (parseInt(questionSeven) === "no") {
      //   result -= 3;
      // } else if (parseInt(questionSeven) === "sometimes") {
      //   result += 2;
      // } else {
      //   result -= 10;
      // }
      //
      // if(parseInt(questionEight) === "yes") {
      //   result += 1;
      // } else if (parseInt(questionEight) === "no") {
      //   result -= 3;
      // } else if (parseInt(questionEight) === "sometimes") {
      //   result += 2;
      // } else {
      //   result -= 10;
      // }
      //
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


      //////////////////////////////////////////////////////////
      // var averageYearsLeft = numberWithCommas((yearsLeft) + (Math.round((87 - age))));
      // var daysLeft = numberWithCommas(averageYearsLeft*365);
      // var hoursLeft = numberWithCommas(averageYearsLeft*8760);
      // var minutesLeft = numberWithCommas(averageYearsLeft*525600);
      // var secondsLeft = numberWithCommas(averageYearsLeft*31557600);
      // if(this.attributes['tipsHeard'] !== undefined) {
      //   tipsHeard = this.attributes["tipsHeard"];
      //   if (tipsHeard === undefined) {
      //     tipsHeard = [];
      //   }
      // }
      // result=this.event.request.intent.slots.result.value;
      // this.attributes['result'] = result;

      if (parseInt(result) > 10) {
        result = 10;
      } else if (parseInt(result) < 0) {
        result = 0;
      }

      this.attributes["result"] = result;
      // this.attributes["userName"] = userName.toString();

        console.log("result = " + result);
        console.log("userName = " + userName);
        console.log("questionOne: " + questionOne);
        console.log("questionTwo: " + questionTwo);
        console.log("questionThree: " + questionThree);
        console.log("questionFour: " + questionFour);
        console.log("questionFive: " + questionFive);

      speechOutput += "<break time=\".6s\"/>Okay " + userName + ". Your guess, was, " + userGuess + ", out of ten.<break time=\".8s\"/> But really, your kindness, is about " + result + ", out of ten. "

      // speechOutput += "If you would like to hear a tip, simply start the skill again.<break time=\"1s\"/> I'm here to help you.<break time=\".3s\"/>I want you to use the rest of your days wisely, <break time=\".3s\"/> and I hope that you do.<break time=\"1s\"/> Thank you."

      //===================== CARD INFORMATION =======================

      if(result >= 7) {
        cardTitle = "You're Extremely Kind!";
      } else if (result < 7) {
        cardTitle = "You're Kind!";
      } else if (result > 3) {
        cardTitle = "You aren't very Kind :(";
      } else if (result <= 3) {
        cardTitle = "You need to work on your Kindness!";
      }


      cardContent = 'How kind you thought you were: ' + userGuess + '/10\nHow kind you really are: ' + result + '/10\n...' + '\nIf you enjoyed this skill, please rate it 5 stars in the Alexa skill store. That would really help out, Thank you!' + '\n...' + '\nHere are results are based off of the answers you provided: ' + '\nDo you listen patiently, when someone says the same tired old story, or the same stale joke? = ' + questionOne + '\nWhen people begin to gossip, do you make strenuous efforts to change the subject quickly? = ' + questionTwo + '\nWhen someone insults you, do you (before you respond, to the insult) call to mind how many times God has forgiven you, and then resolve to be just as forgiving? = ' + questionThree + "\nWhen you're not sure about another person's motives, do you assume that his motives are good until you have evidence otherwise? = " + questionFour + '\nDo you make efforts to be reconciled with persons who have wronged you? = ' + questionFive + '\n...\n If you have the time please check out my other Alexa Skill, My Days Left, to calculate how many days you have left to live based on your habits.'

      this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);

      // ================ DYNAMO READ FUNCTION ==========================
          // I'LL USE THIS FOR userName TO SEE IF USER IS NEW OR NOT

      // readItem(this, tipsHeard, function(obj, data) {
      //   tipsHeard.push(data['Id']);
      //   obj.attributes["tipsHeard"] = tipsHeard;
      //   if(process.env.debugFlag){console.log("data['tip']: " + data['tip'])};
      //
      //   // obj.emit(":tell", "Okay." + data['tip'] + " <break time=\".6s\"/>If you would like to hear more tips," +
      //   // "simply start the skill again.<break time=\"1s\"/> I'm here to help.<break time=\".3s\"/>I want you to use " +
      //   // "the rest of your days wisely, <break time=\".3s\"/> and I hope that you do.<break time=\"1s\"/> Thank you.");
      //   if(process.env.debugFlag){console.log("at the end of the second read item = " + tipsHeard)};
      // });

      if(process.env.debugFlag){console.log("tipsHeard after: " + tipsHeard)};
      this.response.speak(speechOutput);
      this.emit(":responseReady");
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
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17';
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

function numberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
