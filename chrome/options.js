//Saves options to chrome.storage
function save_options() {
  var timeRange = document.getElementById('time-range').value;
  chrome.storage.sync.set({
    timeRange: timeRange,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
    chrome.storage.sync.get({
      timeRange: 'Daily',
    }, function(items) {
      document.getElementById('time-range').value = items.timeRange;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
