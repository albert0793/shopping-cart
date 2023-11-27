const cartBtn = document.getElementById("cart");
const cartItemsElement = document.getElementById("cart__items");
const addToCartButtons = document.querySelectorAll(".add__btn");
const root = document.getElementById("root");
let totalItemsIntoCartElement = cartBtn.querySelector(".total__items");
let confirmBtn = document.getElementById("confirm-btn");
const itemsIntoCart = [];

let totalCoast = 0;
cartBtn.addEventListener("click", () => {
  cartItemsElement.classList.toggle("showing");
  renderShoppingCart(itemsIntoCart);
  getTotalAmount();
});

// add a item into shopping cart
function addTocart(product) {
  if (filterById(itemsIntoCart, product.id)) {
    let item = increaseQuantity(itemsIntoCart, product.id);
    let idx = itemsIntoCart.findIndex((prod) => prod.id == product.id);
    itemsIntoCart.splice(idx, 1);
    itemsIntoCart.push(item);
    //itemsIntoCart.splice(idx, 1);
  } else {
    itemsIntoCart.push(product);
  }
  renderShoppingCart();
  saveIntoLocalStorage(itemsIntoCart, "cart-items");
}

//rendering items of cart into HTML document
function renderShoppingCart(data=itemsIntoCart) {
  root.innerHTML = "";
  let html = undefined;
  if (!getTotalItems() > 0) {
    html = "<span>Su Carrito Está vacio 😴</span>";
    return (root.innerHTML = html);
  }
  data.forEach((item) => {
    html = `
        <div class="item">
          <figure>
            <img src="${item.image}" alt="">
          </figure>
          <p>
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <i>${item.quantity}</i>
            <!--<i class="fa-solid fa-trash"></i>-->
            <i class="fa-solid fa-pencil" onclick="editing()"></i>
          </p>
        </div>
    `;
    totalItemsIntoCartElement.innerHTML = getTotalItems();
    root.innerHTML += html;
  });
  const div = document.createElement("div");
  div.innerHTML = `<h4 class="flex">Total: <p>$${getTotalAmount()}</p></h4>`;
  root.appendChild(div);
  getFromLocalStorage("cart-items");
}

// filtering product by id
function filterById(data, id) {
  if (data.find((item) => item.id == id) != undefined) {
    return true;
  } else {
    return false;
  }
}

//function increase quantity += 1
function increaseQuantity(data, id) {
  let idx = data.findIndex((item) => item.id == id);
  let item = data[idx];
  item.quantity += 1;
  return item;
}

function getTotalItems() {
  if (!itemsIntoCart.length > 0) {
    return 0;
  }
  return itemsIntoCart.reduce((sum, acum) => sum + acum.quantity, 0);
}

function getTotalAmount() {
  let total = 0;
  let items = itemsIntoCart.map((item) =>
    Number(item.quantity * item.price.replace(/[^a-zA-Z0-9 ]/g, ""))
  );
  total = items.reduce((sum, acum) => Number(sum + acum), 0);
  return total;
}

function saveIntoLocalStorage(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  try {
    if (localStorage.getItem(key)) {
      let data = JSON.parse(localStorage.getItem(key));
      return data;
    }
  } catch (error) {
    throw new Error('something went wrong')
  }

}

//adding event listerner to all buttons add to cart
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let item = {
      id: parent.getAttribute("id"),
      image: parent.querySelector("img").src,
      name: parent.querySelector(".heading").textContent,
      price: parent.querySelector(".price").textContent,
      quantity: 1,
      // orderedAt: new Date().getTime(),
      // liked: false,
    };
    addTocart(item);
    console.log(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  totalItemsIntoCartElement.innerHTML = itemsIntoCart.length || 0;
  let totalItems = getFromLocalStorage("cart-items").reduce(
    (acc, item) => acc + parseInt(item.quantity),
    0
  );
  totalItemsIntoCartElement.innerHTML = totalItems;
  renderShoppingCart(getFromLocalStorage('cart-items'))
});
