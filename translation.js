// translation.js

// Importing necessary modules
import { cloud } from './cloud.js';

// Function to translate text
function translate(tab) {
  // Get all text elements in the tab
  let elements = tab.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, div');

  // Iterate over each element
  elements.forEach((element) => {
    // Get the text content of the element
    let originalText = element.textContent;

    // Send a message to the background script to translate the text
    chrome.runtime.sendMessage({action: 'translate', text: originalText}, (response) => {
      // Replace the original text with the translated text
      if (response.translatedText) {
        element.textContent = response.translatedText;
      }
    });
  });
}

// Export translate function
export { translate };
