const themeToggle = document.querySelector(".theme-toggle"),
  chosenTheme = window.localStorage && window.localStorage.getItem("theme"),
  chosenThemeIsDark = chosenTheme == "dark",
  chosenThemeIsLight = chosenTheme == "light";
function detectOSColorTheme() {
  chosenThemeIsDark
    ? document.documentElement.setAttribute("data-theme", "dark")
    : chosenThemeIsLight
    ? document.documentElement.setAttribute("data-theme", "light")
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? document.documentElement.setAttribute("data-theme", "dark")
    : document.documentElement.setAttribute("data-theme", "light");
}
function switchTheme(a) {
  chosenThemeIsDark ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark"), detectOSColorTheme(), window.location.reload();
}
themeToggle
  ? (themeToggle.addEventListener("click", switchTheme, !1),
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (a) => a.matches && detectOSColorTheme()),
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (a) => a.matches && detectOSColorTheme()),
    detectOSColorTheme())
  : localStorage.removeItem("theme");
const menuTrigger = document.querySelector(".menu-trigger"),
  menu = document.querySelector(".menu"),
  mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth"),
  isMobile = () => window.matchMedia(mobileQuery).matches,
  isMobileMenu = () => {
    menuTrigger && menuTrigger.classList.toggle("hidden", !isMobile()), menu && menu.classList.toggle("hidden", isMobile());
  };
