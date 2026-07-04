// Custom Adobe Target mboxes (at.js 2.x).
// Each entry maps a Target mbox (location) name to a CSS selector on the page.
// A getOffer request is only fired when the selector exists on the current page,
// so this single file can be safely included on every page.
(function () {
  var MBOXES = [
    { mbox: 'home-hero', selector: '#mbox-home-hero' },
    { mbox: 'home-promo', selector: '#mbox-home-promo' },
    { mbox: 'images-reco', selector: '#mbox-images-reco' }
  ];

  function requestMbox(cfg) {
    var el = document.querySelector(cfg.selector);
    if (!el) { return; } // location not present on this page

    adobe.target.getOffer({
      mbox: cfg.mbox,
      params: { page: window.location.pathname },
      success: function (offer) {
        adobe.target.applyOffer({
          mbox: cfg.mbox,
          selector: cfg.selector,
          offer: offer
        });
      },
      error: function (status, error) {
        if (window.console) {
          console.warn('[Target] getOffer failed for "' + cfg.mbox + '"', status, error);
        }
        el.style.visibility = 'visible';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var ready = window.adobe && adobe.target && typeof adobe.target.getOffer === 'function';
    if (!ready) {
      if (window.console) {
        console.warn('[Target] at.js not loaded - skipping custom mboxes. Add js/at.js.');
      }
      return;
    }
    MBOXES.forEach(requestMbox);
  });
})();
