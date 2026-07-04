// Custom Adobe Target mboxes (at.js 2.x).
// Each entry maps a Target mbox (location) name to a CSS selector on the page.
// A getOffer request is only fired when the selector exists on the current page,
// so this single file can be safely included on every page.
(function () {
  var MBOXES = [
    { mbox: 'home-hero', selector: '#mbox-home-hero' },
    { mbox: 'home-promo', selector: '#mbox-home-promo' },
    { mbox: 'images-reco', selector: '#mbox-images-reco' },
    { mbox: 'video-cta', selector: '#mbox-video-cta' },
    { mbox: 'slider-cta', selector: '#mbox-slider-cta' },
    { mbox: 'shop-hero', selector: '#mbox-shop-hero' },
    { mbox: 'learn-hero', selector: '#mbox-learn-hero' },
    { mbox: 'showcase-hero', selector: '#mbox-showcase-hero' }
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

  // Conversion tracking: any element with data-track-mbox="<name>" fires a
  // trackEvent click request to Target when clicked. Used to define metrics/goals.
  function initConversionTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-track-mbox]') : null;
      if (!el) { return; }

      var name = el.getAttribute('data-track-mbox');
      if (!(window.adobe && adobe.target && typeof adobe.target.trackEvent === 'function')) {
        if (window.console) {
          console.warn('[Target] at.js not loaded - cannot track "' + name + '".');
        }
        return;
      }

      adobe.target.trackEvent({
        mbox: name,
        type: 'click',
        params: { clickedId: el.id || '', page: window.location.pathname }
      });
      if (window.console) { console.log('[Target] trackEvent fired: ' + name); }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initConversionTracking();

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
