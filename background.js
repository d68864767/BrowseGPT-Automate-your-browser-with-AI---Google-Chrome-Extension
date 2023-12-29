// background.js

// Importing necessary modules
import { AI } from './AI.js';
import { translate } from './translation.js';
import { summarize } from './summarization.js';
import { fillForm } from './formFilling.js';
import { voiceCommand } from './voiceCommand.js';
import { cloud } from './cloud.js';
import { secure } from './security.js';

// Initialize AI
let ai = new AI();

// Listen for any changes in the active tab
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    // Perform AI operations on the active tab
    ai.operate(tab);
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    // Translate text
    let translatedText = translate(request.text);
    sendResponse({translatedText: translatedText});
  } else if (request.action === 'summarize') {
    // Summarize text
    let summarizedText = summarize(request.text);
    sendResponse({summarizedText: summarizedText});
  } else if (request.action === 'fillForm') {
    // Fill form
    let formData = fillForm(request.form);
    sendResponse({formData: formData});
  } else if (request.action === 'voiceCommand') {
    // Execute voice command
    let commandResult = voiceCommand(request.command);
    sendResponse({commandResult: commandResult});
  }
});

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  // Update AI settings
  ai.updateSettings(changes, areaName);
});

// Listen for installation or update of the extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Initialize cloud services
    cloud.initialize();
    // Initialize security settings
    secure.initialize();
  } else if (details.reason === 'update') {
    // Update cloud services
    cloud.update();
    // Update security settings
    secure.update();
  }
});
