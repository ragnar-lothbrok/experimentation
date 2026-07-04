// URL query-parameter driven content show/hide for experimentation.
//
// Supported markup:
//   data-show-if="key=value"  -> element is shown ONLY when ?key=value is present.
//   data-hide-if="key=value"  -> element is hidden when ?key=value is present.
//   data-toggle="name"        -> element is revealed by ?show=name and hidden by ?hide=name.
//                                (?show / ?hide accept comma-separated lists)
//
// Visibility is controlled by adding/removing the .exp-hidden class.
(function () {
  function qsa(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function show(el) { el.classList.remove('exp-hidden'); }
  function hide(el) { el.classList.add('exp-hidden'); }

  function matches(params, expr) {
    if (!expr) { return false; }
    var idx = expr.indexOf('=');
    if (idx === -1) { return params.has(expr.trim()); }
    var key = expr.slice(0, idx).trim();
    var val = expr.slice(idx + 1).trim();
    return params.get(key) === val;
  }

  function csv(value) {
    return (value || '').split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean);
  }

  function apply() {
    var params = new URLSearchParams(window.location.search);

    qsa('[data-show-if]').forEach(function (el) {
      if (matches(params, el.getAttribute('data-show-if'))) { show(el); } else { hide(el); }
    });

    qsa('[data-hide-if]').forEach(function (el) {
      if (matches(params, el.getAttribute('data-hide-if'))) { hide(el); } else { show(el); }
    });

    csv(params.get('show')).forEach(function (name) {
      qsa('[data-toggle="' + name + '"]').forEach(show);
    });

    csv(params.get('hide')).forEach(function (name) {
      qsa('[data-toggle="' + name + '"]').forEach(hide);
    });
  }

  document.addEventListener('DOMContentLoaded', apply);
})();
