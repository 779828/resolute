import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
  throw new Error('Missing encryption environment variables: ENCRYPTION_KEY and ENCRYPTION_IV must be set');
}

const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'utf-8');
const ivBuffer = Buffer.from(ENCRYPTION_IV, 'utf-8');


export function encryptLevel2(text: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, ivBuffer);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}


export function decryptLevel2(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, ivBuffer);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
