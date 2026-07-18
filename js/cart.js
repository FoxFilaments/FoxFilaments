const itemlist = document.getElementById("item-list");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cost = document.getElementById("cost");
let cartcost = 0;
fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id == cartItem.id);
            const variant = product.variants.find(v => v.color == cartItem.color);
            let newcost = product.price * cartItem.quantity;
            cartcost += newcost;
            itemlist.innerHTML+=`<a href="product.html?id=${product.id}&color=${cartItem.color}">
                                        <div class="product-card">
                                            <img src=${variant.image} alt=${product.name}>
                                            <h3>${product.name} x(${cartItem.quantity})</h3>
                                            <p>$${Math.round(product.price * cartItem.quantity * 100)/100}</p>
                                        </div>
                                        <div class="stock">
                                            <p>${variant.stock} left in stock</p>
                                        </div>
                                    </a>
                                    <button class="add" data-index="${index}">+</button>
                                    <button class="remove" data-index="${index}">-</button><br><br>`;
            cost.innerHTML=`$${Math.round(cartcost * 100)/100}`;
        });

        const addbuttons = document.querySelectorAll(".add");
        addbuttons.forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);
                const product = products.find(p => p.id == cart[index].id);
                const variant = product.variants.find(v =>
                    v.color == cart[index].color
                );
                if(cart[index].quantity < variant.stock) {
                    cart[index].quantity++;
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            })
        })

        const buttons = document.querySelectorAll(".remove");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);
                cart[index].quantity--;
                if(cart[index].quantity <= 0)
                {
                    cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            });
        });

        const pay = document.getElementById(".pay");
        let testnum = 0;
        pay.addEventListener("click", () => {
            
        });
    });


