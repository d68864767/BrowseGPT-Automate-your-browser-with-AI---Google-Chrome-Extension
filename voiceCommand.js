// voiceCommand.js

// Importing necessary modules
import { cloud } from './cloud.js';

// Initialize SpeechRecognition API
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Function to handle voice commands
function voiceCommand(tab) {
  // Start speech recognition
  recognition.start();

  recognition.onresult = function(event) {
    // Get the transcript of the user's voice input
    let voiceInput = event.results[0][0].transcript;

    // Send the voice input to the cloud for processing
    cloud.processVoiceCommand(voiceInput, tab);
  };

  recognition.onerror = function(event) {
    console.error('Voice recognition error', event.error);
  };
}

// Export voiceCommand function
export { voiceCommand };