isMobileMenu(), menuTrigger && menuTrigger.addEventListener("click", () => menu && menu.classList.toggle("hidden")), window.addEventListener("resize", isMobileMenu);
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function (b) {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
      j = 0,
      a = {
        manual: b.Prism && b.Prism.manual,
        disableWorkerMessageHandler: b.Prism && b.Prism.disableWorkerMessageHandler,
        util: {
          encode: function b(a) {
            return a instanceof c
              ? new c(a.type, b(a.content), a.alias)
              : Array.isArray(a)
              ? a.map(b)
              : a
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (a) {
            return Object.prototype.toString.call(a).slice(8, -1);
          },
          objId: function (a) {
            return a.__id || Object.defineProperty(a, "__id", { value: ++j }), a.__id;
          },
          clone: function g(c, b) {
            var d, e, f;
            switch (((b = b || {}), a.util.type(c))) {
              case "Object":
                if (((e = a.util.objId(c)), b[e])) return b[e];
                for (f in ((d = {}), (b[e] = d), c)) c.hasOwnProperty(f) && (d[f] = g(c[f], b));
                return d;
              case "Array":
                return (
                  (e = a.util.objId(c)),
                  b[e]
                    ? b[e]
                    : ((d = []),
                      (b[e] = d),
                      c.forEach(function (a, c) {
                        d[c] = g(a, b);
                      }),
                      d)
                );
              default:
                return c;
            }
          },
          getLanguage: function (a) {
            for (; a && !e.test(a.className); ) a = a.parentElement;
            return a ? (a.className.match(e) || [, "none"])[1].toLowerCase() : "none";
          },
          currentScript: function () {
            var b, a, c;
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (d) {
              if (((b = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(d.stack) || [])[1]), b)) {
                a = document.getElementsByTagName("script");
                for (c in a) if (a[c].src == b) return a[c];
              }
              return null;
            }
          },
          isActive: function (a, b, d) {
            for (var e = "no-" + b, c; a; ) {
              if (((c = a.classList), c.contains(b))) return !0;
              if (c.contains(e)) return !1;
              a = a.parentElement;
            }
            return !!d;
          },
        },
        languages: {
          extend: function (e, b) {
            var c = a.util.clone(a.languages[e]),
              d;
            for (d in b) c[d] = b[d];
            return c;
          },
          insertBefore: function (f, i, d, e) {
            var h = (e = e || a.languages)[f],
              c = {},
              b,
              g,
              j;
            for (b in h)
              if (h.hasOwnProperty(b)) {
                if (b == i) for (g in d) d.hasOwnProperty(g) && (c[g] = d[g]);
                d.hasOwnProperty(b) || (c[b] = h[b]);
              }
            return (
              (j = e[f]),
              (e[f] = c),
              a.languages.DFS(a.languages, function (a, b) {
                b === j && a != f && (this[a] = c);
              }),
              c
            );
          },
          DFS: function i(f, g, j, c) {
            var e, d, b, h;
            (c = c || {}), (e = a.util.objId);
            for (d in f)
              f.hasOwnProperty(d) &&
                (g.call(f, d, f[d], j || d),
                (b = f[d]),
                (h = a.util.type(b)),
                "Object" !== h || c[e(b)] ? "Array" !== h || c[e(b)] || ((c[e(b)] = !0), i(b, g, d, c)) : ((c[e(b)] = !0), i(b, g, null, c)));
          },
        },
        plugins: {},
        highlightAll: function (b, c) {
          a.highlightAllUnder(document, b, c);
        },
        highlightAllUnder: function (d, e, f) {
          var b = { callback: f, container: d, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' },
            c,
            g;
          a.hooks.run("before-highlightall", b), (b.elements = Array.prototype.slice.apply(b.container.querySelectorAll(b.selector))), a.hooks.run("before-all-elements-highlight", b);
          for (c, g = 0; (c = b.elements[g++]); ) a.highlightElement(c, !0 === e, b.callback);
        },
        highlightElement: function (d, l, f) {
          var g = a.util.getLanguage(d),
            k = a.languages[g],
            h,
            c,
            j;
          (d.className = d.className.replace(e, "").replace(/\s+/g, " ") + " language-" + g),
            (h = d.parentElement),
            h && "pre" === h.nodeName.toLowerCase() && (h.className = h.className.replace(e, "").replace(/\s+/g, " ") + " language-" + g),
            (c = { element: d, language: g, grammar: k, code: d.textContent });
          function i(b) {
            (c.highlightedCode = b), a.hooks.run("before-insert", c), (c.element.innerHTML = c.highlightedCode), a.hooks.run("after-highlight", c), a.hooks.run("complete", c), f && f.call(c.element);
          }
          if ((a.hooks.run("before-sanity-check", c), !c.code)) return a.hooks.run("complete", c), void (f && f.call(c.element));
          a.hooks.run("before-highlight", c),
            c.grammar
              ? l && b.Worker
                ? ((j = new Worker(a.filename)),
                  (j.onmessage = function (a) {
                    i(a.data);
                  }),
                  j.postMessage(JSON.stringify({ language: c.language, code: c.code, immediateClose: !0 })))
                : i(a.highlight(c.code, c.grammar, c.language))
              : i(a.util.encode(c.code));
        },
        highlight: function (d, e, f) {
          var b = { code: d, grammar: e, language: f };
          return a.hooks.run("before-tokenize", b), (b.tokens = a.tokenize(b.code, b.grammar)), a.hooks.run("after-tokenize", b), c.stringify(a.util.encode(b.tokens), b.language);
        },
        tokenize: function (g, d) {
          var e = d.rest,
            i,
            b;
          if (e) {
            for (i in e) d[i] = e[i];
            delete d.rest;
          }
          return (
            (b = new k()),
            f(b, b.head, g),
            (function K(y, j, v, J, I, m) {
              var n, o, p, e, z, D, C, H, G, A, b, d, k, i, u, t, F, g, q, s, w, B, x, r, E;
              for (n in v)
                if (v.hasOwnProperty(n) && v[n]) {
                  (o = v[n]), (o = Array.isArray(o) ? o : [o]);
                  for (p = 0; p < o.length; ++p) {
                    if (m && m.cause == n + "," + p) return;
                    (e = o[p]),
                      (z = e.inside),
                      (D = !!e.lookbehind),
                      (C = !!e.greedy),
                      (H = e.alias),
                      C && !e.pattern.global && ((G = e.pattern.toString().match(/[imsuy]*$/)[0]), (e.pattern = RegExp(e.pattern.source, G + "g")));
                    for (A = e.pattern || e, b = J.next, d = I; b !== j.tail && !(m && d >= m.reach); d += b.value.length, b = b.next) {
                      if (((k = b.value), j.length > y.length)) return;
                      if (!(k instanceof c)) {
                        if (((u = 1), C)) {
                          if (!(i = h(A, d, y, D))) break;
                          (t = i.index), (F = i.index + i[0].length), (g = d);
                          for (g += b.value.length; g <= t; ) (b = b.next), (g += b.value.length);
                          if (((g -= b.value.length), (d = g), b.value instanceof c)) continue;
                          for (q = b; q !== j.tail && (g < F || "string" == typeof q.value); q = q.next) u++, (g += q.value.length);
                          u--, (k = y.slice(d, g)), (i.index -= d);
                        } else if (!(i = h(A, 0, k, D))) continue;
                        (t = i.index),
                          (s = i[0]),
                          (w = k.slice(0, t)),
                          (B = k.slice(t + s.length)),
                          (x = d + k.length),
                          m && x > m.reach && (m.reach = x),
                          (r = b.prev),
                          w && ((r = f(j, r, w)), (d += w.length)),
                          l(j, r, u),
                          (E = new c(n, z ? a.tokenize(s, z) : s, H, s)),
                          (b = f(j, r, E)),
                          B && f(j, b, B),
                          1 < u && K(y, j, v, b.prev, d, { cause: n + "," + p, reach: x });
                      }
                    }
                  }
                }
            })(g, b, d, b.head, 0),
            (function (b) {
              for (var c = [], a = b.head.next; a !== b.tail; ) c.push(a.value), (a = a.next);
              return c;
            })(b)
          );
        },
        hooks: {
          all: {},
          add: function (b, d) {
            var c = a.hooks.all;
            (c[b] = c[b] || []), c[b].push(d);
          },
          run: function (d, e) {
            var b = a.hooks.all[d],
              c,
              f;
            if (b && b.length) for (c, f = 0; (c = b[f++]); ) c(e);
          },
        },
        Token: c,
      },
      d,
      i;
    function c(a, b, c, d) {
      (this.type = a), (this.content = b), (this.alias = c), (this.length = 0 | (d || "").length);
    }
    function h(c, d, e, f) {
      var a, b;
      return (c.lastIndex = d), (a = c.exec(e)), a && f && a[1] && ((b = a[1].length), (a.index += b), (a[0] = a[0].slice(b))), a;
    }
    function k() {
      var a = { value: null, prev: null, next: null },
        b = { value: null, prev: a, next: null };
      (a.next = b), (this.head = a), (this.tail = b), (this.length = 0);
    }
    function f(d, a, e) {
      var c = a.next,
        b = { value: e, prev: a, next: c };
      return (a.next = b), (c.prev = b), d.length++, b;
    }
    function l(d, b, e) {
      for (var a = b.next, c = 0; c < e && a !== d.tail; c++) a = a.next;
      ((b.next = a).prev = b), (d.length -= c);
    }
    if (
      ((b.Prism = a),
      (c.stringify = function i(c, f) {
        var g, b, d, e, h;
        if ("string" == typeof c) return c;
        if (Array.isArray(c))
          return (
            (g = ""),
            c.forEach(function (a) {
              g += i(a, f);
            }),
            g
          );
        (b = { type: c.type, content: i(c.content, f), tag: "span", classes: ["token", c.type], attributes: {}, language: f }),
          (d = c.alias),
          d && (Array.isArray(d) ? Array.prototype.push.apply(b.classes, d) : b.classes.push(d)),
          a.hooks.run("wrap", b),
          (e = "");
        for (h in b.attributes) e += " " + h + '="' + (b.attributes[h] || "").replace(/"/g, "&quot;") + '"';
        return "<" + b.tag + ' class="' + b.classes.join(" ") + '"' + e + ">" + b.content + "</" + b.tag + ">";
      }),
      !b.document)
    )
      return (
        b.addEventListener &&
          (a.disableWorkerMessageHandler ||
            b.addEventListener(
              "message",
              function (e) {
                var c = JSON.parse(e.data),
                  d = c.language,
                  f = c.code,
                  g = c.immediateClose;
                b.postMessage(a.highlight(f, a.languages[d], d)), g && b.close();
              },
              !1
            )),
        a
      );
    d = a.util.currentScript();
    function g() {
      a.manual || a.highlightAll();
    }
    return (
      d && ((a.filename = d.src), d.hasAttribute("data-manual") && (a.manual = !0)),
      !a.manual &&
        ((i = document.readyState),
        "loading" === i || ("interactive" === i && d && d.defer)
          ? document.addEventListener("DOMContentLoaded", g)
          : window.requestAnimationFrame
          ? window.requestAnimationFrame(g)
          : window.setTimeout(g, 16)),
      a
    );
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism),
  (Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": { pattern: /(\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
        string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/,
        name: /[^\s<>'"]+/,
      },
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
        "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } },
        punctuation: /\/?>/,
        "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
      },
    },
    entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i],
  }),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (c, a) {
      var b = {},
        d,
        e;
      (b["language-" + a] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[a] }),
        (b.cdata = /^<!\[CDATA\[|\]\]>$/i),
        (d = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: b } }),
        (d["language-" + a] = { pattern: /[\s\S]+/, inside: Prism.languages[a] }),
        (e = {}),
        (e[c] = {
          pattern: RegExp(
            "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
              return c;
            }),
            "i"
          ),
          lookbehind: !0,
          greedy: !0,
          inside: d,
        }),
        Prism.languages.insertBefore("markup", "cdata", e);
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml),
  !(function (a) {
    var b = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      c;
    (a.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" },
          keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
        },
      },
      url: {
        pattern: RegExp("\\burl\\((?:" + b.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
        greedy: !0,
        inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + b.source + "$"), alias: "url" } },
      },
      selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + b.source + ")*(?=\\s*\\{)"),
      string: { pattern: b, greedy: !0 },
      property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      important: /!important\b/i,
      function: /[-a-z0-9]+(?=\()/i,
      punctuation: /[(){};:,]/,
    }),
      (a.languages.css.atrule.inside.rest = a.languages.css),
      (c = a.languages.markup),
      c &&
        (c.tag.addInlined("style", "css"),
        a.languages.insertBefore(
          "inside",
          "attr-value",
          {
            "style-attr": {
              pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
              lookbehind: !0,
              inside: {
                "attr-value": {
                  pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                  inside: {
                    style: { pattern: /(["'])[\s\S]+(?=["']$)/, lookbehind: !0, alias: "language-css", inside: a.languages.css },
                    punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
                  },
                },
                "attr-name": /^style/i,
              },
            },
          },
          c.tag
        ));
  })(Prism),
  (Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    "class-name": { pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/, lookbehind: !0 }],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      },
    ],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number:
      /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
  })),
  (Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex },
        "regex-flags": /[a-z]+$/,
        "regex-delimiter": /^\/|\/$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      { pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, inside: Prism.languages.javascript },
      { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: { "interpolation-punctuation": { pattern: /^\${|}$/, alias: "punctuation" }, rest: Prism.languages.javascript },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"),
  (Prism.languages.js = Prism.languages.javascript),
  (Prism.languages.ada = {
    comment: /--.*/,
    string: /"(?:""|[^"\r\f\n])*"/i,
    number: [{ pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i }, { pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i }],
    "attr-name": /\b'\w+/i,
    keyword:
      /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|new|return|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
    boolean: /\b(?:true|false)\b/i,
    operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
    punctuation: /\.\.?|[,;():]/,
    char: /'.'/,
    variable: /\b[a-z](?:[_a-z\d])*\b/i,
  }),
  (Prism.languages.apacheconf = {
    comment: /#.*/,
    "directive-inline": {
      pattern:
        /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
      lookbehind: !0,
      alias: "property",
    },
    "directive-block": {
      pattern:
        /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b.*>/i,
      inside: {
        "directive-block": { pattern: /^<\/?\w+/, inside: { punctuation: /^<\/?/ }, alias: "tag" },
        "directive-block-parameter": { pattern: /.*[^>]/, inside: { punctuation: /:/, string: { pattern: /("|').*\1/, inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ } } }, alias: "attr-value" },
        punctuation: />/,
      },
      alias: "tag",
    },
    "directive-flags": { pattern: /\[(?:[\w=],?)+\]/, alias: "keyword" },
    string: { pattern: /("|').*\1/, inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ } },
    variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
    regex: /\^?.*\$|\^.*\$?/,
  }),
  !(function (a) {
    var b =
        "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
      e = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: !0, alias: "punctuation", inside: null },
      c = {
        bash: e,
        environment: { pattern: RegExp("\\$" + b), alias: "constant" },
        variable: [
          {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: !0,
            inside: {
              variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
              number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
              operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
              punctuation: /\(\(?|\)\)?|,|;/,
            },
          },
          { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } },
          {
            pattern: /\$\{[^}]+\}/,
            greedy: !0,
            inside: { operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/, punctuation: /[\[\]]/, environment: { pattern: RegExp("(\\{)" + b), lookbehind: !0, alias: "constant" } },
          },
          /\$(?:\w+|[#?*!@$])/,
        ],
        entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
      },
      f,
      g,
      d;
    (a.languages.bash = {
      shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
      comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
      "function-name": [
        { pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: "function" },
        { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
      ],
      "for-or-select": { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: "variable", lookbehind: !0 },
      "assign-left": {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: { environment: { pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + b), lookbehind: !0, alias: "constant" } },
        alias: "variable",
        lookbehind: !0,
      },
      string: [
        { pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: !0, greedy: !0, inside: c },
        { pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/, lookbehind: !0, greedy: !0, inside: { bash: e } },
        { pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/, lookbehind: !0, greedy: !0, inside: c },
      ],
      environment: { pattern: RegExp("\\$?" + b), alias: "constant" },
      variable: c.variable,
      function: {
        pattern:
          /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: !0,
      },
      keyword: { pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/, lookbehind: !0 },
      builtin: {
        pattern:
          /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: !0,
        alias: "class-name",
      },
      boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/, lookbehind: !0 },
      "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
      operator: { pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/, inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } } },
      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
    }),
      (e.inside = a.languages.bash);
    for (
      f = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"],
        g = c.variable[1].inside,
        d = 0;
      d < f.length;
      d++
    )
      g[f[d]] = a.languages.bash[f[d]];
    a.languages.shell = a.languages.bash;
  })(Prism),
  !(function (e) {
    var a = /%%?[~:\w]+%?|!\S+!/,
      b = { pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im, alias: "attr-name", inside: { punctuation: /:/ } },
      c = /"(?:[\\"]"|[^"])*"(?!")/,
      d = /(?:\b|-)\d+\b/;
    Prism.languages.batch = {
      comment: [/^::.*/m, { pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im, lookbehind: !0 }],
      label: { pattern: /^:.*/m, alias: "property" },
      command: [
        {
          pattern: /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
          lookbehind: !0,
          inside: { keyword: /^for\b|\b(?:in|do)\b/i, string: c, parameter: b, variable: a, number: d, punctuation: /[()',]/ },
        },
        {
          pattern:
            /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|[^\s"]\S*))/im,
          lookbehind: !0,
          inside: { keyword: /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i, string: c, parameter: b, variable: a, number: d, operator: /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i },
        },
        { pattern: /((?:^|[&()])[ \t]*)else\b/im, lookbehind: !0, inside: { keyword: /^else\b/i } },
        {
          pattern: /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
          lookbehind: !0,
          inside: { keyword: /^set\b/i, string: c, parameter: b, variable: [a, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/], number: d, operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/, punctuation: /[()',]/ },
        },
        {
          pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
          lookbehind: !0,
          inside: { keyword: /^\w+\b/i, string: c, parameter: b, label: { pattern: /(^\s*):\S+/m, lookbehind: !0, alias: "property" }, variable: a, number: d, operator: /\^/ },
        },
      ],
      operator: /[&@]/,
      punctuation: /[()']/,
    };
  })(),
  (Prism.languages.c = Prism.languages.extend("clike", {
    comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    "class-name": { pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/, lookbehind: !0 },
    keyword:
      /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    function: /[a-z_]\w*(?=\s*\()/i,
    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
  })),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string],
        comment: Prism.languages.c.comment,
        "macro-name": [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: "function" },
        ],
        directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: "keyword" },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean,
  !(function (e) {
    var q, k, D, o, v, j, H, G, h, r, d, l, f, n, F, g, c, w, x, y, z, A, B, E, p, C, t, s, u;
    function b(a, b) {
      return a.replace(/<<(\d+)>>/g, function (c, a) {
        return "(?:" + b[+a] + ")";
      });
    }
    function a(a, c, d) {
      return RegExp(b(a, c), d || "");
    }
    function i(a, c) {
      for (var b = 0; b < c; b++)
        a = a.replace(/<<self>>/g, function () {
          return "(?:" + a + ")";
        });
      return a.replace(/<<self>>/g, "[^\\s\\S]");
    }
    (q = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void"),
      (k = "class enum interface struct"),
      (D = "add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where"),
      (o =
        "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield");
    function m(a) {
      return "\\b(?:" + a.trim().replace(/ /g, "|") + ")\\b";
    }
    (v = m(k)),
      (j = RegExp(m(q + " " + k + " " + D + " " + o))),
      (H = m(k + " " + D + " " + o)),
      (G = m(q + " " + k + " " + o)),
      (h = i("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2)),
      (r = i("\\((?:[^()]|<<self>>)*\\)", 2)),
      (d = "@?\\b[A-Za-z_]\\w*\\b"),
      (l = b("<<0>>(?:\\s*<<1>>)?", [d, h])),
      (f = b("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [H, l])),
      (n = "\\[\\s*(?:,\\s*)*\\]"),
      (F = b("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [f, n])),
      (g = b("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [b("\\(<<0>>+(?:,<<0>>+)+\\)", [b("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [h, r, n])]), f, n])),
      (c = { keyword: j, punctuation: /[<>()?,.:[\]]/ }),
      (w = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"),
      (x = '"(?:\\\\.|[^\\\\"\r\n])*"'),
      (e.languages.csharp = e.languages.extend("clike", {
        string: [
          { pattern: a("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']), lookbehind: !0, greedy: !0 },
          { pattern: a("(^|[^@$\\\\])<<0>>", [x]), lookbehind: !0, greedy: !0 },
          { pattern: RegExp(w), greedy: !0, alias: "character" },
        ],
        "class-name": [
          { pattern: a("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [f]), lookbehind: !0, inside: c },
          { pattern: a("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [d, g]), lookbehind: !0, inside: c },
          { pattern: a("(\\busing\\s+)<<0>>(?=\\s*=)", [d]), lookbehind: !0 },
          { pattern: a("(\\b<<0>>\\s+)<<1>>", [v, l]), lookbehind: !0, inside: c },
          { pattern: a("(\\bcatch\\s*\\(\\s*)<<0>>", [f]), lookbehind: !0, inside: c },
          { pattern: a("(\\bwhere\\s+)<<0>>", [d]), lookbehind: !0 },
          { pattern: a("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [F]), lookbehind: !0, inside: c },
          { pattern: a("\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [g, G, d]), inside: c },
        ],
        keyword: j,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/,
      })),
      e.languages.insertBefore("csharp", "number", { range: { pattern: /\.\./, alias: "operator" } }),
      e.languages.insertBefore("csharp", "punctuation", { "named-parameter": { pattern: a("([(,]\\s*)<<0>>(?=\\s*:)", [d]), lookbehind: !0, alias: "punctuation" } }),
      e.languages.insertBefore("csharp", "class-name", {
        namespace: { pattern: a("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [d]), lookbehind: !0, inside: { punctuation: /\./ } },
        "type-expression": { pattern: a("(\\b(?:default|typeof|sizeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [r]), lookbehind: !0, alias: "class-name", inside: c },
        "return-type": { pattern: a("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [g, f]), inside: c, alias: "class-name" },
        "constructor-invocation": { pattern: a("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [g]), lookbehind: !0, inside: c, alias: "class-name" },
        "generic-method": { pattern: a("<<0>>\\s*<<1>>(?=\\s*\\()", [d, h]), inside: { function: a("^<<0>>", [d]), generic: { pattern: RegExp(h), alias: "class-name", inside: c } } },
        "type-list": {
          pattern: a("\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))", [v, l, d, g, j.source]),
          lookbehind: !0,
          inside: { keyword: j, "class-name": { pattern: RegExp(g), greedy: !0, inside: c }, punctuation: /,/ },
        },
        preprocessor: {
          pattern: /(^\s*)#.*/m,
          lookbehind: !0,
          alias: "property",
          inside: { directive: { pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/, lookbehind: !0, alias: "keyword" } },
        },
      }),
      (y = x + "|" + w),
      (z = b("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [y])),
      (A = i(b("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [z]), 2)),
      (B = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b"),
      (E = b("<<0>>(?:\\s*\\(<<1>>*\\))?", [f, A])),
      e.languages.insertBefore("csharp", "class-name", {
        attribute: {
          pattern: a("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [B, E]),
          lookbehind: !0,
          greedy: !0,
          inside: {
            target: { pattern: a("^<<0>>(?=\\s*:)", [B]), alias: "keyword" },
            "attribute-arguments": { pattern: a("\\(<<0>>*\\)", [A]), inside: e.languages.csharp },
            "class-name": { pattern: RegExp(f), inside: { punctuation: /\./ } },
            punctuation: /[:,]/,
          },
        },
      }),
      (p = ":[^}\r\n]+"),
      (C = i(b("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [z]), 2)),
      (t = b("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [C, p])),
      (s = i(b("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [y]), 2)),
      (u = b("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [s, p]));
    function I(b, c) {
      return {
        interpolation: {
          pattern: a("((?:^|[^{])(?:\\{\\{)*)<<0>>", [b]),
          lookbehind: !0,
          inside: {
            "format-string": { pattern: a("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [c, p]), lookbehind: !0, inside: { punctuation: /^:/ } },
            punctuation: /^\{|\}$/,
            expression: { pattern: /[\s\S]+/, alias: "language-csharp", inside: e.languages.csharp },
          },
        },
        string: /[\s\S]+/,
      };
    }
    e.languages.insertBefore("csharp", "string", {
      "interpolation-string": [
        { pattern: a('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [t]), lookbehind: !0, greedy: !0, inside: I(t, C) },
        { pattern: a('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [u]), lookbehind: !0, greedy: !0, inside: I(u, s) },
      ],
    });
  })(Prism),
  (Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp),
  !(function (a) {
    var b =
      /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
    (a.languages.cpp = a.languages.extend("c", {
      "class-name": [
        {
          pattern: RegExp(
            "(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function () {
              return b.source;
            })
          ),
          lookbehind: !0,
        },
        /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
        /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
        /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
      ],
      keyword: b,
      number: { pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i, greedy: !0 },
      operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      boolean: /\b(?:true|false)\b/,
    })),
      a.languages.insertBefore("cpp", "string", { "raw-string": { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: "string", greedy: !0 } }),
      a.languages.insertBefore("cpp", "class-name", {
        "base-clause": { pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/, lookbehind: !0, greedy: !0, inside: a.languages.extend("cpp", {}) },
      }),
      a.languages.insertBefore("inside", "operator", { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i }, a.languages.cpp["base-clause"]);
  })(Prism),
  !(function (a) {
    var c = /#(?!\{).+/,
      b = { pattern: /#\{[^}]+\}/, alias: "variable" };
    (a.languages.coffeescript = a.languages.extend("javascript", {
      comment: c,
      string: [
        { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
        { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0, inside: { interpolation: b } },
      ],
      keyword:
        /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
      "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
    })),
      a.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
        "block-regex": { pattern: /\/{3}[\s\S]*?\/{3}/, alias: "regex", inside: { comment: c, interpolation: b } },
      }),
      a.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: { delimiter: { pattern: /^`|`$/, alias: "punctuation" }, script: { pattern: /[\s\S]+/, alias: "language-javascript", inside: a.languages.javascript } },
        },
        "multiline-string": [
          { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
          { pattern: /"""[\s\S]*?"""/, greedy: !0, alias: "string", inside: { interpolation: b } },
        ],
      }),
      a.languages.insertBefore("coffeescript", "keyword", { property: /(?!\d)\w+(?=\s*:(?!:))/ }),
      delete a.languages.coffeescript["template-string"],
      (a.languages.coffee = a.languages.coffeescript);
  })(Prism),
  !(function (a) {
    var b,
      c = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      d,
      e;
    (a.languages.css.selector = {
      pattern: a.languages.css.selector,
      inside: (b = {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+/,
        class: /\.[-\w]+/,
        id: /#[-\w]+/,
        attribute: {
          pattern: RegExp("\\[(?:[^[\\]\"']|" + c.source + ")*\\]"),
          greedy: !0,
          inside: {
            punctuation: /^\[|\]$/,
            "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" },
            namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } },
            "attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
            "attr-value": [c, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }],
            operator: /[|~*^$]?=/,
          },
        },
        "n-th": [
          { pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: !0, inside: { number: /[\dn]+/, operator: /[+-]/ } },
          { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
        ],
        combinator: />|\+|~|\|\|/,
        punctuation: /[(),]/,
      }),
    }),
      (a.languages.css.atrule.inside["selector-function-argument"].inside = b),
      a.languages.insertBefore("css", "property", { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: !0 } }),
      (d = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 }),
      (e = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 }),
      a.languages.insertBefore("css", "function", {
        operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
        hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: "color" },
        color: [
          /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
          {
            pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: { unit: d, number: e, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
          },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: d,
        number: e,
      });
  })(Prism),
  (Prism.languages.dart = Prism.languages.extend("clike", {
    string: [
      { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
      { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword: [
      /\b(?:async|sync|yield)\*/,
      /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|Function|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/,
    ],
    operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
  })),
  Prism.languages.insertBefore("dart", "function", { metadata: { pattern: /@\w+/, alias: "symbol" } }),
  !(function (a) {
    function b(a, b) {
      return "___" + a.toUpperCase() + b + "___";
    }
    Object.defineProperties((a.languages["markup-templating"] = {}), {
      buildPlaceholders: {
        value: function (c, d, g, e) {
          if (c.language === d) {
            var f = (c.tokenStack = []);
            (c.code = c.code.replace(g, function (a) {
              if ("function" == typeof e && !e(a)) return a;
              for (var h, g = f.length; -1 !== c.code.indexOf((h = b(d, g))); ) ++g;
              return (f[g] = a), h;
            })),
              (c.grammar = a.languages.markup);
          }
        },
      },
      tokenizePlaceholders: {
        value: function (c, d) {
          if (c.language === d && c.tokenStack) {
            c.grammar = a.languages[d];
            var e = 0,
              f = Object.keys(c.tokenStack);
            !(function m(i) {
              for (var j = 0, g, o, r, l, n, k, p, s, q, h; j < i.length && !(e >= f.length); j++)
                (g = i[j]),
                  "string" == typeof g || (g.content && "string" == typeof g.content)
                    ? ((o = f[e]),
                      (r = c.tokenStack[o]),
                      (l = "string" == typeof g ? g : g.content),
                      (n = b(d, o)),
                      (k = l.indexOf(n)),
                      -1 < k &&
                        (++e,
                        (p = l.substring(0, k)),
                        (s = new a.Token(d, a.tokenize(r, c.grammar), "language-" + d, r)),
                        (q = l.substring(k + n.length)),
                        (h = []),
                        p && h.push.apply(h, m([p])),
                        h.push(s),
                        q && h.push.apply(h, m([q])),
                        "string" == typeof g ? i.splice.apply(i, [j, 1].concat(h)) : (g.content = h)))
                    : g.content && m(g.content);
              return i;
            })(c.tokens);
          }
        },
      },
    });
  })(Prism),
  !(function (a) {
    a.languages.django = {
      comment: /^{#[\s\S]*?#}$/,
      tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: "keyword" },
      delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: "punctuation" },
      string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: "function" },
      test: { pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/, lookbehind: !0, alias: "function" },
      function: /\b[a-z_]\w+(?=\s*\()/i,
      keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
      operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      number: /\b\d+(?:\.\d+)?\b/,
      boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
      variable: /\b\w+?\b/,
      punctuation: /[{}[\](),.:;]/,
    };
    var c = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
      b = a.languages["markup-templating"];
    a.hooks.add("before-tokenize", function (a) {
      b.buildPlaceholders(a, "django", c);
    }),
      a.hooks.add("after-tokenize", function (a) {
        b.tokenizePlaceholders(a, "django");
      }),
      (a.languages.jinja2 = a.languages.django),
      a.hooks.add("before-tokenize", function (a) {
        b.buildPlaceholders(a, "jinja2", c);
      }),
      a.hooks.add("after-tokenize", function (a) {
        b.tokenizePlaceholders(a, "jinja2");
      });
  })(Prism),
  (Prism.languages["dns-zone-file"] = {
    comment: /;.*/,
    string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
    variable: [
      { pattern: /(^\$ORIGIN[ \t]+)\S+/m, lookbehind: !0 },
      { pattern: /(^|\s)@(?=\s|$)/, lookbehind: !0 },
    ],
    keyword: /^\$(?:ORIGIN|INCLUDE|TTL)(?=\s|$)/m,
    class: { pattern: /(^|\s)(?:IN|CH|CS|HS)(?=\s|$)/, lookbehind: !0, alias: "keyword" },
    type: {
      pattern:
        /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
      lookbehind: !0,
      alias: "keyword",
    },
    punctuation: /[()]/,
  }),
  (Prism.languages["dns-zone"] = Prism.languages["dns-zone-file"]),
  (Prism.languages.docker = {
    keyword: { pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im, lookbehind: !0 },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
    comment: { pattern: /#.*/, greedy: !0 },
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
  }),
  (Prism.languages.dockerfile = Prism.languages.docker),
  (Prism.languages.elixir = {
    comment: /#.*/m,
    regex: {
      pattern:
        /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
      greedy: !0,
    },
    string: [
      {
        pattern:
          /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
        greedy: !0,
        inside: {},
      },
      { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
      { pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0, inside: {} },
    ],
    atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
    "attr-name": /\w+\??:(?!:)/,
    capture: { pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/, lookbehind: !0, alias: "function" },
    argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: "variable" },
    attribute: { pattern: /@\w+/, alias: "variable" },
    number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
    keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct|delegate)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    operator: [/\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/, { pattern: /([^<])<(?!<)/, lookbehind: !0 }, { pattern: /([^>])>(?!>)/, lookbehind: !0 }],
    punctuation: /<<|>>|[.,%\[\]{}()]/,
  }),
  Prism.languages.insertBefore("elixir", "keyword", {
    module: { pattern: /\b(defmodule\s)[A-Z][\w.\\]+/, lookbehind: !0, alias: "class-name" },
    function: { pattern: /\b(defp?\s)[\w.\\]+/, lookbehind: !0 },
  }),
  Prism.languages.elixir.string.forEach(function (a) {
    a.inside = { interpolation: { pattern: /#\{[^}]+\}/, inside: { delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" }, rest: Prism.languages.elixir } } };
  }),
  (Prism.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    string: { pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/, greedy: !0 },
    number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/, { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 }],
    punctuation: /[\[\](){},;]|\.+|:+/,
  }),
  !(function (a) {
    (a.languages.etlua = { delimiter: { pattern: /^<%[-=]?|-?%>$/, alias: "punctuation" }, "language-lua": { pattern: /[\s\S]+/, inside: a.languages.lua } }),
      a.hooks.add("before-tokenize", function (b) {
        a.languages["markup-templating"].buildPlaceholders(b, "etlua", /<%[\s\S]+?%>/g);
      }),
      a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "etlua");
      });
  })(Prism),
  (Prism.languages.erlang = {
    comment: /%.+/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    "quoted-function": { pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/, alias: "function" },
    "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
    boolean: /\b(?:true|false)\b/,
    keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
    number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i],
    function: /\b[a-z][\w@]*(?=\()/,
    variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
    operator: [
      /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
      { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
      { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
    ],
    atom: /\b[a-z][\w@]*/,
    punctuation: /[()[\]{}:;,.#|]|<<|>>/,
  }),
  (Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    "commit-sha1": /^commit \w{40}$/m,
  }),
  (Prism.languages.go = Prism.languages.extend("clike", {
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
  })),
  delete Prism.languages.go["class-name"],
  (Prism.languages.graphql = {
    comment: /#.*/,
    description: {
      pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
      greedy: !0,
      alias: "string",
      inside: { "language-markdown": { pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/, lookbehind: !0, inside: Prism.languages.markdown } },
    },
    string: { pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
    "attr-name": { pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i, greedy: !0 },
    "class-name": { pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/, lookbehind: !0 },
    fragment: { pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/, lookbehind: !0, alias: "function" },
    keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    operator: /[!=|&]|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/,
    constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
  }),
  (Prism.languages.groovy = Prism.languages.extend("clike", {
    string: [
      { pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/, greedy: !0 },
      { pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword:
      /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
    operator: { pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/, lookbehind: !0 },
    punctuation: /\.+|[{}[\];(),:$]/,
  })),
  Prism.languages.insertBefore("groovy", "string", { shebang: { pattern: /#!.+/, alias: "comment" } }),
  Prism.languages.insertBefore("groovy", "punctuation", { "spock-block": /\b(?:setup|given|when|then|and|cleanup|expect|where):/ }),
  Prism.languages.insertBefore("groovy", "function", { annotation: { pattern: /(^|[^.])@\w+/, lookbehind: !0, alias: "punctuation" } }),
  Prism.hooks.add("wrap", function (a) {
    var b, c;
    "groovy" === a.language &&
      "string" === a.type &&
      ((b = a.content[0]),
      "'" != b &&
        ((c = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/),
        "$" === b && (c = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/),
        (a.content = a.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&")),
        (a.content = Prism.highlight(a.content, { expression: { pattern: c, lookbehind: !0, inside: Prism.languages.groovy } })),
        a.classes.push("/" === b ? "regex" : "gstring")));
  }),
  !(function (a) {
    a.languages.ruby = a.languages.extend("clike", {
      comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
      "class-name": { pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
      keyword:
        /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    });
    var b = { pattern: /#\{[^}]+\}/, inside: { delimiter: { pattern: /^#\{|\}$/, alias: "tag" }, rest: a.languages.ruby } };
    delete a.languages.ruby.function,
      a.languages.insertBefore("ruby", "keyword", {
        regex: [
          {
            pattern: RegExp(
              "%r(?:" +
                [
                  "([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1[gim]{0,3}",
                  "\\((?:[^()\\\\]|\\\\[^])*\\)[gim]{0,3}",
                  "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}[gim]{0,3}",
                  "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\][gim]{0,3}",
                  "<(?:[^<>\\\\]|\\\\[^])*>[gim]{0,3}",
                ].join("|") +
                ")"
            ),
            greedy: !0,
            inside: { interpolation: b },
          },
          { pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 },
        ],
        variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
        symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
        "method-definition": { pattern: /(\bdef\s+)[\w.]+/, lookbehind: !0, inside: { function: /\w+$/, rest: a.languages.ruby } },
      }),
      a.languages.insertBefore("ruby", "number", {
        builtin:
          /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
        constant: /\b[A-Z]\w*(?:[?!]|\b)/,
      }),
      (a.languages.ruby.string = [
        {
          pattern: RegExp(
            "%[qQiIwWxs]?(?:" +
              [
                "([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1",
                "\\((?:[^()\\\\]|\\\\[^])*\\)",
                "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}",
                "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]",
                "<(?:[^<>\\\\]|\\\\[^])*>",
              ].join("|") +
              ")"
          ),
          greedy: !0,
          inside: { interpolation: b },
        },
        { pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/, greedy: !0, inside: { interpolation: b } },
      ]),
      (a.languages.rb = a.languages.ruby);
  })(Prism),
  !(function (a) {
    var d, e, c, f, b;
    a.languages.haml = {
      "multiline-comment": { pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/, lookbehind: !0, alias: "comment" },
      "multiline-code": [
        { pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/, lookbehind: !0, inside: a.languages.ruby },
        { pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/, lookbehind: !0, inside: a.languages.ruby },
      ],
      filter: { pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/, lookbehind: !0, inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } } },
      markup: { pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/, lookbehind: !0, inside: a.languages.markup },
      doctype: { pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/, lookbehind: !0 },
      tag: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
        lookbehind: !0,
        inside: {
          attributes: [
            { pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/, lookbehind: !0, inside: a.languages.ruby },
            { pattern: /\([^)]+\)/, inside: { "attr-value": { pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/, lookbehind: !0 }, "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/, punctuation: /[=(),]/ } },
            { pattern: /\[[^\]]+\]/, inside: a.languages.ruby },
          ],
          punctuation: /[<>]/,
        },
      },
      code: { pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/, lookbehind: !0, inside: a.languages.ruby },
      interpolation: { pattern: /#\{[^}]+\}/, inside: { delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" }, rest: a.languages.ruby } },
      punctuation: { pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/, lookbehind: !0 },
    };
    for (d = ["css", { filter: "coffee", language: "coffeescript" }, "erb", "javascript", "less", "markdown", "ruby", "scss", "textile"], e = {}, c = 0, f = d.length; c < f; c++)
      (b = d[c]),
        (b = "string" == typeof b ? { filter: b, language: b } : b),
        a.languages[b.language] &&
          (e["filter-" + b.filter] = {
            pattern: RegExp(
              "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+".replace("{{filter_name}}", function () {
                return b.filter;
              })
            ),
            lookbehind: !0,
            inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" }, rest: a.languages[b.language] },
          });
    a.languages.insertBefore("haml", "filter", e);
  })(Prism),
  !(function (a) {
    (a.languages.handlebars = {
      comment: /\{\{![\s\S]*?\}\}/,
      delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
      string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      boolean: /\b(?:true|false)\b/,
      block: { pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/i, lookbehind: !0, alias: "keyword" },
      brackets: { pattern: /\[[^\]]+\]/, inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ } },
      punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
      variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
    }),
      a.hooks.add("before-tokenize", function (b) {
        a.languages["markup-templating"].buildPlaceholders(b, "handlebars", /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g);
      }),
      a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "handlebars");
      });
  })(Prism),
  (Prism.languages.haskell = {
    comment: { pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m, lookbehind: !0 },
    char: {
      pattern:
        /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
      alias: "string",
    },
    string: { pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/, greedy: !0 },
    keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    "import-statement": {
      pattern: /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
      lookbehind: !0,
      inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
    },
    builtin:
      /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[-!#$%*+=?&@|~:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
    hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
    constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.hs = Prism.languages.haskell),
  !(function (e) {
    var c, f, g, a, d, h, b, i;
    (e.languages.http = {
      "request-line": {
        pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
        inside: { property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/, "attr-name": /:\w+/ },
      },
      "response-status": { pattern: /^HTTP\/1.[01] \d.*/m, inside: { property: { pattern: /(^HTTP\/1.[01] )\d.*/i, lookbehind: !0 } } },
      "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
    }),
      (a = e.languages),
      (d = { "application/javascript": a.javascript, "application/json": a.json || a.javascript, "application/xml": a.xml, "text/xml": a.xml, "text/html": a.html, "text/css": a.css }),
      (h = { "application/json": !0, "application/xml": !0 });
    for (b in d)
      d[b] &&
        ((c = c || {}),
        (i = h[b] ? (void 0, (g = (f = b).replace(/^[a-z]+\//, "")), "(?:" + f + "|\\w+/(?:[\\w.-]+\\+)+" + g + "(?![+\\w.-]))") : b),
        (c[b.replace(/\//g, "-")] = { pattern: RegExp("(content-type:\\s*" + i + ".*)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"), lookbehind: !0, inside: d[b] }));
    c && e.languages.insertBefore("http", "header-name", c);
  })(Prism),
  (Prism.languages.hpkp = {
    directive: { pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/, alias: "keyword" },
    safe: { pattern: /\b\d{7,}\b/, alias: "selector" },
    unsafe: { pattern: /\b\d{1,6}\b/, alias: "function" },
  }),
  (Prism.languages.hsts = {
    directive: { pattern: /\b(?:max-age=|includeSubDomains|preload)/, alias: "keyword" },
    safe: { pattern: /\b\d{8,}\b/, alias: "selector" },
    unsafe: { pattern: /\b\d{1,7}\b/, alias: "function" },
  }),
  (Prism.languages.ini = { comment: /^[ \t]*[;#].*$/m, selector: /^[ \t]*\[.*?\]/m, constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m, "attr-value": { pattern: /=.*/, inside: { punctuation: /^[=]/ } } }),
  !(function (a) {
    var b =
        /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
      d = "(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",
      c = {
        pattern: RegExp(d + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
        lookbehind: !0,
        inside: { namespace: { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: { punctuation: /\./ } }, punctuation: /\./ },
      };
    (a.languages.java = a.languages.extend("clike", {
      "class-name": [c, { pattern: RegExp(d + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])"), lookbehind: !0, inside: c.inside }],
      keyword: b,
      function: [a.languages.clike.function, { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 }],
      number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
      operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
    })),
      a.languages.insertBefore("java", "string", { "triple-quoted-string": { pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/, greedy: !0, alias: "string" } }),
      a.languages.insertBefore("java", "class-name", {
        annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: !0, alias: "punctuation" },
        generics: { pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/, inside: { "class-name": c, keyword: b, punctuation: /[<>(),.:]/, operator: /[?&|]/ } },
        namespace: {
          pattern: RegExp(
            "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
              /<keyword>/g,
              function () {
                return b.source;
              }
            )
          ),
          lookbehind: !0,
          inside: { punctuation: /\./ },
        },
      });
  })(Prism),
  !(function (a) {
    var b = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
      c = [{ pattern: /\b(?:false|true)\b/i, alias: "boolean" }, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/, /\b(?:null)\b/i],
      d = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      e = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
      f = /[{}\[\](),:;]/,
      g,
      h;
    (a.languages.php = {
      delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
      comment: b,
      variable: /\$+(?:\w+\b|(?={))/i,
      package: { pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, lookbehind: !0, inside: { punctuation: /\\/ } },
      keyword: [
        { pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i, alias: "type-casting", greedy: !0, lookbehind: !0 },
        {
          pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
          alias: "type-hint",
          greedy: !0,
          lookbehind: !0,
        },
        { pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 },
        {
          pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
          alias: "return-type",
          greedy: !0,
          lookbehind: !0,
        },
        { pattern: /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 },
        { pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i, alias: "type-declaration", greedy: !0 },
        { pattern: /(\|\s*)(?:null|false)\b/i, alias: "type-declaration", greedy: !0, lookbehind: !0 },
        { pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: "static-context", greedy: !0 },
        /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
      ],
      "argument-name": /\b[a-z_]\w*(?=\s*:(?!:))/i,
      "class-name": [
        { pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
        { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
        { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
        { pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i, alias: "class-name-fully-qualified", greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
        { pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i, alias: "class-name-fully-qualified", greedy: !0, inside: { punctuation: /\\/ } },
        {
          pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
          alias: "class-name-fully-qualified",
          greedy: !0,
          lookbehind: !0,
          inside: { punctuation: /\\/ },
        },
        { pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: "type-declaration", greedy: !0 },
        { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-declaration"], greedy: !0, inside: { punctuation: /\\/ } },
        { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: "static-context", greedy: !0 },
        { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i, alias: ["class-name-fully-qualified", "static-context"], greedy: !0, inside: { punctuation: /\\/ } },
        { pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 },
        { pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-hint"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
        { pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 },
        { pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, alias: ["class-name-fully-qualified", "return-type"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
      ],
      constant: c,
      function: /\w+\s*(?=\()/,
      property: { pattern: /(->)[\w]+/, lookbehind: !0 },
      number: d,
      operator: e,
      punctuation: f,
    }),
      (g = { pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/, lookbehind: !0, inside: a.languages.php }),
      (h = [
        {
          pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
          alias: "nowdoc-string",
          greedy: !0,
          inside: { delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<'?|[';]$/ } } },
        },
        {
          pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
          alias: "heredoc-string",
          greedy: !0,
          inside: { delimiter: { pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<"?|[";]$/ } }, interpolation: g },
        },
        { pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: "backtick-quoted-string", greedy: !0 },
        { pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: "single-quoted-string", greedy: !0 },
        { pattern: /"(?:\\[\s\S]|[^\\"])*"/, alias: "double-quoted-string", greedy: !0, inside: { interpolation: g } },
      ]),
      a.languages.insertBefore("php", "variable", { string: h }),
      a.languages.insertBefore("php", "variable", {
        attribute: {
          pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
          greedy: !0,
          inside: {
            "attribute-content": {
              pattern: /^(#\[)[\s\S]+(?=]$)/,
              lookbehind: !0,
              inside: {
                comment: b,
                string: h,
                "attribute-class-name": [
                  { pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i, alias: "class-name", greedy: !0, lookbehind: !0 },
                  { pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i, alias: ["class-name", "class-name-fully-qualified"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
                ],
                constant: c,
                number: d,
                operator: e,
                punctuation: f,
              },
            },
            delimiter: { pattern: /^#\[|]$/, alias: "punctuation" },
          },
        },
      }),
      a.hooks.add("before-tokenize", function (b) {
        /<\?/.test(b.code) &&
          a.languages["markup-templating"].buildPlaceholders(
            b,
            "php",
            /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
          );
      }),
      a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "php");
      });
  })(Prism),
  !(function (a) {
    var b = (a.languages.javadoclike = {
      parameter: { pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m, lookbehind: !0 },
      keyword: { pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: !0 },
      punctuation: /[{}]/,
    });
    Object.defineProperty(b, "addSupport", {
      value: function (b, c) {
        "string" == typeof b && (b = [b]),
          b.forEach(function (b) {
            !(function (g, f) {
              var e = "doc-comment",
                d = a.languages[g],
                b,
                h,
                c,
                i;
              if (d)
                if (
                  ((b = d[e]),
                  b || ((h = { "doc-comment": { pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/, lookbehind: !0, alias: "comment" } }), (b = (d = a.languages.insertBefore(g, "comment", h))[e])),
                  b instanceof RegExp && (b = d[e] = { pattern: b }),
                  Array.isArray(b))
                )
                  for (c = 0, i = b.length; c < i; c++) b[c] instanceof RegExp && (b[c] = { pattern: b[c] }), f(b[c]);
                else f(b);
            })(b, function (a) {
              a.inside || (a.inside = {}), (a.inside.rest = c);
            });
          });
      },
    }),
      b.addSupport(["java", "javascript", "php"], b);
  })(Prism),
  !(function (a) {
    var b = /(^(?:\s*(?:\*\s*)*))[^*\s].*$/m,
      c = "(?:[a-zA-Z]\\w+\\s*\\.\\s*)*[A-Z]\\w*(?:\\s*<mem>)?|<mem>".replace(/<mem>/g, function () {
        return "#\\s*\\w+(?:\\s*\\([^()]*\\))?";
      });
    (a.languages.javadoc = a.languages.extend("javadoclike", {})),
      a.languages.insertBefore("javadoc", "keyword", {
        reference: {
          pattern: RegExp("(@(?:exception|throws|see|link|linkplain|value)\\s+(?:\\*\\s*)?)(?:" + c + ")"),
          lookbehind: !0,
          inside: {
            function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
            field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
            namespace: { pattern: /\b(?:[a-z]\w*\s*\.\s*)+/, inside: { punctuation: /\./ } },
            "class-name": /\b[A-Z]\w*/,
            keyword: a.languages.java.keyword,
            punctuation: /[#()[\],.]/,
          },
        },
        "class-name": { pattern: /(@param\s+)<[A-Z]\w*>/, lookbehind: !0, inside: { punctuation: /[.<>]/ } },
        "code-section": [
          {
            pattern: /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
            lookbehind: !0,
            inside: { code: { pattern: b, lookbehind: !0, inside: a.languages.java, alias: "language-java" } },
          },
          {
            pattern: /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
            lookbehind: !0,
            inside: {
              line: {
                pattern: b,
                lookbehind: !0,
                inside: { tag: a.languages.markup.tag, entity: a.languages.markup.entity, code: { pattern: /.+/, inside: a.languages.java, alias: "language-java" } },
              },
            },
          },
        ],
        tag: a.languages.markup.tag,
        entity: a.languages.markup.entity,
      }),
      a.languages.javadoclike.addSupport("java", a.languages.javadoc);
  })(Prism),
  !(function (a) {
    (a.languages.typescript = a.languages.extend("javascript", {
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      keyword:
        /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
      builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
    })),
      delete a.languages.typescript.parameter;
    var b = a.languages.extend("typescript", {});
    delete b["class-name"],
      (a.languages.typescript["class-name"].inside = b),
      a.languages.insertBefore("typescript", "function", {
        "generic-function": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: { function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: b } },
        },
      }),
      (a.languages.ts = a.languages.typescript);
  })(Prism),
  !(function (a) {
    var b = a.languages.javascript,
      c = "{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}",
      d = "(@(?:param|arg|argument|property)\\s+(?:" + c + "\\s+)?)";
    (a.languages.jsdoc = a.languages.extend("javadoclike", { parameter: { pattern: RegExp(d + "(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)"), lookbehind: !0, inside: { punctuation: /\./ } } })),
      a.languages.insertBefore("jsdoc", "keyword", {
        "optional-parameter": {
          pattern: RegExp(d + "\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)"),
          lookbehind: !0,
          inside: {
            parameter: { pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/, lookbehind: !0, inside: { punctuation: /\./ } },
            code: { pattern: /(=)[\s\S]*(?=\]$)/, lookbehind: !0, inside: b, alias: "language-javascript" },
            punctuation: /[=[\]]/,
          },
        },
        "class-name": [
          {
            pattern: RegExp(
              "(@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*".replace(/<TYPE>/g, function () {
                return c;
              })
            ),
            lookbehind: !0,
            inside: { punctuation: /\./ },
          },
          {
            pattern: RegExp("(@[a-z]+\\s+)" + c),
            lookbehind: !0,
            inside: { string: b.string, number: b.number, boolean: b.boolean, keyword: a.languages.typescript.keyword, operator: /=>|\.\.\.|[&|?:*]/, punctuation: /[.,;=<>{}()[\]]/ },
          },
        ],
        example: {
          pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
          lookbehind: !0,
          inside: { code: { pattern: /^(\s*(?:\*\s*)?)\S.*$/m, lookbehind: !0, inside: b, alias: "language-javascript" } },
        },
      }),
      a.languages.javadoclike.addSupport("javascript", a.languages.jsdoc);
  })(Prism),
  !(function (a) {
    var e, c, f, b, g;
    function d(a, b) {
      return RegExp(
        a.replace(/<ID>/g, function () {
          return "(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*";
        }),
        b
      );
    }
    a.languages.insertBefore("javascript", "function-variable", {
      "method-variable": {
        pattern: RegExp("(\\.\\s*)" + a.languages.javascript["function-variable"].pattern.source),
        lookbehind: !0,
        alias: ["function-variable", "method", "function", "property-access"],
      },
    }),
      a.languages.insertBefore("javascript", "function", { method: { pattern: RegExp("(\\.\\s*)" + a.languages.javascript.function.source), lookbehind: !0, alias: ["function", "property-access"] } }),
      a.languages.insertBefore("javascript", "constant", {
        "known-class-name": [
          {
            pattern:
              /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
            alias: "class-name",
          },
          { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" },
        ],
      }),
      a.languages.insertBefore("javascript", "keyword", {
        imports: {
          pattern: d("(\\bimport\\b\\s*)(?:<ID>(?:\\s*,\\s*(?:\\*\\s*as\\s+<ID>|\\{[^{}]*\\}))?|\\*\\s*as\\s+<ID>|\\{[^{}]*\\})(?=\\s*\\bfrom\\b)"),
          lookbehind: !0,
          inside: a.languages.javascript,
        },
        exports: { pattern: d("(\\bexport\\b\\s*)(?:\\*(?:\\s*as\\s+<ID>)?(?=\\s*\\bfrom\\b)|\\{[^{}]*\\})"), lookbehind: !0, inside: a.languages.javascript },
      }),
      a.languages.javascript.keyword.unshift(
        { pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" },
        { pattern: /\b(?:await|break|catch|continue|do|else|for|finally|if|return|switch|throw|try|while|yield)\b/, alias: "control-flow" },
        { pattern: /\bnull\b/, alias: ["null", "nil"] },
        { pattern: /\bundefined\b/, alias: "nil" }
      ),
      a.languages.insertBefore("javascript", "operator", { spread: { pattern: /\.{3}/, alias: "operator" }, arrow: { pattern: /=>/, alias: "operator" } }),
      a.languages.insertBefore("javascript", "punctuation", {
        "property-access": { pattern: d("(\\.\\s*)#?<ID>"), lookbehind: !0 },
        "maybe-class-name": { pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/, lookbehind: !0 },
        dom: { pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/, alias: "variable" },
        console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" },
      });
    for (e = ["function", "function-variable", "method", "method-variable", "property-access"], c = 0; c < e.length; c++)
      (f = e[c]),
        (b = a.languages.javascript[f]),
        "RegExp" === a.util.type(b) && (b = a.languages.javascript[f] = { pattern: b }),
        (g = b.inside || {}),
        ((b.inside = g)["maybe-class-name"] = /^[A-Z][\s\S]*/);
  })(Prism),
  (Prism.languages.json = {
    property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
    string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
  }),
  (Prism.languages.webmanifest = Prism.languages.json),
  !(function (a) {
    var b = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
    a.languages.json5 = a.languages.extend("json", {
      property: [
        { pattern: RegExp(b.source + "(?=\\s*:)"), greedy: !0 },
        { pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/, alias: "unquoted" },
      ],
      string: { pattern: b, greedy: !0 },
      number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    });
  })(Prism),
  (Prism.languages.jsonp = Prism.languages.extend("json", { punctuation: /[{}[\]();,.]/ })),
  Prism.languages.insertBefore("jsonp", "punctuation", { function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/ }),
  (Prism.languages.julia = {
    comment: { pattern: /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/, lookbehind: !0 },
    regex: { pattern: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/, greedy: !0 },
    string: { pattern: /"""[\s\S]+?"""|\w*"(?:\\.|[^"\\\r\n])*"|(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'|`(?:[^\\`\r\n]|\\.)*`/, lookbehind: !0, greedy: !0 },
    keyword:
      /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
    boolean: /\b(?:true|false)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
    operator: /&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,
    punctuation: /::?|[{}[\]();,.?]/,
    constant: /\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi)\b|[πℯ]/,
  }),
  !(function (a) {
    (a.languages.kotlin = a.languages.extend("clike", {
      keyword: {
        pattern:
          /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: !0,
      },
      function: [
        { pattern: /(?:`[^\r\n`]+`|\w+)(?=\s*\()/, greedy: !0 },
        { pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/, lookbehind: !0, greedy: !0 },
      ],
      number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
      operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
    })),
      delete a.languages.kotlin["class-name"],
      a.languages.insertBefore("kotlin", "string", { "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" } }),
      a.languages.insertBefore("kotlin", "keyword", { annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: "builtin" } }),
      a.languages.insertBefore("kotlin", "function", { label: { pattern: /\w+@|@\w+/, alias: "symbol" } });
    var b = [
      { pattern: /\$\{[^}]+\}/, inside: { delimiter: { pattern: /^\$\{|\}$/, alias: "variable" }, rest: a.languages.kotlin } },
      { pattern: /\$\w+/, alias: "variable" },
    ];
    (a.languages.kotlin.string.inside = a.languages.kotlin["raw-string"].inside = { interpolation: b }), (a.languages.kt = a.languages.kotlin), (a.languages.kts = a.languages.kotlin);
  })(Prism),
  !(function (a) {
    var b = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
      c = { "equation-command": { pattern: b, alias: "regex" } };
    (a.languages.latex = {
      comment: /%.*/m,
      cdata: { pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/, lookbehind: !0 },
      equation: [
        { pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/, inside: c, alias: "string" },
        { pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/, lookbehind: !0, inside: c, alias: "string" },
      ],
      keyword: { pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/, lookbehind: !0 },
      url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
      headline: {
        pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
        lookbehind: !0,
        alias: "class-name",
      },
      function: { pattern: b, alias: "selector" },
      punctuation: /[[\]{}&]/,
    }),
      (a.languages.tex = a.languages.latex),
      (a.languages.context = a.languages.latex);
  })(Prism),
  (Prism.languages.less = Prism.languages.extend("css", {
    comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
    atrule: { pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/, inside: { punctuation: /[:()]/ } },
    selector: { pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/, inside: { variable: /@+[\w-]+/ } },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    operator: /[+\-*\/]/,
  })),
  Prism.languages.insertBefore("less", "property", {
    variable: [{ pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } }, /@@?[\w-]+/],
    "mixin-usage": { pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/, lookbehind: !0, alias: "function" },
  }),
  !(function (d) {
    function j(a) {
      return RegExp("(\\()" + a + "(?=[\\s\\)])");
    }
    function k(a) {
      return RegExp("([\\s([])" + a + "(?=[\\s)])");
    }
    var a = "[-+*/_~!@$%^=<>{}\\w]+",
      c = "(\\()",
      h = "(?=\\))",
      i = "(?=\\s)",
      b = {
        heading: { pattern: /;;;.*/, alias: ["comment", "title"] },
        comment: /;.*/,
        string: { pattern: /"(?:[^"\\]|\\.)*"/, greedy: !0, inside: { argument: /[-A-Z]+(?=[.,\s])/, symbol: RegExp("`" + a + "'") } },
        "quoted-symbol": { pattern: RegExp("#?'" + a), alias: ["variable", "symbol"] },
        "lisp-property": { pattern: RegExp(":" + a), alias: "property" },
        splice: { pattern: RegExp(",@?" + a), alias: ["symbol", "variable"] },
        keyword: [
          { pattern: RegExp(c + "(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)" + i), lookbehind: !0 },
          { pattern: RegExp(c + "(?:for|do|collect|return|finally|append|concat|in|by)" + i), lookbehind: !0 },
        ],
        declare: { pattern: j("declare"), lookbehind: !0, alias: "keyword" },
        interactive: { pattern: j("interactive"), lookbehind: !0, alias: "keyword" },
        boolean: { pattern: k("(?:t|nil)"), lookbehind: !0 },
        number: { pattern: k("[-+]?\\d+(?:\\.\\d*)?"), lookbehind: !0 },
        defvar: { pattern: RegExp(c + "def(?:var|const|custom|group)\\s+" + a), lookbehind: !0, inside: { keyword: /^def[a-z]+/, variable: RegExp(a) } },
        defun: {
          pattern: RegExp(c + "(?:cl-)?(?:defun\\*?|defmacro)\\s+" + a + "\\s+\\([\\s\\S]*?\\)"),
          lookbehind: !0,
          inside: { keyword: /^(?:cl-)?def\S+/, arguments: null, function: { pattern: RegExp("(^\\s)" + a), lookbehind: !0 }, punctuation: /[()]/ },
        },
        lambda: { pattern: RegExp(c + "lambda\\s+\\(\\s*(?:&?" + a + "(?:\\s+&?" + a + ")*\\s*)?\\)"), lookbehind: !0, inside: { keyword: /^lambda/, arguments: null, punctuation: /[()]/ } },
        car: { pattern: RegExp(c + a), lookbehind: !0 },
        punctuation: [/(?:['`,]?\(|[)\[\]])/, { pattern: /(\s)\.(?=\s)/, lookbehind: !0 }],
      },
      e = {
        "lisp-marker": RegExp("&[-+*/_~!@$%^=<>{}\\w]+"),
        rest: {
          argument: { pattern: RegExp(a), alias: "variable" },
          varform: { pattern: RegExp(c + a + "\\s+\\S[\\s\\S]*" + h), lookbehind: !0, inside: { string: b.string, boolean: b.boolean, number: b.number, symbol: b.symbol, punctuation: /[()]/ } },
        },
      },
      f = "\\S+(?:\\s+\\S+)*",
      g = {
        pattern: RegExp(c + "[\\s\\S]*" + h),
        lookbehind: !0,
        inside: {
          "rest-vars": { pattern: RegExp("&(?:rest|body)\\s+" + f), inside: e },
          "other-marker-vars": { pattern: RegExp("&(?:optional|aux)\\s+" + f), inside: e },
          keys: { pattern: RegExp("&key\\s+" + f + "(?:\\s+&allow-other-keys)?"), inside: e },
          argument: { pattern: RegExp(a), alias: "variable" },
          punctuation: /[()]/,
        },
      };
    (b.lambda.inside.arguments = g),
      (b.defun.inside.arguments = d.util.clone(g)),
      (b.defun.inside.arguments.inside.sublist = g),
      (d.languages.lisp = b),
      (d.languages.elisp = b),
      (d.languages.emacs = b),
      (d.languages["emacs-lisp"] = b);
  })(Prism),
  (Prism.languages.matlab = {
    comment: [/%\{[\s\S]*?\}%/, /%.+/],
    string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
    number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
    keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    function: /(?!\d)\w+(?=\s*\()/,
    operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
    punctuation: /\.{3}|[.,;\[\](){}!]/,
  }),
  (Prism.languages.nginx = Prism.languages.extend("clike", {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword:
      /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
  })),
  Prism.languages.insertBefore("nginx", "keyword", { variable: /\$[a-z_]+/i }),
  (Prism.languages.objectivec = Prism.languages.extend("c", {
    string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    keyword:
      /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
  })),
  delete Prism.languages.objectivec["class-name"],
  (Prism.languages.objc = Prism.languages.objectivec),
  (Prism.languages.perl = {
    comment: [
      { pattern: /(^\s*)=\w[\s\S]*?=cut.*/m, lookbehind: !0 },
      { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
    ],
    string: [
      { pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
      { pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
      { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
      { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
      { pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, greedy: !0 },
      { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
      { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
      { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
    ],
    regex: [
      { pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/, greedy: !0 },
      { pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/, greedy: !0 },
      { pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/, greedy: !0 },
      { pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/, greedy: !0 },
      { pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/, greedy: !0 },
      { pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/, lookbehind: !0, greedy: !0 },
      { pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/, greedy: !0 },
    ],
    variable: [/[&*$@%]\{\^[A-Z]+\}/, /[&*$@%]\^[A-Z_]/, /[&*$@%]#?(?=\{)/, /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i, /[&*$@%]\d+/, /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
    filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
    vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: "string" },
    function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
    keyword:
      /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    operator:
      /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    punctuation: /[{}[\];(),:]/,
  }),
  !(function (a) {
    var b = "(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+";
    (a.languages.phpdoc = a.languages.extend("javadoclike", { parameter: { pattern: RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + b + "\\s+)?)\\$\\w+"), lookbehind: !0 } })),
      a.languages.insertBefore("phpdoc", "keyword", {
        "class-name": [
          {
            pattern: RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + b),
            lookbehind: !0,
            inside: { keyword: /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/, punctuation: /[|\\[\]()]/ },
          },
        ],
      }),
      a.languages.javadoclike.addSupport("php", a.languages.phpdoc);
  })(Prism),
  Prism.languages.insertBefore("php", "variable", {
    this: /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: { pattern: /\b[\w\\]+::/, inside: { keyword: /static|self|parent/, punctuation: /::|\\/ } },
  }),
  !(function (c) {
    var a = (Prism.languages.powershell = {
        comment: [
          { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
          { pattern: /(^|[^`])#.*/, lookbehind: !0 },
        ],
        string: [
          { pattern: /"(?:`[\s\S]|[^`"])*"/, greedy: !0, inside: { function: { pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/, lookbehind: !0, inside: {} } } },
          { pattern: /'(?:[^']|'')*'/, greedy: !0 },
        ],
        namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
        boolean: /\$(?:true|false)\b/i,
        variable: /\$\w+\b/,
        function: [
          /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
          /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
        ],
        keyword:
          /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
        operator: { pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i, lookbehind: !0 },
        punctuation: /[|{}[\];(),.]/,
      }),
      b = a.string[0].inside;
    (b.boolean = a.boolean), (b.variable = a.variable), (b.function.inside = a);
  })(),
  !(function (b) {
    var a = ["on", "ignoring", "group_right", "group_left", "by", "without"],
      c = ["sum", "min", "max", "avg", "group", "stddev", "stdvar", "count", "count_values", "bottomk", "topk", "quantile"].concat(a, ["offset"]);
    b.languages.promql = {
      comment: { pattern: /(^[ \t]*)#.*/m, lookbehind: !0 },
      "vector-match": { pattern: new RegExp("((?:" + a.join("|") + ")\\s*)\\([^)]*\\)"), lookbehind: !0, inside: { "label-key": { pattern: /\b[^,]*\b/, alias: "attr-name" }, punctuation: /[(),]/ } },
      "context-labels": {
        pattern: /\{[^{}]*\}/,
        inside: {
          "label-key": { pattern: /\b[a-z_]\w*(?=\s*(?:=~?|![=~]))/, alias: "attr-name" },
          "label-value": { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0, alias: "attr-value" },
          punctuation: /\{|\}|=~?|![=~]|,/,
        },
      },
      "context-range": [
        { pattern: /\[[\w\s:]+\]/, inside: { punctuation: /\[|\]|:/, "range-duration": { pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i, alias: "number" } } },
        { pattern: /(\boffset\s+)\w+/, lookbehind: !0, inside: { "range-duration": { pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i, alias: "number" } } },
      ],
      keyword: new RegExp("\\b(?:" + c.join("|") + ")\\b", "i"),
      function: /\b[a-zA-Z_]\w*(?=\s*\()/i,
      number: /[-+]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[-+]?\d+)?\b|\b(?:0x[0-9a-f]+|nan|inf)\b)/i,
      operator: /[\^*/%+-]|==|!=|<=|<|>=|>|\b(?:and|unless|or)\b/i,
      punctuation: /[{};()`,.[\]]/,
    };
  })(Prism),
  !(function (a) {
    var b = /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/;
    (a.languages.protobuf = a.languages.extend("clike", {
      "class-name": [
        { pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/, lookbehind: !0 },
        { pattern: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/, lookbehind: !0 },
      ],
      keyword: /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
      function: /[a-z_]\w*(?=\s*\()/i,
    })),
      a.languages.insertBefore("protobuf", "operator", {
        map: { pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i, alias: "class-name", inside: { punctuation: /[<>.,]/, builtin: b } },
        builtin: b,
        "positional-class-name": { pattern: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i, alias: "class-name", inside: { punctuation: /\./ } },
        annotation: { pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i, lookbehind: !0 },
      });
  })(Prism),
  !(function (a) {
    a.languages.puppet = {
      heredoc: [
        {
          pattern: /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
          lookbehind: !0,
          alias: "string",
          inside: { punctuation: /(?=\S).*\S(?= *$)/ },
        },
        {
          pattern: /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
          lookbehind: !0,
          greedy: !0,
          alias: "string",
          inside: { punctuation: /(?=\S).*\S(?= *$)/ },
        },
        { pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/, alias: "string", inside: { punctuation: { pattern: /(\().+?(?=\))/, lookbehind: !0 } } },
      ],
      "multiline-comment": { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0, greedy: !0, alias: "comment" },
      regex: {
        pattern: /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
        lookbehind: !0,
        greedy: !0,
        inside: { "extended-regex": { pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/, inside: { comment: /#.*/ } } },
      },
      comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
      string: {
        pattern: /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|\$(?!\{)|(?!\1)[^\\$]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { "double-quoted": { pattern: /^"[\s\S]*"$/, inside: {} } },
      },
      variable: { pattern: /\$(?:::)?\w+(?:::\w+)*/, inside: { punctuation: /::/ } },
      "attr-name": /(?:\w+|\*)(?=\s*=>)/,
      function: [{ pattern: /(\.)(?!\d)\w+/, lookbehind: !0 }, /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/],
      number: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
      boolean: /\b(?:true|false)\b/,
      keyword: /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
      datatype: {
        pattern:
          /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
        alias: "symbol",
      },
      operator: /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
      punctuation: /[\[\]{}().,;]|:+/,
    };
    var b = [
      {
        pattern: /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
        lookbehind: !0,
        inside: {
          "short-variable": { pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/, lookbehind: !0, alias: "variable", inside: { punctuation: /::/ } },
          delimiter: { pattern: /^\$/, alias: "variable" },
          rest: a.languages.puppet,
        },
      },
      { pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/, lookbehind: !0, alias: "variable", inside: { punctuation: /::/ } },
    ];
    (a.languages.puppet.heredoc[0].inside.interpolation = b), (a.languages.puppet.string.inside["double-quoted"].inside.interpolation = b);
  })(Prism),
  (Prism.languages.purescript = Prism.languages.extend("haskell", {
    keyword: /\b(?:ado|case|class|data|derive|do|else|forall|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    "import-statement": {
      pattern: /(^\s*)import\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
      lookbehind: !0,
      inside: { keyword: /\b(?:import|as|hiding)\b/ },
    },
    builtin:
      /\b(?:absurd|add|ap|append|apply|between|bind|bottom|clamp|compare|comparing|compose|conj|const|degree|discard|disj|div|eq|flap|flip|gcd|identity|ifM|join|lcm|liftA1|liftM1|map|max|mempty|min|mod|mul|negate|not|notEq|one|otherwise|recip|show|sub|top|unit|unless|unlessM|void|when|whenM|zero)\b/,
  })),
  (Prism.languages.purs = Prism.languages.purescript),
  (Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    "string-interpolation": {
      pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
          lookbehind: !0,
          inside: { "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 }, "conversion-option": { pattern: /![sra](?=[:}]$)/, alias: "punctuation" }, rest: null },
        },
        string: /[\s\S]+/,
      },
    },
    "triple-quoted-string": { pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: "string" },
    string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
    function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
    "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: { pattern: /(^\s*)@\w+(?:\.\w+)*/im, lookbehind: !0, alias: ["annotation", "punctuation"], inside: { punctuation: /\./ } },
    keyword:
      /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin:
      /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python),
  (Prism.languages.r = {
    comment: /#.*/,
    string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    "percent-operator": { pattern: /%[^%\s]*%/, alias: "operator" },
    boolean: /\b(?:TRUE|FALSE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [/\b(?:NaN|Inf)\b/, /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],
    keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
    punctuation: /[(){}\[\],;]/,
  }),
  !(function (a) {
    var d = a.util.clone(a.languages.javascript),
      b,
      c;
    (a.languages.jsx = a.languages.extend("markup", d)),
      (a.languages.jsx.tag.pattern =
        /<\/?(?:[\w.:-]+(?:\s+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i),
      (a.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
      (a.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i),
      (a.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
      a.languages.insertBefore(
        "inside",
        "attr-name",
        { spread: { pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/, inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ } } },
        a.languages.jsx.tag
      ),
      a.languages.insertBefore(
        "inside",
        "attr-value",
        {
          script: {
            pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
            inside: { "script-punctuation": { pattern: /^=(?={)/, alias: "punctuation" }, rest: a.languages.jsx },
            alias: "language-javascript",
          },
        },
        a.languages.jsx.tag
      ),
      (b = function (a) {
        return a ? ("string" == typeof a ? a : "string" == typeof a.content ? a.content : a.content.map(b).join("")) : "";
      }),
      (c = function (g) {
        for (var e = [], f = 0, d, i, h; f < g.length; f++)
          (d = g[f]),
            (i = !1),
            ("string" != typeof d &&
              ("tag" === d.type && d.content[0] && "tag" === d.content[0].type
                ? "</" === d.content[0].content[0].content
                  ? 0 < e.length && e[e.length - 1].tagName === b(d.content[0].content[1]) && e.pop()
                  : "/>" === d.content[d.content.length - 1].content || e.push({ tagName: b(d.content[0].content[1]), openedBraces: 0 })
                : 0 < e.length && "punctuation" === d.type && "{" === d.content
                ? e[e.length - 1].openedBraces++
                : 0 < e.length && 0 < e[e.length - 1].openedBraces && "punctuation" === d.type && "}" === d.content
                ? e[e.length - 1].openedBraces--
                : (i = !0)),
            (i || "string" == typeof d) && 0 < e.length && 0 === e[e.length - 1].openedBraces) &&
              ((h = b(d)),
              f < g.length - 1 && ("string" == typeof g[f + 1] || "plain-text" === g[f + 1].type) && ((h += b(g[f + 1])), g.splice(f + 1, 1)),
              0 < f && ("string" == typeof g[f - 1] || "plain-text" === g[f - 1].type) && ((h = b(g[f - 1]) + h), g.splice(f - 1, 1), f--),
              (g[f] = new a.Token("plain-text", h, null, h))),
            d.content && "string" != typeof d.content && c(d.content);
      }),
      a.hooks.add("after-tokenize", function (a) {
        ("jsx" !== a.language && "tsx" !== a.language) || c(a.tokens);
      });
  })(Prism),
  !(function (a) {
    var c = a.util.clone(a.languages.typescript),
      b;
    (a.languages.tsx = a.languages.extend("jsx", c)), (b = a.languages.tsx.tag), (b.pattern = RegExp("(^|[^\\w$]|(?=</))(?:" + b.pattern.source + ")", b.pattern.flags)), (b.lookbehind = !0);
  })(Prism),
  !(function (e) {
    var b = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" },
      a = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,
      c = "(?:[^\\\\-]|" + a.source + ")",
      f = RegExp(c + "-" + c),
      d = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: "variable" };
    e.languages.regex = {
      charset: {
        pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
        lookbehind: !0,
        inside: {
          "charset-negation": { pattern: /(^\[)\^/, lookbehind: !0, alias: "operator" },
          "charset-punctuation": { pattern: /^\[|\]$/, alias: "punctuation" },
          range: { pattern: f, inside: { escape: a, "range-punctuation": { pattern: /-/, alias: "operator" } } },
          "special-escape": b,
          charclass: { pattern: /\\[wsd]|\\p{[^{}]+}/i, alias: "class-name" },
          escape: a,
        },
      },
      "special-escape": b,
      charclass: { pattern: /\.|\\[wsd]|\\p{[^{}]+}/i, alias: "class-name" },
      backreference: [
        { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" },
        { pattern: /\\k<[^<>']+>/, alias: "keyword", inside: { "group-name": d } },
      ],
      anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" },
      escape: a,
      group: [
        { pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/, alias: "punctuation", inside: { "group-name": d } },
        { pattern: /\)/, alias: "punctuation" },
      ],
      quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: "number" },
      alternation: { pattern: /\|/, alias: "keyword" },
    };
  })(Prism),
  (Prism.languages.rest = {
    table: [
      { pattern: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1[+|].+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/, lookbehind: !0, inside: { punctuation: /\||(?:\+[=-]+)+\+/ } },
      { pattern: /(\s*)=+ [ =]*=(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1=+ [ =]*=(?=(?:\r?\n|\r){2}|\s*$)/, lookbehind: !0, inside: { punctuation: /[=-]+/ } },
    ],
    "substitution-def": {
      pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
      lookbehind: !0,
      inside: {
        substitution: { pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/, alias: "attr-value", inside: { punctuation: /^\||\|$/ } },
        directive: { pattern: /( +)(?! )[^:]+::/, lookbehind: !0, alias: "function", inside: { punctuation: /::$/ } },
      },
    },
    "link-target": [
      { pattern: /(^\s*\.\. )\[[^\]]+\]/m, lookbehind: !0, alias: "string", inside: { punctuation: /^\[|\]$/ } },
      { pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m, lookbehind: !0, alias: "string", inside: { punctuation: /^_|:$/ } },
    ],
    directive: { pattern: /(^\s*\.\. )[^:]+::/m, lookbehind: !0, alias: "function", inside: { punctuation: /::$/ } },
    comment: { pattern: /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m, lookbehind: !0 },
    title: [
      {
        pattern: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
        inside: { punctuation: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/, important: /.+/ },
      },
      {
        pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
        lookbehind: !0,
        inside: { punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/, important: /.+/ },
      },
    ],
    hr: { pattern: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/, lookbehind: !0, alias: "punctuation" },
    field: { pattern: /(^\s*):[^:\r\n]+:(?= )/m, lookbehind: !0, alias: "attr-name" },
    "command-line-option": {
      pattern: /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
      lookbehind: !0,
      alias: "symbol",
    },
    "literal-block": { pattern: /::(?:\r?\n|\r){2}([ \t]+)(?![ \t]).+(?:(?:\r?\n|\r)\1.+)*/, inside: { "literal-block-punctuation": { pattern: /^::/, alias: "punctuation" } } },
    "quoted-literal-block": {
      pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
      inside: { "literal-block-punctuation": { pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m, alias: "punctuation" } },
    },
    "list-bullet": { pattern: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im, lookbehind: !0, alias: "punctuation" },
    "doctest-block": { pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m, lookbehind: !0, inside: { punctuation: /^>>>/ } },
    inline: [
      {
        pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
        lookbehind: !0,
        inside: {
          bold: { pattern: /(^\*\*).+(?=\*\*$)/, lookbehind: !0 },
          italic: { pattern: /(^\*).+(?=\*$)/, lookbehind: !0 },
          "inline-literal": { pattern: /(^``).+(?=``$)/, lookbehind: !0, alias: "symbol" },
          role: { pattern: /^:[^:]+:|:[^:]+:$/, alias: "function", inside: { punctuation: /^:|:$/ } },
          "interpreted-text": { pattern: /(^`).+(?=`$)/, lookbehind: !0, alias: "attr-value" },
          substitution: { pattern: /(^\|).+(?=\|$)/, lookbehind: !0, alias: "attr-value" },
          punctuation: /\*\*?|``?|\|/,
        },
      },
    ],
    link: [
      { pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/, alias: "string", inside: { punctuation: /^\[|\]_$/ } },
      { pattern: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i, alias: "string", inside: { punctuation: /^_?`|`$|`?_?_$/ } },
    ],
    punctuation: { pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m, lookbehind: !0 },
  }),
  !(function (b) {
    for (var a = "/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/", c = 0; c < 2; c++)
      a = a.replace(/<self>/g, function () {
        return a;
      });
    (a = a.replace(/<self>/g, function () {
      return "[^\\s\\S]";
    })),
      (b.languages.rust = {
        comment: [
          { pattern: RegExp("(^|[^\\\\])" + a), lookbehind: !0, greedy: !0 },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
        ],
        string: { pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/, greedy: !0 },
        char: { pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/, greedy: !0, alias: "string" },
        attribute: { pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/, greedy: !0, alias: "attr-name", inside: { string: null } },
        "closure-params": {
          pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
          lookbehind: !0,
          greedy: !0,
          inside: { "closure-punctuation": { pattern: /^\||\|$/, alias: "punctuation" }, rest: null },
        },
        "lifetime-annotation": { pattern: /'\w+/, alias: "symbol" },
        "fragment-specifier": { pattern: /(\$\w+:)[a-z]+/, lookbehind: !0, alias: "punctuation" },
        variable: /\$\w+/,
        "function-definition": { pattern: /(\bfn\s+)\w+/, lookbehind: !0, alias: "function" },
        "type-definition": { pattern: /(\b(?:enum|struct|union)\s+)\w+/, lookbehind: !0, alias: "class-name" },
        "module-declaration": [
          { pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/, lookbehind: !0, alias: "namespace" },
          { pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/, lookbehind: !0, alias: "namespace", inside: { punctuation: /::/ } },
        ],
        keyword: [
          /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
          /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/,
        ],
        function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
        macro: { pattern: /\w+!/, alias: "property" },
        constant: /\b[A-Z_][A-Z_\d]+\b/,
        "class-name": /\b[A-Z]\w*\b/,
        namespace: { pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/, inside: { punctuation: /::/ } },
        number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/,
        boolean: /\b(?:false|true)\b/,
        punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
        operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
      }),
      (b.languages.rust["closure-params"].inside.rest = b.languages.rust),
      (b.languages.rust.attribute.inside.string = b.languages.rust.string);
  })(Prism),
  !(function (a) {
    (a.languages.sass = a.languages.extend("css", { comment: { pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m, lookbehind: !0 } })),
      a.languages.insertBefore("sass", "atrule", { "atrule-line": { pattern: /^(?:[ \t]*)[@+=].+/m, inside: { atrule: /(?:@[\w-]+|[+=])/m } } }),
      delete a.languages.sass.atrule;
    var b = /\$[-\w]+|#\{\$[-\w]+\}/,
      c = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, { pattern: /(\s+)-(?=\s)/, lookbehind: !0 }];
    a.languages.insertBefore("sass", "property", {
      "variable-line": { pattern: /^[ \t]*\$.+/m, inside: { punctuation: /:/, variable: b, operator: c } },
      "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
        inside: { property: [/[^:\s]+(?=\s*:)/, { pattern: /(:)[^:\s]+/, lookbehind: !0 }], punctuation: /:/, variable: b, operator: c, important: a.languages.sass.important },
      },
    }),
      delete a.languages.sass.property,
      delete a.languages.sass.important,
      a.languages.insertBefore("sass", "punctuation", {
        selector: { pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/, lookbehind: !0 },
      });
  })(Prism),
  (Prism.languages.scss = Prism.languages.extend("css", {
    comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
    atrule: { pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
      pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
      inside: { parent: { pattern: /&/, alias: "important" }, placeholder: /%[-\w]+/, variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
    property: { pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/, inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ } },
  })),
  Prism.languages.insertBefore("scss", "atrule", {
    keyword: [/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i, { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 }],
  }),
  Prism.languages.insertBefore("scss", "important", { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
  Prism.languages.insertBefore("scss", "function", {
    "module-modifier": { pattern: /\b(?:as|with|show|hide)\b/i, alias: "keyword" },
    placeholder: { pattern: /%[-\w]+/, alias: "selector" },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
    operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0 },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss),
  !(function (a) {
    var b = ["([\"'])(?:\\\\[^]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|(?!\\1)[^\\\\`$])*\\1", "<<-?\\s*([\"']?)(\\w+)\\2\\s[^]*?[\r\n]\\3"].join("|");
    (a.languages["shell-session"] = {
      command: {
        pattern: RegExp(
          '^(?:[^\\s@:$#*!/\\\\]+@[^\\s@:$#*!/\\\\]+(?::[^\0-\\x1F$#*?"<>:;|]+)?|[^\0-\\x1F$#*?"<>:;|]+)?[$#](?:[^\\\\\r\n\'"<]|\\\\.|<<str>>)+'.replace(/<<str>>/g, function () {
            return b;
          }),
          "m"
        ),
        greedy: !0,
        inside: {
          info: { pattern: /^[^#$]+/, alias: "punctuation", inside: { user: /^[^\s@:$#*!/\\]+@[^\s@:$#*!/\\]+/, punctuation: /:/, path: /[\s\S]+/ } },
          bash: { pattern: /(^[$#]\s*)\S[\s\S]*/, lookbehind: !0, alias: "language-bash", inside: a.languages.bash },
          "shell-symbol": { pattern: /^[$#]/, alias: "important" },
        },
      },
      output: /.(?:.*(?:[\r\n]|.$))*/,
    }),
      (a.languages["sh-session"] = a.languages.shellsession = a.languages["shell-session"]);
  })(Prism),
  (Prism.languages.sql = {
    comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
    variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
    string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
      /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
  }),
  !(function (d) {
    var b = { pattern: /(\b\d+)(?:%|[a-z]+)/, lookbehind: !0 },
      c = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 },
      a = {
        comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
        url: { pattern: /url\((["']?).*?\1\)/i, greedy: !0 },
        string: { pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/, greedy: !0 },
        interpolation: null,
        func: null,
        important: /\B!(?:important|optional)\b/i,
        keyword: { pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/, lookbehind: !0 },
        hexcode: /#[\da-f]{3,6}/i,
        color: [
          /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
          {
            pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: { unit: b, number: c, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
          },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: b,
        boolean: /\b(?:true|false)\b/,
        operator: [/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
        number: c,
        punctuation: /[{}()\[\];:,]/,
      };
    (a.interpolation = { pattern: /\{[^\r\n}:]+\}/, alias: "variable", inside: { delimiter: { pattern: /^{|}$/, alias: "punctuation" }, rest: a } }),
      (a.func = { pattern: /[\w-]+\([^)]*\).*/, inside: { function: /^[^(]+/, rest: a } }),
      (d.languages.stylus = {
        "atrule-declaration": { pattern: /(^\s*)@.+/m, lookbehind: !0, inside: { atrule: /^@[\w-]+/, rest: a } },
        "variable-declaration": { pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m, lookbehind: !0, inside: { variable: /^\S+/, rest: a } },
        statement: { pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t].+/m, lookbehind: !0, inside: { keyword: /^\S+/, rest: a } },
        "property-declaration": {
          pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
          lookbehind: !0,
          inside: { property: { pattern: /^[^\s:]+/, inside: { interpolation: a.interpolation } }, rest: a },
        },
        selector: {
          pattern:
            /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
          lookbehind: !0,
          inside: { interpolation: a.interpolation, comment: a.comment, punctuation: /[{},]/ },
        },
        func: a.func,
        string: a.string,
        comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0, greedy: !0 },
        interpolation: a.interpolation,
        punctuation: /[{}()\[\];:.]/,
      });
  })(Prism),
  (Prism.languages.swift = Prism.languages.extend("clike", {
    string: {
      pattern: /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[^(])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
      inside: { interpolation: { pattern: /\\\((?:[^()]|\([^)]+\))+\)/, inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } } } },
    },
    keyword:
      /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
    number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
    builtin:
      /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
  })),
  (Prism.languages.swift.string.inside.interpolation.inside.rest = Prism.languages.swift),
  !(function (b) {
    function a(a) {
      return a.replace(/__/g, function () {
        return "(?:[\\w-]+|'[^'\n\r]*'|\"(?:\\\\.|[^\\\\\"\r\n])*\")";
      });
    }
    b.languages.toml = {
      comment: { pattern: /#.*/, greedy: !0 },
      table: { pattern: RegExp(a("(^\\s*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])"), "m"), lookbehind: !0, greedy: !0, alias: "class-name" },
      key: { pattern: RegExp(a("(^\\s*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)"), "m"), lookbehind: !0, greedy: !0, alias: "property" },
      string: { pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
      date: [
        { pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i, alias: "number" },
        { pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/, alias: "number" },
      ],
      number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
      boolean: /\b(?:true|false)\b/,
      punctuation: /[.,=[\]{}]/,
    };
  })(Prism),
  (Prism.languages.twig = {
    comment: /\{#[\s\S]*?#\}/,
    tag: {
      pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
      inside: {
        ld: { pattern: /^(?:\{\{-?|\{%-?\s*\w+)/, inside: { punctuation: /^(?:\{\{|\{%)-?/, keyword: /\w+/ } },
        rd: { pattern: /-?(?:%\}|\}\})$/, inside: { punctuation: /.+/ } },
        string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, inside: { punctuation: /^['"]|['"]$/ } },
        keyword: /\b(?:even|if|odd)\b/,
        boolean: /\b(?:true|false|null)\b/,
        number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
        operator: [{ pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/, lookbehind: !0 }, /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/],
        property: /\b[a-zA-Z_]\w*\b/,
        punctuation: /[()\[\]{}:.,]/,
      },
    },
    other: { pattern: /\S(?:[\s\S]*\S)?/, inside: Prism.languages.markup },
  }),
  !(function (a) {
    var b =
      /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|GMENU|GMENU_FOLDOUT|GMENU_LAYERS|GP|HMENU|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENU|TMENUITEM|TMENU_LAYERS|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/;
    (a.languages.typoscript = {
      comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
        { pattern: /(^|[^\\:= \t]|(?:^|[^= \t])[ \t]+)\/\/.*/, lookbehind: !0, greedy: !0 },
        { pattern: /(^|[^"'])#.*/, lookbehind: !0, greedy: !0 },
      ],
      function: [
        {
          pattern: /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^"\r\n]*"|'[^'\r\n]*')\s*>/,
          inside: { string: { pattern: /"[^"\r\n]*"|'[^'\r\n]*'/, inside: { keyword: b } }, keyword: { pattern: /INCLUDE_TYPOSCRIPT/ } },
        },
        { pattern: /@import\s*(?:"[^"\r\n]*"|'[^'\r\n]*')/, inside: { string: /"[^"\r\n]*"|'[^'\r\n]*'/ } },
      ],
      string: { pattern: /^([^=]*=[< ]?)(?:(?!]\n).)*/, lookbehind: !0, inside: { function: /{\$.*}/, keyword: b, number: /^[0-9]+$/, punctuation: /[,|:]/ } },
      keyword: b,
      number: { pattern: /[0-9]+\s*[.{=]/, inside: { operator: /[.{=]/ } },
      tag: { pattern: /\.?[\w-\\]+\.?/, inside: { punctuation: /\./ } },
      punctuation: /[{}[\];(),.:|]/,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    }),
      (a.languages.tsconfig = a.languages.typoscript);
  })(Prism),
  (Prism.languages.verilog = {
    comment: /\/\/.*|\/\*[\s\S]*?\*\//,
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    property: /\B\$\w+\b/,
    constant: /\B`\w+\b/,
    function: /\w+(?=\()/,
    keyword:
      /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
    important: /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/,
    number: /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b(?:\d*[._])?\d+(?:e[-+]?\d+)?/i,
    operator: /[-+{}^~%*\/?=!<>&|]+/,
    punctuation: /[[\];(),.:]/,
  }),
  (Prism.languages.vhdl = {
    comment: /--.+/,
    "vhdl-vectors": { pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i, alias: "number" },
    "quoted-function": { pattern: /"\S+?"(?=\()/, alias: "function" },
    string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
    constant: /\b(?:use|library)\b/i,
    keyword:
      /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
    boolean: /\b(?:true|false)\b/i,
    function: /\w+(?=\()/,
    number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
    operator: /[<>]=?|:=|[-+*/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\w+(?=\()/,
    keyword:
      /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin:
      /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/,
  }),
  (Prism.languages["visual-basic"] = {
    comment: { pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i, inside: { keyword: /^REM/i } },
    directive: { pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i, alias: "comment", greedy: !0 },
    string: { pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
    date: {
      pattern:
        /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
      alias: "builtin",
    },
    number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
    boolean: /\b(?:True|False|Nothing)\b/i,
    keyword:
      /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
    operator: [/[+\-*/\\^<=>&#@$%!]/, { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 }],
    punctuation: /[{}().,:?]/,
  }),
  (Prism.languages.vb = Prism.languages["visual-basic"]),
  (Prism.languages.vba = Prism.languages["visual-basic"]),
  (Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
      { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
      {
        pattern:
          /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
        inside: { punctuation: /\./ },
      },
      /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number:
      /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/,
  }),
  !(function (a) {
    function b(b, c) {
      a.languages[b] && a.languages.insertBefore(b, "comment", { "doc-comment": c });
    }
    var c = a.languages.markup.tag,
      d = { pattern: /\/\/\/.*/, greedy: !0, alias: "comment", inside: { tag: c } },
      e = { pattern: /'''.*/, greedy: !0, alias: "comment", inside: { tag: c } };
    b("csharp", d), b("fsharp", d), b("vbnet", e);
  })(Prism),
  !(function (e) {
    var b = /[*&][^\s[\]{},]+/,
      c = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
      d = "(?:" + c.source + "(?:[ 	]+" + b.source + ")?|" + b.source + "(?:[ 	]+" + c.source + ")?)",
      g = "(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ 	]*(?:(?![#:])<PLAIN>|:<PLAIN>))*".replace(
        /<PLAIN>/g,
        function () {
          return "[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]";
        }
      ),
      f = "\"(?:[^\"\\\\\r\n]|\\\\.)*\"|'(?:[^'\\\\\r\n]|\\\\.)*'";
    function a(b, a) {
      a = (a || "").replace(/m/g, "") + "m";
      var c = "([:\\-,[{]\\s*(?:\\s<<prop>>[ 	]+)?)(?:<<value>>)(?=[ 	]*(?:$|,|]|}|(?:[\r\n]\\s*)?#))"
        .replace(/<<prop>>/g, function () {
          return d;
        })
        .replace(/<<value>>/g, function () {
          return b;
        });
      return RegExp(c, a);
    }
    (e.languages.yaml = {
      scalar: {
        pattern: RegExp(
          "([\\-:]\\s*(?:\\s<<prop>>[ 	]+)?[|>])[ 	]*(?:((?:\r?\n|\r)[ 	]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)".replace(/<<prop>>/g, function () {
            return d;
          })
        ),
        lookbehind: !0,
        alias: "string",
      },
      comment: /#.*/,
      key: {
        pattern: RegExp(
          "((?:^|[:\\-,[{\r\n?])[ 	]*(?:<<prop>>[ 	]+)?)<<key>>(?=\\s*:\\s)"
            .replace(/<<prop>>/g, function () {
              return d;
            })
            .replace(/<<key>>/g, function () {
              return "(?:" + g + "|" + f + ")";
            })
        ),
        lookbehind: !0,
        greedy: !0,
        alias: "atrule",
      },
      directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
      datetime: {
        pattern: a("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ 	]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ 	]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"),
        lookbehind: !0,
        alias: "number",
      },
      boolean: { pattern: a("true|false", "i"), lookbehind: !0, alias: "important" },
      null: { pattern: a("null|~", "i"), lookbehind: !0, alias: "important" },
      string: { pattern: a(f), lookbehind: !0, greedy: !0 },
      number: { pattern: a("[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)", "i"), lookbehind: !0 },
      tag: c,
      important: b,
      punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
    }),
      (e.languages.yml = e.languages.yaml);
  })(Prism),
  !(function () {
    if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
      var c,
        i = function () {
          if (void 0 === c) {
            var a = document.createElement("div");
            (a.style.fontSize = "13px"),
              (a.style.lineHeight = "1.5"),
              (a.style.padding = "0"),
              (a.style.border = "0"),
              (a.innerHTML = "&nbsp;<br />&nbsp;"),
              document.body.appendChild(a),
              (c = 38 === a.offsetHeight),
              document.body.removeChild(a);
          }
          return c;
        },
        e = !0,
        f = 0;
      Prism.hooks.add("before-sanity-check", function (c) {
        var b = c.element.parentElement,
          e = b && b.getAttribute("data-line"),
          d;
        b &&
          e &&
          /pre/i.test(b.nodeName) &&
          ((d = 0),
          a(".line-highlight", b).forEach(function (a) {
            (d += a.textContent.length), a.parentNode.removeChild(a);
          }),
          d && /^( \n)+$/.test(c.code.slice(-d)) && (c.code = c.code.slice(0, -d)));
      }),
        Prism.hooks.add("complete", function g(c) {
          var a = c.element.parentElement,
            e = a && a.getAttribute("data-line"),
            i,
            j;
          a &&
            e &&
            /pre/i.test(a.nodeName) &&
            (clearTimeout(f),
            (i = Prism.plugins.lineNumbers),
            (j = c.plugins && c.plugins.lineNumbers),
            b(a, "line-numbers") && i && !j ? Prism.hooks.add("line-numbers", g) : (d(a, e)(), (f = setTimeout(h, 1))));
        }),
        window.addEventListener("hashchange", h),
        window.addEventListener("resize", function () {
          a("pre[data-line]")
            .map(function (a) {
              return d(a);
            })
            .forEach(g);
        });
    }
    function a(a, b) {
      return Array.prototype.slice.call((b || document).querySelectorAll(a));
    }
    function b(b, a) {
      return (a = " " + a + " "), -1 < (" " + b.className + " ").replace(/[\n\t]/g, " ").indexOf(a);
    }
    function g(a) {
      a();
    }
    function d(c, l, t) {
      var s = (l = "string" == typeof l ? l : c.getAttribute("data-line")).replace(/\s+/g, "").split(",").filter(Boolean),
        r = +c.getAttribute("data-line-offset") || 0,
        q = (i() ? parseInt : parseFloat)(getComputedStyle(c).lineHeight),
        j = b(c, "line-numbers"),
        f = c.querySelector("code"),
        p = j ? c : f || c,
        d = [],
        n =
          f && p != f
            ? (function (d, b) {
                var e = getComputedStyle(d),
                  c = getComputedStyle(b);
                function a(a) {
                  return +a.substr(0, a.length - 2);
                }
                return b.offsetTop + a(c.borderTopWidth) + a(c.paddingTop) - a(e.paddingTop);
              })(c, f)
            : 0,
        m,
        k,
        o,
        h,
        u;
      if (
        (s.forEach(function (f) {
          var i = f.split("-"),
            b = +i[0],
            e = +i[1] || b,
            a = c.querySelector('.line-highlight[data-range="' + f + '"]') || document.createElement("div"),
            g,
            h,
            k,
            l;
          d.push(function () {
            a.setAttribute("aria-hidden", "true"), a.setAttribute("data-range", f), (a.className = (t || "") + " line-highlight");
          }),
            j && Prism.plugins.lineNumbers
              ? ((g = Prism.plugins.lineNumbers.getLine(c, b)),
                (h = Prism.plugins.lineNumbers.getLine(c, e)),
                g &&
                  ((k = g.offsetTop + n + "px"),
                  d.push(function () {
                    a.style.top = k;
                  })),
                h &&
                  ((l = h.offsetTop - g.offsetTop + h.offsetHeight + "px"),
                  d.push(function () {
                    a.style.height = l;
                  })))
              : d.push(function () {
                  a.setAttribute("data-start", String(b)),
                    b < e && a.setAttribute("data-end", String(e)),
                    (a.style.top = (b - r - 1) * q + n + "px"),
                    (a.textContent = new Array(e - b + 2).join(" \n"));
                }),
            d.push(function () {
              p.appendChild(a);
            });
        }),
        (m = c.id),
        j && m)
      ) {
        for (k = "linkable-line-numbers", o = !1, h = c; h; ) {
          if (b(h, k)) {
            o = !0;
            break;
          }
          h = h.parentElement;
        }
        o &&
          (b(c, k) ||
            d.push(function () {
              c.className = (c.className + " " + k).trim();
            }),
          (u = parseInt(c.getAttribute("data-start") || "1")),
          a(".line-numbers-rows > span", c).forEach(function (a, b) {
            var c = b + u;
            a.onclick = function () {
              var a = m + "." + c;
              (e = !1),
                (location.hash = a),
                setTimeout(function () {
                  e = !0;
                }, 1);
            };
          }));
      }
      return function () {
        d.forEach(g);
      };
    }
    function h() {
      var b = location.hash.slice(1),
        f,
        g,
        c;
      a(".temporary.line-highlight").forEach(function (a) {
        a.parentNode.removeChild(a);
      }),
        (f = (b.match(/\.([\d,-]+)$/) || [, ""])[1]),
        f &&
          !document.getElementById(b) &&
          ((g = b.slice(0, b.lastIndexOf("."))),
          (c = document.getElementById(g)),
          c && (c.hasAttribute("data-line") || c.setAttribute("data-line", ""), d(c, f, "temporary ")(), e && document.querySelector(".temporary.line-highlight").scrollIntoView()));
    }
  })(),
  !(function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
      var a = "line-numbers",
        c = /\n(?!$)/g,
        e = (Prism.plugins.lineNumbers = {
          getLine: function (d, b) {
            var e, c, f, g;
            if ("PRE" === d.tagName && d.classList.contains(a))
              if (((e = d.querySelector(".line-numbers-rows")), e))
                return (c = parseInt(d.getAttribute("data-start"), 10) || 1), (f = c + (e.children.length - 1)), b < c && (b = c), f < b && (b = f), (g = b - c), e.children[g];
          },
          resize: function (a) {
            b([a]);
          },
          assumeViewportIndependence: !0,
        }),
        f = function (a) {
          return a ? (window.getComputedStyle ? getComputedStyle(a) : a.currentStyle || null) : null;
        },
        d = void 0;
      window.addEventListener("resize", function () {
        (e.assumeViewportIndependence && d === window.innerWidth) || ((d = window.innerWidth), b(Array.prototype.slice.call(document.querySelectorAll("pre." + a))));
      }),
        Prism.hooks.add("complete", function (e) {
          var f, d, g, h, i, j;
          e.code &&
            ((f = e.element),
            (d = f.parentNode),
            d &&
              /pre/i.test(d.nodeName) &&
              !f.querySelector(".line-numbers-rows") &&
              Prism.util.isActive(f, a) &&
              (f.classList.remove(a),
              d.classList.add(a),
              (h = e.code.match(c)),
              (i = h ? h.length + 1 : 1),
              (j = new Array(i + 1).join("<span></span>")),
              (g = document.createElement("span")).setAttribute("aria-hidden", "true"),
              (g.className = "line-numbers-rows"),
              (g.innerHTML = j),
              d.hasAttribute("data-start") && (d.style.counterReset = "linenumber " + (parseInt(d.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(g),
              b([d]),
              Prism.hooks.run("line-numbers", e)));
        }),
        Prism.hooks.add("line-numbers", function (a) {
          (a.plugins = a.plugins || {}), (a.plugins.lineNumbers = !0);
        });
    }
    function b(a) {
      if (
        0 !=
        (a = a.filter(function (b) {
          var a = f(b)["white-space"];
          return "pre-wrap" === a || "pre-line" === a;
        })).length
      ) {
        var b = a
          .map(function (b) {
            var d = b.querySelector("code"),
              e = b.querySelector(".line-numbers-rows"),
              a,
              f,
              g;
            if (d && e)
              return (
                (a = b.querySelector(".line-numbers-sizer")),
                (f = d.textContent.split(c)),
                a || (((a = document.createElement("span")).className = "line-numbers-sizer"), d.appendChild(a)),
                (a.innerHTML = "0"),
                (a.style.display = "block"),
                (g = a.getBoundingClientRect().height),
                (a.innerHTML = ""),
                { element: b, lines: f, lineHeights: [], oneLinerHeight: g, sizer: a }
              );
          })
          .filter(Boolean);
        b.forEach(function (a) {
          var d = a.sizer,
            b = a.lines,
            c = a.lineHeights,
            e = a.oneLinerHeight;
          (c[b.length - 1] = void 0),
            b.forEach(function (a, f) {
              if (a && 1 < a.length) {
                var b = d.appendChild(document.createElement("span"));
                (b.style.display = "block"), (b.textContent = a);
              } else c[f] = e;
            });
        }),
          b.forEach(function (c) {
            for (var d = c.sizer, b = c.lineHeights, e = 0, a = 0; a < b.length; a++) void 0 === b[a] && (b[a] = d.children[e++].getBoundingClientRect().height);
          }),
          b.forEach(function (a) {
            var b = a.sizer,
              c = a.element.querySelector(".line-numbers-rows");
            (b.style.display = "none"),
              (b.innerHTML = ""),
              a.lineHeights.forEach(function (a, b) {
                c.children[b].style.height = a + "px";
              });
          });
      }
    }
  })(),
  !(function () {
    var b, a, c, d, e;
    "undefined" != typeof self &&
      self.Prism &&
      self.document &&
      ((b = []),
      (a = {}),
      (c = function () {}),
      (Prism.plugins.toolbar = {}),
      (d = Prism.plugins.toolbar.registerButton =
        function (d, c) {
          var e;
          (e =
            "function" == typeof c
              ? c
              : function (b) {
                  var a;
                  return (
                    "function" == typeof c.onClick
                      ? (((a = document.createElement("button")).type = "button"),
                        a.addEventListener("click", function () {
                          c.onClick.call(this, b);
                        }))
                      : "string" == typeof c.url
                      ? ((a = document.createElement("a")).href = c.url)
                      : (a = document.createElement("span")),
                    c.className && a.classList.add(c.className),
                    (a.textContent = c.text),
                    a
                  );
                }),
            d in a ? console.warn('There is a button with the key "' + d + '" registered already.') : b.push((a[d] = e));
        }),
      (e = Prism.plugins.toolbar.hook =
        function (f) {
          var d = f.element.parentNode,
            e,
            g,
            h,
            i;
          d &&
            /pre/i.test(d.nodeName) &&
            !d.parentNode.classList.contains("code-toolbar") &&
            ((e = document.createElement("div")),
            e.classList.add("code-toolbar"),
            d.parentNode.insertBefore(e, d),
            e.appendChild(d),
            (g = document.createElement("div")),
            g.classList.add("toolbar"),
            (h = b),
            (i = (function (a) {
              for (; a; ) {
                var b = a.getAttribute("data-toolbar-order");
                if (null != b) return (b = b.trim()).length ? b.split(/\s*,\s*/g) : [];
                a = a.parentElement;
              }
            })(f.element)),
            i &&
              (h = i.map(function (b) {
                return a[b] || c;
              })),
            h.forEach(function (c) {
              var b = c(f),
                a;
              b && ((a = document.createElement("div")), a.classList.add("toolbar-item"), a.appendChild(b), g.appendChild(a));
            }),
            e.appendChild(g));
        }),
      d("label", function (e) {
        var a = e.element.parentNode,
          b,
          c,
          d;
        if (a && /pre/i.test(a.nodeName) && a.hasAttribute("data-label")) {
          d = a.getAttribute("data-label");
          try {
            c = document.querySelector("template#" + d);
          } catch (a) {}
          return (
            c ? (b = c.content) : (a.hasAttribute("data-url") ? ((b = document.createElement("a")).href = a.getAttribute("data-url")) : (b = document.createElement("span")), (b.textContent = d)), b
          );
        }
      }),
      Prism.hooks.add("complete", e));
  })(),
  !(function () {
    if ("undefined" != typeof self && self.Prism && self.document)
      if (Prism.plugins.toolbar) {
        var a = {
          none: "Plain text",
          html: "HTML",
          xml: "XML",
          svg: "SVG",
          mathml: "MathML",
          ssml: "SSML",
          rss: "RSS",
          css: "CSS",
          clike: "C-like",
          js: "JavaScript",
          abap: "ABAP",
          abnf: "ABNF",
          al: "AL",
          antlr4: "ANTLR4",
          g4: "ANTLR4",
          apacheconf: "Apache Configuration",
          apl: "APL",
          aql: "AQL",
          arff: "ARFF",
          asciidoc: "AsciiDoc",
          adoc: "AsciiDoc",
          aspnet: "ASP.NET (C#)",
          asm6502: "6502 Assembly",
          autohotkey: "AutoHotkey",
          autoit: "AutoIt",
          basic: "BASIC",
          bbcode: "BBcode",
          bnf: "BNF",
          rbnf: "RBNF",
          bsl: "BSL (1C:Enterprise)",
          oscript: "OneScript",
          csharp: "C#",
          cs: "C#",
          dotnet: "C#",
          cpp: "C++",
          cil: "CIL",
          cmake: "CMake",
          coffee: "CoffeeScript",
          conc: "Concurnas",
          csp: "Content-Security-Policy",
          "css-extras": "CSS Extras",
          dataweave: "DataWeave",
          dax: "DAX",
          django: "Django/Jinja2",
          jinja2: "Django/Jinja2",
          "dns-zone-file": "DNS zone file",
          "dns-zone": "DNS zone file",
          dockerfile: "Docker",
          ebnf: "EBNF",
          editorconfig: "EditorConfig",
          ejs: "EJS",
          etlua: "Embedded Lua templating",
          erb: "ERB",
          "excel-formula": "Excel Formula",
          xlsx: "Excel Formula",
          xls: "Excel Formula",
          fsharp: "F#",
          "firestore-security-rules": "Firestore security rules",
          ftl: "FreeMarker Template Language",
          gml: "GameMaker Language",
          gamemakerlanguage: "GameMaker Language",
          gcode: "G-code",
          gdscript: "GDScript",
          gedcom: "GEDCOM",
          glsl: "GLSL",
          graphql: "GraphQL",
          hs: "Haskell",
          hcl: "HCL",
          hlsl: "HLSL",
          http: "HTTP",
          hpkp: "HTTP Public-Key-Pins",
          hsts: "HTTP Strict-Transport-Security",
          ichigojam: "IchigoJam",
          ignore: ".ignore",
          gitignore: ".gitignore",
          hgignore: ".hgignore",
          npmignore: ".npmignore",
          inform7: "Inform 7",
          javadoc: "JavaDoc",
          javadoclike: "JavaDoc-like",
          javastacktrace: "Java stack trace",
          jq: "JQ",
          jsdoc: "JSDoc",
          "js-extras": "JS Extras",
          json: "JSON",
          webmanifest: "Web App Manifest",
          json5: "JSON5",
          jsonp: "JSONP",
          jsstacktrace: "JS stack trace",
          "js-templates": "JS Templates",
          kts: "Kotlin Script",
          kt: "Kotlin",
          latex: "LaTeX",
          tex: "TeX",
          context: "ConTeXt",
          lilypond: "LilyPond",
          ly: "LilyPond",
          emacs: "Lisp",
          elisp: "Lisp",
          "emacs-lisp": "Lisp",
          llvm: "LLVM IR",
          lolcode: "LOLCODE",
          md: "Markdown",
          "markup-templating": "Markup templating",
          matlab: "MATLAB",
          mel: "MEL",
          mongodb: "MongoDB",
          moon: "MoonScript",
          n1ql: "N1QL",
          n4js: "N4JS",
          n4jsd: "N4JS",
          "nand2tetris-hdl": "Nand To Tetris HDL",
          naniscript: "Naninovel Script",
          nani: "Naninovel Script",
          nasm: "NASM",
          neon: "NEON",
          nginx: "nginx",
          nsis: "NSIS",
          objectivec: "Objective-C",
          objc: "Objective-C",
          ocaml: "OCaml",
          opencl: "OpenCL",
          parigp: "PARI/GP",
          objectpascal: "Object Pascal",
          pcaxis: "PC-Axis",
          px: "PC-Axis",
          peoplecode: "PeopleCode",
          pcode: "PeopleCode",
          php: "PHP",
          phpdoc: "PHPDoc",
          "php-extras": "PHP Extras",
          plsql: "PL/SQL",
          powerquery: "PowerQuery",
          pq: "PowerQuery",
          mscript: "PowerQuery",
          powershell: "PowerShell",
          promql: "PromQL",
          properties: ".properties",
          protobuf: "Protocol Buffers",
          purebasic: "PureBasic",
          pbfasm: "PureBasic",
          purs: "PureScript",
          py: "Python",
          q: "Q (kdb+ database)",
          qml: "QML",
          rkt: "Racket",
          jsx: "React JSX",
          tsx: "React TSX",
          renpy: "Ren'py",
          rpy: "Ren'py",
          rest: "reST (reStructuredText)",
          robotframework: "Robot Framework",
          robot: "Robot Framework",
          rb: "Ruby",
          sas: "SAS",
          sass: "Sass (Sass)",
          scss: "Sass (Scss)",
          "shell-session": "Shell session",
          "sh-session": "Shell session",
          shellsession: "Shell session",
          sml: "SML",
          smlnj: "SML/NJ",
          solidity: "Solidity (Ethereum)",
          sol: "Solidity (Ethereum)",
          "solution-file": "Solution file",
          sln: "Solution file",
          soy: "Soy (Closure Template)",
          sparql: "SPARQL",
          rq: "SPARQL",
          "splunk-spl": "Splunk SPL",
          sqf: "SQF: Status Quo Function (Arma 3)",
          sql: "SQL",
          iecst: "Structured Text (IEC 61131-3)",
          "t4-templating": "T4 templating",
          "t4-cs": "T4 Text Templates (C#)",
          t4: "T4 Text Templates (C#)",
          "t4-vb": "T4 Text Templates (VB)",
          tap: "TAP",
          tt2: "Template Toolkit 2",
          toml: "TOML",
          trig: "TriG",
          ts: "TypeScript",
          tsconfig: "TSConfig",
          uscript: "UnrealScript",
          uc: "UnrealScript",
          vbnet: "VB.Net",
          vhdl: "VHDL",
          vim: "vim",
          "visual-basic": "Visual Basic",
          vba: "VBA",
          vb: "Visual Basic",
          wasm: "WebAssembly",
          wiki: "Wiki markup",
          xeoracube: "XeoraCube",
          "xml-doc": "XML doc (.net)",
          xojo: "Xojo (REALbasic)",
          xquery: "XQuery",
          yaml: "YAML",
          yml: "YAML",
          yang: "YANG",
        };
        Prism.plugins.toolbar.registerButton("show-language", function (c) {
          var d = c.element.parentNode,
            b,
            e,
            f;
          if (d && /pre/i.test(d.nodeName))
            if (((e = d.getAttribute("data-language") || a[c.language] || ((b = c.language) && (b.substring(0, 1).toUpperCase() + b.substring(1)).replace(/s(?=cript)/, "S"))), e))
              return (f = document.createElement("span")), (f.textContent = e), f;
        });
      } else console.warn("Show Languages plugin loaded before Toolbar plugin.");
  })();
