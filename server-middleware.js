
/**
 * Cache-Control Middleware
 * 
 * This file provides middleware functions for setting proper cache headers
 * in production environments. You can use it with Express or any other
 * Node.js server framework.
 */

/**
 * Sets appropriate cache headers based on file type and hash presence
 */
const setCacheHeaders = (req, res, next) => {
  // For hashed assets (containing a hash in the filename)
  if (req.url && (
      /\.[a-zA-Z0-9]{8,}\.(js|css)$/.test(req.url) || // Hashed JS/CSS files
      /\/lovable-uploads\/[a-zA-Z0-9-]+\.(png|jpg|jpeg|webp|svg|gif)$/.test(req.url) // Uploaded assets with UUIDs
    )) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } 
  // For non-hashed static assets
  else if (req.url && /\.(js|css|png|jpg|jpeg|webp|svg|gif|ico|woff|woff2|ttf|eot)$/.test(req.url)) {
    res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
  }
  
  if (next) next();
};

module.exports = {
  setCacheHeaders
};
