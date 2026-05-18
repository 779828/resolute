import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const ENCRYPTION_IV = import.meta.env.VITE_ENCRYPTION_IV;

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
  throw new Error('Missing encryption environment variables: VITE_ENCRYPTION_KEY and VITE_ENCRYPTION_IV must be set');
}

const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
const iv = CryptoJS.enc.Utf8.parse(ENCRYPTION_IV);


export function encryptLevel1(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}


export function decryptLevel1(cipherText: string): string {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryptStudentData(data: Record<string, string>): Record<string, string> {
  const fieldsToEncrypt = ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'gender', 'address', 'courseEnrolled', 'password'];
  const encrypted: Record<string, string> = { ...data };

  for (const field of fieldsToEncrypt) {
    if (encrypted[field]) {
      encrypted[field] = encryptLevel1(encrypted[field]);
    }
  }

  return encrypted;
}

export function decryptStudentData(data: Record<string, string>): Record<string, string> {
  const fieldsToDecrypt = ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'gender', 'address', 'courseEnrolled'];
  const decrypted: Record<string, string> = { ...data };

  for (const field of fieldsToDecrypt) {
    if (decrypted[field]) {
      try {
        decrypted[field] = decryptLevel1(decrypted[field]);
      } catch {
        console.error(`Failed to decrypt field: ${field}`);
      }
    }
  }

  return decrypted;
}
