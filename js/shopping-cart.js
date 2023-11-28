const cartBtn = document.getElementById("cart");
const cartItemsElement = document.getElementById("cart__items");
const addToCartButtons = document.querySelectorAll(".add__btn");
let totalItems = cartBtn.querySelector(".total__items");
let confirmBtn = document.getElementById("confirm-btn");
const cardWrapper = document.getElementById("card-wrapper");
let itemsIntoCart = [];
let items;

function createProductCard(product) {
  // creating main card wrapper
  const card = document.createElement("div");
  const imageCard = document.createElement("img"); // create a image element for any card
  const heading = document.createElement("h3"); // create a heading for the product
  const vitaminsWrapper = document.createElement("div"); // create a card wrapper for any product vitamins
  const h6 = document.createElement("h6"); // create a heading for the product vitamins
  const paragraph = document.createElement("p"); // create a paragraph for the product descriptor
  const button = document.createElement("div"); // a simple button for managing the adition of the product
  const productUnits = document.createElement("div"); // a descriptior for the product
  const ul = document.createElement("ul");
  paragraph.className = "text-left";
  imageCard.src = product.image;
  card.className = "card";
  heading.className = "heading";
  vitaminsWrapper.className = "vitamins-box";
  heading.innerText = product.name;
  h6.innerText = "Vitaminas";
  paragraph.innerText = product.description;
  card.insertBefore(imageCard, card.firstChild);
  card.appendChild(heading);
  vitaminsWrapper.appendChild(h6);
  ul.innerHTML += `
  <li><span>B1</span></li>
  <li><span>B2</span></li>
  <li><span>B3</span></li>
  <li><span>B4</span></li>
  <li><span>B5</span></li>
`;

  card.setAttribute("id", product.id);
  vitaminsWrapper.appendChild(ul);
  card.appendChild(vitaminsWrapper);
  card.appendChild(paragraph);

  productUnits.className = "inline-flex";
  productUnits.innerHTML = `<sup>$</sup><h5 class="price">${product.price}</h5><small>/Libra</small>`;
  card.appendChild(productUnits);

  button.className = "btn btn__add";
  button.innerText = "Add to cart";
  button.addEventListener("click", (e) => {
    addProduct(e);
  });
  card.appendChild(button);
  cardWrapper.appendChild(card);
}

// retrieve all products from JSON file
function retrieveProducts(path) {
  fetch(path)
    .then((res) => res.json())
    .then((product) => {
      items = product;
      items.forEach((item) => {
        createProductCard(item);
      });
    })
    .catch((err) => console.error(err));
  // return items;
}

document.addEventListener("DOMContentLoaded", () => {
  retrieveProducts("../products.json");
});

/**
 * Give a `Event` object
 * @param {*} e
 * @returns {any | undefined}
 */
function addProduct(e) {
  const parent = e.target.parentNode;
  let itemId = parent.getAttribute("id");
  let idx = retrieveProductById(items, itemId);
  const item = items[idx];
  const itemObject = {
    id: item.id,
    image: item.image,
    name: item.name,
    price: item.price,
    type: item.type,
    description: item.description,
    vitamins: item.vitamins,
    meditionUnit: item.meditionUnit,
    isOfert: false,
    quantity: 1,
    pushedDate: new Date().toUTCString(),
  };
  if (!filterProduct(itemsIntoCart, itemId)) {
    itemsIntoCart.push(itemObject);
  } else {
    let id = retrieveProductById(itemsIntoCart, itemId);
    let product = itemsIntoCart[id];
    product.quantity += 1;
  }
  totalItems.innerText = retrieveQuantityItems(itemsIntoCart);
  renderingCartElement(itemsIntoCart, "root");
  saveToLocalStorage(itemsIntoCart, 'cart-items'); // save to local storage for later retrieval
}

/**
 *
 */

function filterProduct(data, id) {
  if (data.findIndex((item) => item.id === id) != -1) {
    return true;
  }
  return false;
}

// get a product object from the shop
function retrieveProductById(data, id) {
  if (data.findIndex((item) => item.id == id) != -1) {
    let productId = data.findIndex((item) => item.id === id);
    return productId;
  } else {
    return -1;
  }
}

// getting quantity items into shoppicartBtn
function retrieveQuantityItems(data) {
  return data.reduce((acum, item) => acum + item.quantity, 0) || 0;
}



// when user makes click into cart element
cartBtn.addEventListener("click", () => {
  cartItemsElement.classList.toggle("showing");
});

// rendering the cart element
function renderingCartElement(data, output) {
  output = output || 'root';
  const element = document.getElementById(output);
  let html = "";
  data.forEach((item, index) => {
    html += `
    <div class="item">
      <figure>
        <img src="${item.image}" alt="">
      </figure>
      <p>
        <span>${item.name}</span>
        <span>$${item.price * item.quantity}</span>
        <i>${item.quantity}</i>
        <!--<i class="fa-solid fa-trash"></i>-->
        <i class="fa-solid fa-pencil" onclick="editing()"></i>
      </p>
    </div>
`;

  });
  let div = document.createElement("div");
  div.innerHTML = `
    <div class="">
  <p>total</p>
  <span>${getTotalAmount(itemsIntoCart)}</span>
  </div>`;
  element.innerHTML = html;
  element.appendChild(div)
  console.log(data)
}


function getTotalAmount(data) {
  return data.reduce((acum, item) => acum + (item.price * item.quantity),0);
}


// save into local storage
function saveToLocalStorage(data, key) {
  let temp = JSON.stringify(data);
  localStorage.setItem(key, temp);
}


// get from local storage
function getFromLocalStorage(key) {
  let temp = JSON.parse(localStorage.getItem(key)) || [];
  return temp;
}


// execute only when the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
  let tempFromLocalStorage = getFromLocalStorage('cart-items');
  if(!itemsIntoCart.length > 0) {
    itemsIntoCart = tempFromLocalStorage;
  }
  totalItems.innerText = retrieveQuantityItems(itemsIntoCart) || retrieveQuantityItems(tempFromLocalStorage);
  renderingCartElement(tempFromLocalStorage, 'root');
});