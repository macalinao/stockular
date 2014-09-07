chrome.runtime.onMessage.addListener(function(req) {
  if (req.rift) {
    chrome.tabs.create({
      url: 'rift.html'
    });
  }
});
