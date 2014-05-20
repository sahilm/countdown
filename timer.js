(function() {
  "use strict";
  var duration = moment.duration(minutes(), "minutes");
  var interval = moment.duration(1, "second");
  var target = document.getElementById("timer");
  var tone = document.getElementById("tone");
  var timer = function() {
    target.textContent = renderDuration(duration);
    if (duration.asSeconds() > 0) {
      duration.subtract(interval);
    } else {
      tone.play();
    }
    setTimeout(timer, interval.asMilliseconds());
  };

  timer();

  function minutes() {
    var matches = window.location.search.match(/(m|minutes)=(\d+)/);
    return matches && matches[2] ? parseInt(matches[2]) : 15;
  }

  function renderDuration(duration) {
    var hours = function() {
      return duration.hours() + "h";
    };

    var minutes = function() {
      return duration.minutes() + "m";
    };

    var seconds = function() {
      return duration.seconds() + "s";
    };

    var ret = [seconds()];
    if (duration.hours() > 0) {
      ret.unshift(hours(), minutes());
    } else if (duration.minutes() > 0) {
      ret.unshift(minutes());
    }
    return ret.join(" ");
  }

})();
