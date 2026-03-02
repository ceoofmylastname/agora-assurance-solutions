

## Plan: Hide the About Us Page

Remove the About Us page from public access by removing its route and all navigation links pointing to it. The page file itself will be kept in the codebase but will no longer be reachable.

### Changes

**1. src/App.tsx**
- Remove the `/about` route (line 54)
- Remove the `About` import (line 11)

**2. src/components/Navbar.tsx**
- Remove the "About Us" link from the desktop navigation (lines ~155-161)
- Remove the "About Us" link from the mobile navigation (lines ~366-377)

**3. src/utils/seo/contentOptimizer.ts**
- Remove the `/about` entries from the SEO metadata maps (lines 27, 48)

The page file (`src/pages/About.tsx`) will remain in the codebase in case you want to restore it later. Anyone navigating directly to `/about` will see the 404 page.

