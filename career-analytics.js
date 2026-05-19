/* career-analytics.js - PostHog bootstrap for the career shell
 *
 * Loads the PostHog browser SDK and initialises it with the EHP project key.
 * All events captured while this page is open carry source=career as a
 * super-property (set by career-shell.js on page load) so they can be
 * filtered separately from EHP investor events in the same project.
 *
 * This file intentionally uses the same PostHog project as EHP. Cost is
 * negligible for Roger's volume and side-by-side filtering is easier than
 * managing a second project.
 *
 * The actual project API key is fetched from /assets/analytics.json (already
 * present in this repo pattern from the EHP shell). If the file does not
 * exist yet, this script fails silent and the shell still renders - analytics
 * is a nice-to-have, not a blocker.
 */
(function () {
  // PostHog snippet - standard bootstrap.
  !(function (t, e) {
    var o, n, p, r;
    e.__SV ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split('.');
          2 == o.length && ((t = t[o[0]]), (e = o[1]));
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        (p = t.createElement('script')),
          (p.type = 'text/javascript'),
          (p.async = !0),
          (p.src = s.api_host + '/static/array.js'),
          (r = t.getElementsByTagName('script')[0]),
          r.parentNode.insertBefore(p, r);
        var u = e;
        for (
          void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
            u.people = u.people || [],
            u.toString = function (t) {
              var e = 'posthog';
              return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
            },
            u.people.toString = function () {
              return u.toString(1) + '.people (stub)';
            },
            o =
              'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys'.split(
                ' '
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n]);
        e._i.push([i, s, a]);
      }),
      (e.__SV = 1));
  })(document, window.posthog || []);

  // Load project config from the shared analytics.json (same pattern as EHP shell).
  fetch('/assets/analytics.json')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg || !cfg.posthog_project_key) return;
      window.posthog.init(cfg.posthog_project_key, {
        api_host: cfg.posthog_api_host || 'https://us.i.posthog.com',
        capture_pageview: true,
        persistence: 'localStorage+cookie',
      });
      // Default super-property - if ?invite=TOKEN is present, career-shell.js
      // upgrades this to source=career. For bare public-site visits, we
      // tag source=public so we can filter out our own checks.
      window.posthog.register({ source: 'public' });
    })
    .catch(function () {
      /* analytics optional - ignore failures */
    });
})();
