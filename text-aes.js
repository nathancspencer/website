'use strict';

document.addEventListener('DOMContentLoaded', function ()
{
    const keyText = 'U6NshcLe--p7GQEv8s10c9-60zANl7qQYSYuRmxMUlg';

    const onGetKey = function (key)
    {
        const coder = new AesTextCoder(key);
        document.querySelectorAll('.email')
            .forEach(coder.decode.bind(coder));
    };

    if ('subtle' in window.crypto) {
        Aes.getKey(keyText).then(onGetKey);
    }
});


const Aes = {
    'KEY_BITS': 256,
    'NONCE_BYTES': 3,
    'BLOCK_BYTES': 16,
    'BITS_PER_BYTE': 8
};

Aes.getKey = async function (keyText)
{
    const options = { 'name': 'AES-CTR' };
    const keyBytes = Base64.bytes(keyText);
    return window.crypto.subtle.importKey('raw', keyBytes, options, false, ['encrypt', 'decrypt']);
}

Aes.decrypt = async function (inputText, key)
{
    const inputBytes = Base64.bytes(inputText);
    const nonceBytes = inputBytes.slice(0, Aes.NONCE_BYTES);
    const codeBytes = inputBytes.slice(Aes.NONCE_BYTES);
    const counterBytes = new Uint8Array(Aes.BLOCK_BYTES);
    counterBytes.set(nonceBytes);
    const options = {
        'name': 'AES-CTR',
        'counter': counterBytes,
        'length': (Aes.BLOCK_BYTES - Aes.NONCE_BYTES) * Aes.BITS_PER_BYTE
    };
    const plainBytes = await window.crypto.subtle.decrypt(options, key, codeBytes);
    return new TextDecoder().decode(plainBytes);
}


const Base64 = {};

Base64.bytes = function (text)
{
    const values = new Uint8Array(text.length);
    for (let i = 0; i < text.length; ++i) {
        const code = text.charCodeAt(i);
        if (code === 45)       values[i] = 63;
        else if (code < 58)   values[i] = code - 48;
        else if (code < 91)   values[i] = code - 29;
        else if (code === 95) values[i] = 62;
        else                  values[i] = code - 87;
    }
    const length = Math.floor(3 * text.length / 4);
    const bytes = new Uint8Array(length);
    for (let i = 0, j = 0; i < values.length; ++i) {
        const r = 2 * (i % 4);
        if (r !== 0) {
            bytes[j++] = ((values[i-1] << r) & 0xff) | (values[i] >> (6 - r));
        }
    }
    return bytes;
}


function AesTextCoder (key)
{
    this.key = key;
}

AesTextCoder.prototype.decode = function (node)
{
    Aes.decrypt(node.firstChild.nodeValue, this.key)
        .then((value) => {
            node.firstChild.nodeValue = value;
            const link = node.tagName === 'A' ? node : node.parentElement;
            if (link && link.tagName === 'A') {
                link.href = 'mailto:' + value;
            }
        });
}
