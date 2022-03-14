
const spacetime = require('spacetime');
const informal = require('spacetime-informal')


//spacetime has a helper function to get the current time
function getTime(timeString) {
  var st = spacetime();
  st = st.time(timeString);
  return st;
}

//Use spacetime's helper to format the time
//https://github.com/spencermountain/spacetime#date-formatting
module.exports.displayTime = (spacetimeDate) => {
    console.log("INSIDE TIMEZONE displayTime: " + spacetimeDate)
  return spacetimeDate.format("time");
}

//Parse time zone string using spacetime's informal string parsing, because we humans are goofballs.
//https://github.com/spencermountain/spacetime-informal
//Returns the IANA name for a time zone string
function parseTimeZone(timeZoneString) {
  return informal.find(timeZoneString);
}

//Convert time zone using spacetime's goto function
//https://github.com/spencermountain/spacetime#timezones
module.exports.convertTimeZone = (spacetimeDate, timeZoneString) => {
  console.log("INSIDE TIMEZONE converter: " + spacetimeDate)

//   var ianaName = parseTimeZone(timeZoneString);
  var ianaName = informal.find(timeZoneString);

  console.log("INSIDE TIMEZONE converter, ianaName: " + ianaName)

  //If spacetime-informal cannot identify the time zone, it will return null. Our conversion will as well
  if (ianaName !== null) {
    return spacetimeDate.goto(ianaName);
  } else {
    return null;
  }
}



