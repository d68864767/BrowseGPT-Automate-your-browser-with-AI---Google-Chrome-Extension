// options.js

// Function to save options
function save_options() {
  var voiceCommand = document.getElementById('voiceCommand').checked;
  var smartSearch = document.getElementById('smartSearch').checked;
  var formFilling = document.getElementById('formFilling').checked;
  var summarization = document.getElementById('summarization').checked;
  var translation = document.getElementById('translation').checked;
  var customAI = document.getElementById('customAI').checked;

  chrome.storage.sync.set({
    voiceCommand: voiceCommand,
    smartSearch: smartSearch,
    formFilling: formFilling,
    summarization: summarization,
    translation: translation,
    customAI: customAI
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Function to restore options
function restore_options() {
  chrome.storage.sync.get({
    voiceCommand: true,
    smartSearch: true,
    formFilling: true,
    summarization: true,
    translation: true,
    customAI: true
  }, function(items) {
    document.getElementById('voiceCommand').checked = items.voiceCommand;
    document.getElementById('smartSearch').checked = items.smartSearch;
    document.getElementById('formFilling').checked = items.formFilling;
    document.getElementById('summarization').checked = items.summarization;
    document.getElementById('translation').checked = items.translation;
    document.getElementById('customAI').checked = items.customAI;
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('optionsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  save_options();
});
