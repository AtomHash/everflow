import App from './app';
import CryptoJsSHA256 from 'crypto-js/sha256';
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import CryptoJsMD5 from 'crypto-js/md5';
import CryptoJsAES from 'crypto-js/aes';
import errors from './errors';

/**
 * Creates an Everflow Security object. Intergrates crypto-js into the Everflow framework.
 * @class
 */
export default class Security
{
    key: string;

    constructor(everflowApp: App)
    {
        if (!everflowApp.config.security)
        {
            throw new errors.ConfigSecurityError();
        }
        if (!everflowApp.config.security.key)
        {
            throw new errors.ConfigSecurityKeyError();
        }
        this.key = everflowApp.config.security.key;
    }

    encrypt(text: string)
    {
        return Security.simple.aes.encrypt(text, this.key);
    }

    decrypt(encryptedText: string)
    {
        return Security.simple.aes.decrypt(encryptedText, this.key);
    }

    // Static Props...

    static hashes = {
        sha256: CryptoJsSHA256,
        md5: CryptoJsMD5
    }
    static encoders = {
        base64: Base64,
        utf8: Utf8
    }
    static decoders = {
        base64: Base64,
        utf8: Utf8
    }
    static AES = CryptoJsAES;
    static simple = {
        base64: {
            encode(text: string): string {
                return Security.encoders.base64.stringify(Security.encoders.utf8.parse(text));
            },
            decode(base64Text: string): string {
                return Security.encoders.base64.parse(base64Text).toString(Security.encoders.utf8);
            }
        },
        aes: {
            encrypt(text: string, key: string): string|boolean {
                try {
                    return encodeURIComponent(Security.simple.base64.encode(Security.AES.encrypt(text, key).toString()));
                } catch(error)
                {
                    return false;
                }
            },
            decrypt(text: string, key: string): string|boolean {
                try{
                    return Security.AES.decrypt(Security.simple.base64.decode(decodeURIComponent(text)), key).toString(Security.encoders.utf8);
                } catch(error)
                {
                    return false;
                }
            },
        }
    }
}
