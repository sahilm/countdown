(function() {
  "use strict";
  var duration = moment.duration(minutes(), "hours");
  var interval = moment.duration(1, "second");
  var target = document.getElementById("timer");
  var tone = document.getElementById("tone");
  var timer = function() {
    target.innerHTML = renderDuration(duration);
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
    var template = '<span class="digit">$digit</span>'+
                   '<span class="sep">$sep</span>';

    var hours = function() {
      return template.replace("$digit", duration.hours())
                     .replace("$sep", "h");
    };

    var minutes = function() {
      return template.replace("$digit", duration.minutes())
                     .replace("$sep", "m");
    };

    var seconds = function() {
      return template.replace("$digit", duration.seconds())
                     .replace("$sep", "s");
    };

    var ret = [seconds()];
    if (duration.hours() > 0) {
      ret.unshift(hours(), minutes());
    } else if (duration.minutes() > 0) {
      ret.unshift(minutes());
    }
    return ret.join("");
  }

})();
