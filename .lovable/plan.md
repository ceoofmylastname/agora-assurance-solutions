

## Fix: Hero Image Not Loading

### Root Cause

In `src/components/OptimizedImage.tsx`, the `generateSrcSet` function only checks for `/lovable-uploads/` and `/public/` paths to return the original source. Vite-bundled assets (imported from `src/assets/`) get paths like `/assets/hero-family-background-abc123.png`, which don't match either check. The function then generates broken srcset URLs like `hero-family-background-abc123-400w.webp` that don't exist, causing the image to fail loading entirely. Since the image never fires `onLoad`, it stays at `opacity-0` forever.

### Changes

**`src/components/OptimizedImage.tsx`** -- Fix `generateSrcSet` to handle Vite-bundled assets:
- Update the condition in `generateSrcSet` to also check for `/assets/` paths (Vite output), and return the original `baseSrc` for those too. A simpler approach: only generate responsive srcset for known CDN/remote URLs, and return the original src for any local/bundled asset.

Change the check from:
```ts
if (baseSrc.includes('/lovable-uploads/') || baseSrc.includes('/public/')) {
  return baseSrc;
}
```
To:
```ts
if (baseSrc.includes('/lovable-uploads/') || baseSrc.includes('/public/') || baseSrc.includes('/assets/') || baseSrc.startsWith('data:')) {
  return baseSrc;
}
```

This single-line fix will make the hero image (and all other Vite-imported images) load correctly.

