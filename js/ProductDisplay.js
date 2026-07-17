const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const selectedColor = params.get("color");
const productInfo = document.getElementById("product-info");

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id == id);
        let currentVariant = product.variants[0];
        let colorOptions ="";
        let quantityOptions = "";
        if(selectedColor) {
            const found = product.variants.find(v => v.color == selectedColor);
            if(found) {currentVariant = found;}
        }
        if(product.variants)
        {
            product.variants.forEach((variant, index) => {
                colorOptions += `<option value="${variant.color}" ${variant.color == currentVariant.color ? "selected" : ""}>${variant.color}</option>`;
            });
        } else {
            colorOptions = `<option>Default</option>`
        }
        for(let i = 1; i <= currentVariant.stock; i++) {
            quantityOptions += `<option>${i}</option>`
        }
        productInfo.innerHTML = `
<div class="product-page">
<div class="product-image">

    <img id="product-image" src="${currentVariant.image}" alt="${product.name}">

</div>


<div class="product-info">

    <div>

        <h1>${product.name}</h1>

        <p>${product.description}</p>

    </div>


    <div class="product-options">
        
        <p id="stock-display">${product.variants[0].stock} left in stock</p>

        <label>
            Color:
        </label>

        <select id="color-select">
           ${colorOptions}
        </select>


        <label>
            Quantity:
        </label>

        <select id="quantity-select">${quantityOptions}</select>


        <button id="cart-button" class="cart-button">
            Add to Cart
        </button>

    </div>

</div>
</div>

`;

const colorSelect = document.getElementById("color-select");
const stockDisplay = document.getElementById("stock-display");
const productImage = document.getElementById("product-image");
const quantitySelect = document.getElementById("quantity-select");
const cartButton = document.getElementById("cart-button");

colorSelect.addEventListener("change", () => {

    const selectedColor = colorSelect.value;

    const selectedVariant = product.variants.find(variant => 
        variant.color == selectedColor
    );

    stockDisplay.innerHTML = `${selectedVariant.stock} left in stock`;
    productImage.src = selectedVariant.image;
    quantitySelect.innerHTML = "";
    for(let i = 1; i <= selectedVariant.stock; i++) {
        quantitySelect.innerHTML += `<option>${i}</option>`;
    }
}); 

cartButton.addEventListener("click", () => {
    
    const selectedColor = colorSelect.value;
    const selectedQuantity = quantitySelect.value;
    if(selectedQuantity != 0) {
        let cart = localStorage.getItem("cart");
        if(cart){
            cart = JSON.parse(cart);
        }else{
            cart = [];
        }

        const cartItem = {
            id:product.id,
            color:selectedColor,
            quantity:selectedQuantity
        };

        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
    }
});

});