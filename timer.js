(function() {
  "use strict";
  var start = moment.duration(15, "minutes");
  var interval = moment.duration(1, "second");
  var domTarget = document.getElementById("timer");
  var renderTimer = function() {
    domTarget.textContent = start.minutes() + "m" + " " + start.seconds() + "s";
    if (start.asSeconds() > 0) {
      start.subtract(interval);
      setTimeout(renderTimer, interval.asMilliseconds());
    }
  };
  renderTimer();
})();
