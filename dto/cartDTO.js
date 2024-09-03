class CartDTO {
    constructor({ _id, products }) {
        this.id = _id;
        this.products = products.map(({ product, quantity }) => ({
            id: product._id,
            title: product.title,
            price: product.price,
            quantity
        }));
    }
}

export default CartDTO;
