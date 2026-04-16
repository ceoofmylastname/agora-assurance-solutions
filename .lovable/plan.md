
## Plan: Hide all on-site forms; chat widget stays everywhere except /careers

Per your answers:
- **All on-site forms**: hidden site-wide (the external `/apply` link still works)
- **Chat widget**: shown on every page except `/careers`

### Changes

**1. `src/components/PageLayout.tsx`** — Add a `hideForms` prop (default `true`). When true, wrap children so any rendered `<form>` and the `ModernContactForm` section are visually hidden via a CSS class (`forms-hidden`). Also add an effect that toggles a `body.hide-chat-widget` class on mount/unmount based on the current route.

**2. `src/index.css`** — Add reversible CSS rules:
```css
/* Temporary: hide all on-site forms (10DLC compliance) */
body.forms-hidden form,
body.forms-hidden #contact,
body.forms-hidden [data-lead-form] {
  display: none !important;
}

/* Temporary: hide LeadConnector chat widget on /careers only */
body.hide-chat-widget #lc_chat_widget,
body.hide-chat-widget [id^="lc-"],
body.hide-chat-widget iframe[src*="leadconnectorhq.com"],
body.hide-chat-widget div[class*="LCWidget"] {
  display: none !important;
  visibility: hidden !important;
}
```

**3. `src/App.tsx`** — Add a small `RouteBodyClass` component inside `<BrowserRouter>` that:
- Always adds `forms-hidden` to `<body>` (site-wide form hide)
- Adds `hide-chat-widget` to `<body>` only when `location.pathname === '/careers'`, removes otherwise

This is fully reversible — to restore everything later, just remove the two CSS blocks and the `RouteBodyClass` component. No form code is deleted.

### Notes
- The `/get-quote`, `/booking`, and homepage `#contact` ModernContactForm will all be hidden because they render `<form>` elements (covered by the CSS rule).
- Buttons/links pointing to the external `https://leads.agoraassurancesolutions.com/apply` remain untouched and functional.
- The LeadConnector widget injects elements with `lc-` / `LCWidget` classes plus an iframe from `leadconnectorhq.com` — the selectors above cover all variants.
