// formFilling.js

// Importing necessary modules
import { secure } from './security.js';
import { cloud } from './cloud.js';

// Function to fill forms
function fillForm(tab) {
  // Get all forms in the tab
  chrome.tabs.executeScript(tab.id, {
    code: 'Array.from(document.forms, form => ({action: form.action, elements: Array.from(form.elements, element => ({name: element.name, value: element.value}))}));'
  }, (results) => {
    // For each form
    results[0].forEach((form) => {
      // Get stored form data from the cloud
      cloud.getFormData(form.action, (storedFormData) => {
        // If stored form data exists
        if (storedFormData) {
          // For each form element
          form.elements.forEach((element) => {
            // If stored form data for the element exists
            if (storedFormData[element.name]) {
              // Fill the form element with the stored data
              chrome.tabs.executeScript(tab.id, {
                code: `document.querySelector('form[action="${form.action}"] input[name="${element.name}"]').value = "${secure.decrypt(storedFormData[element.name])}";`
              });
            }
          });
        }
      });
    });
  });
}

// Function to store form data
function storeFormData(tab) {
  // Get all forms in the tab
  chrome.tabs.executeScript(tab.id, {
    code: 'Array.from(document.forms, form => ({action: form.action, elements: Array.from(form.elements, element => ({name: element.name, value: element.value}))}));'
  }, (results) => {
    // For each form
    results[0].forEach((form) => {
      // Prepare form data to be stored
      let formDataToStore = {};
      form.elements.forEach((element) => {
        // If the form element has a value
        if (element.value) {
          // Add the form element to the form data to be stored
          formDataToStore[element.name] = secure.encrypt(element.value);
        }
      });
      // Store the form data in the cloud
      cloud.storeFormData(form.action, formDataToStore);
    });
  });
}

// Export functions
export { fillForm, storeFormData };
