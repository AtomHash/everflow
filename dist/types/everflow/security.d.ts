/// <reference types="crypto-js" />
import App from './app';
/**
 * Creates an Everflow Security object. Intergrates crypto-js into the Everflow framework.
 * @class
 */
export default class Security {
    key: string;
    constructor(everflowApp: App);
    encrypt(text: string): string | boolean;
    decrypt(encryptedText: string): string | boolean;
    static hashes: {
        sha256: {
            (message: string | import("crypto-js").LibWordArray, key?: string | import("crypto-js").WordArray, ...options: any[]): import("crypto-js").WordArray;
            (message: string | import("crypto-js").LibWordArray, ...options: any[]): import("crypto-js").WordArray;
        };
        md5: {
            (message: string | import("crypto-js").LibWordArray, key?: string | import("crypto-js").WordArray, ...options: any[]): import("crypto-js").WordArray;
            (message: string | import("crypto-js").LibWordArray, ...options: any[]): import("crypto-js").WordArray;
        };
    };
    static encoders: {
        base64: import("crypto-js").Encoder;
        utf8: import("crypto-js").Encoder;
    };
    static decoders: {
        base64: import("crypto-js").Encoder;
        utf8: import("crypto-js").Encoder;
    };
    static AES: import("crypto-js").CipherHelper;
    static simple: {
        base64: {
            encode(text: string): string;
            decode(base64Text: string): string;
        };
        aes: {
            encrypt(text: string, key: string): string | boolean;
            decrypt(text: string, key: string): string | boolean;
        };
    };
}
