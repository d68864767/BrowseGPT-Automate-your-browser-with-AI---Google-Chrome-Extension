// summarization.js

// Importing necessary modules
import { cloud } from './cloud.js';
import { secure } from './security.js';

// Function to summarize text
function summarize(text) {
  // Encrypt the text
  let encryptedText = secure.encrypt(text);

  // Send the encrypted text to the cloud for summarization
  let summarizedText = cloud.summarize(encryptedText);

  // Decrypt the summarized text
  let decryptedSummarizedText = secure.decrypt(summarizedText);

  return decryptedSummarizedText;
}

// Export summarize function
export { summarize };
