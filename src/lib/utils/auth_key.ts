import crypto from 'crypto';
export default function gen_auth_key() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('base64url'); // URL-safe encoding
}