/* career-shell.js - Roger career outbound shell
 *
 * When the page is loaded with ?invite=TOKEN, this script:
 *   1. Hides the existing public landing content
 *   2. Fetches rendered campaign content from validate-invite cloud function
 *   3. Injects that content into a new pitch container
 *   4. Tracks visit + scroll milestones + PDF download in PostHog as source=career
 *   5. Offers a "Download PDF" button when the cloud function returns a pdf_url
 *
 * When there is no invite token, this script does nothing and the public site
 * renders normally.
 *
 * Depends on:
 *   - PostHog browser SDK initialised before this file runs (see career-analytics.js)
 *   - validate-invite cloud function at the URL below (same one EHP uses)
 *   - Rendered HTML content reachable via data.content (string) in the response
 *   - Optional data.pdf_url returned by validate-invite when a PDF has been baked
 *
 * Storage:
 *   - sessionStorage key: career_invite_token (per-tab) so a refresh keeps context
 *   - localStorage key:   career_invite_token (persists across tabs) for forwarders
 *
 * The cloud function URL is the same investorops endpoint that EHP uses. The
 * per-campaign YAML decides which content gets served for a given invite_id;
 * this shell does not need to know whether the campaign is EHP or Career.
 */
(function () {
  var VALIDATE_URL = 'https://us-central1-investorops.cloudfunctions.net/validate-invite';

  var params = new URLSearchParams(location.search);
  var token =
    params.get('invite') ||
    sessionStorage.getItem('career_invite_token') ||
    localStorage.getItem('career_invite_token');

  // No token -> let the public site render as-is.
  if (!token) return;

  // Super-property for PostHog so every subsequent capture carries source=career.
  if (window.posthog && typeof window.posthog.register === 'function') {
    window.posthog.register({ source: 'career' });
  }

  // Hide existing public content. Use IDs/classes that are unlikely to be shared.
  // If the host page structure changes, update this selector list.
  var hideSelectors = ['nav', 'main', 'footer'];
  hideSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.style.display = 'none';
    });
  });

  // Create the pitch container.
  var pitchRoot = document.createElement('main');
  pitchRoot.id = 'pitch-root';
  pitchRoot.className = 'pitch-shell';
  pitchRoot.innerHTML =
    '<div style="text-align:center;padding:60px 20px;color:#94a3b8;font:14px system-ui,sans-serif;">' +
    '<p>Verifying access&hellip;</p></div>';
  document.body.appendChild(pitchRoot);

  // Fetch validate-invite.
  fetch(VALIDATE_URL + '?invite_id=' + encodeURIComponent(token))
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data || !data.valid) {
        localStorage.removeItem('career_invite_token');
        sessionStorage.removeItem('career_invite_token');
        captureFailure('expired');
        renderExpired();
        return;
      }

      if (!data.content) {
        captureFailure('no_content');
        renderNoContent();
        return;
      }

      // Persist for forward-session detection.
      sessionStorage.setItem('career_invite_token', token);
      localStorage.setItem('career_invite_token', token);

      // Clean the invite token out of the URL so it does not leak via referrer.
      var clean = new URL(location.href);
      clean.searchParams.delete('invite');
      history.replaceState({}, '', clean.toString());

      renderContent(data);
      wireDownloadButton(data);
      trackVisit(data);
      wireScrollMilestones();
    })
    .catch(function (err) {
      captureFailure('error:' + String(err && err.message ? err.message : err));
      renderError();
    });

  function renderContent(data) {
    pitchRoot.innerHTML = data.content;
  }

  function wireDownloadButton(data) {
    if (!data.pdf_url) return;
    var bar = document.createElement('div');
    bar.className = 'pdf-download-bar';
    bar.style.cssText =
      'display:flex;justify-content:center;align-items:center;gap:12px;' +
      'margin:2.5rem auto 1rem;padding:1rem;max-width:36em;';
    bar.innerHTML =
      '<a href="' + encodeURI(data.pdf_url) + '" download ' +
      'style="display:inline-block;background:#0a3d62;color:#fff;padding:12px 26px;' +
      'border-radius:4px;font:600 13px/1.2 system-ui,sans-serif;text-decoration:none;' +
      'letter-spacing:0.04em;text-transform:uppercase;">Download as PDF</a>' +
      '<span style="color:#777;font:13px/1.2 system-ui,sans-serif;">Optional &mdash; for forwarding.</span>';
    pitchRoot.appendChild(bar);
    bar.querySelector('a').addEventListener('click', function () {
      capture('pdf_download', { invite_id: token, pdf_url: data.pdf_url });
    });
  }

  function trackVisit(data) {
    capture('grant', { invite_id: token, role: data.role || null });
    capture('visit', { invite_id: token, role: data.role || null });
  }

  function wireScrollMilestones() {
    var milestones = [25, 50, 75, 100];
    var fired = {};
    window.addEventListener('scroll', function () {
      var pct = Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
          100
      );
      milestones.forEach(function (m) {
        if (pct >= m && !fired[m]) {
          fired[m] = true;
          capture('scroll_milestone', { percent: m, invite_id: token });
        }
      });
    });
  }

  function capture(event, props) {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, props);
    }
  }

  function captureFailure(reason) {
    capture('invite_failed', {
      reason: reason,
      invite_id: token,
      referrer: document.referrer || 'direct',
      path: location.pathname,
    });
  }

  function renderExpired() {
    pitchRoot.innerHTML =
      '<div style="text-align:center;padding:60px 20px;max-width:420px;margin:0 auto;font:14px/1.5 system-ui,sans-serif;">' +
      '<h2 style="color:#111;margin-bottom:16px;">Link no longer active</h2>' +
      '<p style="color:#555;line-height:1.6;">Invitation links expire after 30 days. If you\'d like a fresh one, reply to the original email.</p>' +
      '<p style="margin-top:24px;"><a href="/" style="color:#0a3d62;">Visit my public profile instead &rarr;</a></p>' +
      '</div>';
  }

  function renderNoContent() {
    pitchRoot.innerHTML =
      '<div style="text-align:center;padding:60px 20px;max-width:420px;margin:0 auto;font:14px/1.5 system-ui,sans-serif;">' +
      '<h2 style="color:#111;margin-bottom:16px;">Content not available</h2>' +
      '<p style="color:#555;">Reply to the original email and I&rsquo;ll resend the materials.</p>' +
      '</div>';
  }

  function renderError() {
    pitchRoot.innerHTML =
      '<div style="text-align:center;padding:60px 20px;max-width:420px;margin:0 auto;font:14px/1.5 system-ui,sans-serif;">' +
      '<h2 style="color:#111;margin-bottom:16px;">Something went wrong</h2>' +
      '<p style="color:#555;">Try refreshing, or <a href="mailto:roger.parkinson.career@gmail.com" style="color:#0a3d62;">email me</a>.</p>' +
      '</div>';
  }
})();
