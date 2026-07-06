const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = (process.env.PASSWORD_ENC_KEY || process.env.JWT_SECRET || 'default_secret_key_which_should_be_changed').padEnd(32).slice(0,32);
const ivLength = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
}

function decrypt(data) {
    const parts = data.split(':');
    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], 'base64');
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };
