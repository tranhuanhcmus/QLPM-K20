// Function to calculate discounted price
export function calculateDiscountedPrice(originalPrice, discount) {
    // Type checking
    if(typeof originalPrice !== 'number') {
        originalPrice = Number(originalPrice);
    }
    if (typeof discount !== 'number') {
        discount = Number(discount);
    }
    const discountedPrice = originalPrice * discount;
    const amountToPay = originalPrice - discountedPrice;

    return {
        discountedPrice,
        amountToPay,
    };
}

// Function to format currency
export function formatCurrency(amount, currency = 'USD') {
    // Currency formatting by using Intl.NumberFormat
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
    return formattedAmount;
}