const cartBtn = document.getElementById('cart');
const cartItemsElement = document.getElementById('cart__items')
const addToCartButtons = document.querySelectorAll('.add__btn');
const root = document.getElementById('root');
let totalItemsIntoCartElement = cartBtn.querySelector('.total__items');
let confirmBtn = document.getElementById('confirm-btn');
const itemsIntoCart = [];
let table = document.getElementById('data-table') != null ? document.getElementById('data-table') : '';


let totalCoast = 0;
cartBtn.addEventListener('click', () => {
  cartItemsElement.classList.toggle('showing');
  renderShoppingCart(itemsIntoCart);
  getTotalAmount();
})

// add a item into shopping cart
function addTocart(product) {
  if(filterById(itemsIntoCart, product.id)) {
    let item = increaseQuantity(itemsIntoCart, product.id);
    let idx = itemsIntoCart.findIndex(prod => prod.id == product.id);
    itemsIntoCart.splice(idx, 1);
    itemsIntoCart.push(item);
    //itemsIntoCart.splice(idx, 1);
  } else {
    itemsIntoCart.push(product);
  }
  renderShoppingCart();
  saveIntoLocalStorage(itemsIntoCart, 'cart-items');
}

//rendering items of cart into HTML document
function renderShoppingCart() {
  root.innerHTML = '';
  let html = undefined;
  if(!getTotalItems() > 0) {
    html = '<span>Su Carrito Está vacio 😴</span>';
    return root.innerHTML = html;
  }
  itemsIntoCart.forEach(item => {
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
  const div = document.createElement('div');
  div.innerHTML = `<h4 class="flex">Total: <p>$${getTotalAmount()}</p></h4>`
  root.appendChild(div);
  getFromLocalStorage('cart-items')
}

// filtering product by id
function filterById(data, id) {
  if(data.find(item => item.id == id) != undefined) {
    return true;
  } else {
    return false;
  }
}

  
//function increase quantity += 1
function increaseQuantity(data, id) {
  let idx = data.findIndex(item => item.id == id);
  let item = data[idx];
  item.quantity += 1;
  return item;
}


function getTotalItems() {
  if(!itemsIntoCart.length > 0) {
    return 0;
  }
  return itemsIntoCart.reduce((sum, acum) => sum + acum.quantity, 0);
}

function getTotalAmount() {
  let total = 0;
  let items = itemsIntoCart.map(item => Number(item.quantity * item.price.replace(/[^a-zA-Z0-9 ]/g, '')));
  total = items.reduce((sum, acum) => Number(sum + acum), 0);
  return total;
}

function saveIntoLocalStorage(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  if(localStorage.getItem(key)) {
    let data = JSON.parse(localStorage.getItem(key));
    console.log(data)
   // renderTable(data);
  } else {
    console.log('')
  }
}

function renderTable(data) {
  let html;
  if(data != []) {
    data.forEach(item => {
      html = `
      <tr>
        <td>${item.id}</td>
        <td>
          <img src='${item.image}" alt="" /></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
      </tr>
      `;
      table.innerHTML += html;
    })
  }
}
//adding event listerner to all buttons add to cart
addToCartButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let parent = e.target.parentElement;
    let item = {
      id: parent.getAttribute('id'),
      orderedAt: new Date().getTime(),
      image: parent.querySelector('img').src,
      name: parent.querySelector('.heading').textContent,
      price: parent.querySelector('.price').textContent,
      liked: false,
      quantity: 1
    }
    addTocart(item);
    console.log(item)
  })
})


document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('data-table') != null ) {
    let table = document.getElementById('data-table');
    renderTable([{id:'1', name:'Iphone 15', price: '6.353.643'}])
}
})

//localStorage.removeItem('cart-items')
