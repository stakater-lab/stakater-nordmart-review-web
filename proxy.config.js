module.exports = {
  "/api/review": {
    changeOrigin: true,
    secure: true,
    target: "https://review-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud",
    logLevel: "info",
  }
};
