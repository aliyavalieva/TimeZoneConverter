AFRAME.registerComponent("clock", {
  schema: {
  },

  init: function () {
    //Create a new element, set 
    this.titleEl = document.createElement("a-text");
    this.titleEl.setAttribute("position", { x: 1, y: -1, z: -4 });
    this.titleEl.setAttribute("color", "#00ff00");
    this.titleEl.setAttribute("font", "sourcecodepro");
    this.titleEl.setAttribute("value", "Pacific Standard Time - "+displayTime(now));
    this.titleEl.setAttribute('visible', false);

    this.el.appendChild(this.titleEl);
    this.titleE2 = document.createElement("a-text");
    this.titleE2.setAttribute("position", { x: 1, y: -1, z: -2 });
    this.titleE2.setAttribute("color", "#00ff00");
    this.titleE2.setAttribute("font", "sourcecodepro");
    this.titleE2.setAttribute("value", "Greenwich Mean Time (London) - "+displayTime(convertTimeZone(now, "London")));
    this.titleE2.setAttribute('visible', false);
    this.el.appendChild(this.titleE2);

    this.titleE3 = document.createElement("a-text");
    this.titleE3.setAttribute("position", { x: 1, y: -1, z: 0 });
    this.titleE3.setAttribute("color", "#00ff00");
    this.titleE3.setAttribute("font", "sourcecodepro");
    this.titleE3.setAttribute("value", "Eastern Daylight Time (New York) - "+displayTime(convertTimeZone(now, "New York")));
    this.titleE3.setAttribute('visible', false);
    this.el.appendChild(this.titleE3);

    this.button = document.createElement("a-text");
    this.button.setAttribute("position", { x: 1, y: 0, z: 0 });
    this.button.setAttribute("color", "#00ff00");
    this.button.setAttribute("font", "sourcecodepro");
    this.button.setAttribute("value", "Display time in New York");
    var el = this.titleE3;
    this.button.addEventListener('click', function(){
      el.setAttribute('visible', !el.getAttribute('visible'));
    });
    this.el.appendChild(this.button);
    
    this.button2 = document.createElement("a-text");
    this.button2.setAttribute("position", { x: 1, y: 0, z: -2 });
    this.button2.setAttribute("color", "#00ff00");
    this.button2.setAttribute("font", "sourcecodepro");
    this.button2.setAttribute("value", "Display time in London");
    var e2 = this.titleE2;
    this.button2.addEventListener('click', function(){
      e2.setAttribute('visible', !e2.getAttribute('visible'));
    });
    this.el.appendChild(this.button2);

    this.button3 = document.createElement("a-text");
    this.button3.setAttribute("position", { x: 1, y: 0, z: -4 });
    this.button3.setAttribute("color", "#00ff00");
    this.button3.setAttribute("font", "sourcecodepro");
    this.button3.setAttribute("value", "Display Current time");
    var e3 = this.titleEl;
    this.button3.addEventListener('click', function(){
      e3.setAttribute('visible', !e3.getAttribute('visible'));
    });
    this.el.appendChild(this.button3);
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
