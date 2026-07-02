const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
    productList.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn-delete" onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        
        productList.appendChild(row);
    });
}

function addProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    
    const newProduct = {
        name,
        category,
        price,
        quantity
    };
    
    products.push(newProduct);
    saveProducts();
    renderProducts();
    
    productForm.reset();
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

productForm.addEventListener('submit', addProduct);

document.addEventListener('DOMContentLoaded', renderProducts);
