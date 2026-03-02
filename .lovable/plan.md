
Goal: make “About Us” fully non-public on all live domains, including the custom domain you tested.

What I found
- The codebase is already updated correctly:
  - `/about` route removed from `src/App.tsx`
  - About links removed from `src/components/Navbar.tsx`
- But the two live domains are serving different frontend versions:
  - `agora-assurance-solutions.lovable.app` = no “About Us”
  - `agoraassurancesolutions.com` = still shows “About Us”
- So this is a domain/deployment sync issue (not a remaining Navbar code issue).

Plan
1) Resync custom domain to current deployment
- In Publish → Manage domains, verify `agoraassurancesolutions.com` and `www` are attached to this exact project/deployment.
- If needed: remove and re-add the custom domain(s) to force a fresh binding.

2) Force a fresh frontend rollout
- Trigger one new frontend publish/update after domain rebind so both domains point to the same latest build.

3) Hard-hide `/about` at the edge (defense in depth)
- Add an explicit redirect rule in `public/_redirects`:
  - `/about  /  301`
- Keep SPA fallback below it.

4) Remove remaining discoverability references
- Remove `/about` from:
  - `public/sitemap.xml`
  - `src/hooks/useSiteScanner.ts` (commonPages)
  - `src/hooks/usePageScanner.ts` (commonPages)
  - `src/utils/seo/breadcrumbSchema.ts` (“about”: “About Us” mapping)
  - (optional admin demo data) `src/components/seo/TechnicalSEO.tsx`

5) Verify end-to-end on both domains
- Test in normal + incognito:
  - Top nav has no “About Us”
  - Visiting `/about` redirects or 404s
  - Same behavior on both `lovable.app` and custom domain

Technical details
- Root cause is domain-version mismatch, not missing code edits.
- Current code has About removed, but custom domain still serves an older frontend artifact.
- Adding explicit `/about` redirect and removing sitemap/scanner references ensures About stays non-public even if stale links are discovered.
