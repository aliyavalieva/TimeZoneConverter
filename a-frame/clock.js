AFRAME.registerComponent("clock", {
  schema: {
  },

  init: function () {
    //Create a new element, set 
    this.titleEl = document.createElement("a-text");
    this.titleEl.setAttribute("position", { x: 1, y: 0, z: 0 });
    this.titleEl.setAttribute("color", "#00ff00");
    this.titleEl.setAttribute("font", "sourcecodepro");
    this.titleEl.setAttribute("value", "Current time "+displayTime(now));

    this.el.appendChild(this.titleEl);
    this.titleE2 = document.createElement("a-text");
    this.titleE2.setAttribute("position", { x: 1, y: 0, z: 5 });
    this.titleE2.setAttribute("color", "#00ff00");
    this.titleE2.setAttribute("font", "sourcecodepro");
    this.titleE2.setAttribute("value", "Current time2 "+displayTime(convertTimeZone(now, "London")));

    this.el.appendChild(this.titleE2);

    //TODO: Use helper functions in timezone.js to display the current time and support converting time zones
    //For implementing interactivity, you may find .addEventListener() useful
    //https://aframe.io/docs/1.2.0/introduction/interactions-and-controllers.html#events
  },

  tick: function () {
  },
});

var now = spacetime.now();

console.log("It is currently " + displayTime(now) + " locally");
console.log(
  "It is currently " +
    displayTime(convertTimeZone(now, "London")) +
    " in London"
);
console.log(
  "2:42pm in local time is " +
    displayTime(convertTimeZone(getTime("2:42pm"), "Hawaii")) +
    " in Hawaii"
);
