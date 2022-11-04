export const parseIntToHex = (intValue, hexDigits) => {

    return '0x' + intValue.toString(16).toUpperCase().padStart(hexDigits, '0');
}