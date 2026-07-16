const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productInfo = document.getElementById("product-info");

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id == id);
        let colorOptions ="";
        if(product.variants)
        {
            product.variants.forEach((variant, index) => {
                colorOptions += `<option value="${variant.color}" ${index === 0 ? "selected" : ""}>${variant.color}</option>`;
            });
        } else {
            colorOptions = `<option>Default</option>`
        }
        productInfo.innerHTML = `
<div class="product-page">
<div class="product-image">

    <img id="product-image" src="${product.variants[0].image}" alt="${product.name}">

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

        <input 
        id="quantity"
        type="number" 
        value="1"
        min="1"
        max="${product.variants[0].stock}>


        <button class="cart-button">
            Add to Cart
        </button>

    </div>

</div>
</div>

`;

const colorSelect = document.getElementById("color-select");
const stockDisplay = document.getElementById("stock-display");
const productImage = document.getElementById("product-image");
const quantityInput = document.getElementById("quantity");
colorSelect.addEventListener("change", () => {

    const selectedColor = colorSelect.value;

    const selectedVariant = product.variants.find(variant => 
        variant.color == selectedColor
    );

    stockDisplay.innerHTML = `${selectedVariant.stock} left in stock`;
    productImage.src = selectedVariant.image;
    quantityInput.max = selectedVariant.stock;
}); 
});