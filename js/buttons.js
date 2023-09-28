(function () {
  "use strict";

  // Constants
  var o = window.document,
    e = o.location,
    t = window.Math,
    r = window.HTMLElement,
    a = window.XMLHttpRequest,
    n = "github-button",
    i = "https://buttons.github.io/buttons.html",
    c = "github.com",
    l = "https://api." + c,
    d = a && "prototype" in a && "withCredentials" in a.prototype,
    s = d && r && "attachShadow" in r.prototype && !("prototype" in r.prototype.attachShadow);

  // Helper Functions
  var u = function (arr, callback) {
    for (var t = 0, r = arr.length; t < r; t++) {
      callback(arr[t]);
    }
  };

  var f = function (o) {
    return function (e, t, r) {
      var a = o.createElement(e);
      if (t !== null) {
        for (var n in t) {
          var i = t[n];
          if (i !== null) {
            if (a[n] !== null) {
              a[n] = i;
            } else {
              a.setAttribute(n, i);
            }
          }
        }
      }
      if (r !== null) {
        u(r, function (e) {
          a.appendChild(typeof e === "string" ? o.createTextNode(e) : e);
        });
      }
      return a;
    };
  };

  var h = f(o);

  var g = function (callback) {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        callback.apply(this, arguments);
      }
    };
  };

  var b = function (obj, prop) {
    return {}.hasOwnProperty.call(obj, prop);
  };

  var p = function (str) {
    return ("" + str).toLowerCase();
  };

  var v = function (str, separator, equalSign, decodeFunc) {
    separator = separator || "&";
    equalSign = equalSign || "=";
    decodeFunc = decodeFunc || window.decodeURIComponent;
    var params = {};
    u(str.split(separator), function (item) {
      if (item !== "") {
        var parts = item.split(equalSign);
        params[decodeFunc(parts[0])] = parts[1] !== undefined ? decodeFunc(parts.slice(1).join(equalSign)) : undefined;
      }
    });
    return params;
  };

  // ... (continue organizing the code)
})();
