
The user wants only the LeadConnector chat widget to show. The custom `MemoryWidget` is currently rendered in `src/components/PageLayout.tsx` and creates a duplicate floating chat button. I need to remove it.

## Plan: Remove duplicate MemoryWidget so only LeadConnector shows

**Change:**
- **`src/components/PageLayout.tsx`**: Remove the `MemoryWidget` import and its `<MemoryWidget />` usage so the custom chat button no longer renders. The LeadConnector script in `index.html` will remain the only chat widget on the site.

**Note:** The `MemoryWidget.tsx` file itself will be left in place (unused) so it can be re-enabled later if needed. Let me know if you'd prefer to delete the file entirely.
