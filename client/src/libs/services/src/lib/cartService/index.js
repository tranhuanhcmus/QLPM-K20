export class CartService {
    static calculateTotal = (subTotal,shipping,discount) => {
        const result = subTotal + shipping - discount
        return parseInt(result)
    }
    static calculateSubtotal = () => {
        const result = 100;
        return parseInt(result)
    }
}