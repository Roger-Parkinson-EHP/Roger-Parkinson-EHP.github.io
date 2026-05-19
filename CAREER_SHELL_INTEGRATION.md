# Career shell integration notes

Branch: `feature/career-shell-v1`. **Do not merge without Roger's review** - this touches the public-facing site.

## What lives in this branch

| File | Purpose |
|------|---------|
| `career-shell.js` | Intercepts `?invite=TOKEN`, hides public content, fetches validate-invite, renders pitch content, wires PDF download + scroll tracking. No-op when no token. |
| `career-analytics.js` | PostHog bootstrap. Reads project key from `/assets/analytics.json`. Defaults to `source: public`; career-shell.js upgrades to `source: career` on invite. |
| `CAREER_SHELL_INTEGRATION.md` | This file. |

## What is NOT yet changed

- `index.html` is untouched on this branch. When you approve the shell behaviour, we add two `<script>` tags near the top (see "Integration step" below).
- Other pages (`enterprise.html`, `startup.html`, etc.) are untouched. The shell currently only activates on the root page a visitor lands on; we can expand to any page by adding the same `<script>` tags.

## Integration step (pending your approval)

In `index.html`, add these two lines in `<head>` after the stylesheet link:

```html
<script src="career-analytics.js" defer></script>
<script src="career-shell.js" defer></script>
```

The `defer` attribute ensures they run after the DOM is parsed but before `DOMContentLoaded`, which is necessary for the shell to hide existing `<nav>`, `<main>`, `<footer>` before the user sees them.

## What also has to exist (outside this repo)

1. **`/assets/analytics.json`** - shared analytics config. The EHP shell already uses this pattern. Needs a `posthog_project_key` field. If Roger wants career events in the same PostHog project as EHP, copy the EHP config; otherwise spin up a separate project later.
2. **Cloud function changes** - tracked in ROG-58 (assigned to Chief of Staff / paperclip-cos). Specifically `validate-invite` needs to return `pdf_url` when a PDF has been baked for the campaign.

## What happens on a cold visit with no invite

Script bootstraps PostHog, registers `source: public`, then exits. The public landing page (`index.html`) renders normally with its existing nav and content. No flicker.

## What happens on `?invite=TOKEN`

1. PostHog initialises, `source` is immediately upgraded to `career`.
2. Existing `<nav>`, `<main>`, `<footer>` are hidden (display: none).
3. A new `<main id="pitch-root">` is inserted showing "Verifying access...".
4. `validate-invite` is called.
5. On success, returned HTML fills `pitch-root`. Invite token is cleaned from the URL. `grant` + `visit` + scroll milestones + optional `pdf_download` are captured.
6. On expired/invalid/error, a friendly message replaces the verifying indicator.
7. Token is cached in sessionStorage and localStorage so refresh/forwarding preserves context.

## Why this shape

- **Does not edit Roger's voiced `index.html`.** The public content keeps its existing voice until Roger says "go".
- **Same validate-invite endpoint as EHP.** No new cloud function deployment needed on the happy path (only the per-campaign YAML fields).
- **No routing tricks.** URL stays `/?invite=TOKEN`. No `/r/` subdirectory, no redirect flicker.
- **Scroll + PDF tracking** matches the EHP shell feature set so Jarvis warm-leads surfacing works the same way for career leads.

## Manual test plan (before deploy)

1. Check out this branch locally, serve with `python -m http.server` in the repo root.
2. Visit `http://localhost:8000/` - should render Roger's existing public site unchanged.
3. Visit `http://localhost:8000/?invite=FAKETOKEN` - should hide public content, show "Verifying..." briefly, then fail gracefully with "Link no longer active" (because validate-invite will reject a fake token).
4. Once Chief of Staff deploys cloud function changes and a real campaign has been minted, full end-to-end test against `?invite=<real_token>`.
