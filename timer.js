(function() {
  "use strict";
  var start = moment.duration(1, "minutes");
  var interval = moment.duration(1, "second");
  var domTarget = document.getElementById("timer");
  var tone = document.getElementById("tone");
  var renderTimer = function() {
    domTarget.textContent = start.minutes() + "m" + " " + start.seconds() + "s";
    if (start.asSeconds() > 0) {
      start.subtract(interval);
    } else {
      tone.play();
    }
    setTimeout(renderTimer, interval.asMilliseconds());
  };
  renderTimer();
})();
