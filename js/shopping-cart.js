const cartBtn = document.getElementById("cart");
const cartItemsElement = document.getElementById("cart__items");
const addToCartButtons = document.querySelectorAll(".add__btn");
const root = document.getElementById("root");
let totalItemsIntoCartElement = cartBtn.querySelector(".total__items");
let confirmBtn = document.getElementById("confirm-btn");
const cardWrapper = document.getElementById("card-wrapper");
const itemsIntoCart = [];
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
async function addProduct(e) {
  const parent = e.target.parentNode;
  let itemId = parent.getAttribute("id");
  const itemObject = {
    id: itemId,
    image: "../img/avocado.jpg",
    name: "Aguacate hass",
    price: 2560,
    type: "Fruit",
    description:
      "Recuerda que no hay una respuesta única para todos, ya que las decisiones de ubicación pueden ser muy personales. Es importante tomarte el tiempo necesario para evaluar tus prioridades y considerar cómo cada opción se alinea con tus metas y valores personales. Puedes hablar con amigos, familiares o asesores de carrera para obtener diferentes perspectivas y consejos.",
    vitamins: ["A", "B", "C", "D"],
    meditionUnit: "Libra",
    isOfert: false,
    quantity: 1,
    pushedDate: new Date().toUTCString()
  };
  if (!filterProduct(itemsIntoCart, itemId)) {
    itemsIntoCart.push(itemObject);
  } else {
    
    let id = retrieveProductById(itemsIntoCart, itemId);
    let product = itemsIntoCart[id];
    product.quantity += 1;
  }
  totalItemsIntoCartElement.innerText = retrieveQuantityItems(itemsIntoCart);
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
  if(data.findIndex(item => item.id == id) != -1) {
    let productId = data.findIndex(item => item.id === id);
    return productId;
  } else {
    return -1;
  }
}

// getting quantity items into shoppicartBtn
function retrieveQuantityItems(data) {
  return data.reduce((acum, item) => acum + item.quantity, 0) || 0;
}


document.addEventListener('DOMContentLoaded', () => {
  totalItemsIntoCartElement.innerText = retrieveQuantityItems(itemsIntoCart);
});


// when user makes click into cart element
cartBtn.addEventListener('click', () => {
  cartItemsElement.classList.toggle('showing');
});


// rendering the cart element
function renderingCartElement(data, output) {
  let html;
  const element = document.getElementById(output);
  data.forEach((item, index) => {
    html += `
    
    `
  });
  element.innerHTML = html;
}