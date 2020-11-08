
      var _rakuten_automate = {
        accountKey:
          "f3651b2373ae0977590717d3c986f5e34808076cde3ef2146a69ad03bd108aa9",
        u1: "",
        snippetURL:
          "/api/rakuten",
        automateURL: "https://automate.linksynergy.com",
        widgetKey: "jCNaUA2P4qYwibMKDWA88TlywE9bq1D5",
        aelJS: null,
        useDefaultAEL: false,
        loaded: false,
        events: []
      };
      var ael = window.addEventListener;
      window.addEventListener = function(a, b, c, d) {
        "click" !== a && _rakuten_automate.useDefaultAEL
          ? ael(a, b, c)
          : _rakuten_automate.events.push({
              type: a,
              handler: b,
              capture: c,
              rakuten: d
            });
      };
      _rakuten_automate.links = {};
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", _rakuten_automate.snippetURL, !0);
      httpRequest.timeout = 5e3;
      httpRequest.ontimeout = function() {
        if (!_rakuten_automate.loaded) {
          for (let i = 0; i < _rakuten_automate.events.length; i++) {
            var a = _rakuten_automate.events[i];
            ael(a.type, a.handler, a.capture);
          }
          _rakuten_automate.useDefaultAEL = !0;
        }
      };
      httpRequest.onreadystatechange = function() {
        httpRequest.readyState === XMLHttpRequest.DONE &&
          200 === httpRequest.status &&
          (eval(httpRequest.responseText), _rakuten_automate.run(ael));
      };
      httpRequest.send(null);