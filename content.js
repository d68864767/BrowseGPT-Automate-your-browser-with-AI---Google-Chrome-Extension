// content.js

// Listen for DOM changes
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      // If new nodes are added
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Perform AI operations on the new node
          chrome.runtime.sendMessage({action: 'operate', node: node.outerHTML});
        }
      });
    }
  });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    // Translate text
    let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, div');
    elements.forEach((element) => {
      if (element.textContent === request.originalText) {
        element.textContent = request.translatedText;
      }
    });
  } else if (request.action === 'summarize') {
    // Summarize text
    let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, div');
    elements.forEach((element) => {
      if (element.textContent === request.originalText) {
        element.textContent = request.summarizedText;
      }
    });
  } else if (request.action === 'fillForm') {
    // Fill form
    let form = document.querySelector(`form[action="${request.form.action}"]`);
    if (form) {
      Object.keys(request.formData).forEach((key) => {
        let input = form.querySelector(`input[name="${key}"]`);
        if (input) {
          input.value = request.formData[key];
        }
      });
    }
  } else if (request.action === 'voiceCommand') {
    // Execute voice command
    if (request.commandResult.action === 'navigate') {
      window.location.href = request.commandResult.url;
    } else if (request.commandResult.action === 'click') {
      let element = document.querySelector(request.commandResult.selector);
      if (element) {
        element.click();
      }
    }
  }
});
