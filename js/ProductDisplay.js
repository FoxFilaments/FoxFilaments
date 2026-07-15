const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productInfo = document.getElementById("product-info");

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id == id);
        productInfo.innerHTML = `<section class="product-page">
                                    <img src=${product.image} alt="Fox Keychain">
                                    <div>
                                        <h2>${product.name}</h2>
                                        <p>${product.description}</p>
                                        <p>${product.price}</p>
                                    </div>
                                    <a href="#" class="cart-button">Add to cart</a>
                                </section>`
    })