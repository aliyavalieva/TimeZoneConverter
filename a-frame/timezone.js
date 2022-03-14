//spacetime has a helper function to get the current time
function getTime(timeString) {
  var st = spacetime();
  st = st.time(timeString);
  return st;
}

//Use spacetime's helper to format the time
//https://github.com/spencermountain/spacetime#date-formatting
function displayTime(spacetimeDate) {
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
function convertTimeZone(spacetimeDate, timeZoneString) {
  var ianaName = parseTimeZone(timeZoneString);
  //If spacetime-informal cannot identify the time zone, it will return null. Our conversion will as well
  if (ianaName != null) {
    return spacetimeDate.goto(ianaName);
  } else {
    return null;
  }
}



