(function() {
  "use strict";
  var start = moment.duration(minutes(), "minutes");
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

  function minutes() {
    var param = window.location.search.match(/minutes=(\d+)/);
    return param && param[1] ? parseInt(param[1]) : 15;
  }

})();
