(function() {
  "use strict";
  var start = moment.duration(1, "minutes");
  var interval = moment.duration(1, "second");
  var domTarget = document.getElementById("timer");
  var renderTimer = function() {
    domTarget.textContent = start.minutes() + "m" + " " + start.seconds() + "s";
    start.subtract(interval);
  };
  renderTimer();
  setInterval(renderTimer, interval.asMilliseconds());
})();
