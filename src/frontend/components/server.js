const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up a proxy to forward requests to IPFS
app.use(
  '/ipfs',
  createProxyMiddleware({
    target: 'https://ipfs.infura.io:5001/api/v0',
    changeOrigin: true,
    pathRewrite: {
      '^/ipfs': '', // Remove the /ipfs prefix from the request path
    },
  })
);

// Serve your React app (assuming it's built and located in a 'build' directory)
app.use(express.static('build'));

// Start the server on port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
