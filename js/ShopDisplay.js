const productList = document.getElementById("product-list");
fetch("data/products.json")
    .then(response => response.json())
    .then(products => { 
        products.forEach(product => {   
            productList.innerHTML += `<a href="product.html?id=${product.id}">
                                        <div class="product-card">

                                            <img src=${product.variants[0].image} alt=${product.name}>
                                            <h3>${product.name}</h3>
                                            <p>$${product.price}</p>
                                        </div>
                                        <div class="stock">
                                            <p>${product.stock} left in stock</p>
                                        </div>
                                    </a>`;
        });
    });