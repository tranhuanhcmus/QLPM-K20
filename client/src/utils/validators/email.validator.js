/**
 * Kiểm tra xem email có hợp lệ hay không.
 * @param {string} email - Email cần kiểm tra.
 * @returns {boolean} True nếu email hợp lệ, false nếu không hợp lệ.
 */
export function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}