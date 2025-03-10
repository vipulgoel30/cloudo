// Core imports
import { Cipher, createCipheriv, createDecipheriv, Encoding, randomBytes } from "crypto";

export class CryptoHelper {
  #cryptoKey: Buffer;
  #cryptoInitVector: Buffer;
  constructor(public readonly algorithm: string, cryptoKeyString: string, cryptoInitVectorString: string) {
    this.#cryptoKey = Buffer.from(cryptoKeyString, "hex");
    this.#cryptoInitVector = Buffer.from(cryptoInitVectorString, "hex");
  }

  encrypter(payload: string, inputEncoding: Encoding = "utf-8", outputEncoding: Encoding = "hex"): string | undefined {
    try {
      const cipher: Cipher = createCipheriv(this.algorithm, this.#cryptoKey, this.#cryptoInitVector);
      let encryptedData: string = cipher.update(payload, inputEncoding, outputEncoding);
      return (encryptedData += cipher.final(outputEncoding));
    } catch (err) {
      return undefined;
    }
  }

  decrypter(payload: string, inputEncoding: Encoding = "hex", outputEncoding: Encoding = "utf-8"): string | undefined {
    try {
      const decipher = createDecipheriv(this.algorithm, this.#cryptoKey, this.#cryptoInitVector);
      let decryptedData: string = decipher.update(payload, inputEncoding, outputEncoding);
      return (decryptedData += decipher.final(outputEncoding));
    } catch (err) {
      return undefined;
    }
  }
}
