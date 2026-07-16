const itemlist = document.getElementById("item-list");
const cart = JSON.parse(localStorage.getItem("cart"));

for(let i = 0; i < cart.length; i++) {
    itemlist.innerHTML += `<p>${cart[i].id}</p>`;
}


