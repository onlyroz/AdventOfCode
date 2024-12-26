function initialiseAnalytics() {
  const analytics = (window.analytics = window.analytics || []);
  if (!analytics.initialize)
    if (analytics.invoked)
      window.console &&
        console.error &&
        console.error('Segment snippet included twice.');
    else {
      const writeKey = window.location.hostname.startsWith('localhost')
        ? 'hCrhB0Vyus4FIgA6RYtp8egAO6aHdIux'
        : 'g24WKU2fKIEeiWdONkrb4KpDZbzcu9Gt';
      analytics.invoked = !0;
      analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on',
        'addSourceMiddleware',
        'addIntegrationMiddleware',
        'setAnonymousId',
        'addDestinationMiddleware',
      ];
      analytics.factory = function (e) {
        return function () {
          if (window.analytics.initialized)
            return window.analytics[e].apply(window.analytics, arguments);
          const i = Array.prototype.slice.call(arguments);
          i.unshift(e);
          analytics.push(i);
          return analytics;
        };
      };
      for (let i = 0; i < analytics.methods.length; i++) {
        const key = analytics.methods[i];
        analytics[key] = analytics.factory(key);
      }
      analytics.load = function (key, i) {
        const t = document.createElement('script');
        t.type = 'text/javascript';
        t.async = !0;
        t.src =
          'https://cdn.segment.com/analytics.js/v1/' +
          key +
          '/analytics.min.js';
        const n = document.getElementsByTagName('script')[0];
        n.parentNode.insertBefore(t, n);
        analytics._loadOptions = i;
      };
      analytics._writeKey = writeKey;
      analytics.SNIPPET_VERSION = '4.16.1';
      analytics.load(writeKey);
    }
}

window.initialiseAnalytics = initialiseAnalytics;
