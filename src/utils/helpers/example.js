
/**
 * Format the given date and time string to a short version.
 * @param {string} datetime - The date and time string to format.
 * @returns {string} - The formatted date in a short version.
 */
export function shortenDatetime (datetime) {
    const dateObj = new Date(datetime);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    return dateObj.toLocaleDateString(undefined, options);
};

/**
 * Revert a date string from format "MMM D, YYYY, h:mm A" to "YYYY-MM-DDThh:mm".
 * @param {string} datetime - The date string to convert.
 * @returns {string} - The converted date string.
 */
export function revertShortenedDatetime(datetime) {
    const dateObj = new Date(datetime);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hour = String(dateObj.getHours()).padStart(2, '0');
    const minute = String(dateObj.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }


