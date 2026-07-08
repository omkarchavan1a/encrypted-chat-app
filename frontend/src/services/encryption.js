import nacl from 'tweetnacl';
import { decodeUTF8, encodeUTF8, encodeBase64, decodeBase64 } from 'tweetnacl-util';

export const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  return {
    publicKey: encodeBase64(keyPair.publicKey),
    secretKey: encodeBase64(keyPair.secretKey),
  };
};

export const encryptMessage = (message, recipientPublicKey, senderSecretKey) => {
  try {
    const messageUint8 = decodeUTF8(message);
    const recipientPublicKeyUint8 = decodeBase64(recipientPublicKey);
    const senderSecretKeyUint8 = decodeBase64(senderSecretKey);

    const nonce = nacl.randomBytes(nacl.box.nonceLength);
    const encrypted = nacl.box(
      messageUint8,
      nonce,
      recipientPublicKeyUint8,
      senderSecretKeyUint8
    );

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    return encodeBase64(fullMessage);
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt message');
  }
};

export const decryptMessage = (encryptedMessage, senderPublicKey, recipientSecretKey) => {
  try {
    const encryptedMessageUint8 = decodeBase64(encryptedMessage);
    const senderPublicKeyUint8 = decodeBase64(senderPublicKey);
    const recipientSecretKeyUint8 = decodeBase64(recipientSecretKey);

    const nonce = encryptedMessageUint8.slice(0, nacl.box.nonceLength);
    const encrypted = encryptedMessageUint8.slice(nacl.box.nonceLength);

    const decrypted = nacl.box.open(
      encrypted,
      nonce,
      senderPublicKeyUint8,
      recipientSecretKeyUint8
    );

    if (!decrypted) {
      throw new Error('Failed to decrypt message');
    }

    return encodeUTF8(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt message');
  }
};