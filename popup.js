// popup.js

// Open options page when the options button is clicked
document.getElementById('options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }
});

// Open feedback form when the feedback button is clicked
document.getElementById('feedback').addEventListener('click', function() {
  // Open a new tab with the feedback form URL
  chrome.tabs.create({url: 'https://forms.gle/yourFeedbackFormURL'});
});

// Display the current AI settings
chrome.storage.sync.get(['voiceCommand', 'smartSearch', 'formFilling', 'summarization', 'translation', 'customAI'], function(items) {
  document.getElementById('voiceCommand').textContent = items.voiceCommand ? 'Enabled' : 'Disabled';
  document.getElementById('smartSearch').textContent = items.smartSearch ? 'Enabled' : 'Disabled';
  document.getElementById('formFilling').textContent = items.formFilling ? 'Enabled' : 'Disabled';
  document.getElementById('summarization').textContent = items.summarization ? 'Enabled' : 'Disabled';
  document.getElementById('translation').textContent = items.translation ? 'Enabled' : 'Disabled';
  document.getElementById('customAI').textContent = items.customAI ? 'Enabled' : 'Disabled';
});

// Listen for changes in storage
chrome.storage.onChanged.addListener(function(changes, areaName) {
  // Update the displayed AI settings
  for (let key in changes) {
    let storageChange = changes[key];
    document.getElementById(key).textContent = storageChange.newValue ? 'Enabled' : 'Disabled';
  }
});
