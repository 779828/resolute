import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e1'; // 32 chars
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || 'a1b2c3d4e5f6a7b8'; // 16 chars

/**
 * Backend Level 2 Encryption
 * Encrypts data that is already encrypted by the frontend (Level 1)
 */
export function encryptLevel2(text: string): string {
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'utf-8'),
    Buffer.from(ENCRYPTION_IV, 'utf-8')
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Backend Level 2 Decryption
 * Decrypts one level, returning data still encrypted by frontend (Level 1)
 */
export function decryptLevel2(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'utf-8'),
    Buffer.from(ENCRYPTION_IV, 'utf-8')
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
