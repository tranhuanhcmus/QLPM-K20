/**
 * Chuyển đổi một số thành định dạng tiền tệ.
 * @param {string} currencyFormat - Định dạng tiền tệ ('vietnamdong' hoặc 'dolar').
 * @param {number} value - Giá trị cần chuyển đổi.
 * @param {boolean} isShort - Chuyển đổi sang định dạng ngắn (true) hoặc đầy đủ (false).
 * @returns {string} - Giá trị đã chuyển đổi sang định dạng tiền tệ.
 */
export function convertNumberToCurrency(
  currencyFormat,
  value,
  isShort = false
) {
  if (isShort && value > 0) {
    const suffixes = ["k", "m", "b"];
    let suffixNum = Math.floor(("" + value).length / 3);
    if (("" + value).length % 3 === 0) {
      suffixNum -= 1;
    }
    let shortValue = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        3
      )
    );
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum - 1];
  }

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currencyFormat === "vietnamdong" ? "VND" : "USD",
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
  const currencySymbol = currencyFormat === "vietnamdong" ? "₫" : "$";
  const numberValue = value.replace(currencySymbol, "").replace(/,/g, "");

  return parseFloat(numberValue);
}
