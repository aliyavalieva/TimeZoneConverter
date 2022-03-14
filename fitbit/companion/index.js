//import the spacetime and spacetime-informal libraries manually
//(Fitbit apps don't support loading packages from npm due to space constraints)
import './spacetime.min.js';
import './spacetime-informal.min.js';

//Import the helper functions from timezone.js
import {getTime, displayTime, parseTimeZone, convertTimeZone} from './timezone.js';

import * as messaging from "messaging";

//Return data back, adding the response
function returnData(data, response) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
  	data.response = response;
    messaging.peerSocket.send(data);
  } else {
    console.error("Error: Connection is not open");
  }
}

//Use spacetime libraries (and timezone.js helpers) to display current time
function getCurrentLocalTime() {
	return displayTime(spacetime.now());
}

//Use spacetime libraries (and timezone.js helpers) to convert the passed time based on the timezone string
function convertTime(time, timeZoneString) {
	return displayTime(convertTimeZone(getTime(time), timeZoneString));
}

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data && evt.data.command === "currentLocalTime") {
    returnData(evt.data, getCurrentLocalTime());
  } else if (evt.data && evt.data.command === "convertTime") {
  	returnData(evt.data, convertTime(evt.data.time, evt.data.timeZoneString));
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});