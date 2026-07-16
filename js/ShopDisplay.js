const productList = document.getElementById("product-list");
fetch("data/products.json")
    .then(response => response.json())
    .then(products => { 
        products.forEach(product => {
            let totalStock = 0;   
            for(let i = 0; i < product.variants.length; i++) {
                totalStock += product.variants[i].stock;
            }
            productList.innerHTML += `<a href="product.html?id=${product.id}">
                                        <div class="product-card">

                                            <img src=${product.variants[0].image} alt=${product.name}>
                                            <h3>${product.name}</h3>
                                            <p>$${product.price}</p>
                                        </div>
                                        <div class="stock">
                                            <p>${totalStock} left in stock</p>
                                        </div>
                                    </a>`;
        });
    });