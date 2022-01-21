import crypto from 'crypto';

export const getDigitsCode = (message: string, length: number, key: string) => {
    const hash = crypto
        .createHmac('sha256', Buffer.from(key, 'hex'))
        .update(message)
        .digest('hex')

    return hash.slice(0, length)
}
