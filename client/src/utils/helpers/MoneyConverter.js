/**
 * Chuyển đổi một số thành định dạng tiền tệ.
 * @param {string} currencyFormat - Định dạng tiền tệ ('vietnamdong' hoặc 'dolar').
 * @param {number} value - Giá trị cần chuyển đổi.
 * @returns {string} - Giá trị đã chuyển đổi sang định dạng tiền tệ.
 */
export function convertNumberToCurrency(currencyFormat, value) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currencyFormat === 'vietnamdong' ? 'VND' : 'USD',
    });

    return formatter.format(value);
}

/**
* Chuyển đổi một chuỗi định dạng tiền tệ thành số.
* @param {string} currencyFormat - Định dạng tiền tệ ('vietnamdong' hoặc 'dolar').
* @param {string} value - Giá trị định dạng tiền tệ cần chuyển đổi.
* @returns {number} - Giá trị đã chuyển đổi sang số.
*/
export function convertCurrencyToNumber(currencyFormat, value) {
    const currencySymbol = currencyFormat === 'vietnamdong' ? '₫' : '$';
    const numberValue = value.replace(currencySymbol, '').replace(/,/g, '');

    return parseFloat(numberValue);
}