(function () {
  "use strict";
  var timerElement = document.getElementById("timer");
  var duration = parseDuration();
  var interval = moment.duration(1, "second");
  var tone = document.getElementById("tone");
  timer();

  d(document).on("click", function () {
    timerElement.classList.remove("editing");
    duration = parseDuration();
  });

  d(timerElement).on("click", "digit", function (e) {
    if (!timerElement.classList.contains("editing")) {
      timerElement.classList.add("editing");
      timerElement.innerHTML = renderDuration({ duration: duration, editing: true});
    }
    e.stopPropagation();
  });

  d(timerElement).on("keyup", "digit", function () {

  });

  function timer() {
    var editing = timerElement.classList.contains("editing");
    if (editing) {
      setTimeout(timer, 100);
    }
    else {
      timerElement.innerHTML = renderDuration({ duration: duration, editing: editing});
      if (duration.asSeconds() > 0) {
        duration.subtract(interval);
      } else {
        tone.play();
      }
      setTimeout(timer, interval.asMilliseconds());
    }
  }

  function parseDuration() {
    var digitElements = timerElement.querySelectorAll(".digit");
    if (digitElements.length > 0) {
      var moments = [];
      for (var i = 0; i < digitElements.length; i++) {
        var digit = digitElements[i].innerHTML;
        var unit = digitElements[i].getAttribute("data-unit");
        moments.push(moment.duration(parseInt(digit), unit));
      }
      return moments.reduce(function (m1, m2) {
        return m1.add(m2);
      });
    } else {
      return moment.duration(5, "minutes");
    }
  }

  function renderDuration(opts) {
    var duration = opts.duration;
    var editing = opts.editing;

    var template = function () {
      var t = '<span class="digit" data-unit="$unit" ' +
        'contenteditable="$editable">$digit</span>' +
        '<span class="sep">$sep</span>';
      return t.replace("$editable", editing);
    };

    var hours = function () {
      return template().replace("$digit", duration.hours())
        .replace("$sep", "h")
        .replace("$unit", "hours");
    };

    var minutes = function () {
      return template().replace("$digit", duration.minutes())
        .replace("$sep", "m")
        .replace("$unit", "minutes");
    };

    var seconds = function () {
      return template().replace("$digit", duration.seconds())
        .replace("$sep", "s")
        .replace("$unit", "seconds");
    };

    if (editing) {
      return [hours(), minutes(), seconds()].join("");
    } else {
      var ret = [seconds()];
      if (duration.hours() > 0) {
        ret.unshift(hours(), minutes());
      } else if (duration.minutes() > 0) {
        ret.unshift(minutes());
      }
      return ret.join("");
    }

  }

  function d(domElement) {
    return {
      on: function (event, classNameOrFn, fn) {
        var filter = function (e) {
          if (e.target.classList.contains(classNameOrFn)) {
            return fn(e);
          }
        };
        var args = arguments;
        domElement.addEventListener(event, function (e) {
          if (args.length < 3) {
            fn = classNameOrFn;
            return fn(e);
          } else {
            return filter(e);
          }
        });
        return domElement;
      }
    };
  }
})();