import crypto from 'crypto';

export default function generateRandomString(length) {
    const randomBytes = crypto.randomBytes(length);
    const randomString = randomBytes.toString('hex');
    return randomString;
}