if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/demo-pta/service-worker.js', { scope: '/demo-pta/' })
      .then((registration) => {
        console.log("SW Register Successful");
      }).catch(error => {
        console.log("SW Register Failed: " + error)
      });
  })
}