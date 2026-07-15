const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productInfo = document.getElementById("product-info");

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id == id);
        let colorOptions ="";
        if(product.coloroptions)
        {
            product.coloroptions.forEach(color => {
                colorOptions += `<option>${color}</option>`;
            });
        } else {
            colorOptions = `<option>Default</option>`
        }
        productInfo.innerHTML = `
<div class="product-page">
<div class="product-image">

    <img src="${product.image}" alt="${product.name}">

</div>


<div class="product-info">

    <div>

        <h1>${product.name}</h1>

        <p>${product.description}</p>

    </div>


    <div class="product-options">

        <label>
            Color:
        </label>

        <select>
            <option>${colorOptions}</option>
        </select>


        <label>
            Quantity:
        </label>

        <input type="number" value="1">


        <button class="cart-button">
            Add to Cart
        </button>

    </div>

</div>
</div>

`;
    });