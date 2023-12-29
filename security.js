// security.js

// Importing necessary modules
import CryptoJS from 'crypto-js';

class Security {
  constructor() {
    // Initialize security settings
    this.settings = {
      encryptionKey: ''
    };

    // Load settings from storage
    chrome.storage.sync.get(['encryptionKey'], (items) => {
      this.settings.encryptionKey = items.encryptionKey;
    });
  }

  // Method to encrypt data
  encryptData(data) {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.settings.encryptionKey).toString();
    return ciphertext;
  }

  // Method to decrypt data
  decryptData(ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext, this.settings.encryptionKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  // Method to securely store data
  secureStore(key, data) {
    let encryptedData = this.encryptData(data);
    let obj = {};
    obj[key] = encryptedData;
    chrome.storage.sync.set(obj);
  }

  // Method to securely retrieve data
  secureRetrieve(key, callback) {
    chrome.storage.sync.get(key, (items) => {
      let decryptedData = this.decryptData(items[key]);
      callback(decryptedData);
    });
  }
}

// Exporting the Security class
export let secure = new Security();
