//Starter code for IN4MATX 133, Assignment 5, Alexa framework

const Alexa = require("ask-sdk-core");
const util = require("./util");
const spacetime = require("spacetime");
const timezoneUtil = require("./timezone");

const LookupCityTimeApiHandler = {
  canHandle(handlerInput) {
    return util.isApiRequest(handlerInput, "LookupCityTime");
  },
  async handle(handlerInput) {
    //Timezone code source: https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2019/07/getting-started-with-cake-time-using-the-alexa-settings-api-to-look-up-the-device-time-zone
    // TODO get timezone of the device

    let response = {
      apiResponse: {
        // TODO
      },
    };
    return response;
  },
};

const LookupTimeNowApiHandler = {
  canHandle(handlerInput) {
    return util.isApiRequest(handlerInput, "LookupTimeNow");
  },
  async handle(handlerInput) {
    //Timezone code source: https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2019/07/getting-started-with-cake-time-using-the-alexa-settings-api-to-look-up-the-device-time-zone

    // TODO get timezone of the device dynamically
    let userTimeZone = "America/Los_Angeles";

    console.log("userTimeZone is " + userTimeZone);

    console.log(
      "Api Request [LookupCityTime]: ",
      JSON.stringify(handlerInput.requestEnvelope.request, null, 2)
    );

    //get the current time
    let now = spacetime.now(userTimeZone);

    console.log("Api  [LookupTimeNow] time now: ", now.time());

    let response = {
      apiResponse: {
        // TODO
        time: "",
      },
    };
    console.log(
      "Api Response [LookupTimeNow]: ",
      JSON.stringify(response, null, 2)
    );
    return response;
  },
};
/**
 * FallbackIntentHandler - Handle all other requests to the skill
 *
 * @param handlerInput
 * @returns response
 *
 * See https://developer.amazon.com/en-US/docs/alexa/conversations/handle-api-calls.html
 */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name !== "LookupCityTimeApiHandler" &&
      request.intent.name !== "LookupTimeNowApiHandler"
    );
  },
  handle(handlerInput) {
    const intentName = handlerInput.requestEnvelope.request.intent.name;
    console.log("In catch all intent handler. Intent invoked: " + intentName);
    const speechOutput =
      "Hmm, I'm not sure. You can ask me what time it is right now or in another city. What would you like to do?";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};
// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
// *****************************************************************************
// These simple interceptors just log the incoming and outgoing request bodies to assist in debugging.

const LogRequestInterceptor = {
  process(handlerInput) {
    console.log(
      `REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
  },
};

const LogResponseInterceptor = {
  process(handlerInput, response) {
    console.log(`RESPONSE = ${JSON.stringify(response)}`);
  },
};
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LogRequestInterceptor)
  .addResponseInterceptors(LogResponseInterceptor)
  .addRequestHandlers(
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    LookupCityTimeApiHandler,
    LookupTimeNowApiHandler
  )
  //  .withCustomUserAgent('reference-skills/intro-to-alexa-conversations/v1')
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
