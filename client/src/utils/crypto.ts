import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'f1e2d3c4b5a6978877665544332211ff';
const ENCRYPTION_IV = import.meta.env.VITE_ENCRYPTION_IV || '1a2b3c4d5e6f7a8b';

const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
const iv = CryptoJS.enc.Utf8.parse(ENCRYPTION_IV);

/**
 * Frontend Level 1 Encryption
 * Encrypts plain text before sending to backend
 */
export function encryptLevel1(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * Frontend Level 1 Decryption
 * Decrypts data received from backend (which already decrypted Level 2)
 */
export function decryptLevel1(cipherText: string): string {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Encrypt all sensitive fields in student data before sending to backend
 */
export function encryptStudentData(data: Record<string, string>): Record<string, string> {
  const fieldsToEncrypt = ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'address', 'password'];
  const encrypted: Record<string, string> = { ...data };

  for (const field of fieldsToEncrypt) {
    if (encrypted[field]) {
      encrypted[field] = encryptLevel1(encrypted[field]);
    }
  }

  return encrypted;
}

/**
 * Decrypt all sensitive fields in student data received from backend
 */
export function decryptStudentData(data: Record<string, string>): Record<string, string> {
  const fieldsToDecrypt = ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'address'];
  const decrypted: Record<string, string> = { ...data };

  for (const field of fieldsToDecrypt) {
    if (decrypted[field]) {
      try {
        decrypted[field] = decryptLevel1(decrypted[field]);
      } catch {
        // If decryption fails, keep original value
        console.error(`Failed to decrypt field: ${field}`);
      }
    }
  }

  return decrypted;
}
