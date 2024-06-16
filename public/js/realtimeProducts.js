
const socket = io();

function updateProductList(products) {
    const productList = document.getElementById('products-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        productList.appendChild(li);
    });
}

socket.on('updateProducts', (products) => {
    updateProductList(products);
});

document.getElementById('addProductButton').addEventListener('click', () => {
    const title = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const code = document.getElementById('productCode').value;
    const category = document.getElementById('productCategory').value;
    const stock = document.getElementById('productStock').value;
    const price = document.getElementById('productPrice').value;

    if (!title || !description || !code || !category || !stock || !price) {
        alert('Faltan propiedades: [name, description, code, category, stock, price] para crear un producto');
        return;
    }

    const newProduct = { title, description, code, category, stock: Number(stock), price: Number(price) };
    socket.emit('newProduct', newProduct);
});


document.getElementById('deleteProductButton').addEventListener('click', () => {
    const productId = document.getElementById('productId').value;
    socket.emit('deleteProduct', productId);
});
