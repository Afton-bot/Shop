import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CART
let cart = [];

// ADD PRODUCT (ADMIN)
window.addProduct = async function () {
  await addDoc(collection(db, "products"), {
    name: name.value,
    price: parseFloat(price.value),
    image: image.value,
    category: category.value
  });
  alert("Added!");
};

// LOAD PRODUCTS (SHOP)
function loadProducts() {
  onSnapshot(collection(db, "products"), snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      let p = doc.data();
      html += `
        <div class="card">
          <img src="${p.image}" />
          <h3>${p.name}</h3>
          <p class="price">$${p.price}</p>
          <button onclick="addToCart('${doc.id}')">Add</button>
        </div>
      `;
    });
    document.getElementById("products").innerHTML = html;
  });
}

// ADD TO CART
window.addToCart = function(id) {
  cart.push(id);
  document.getElementById("cartCount").innerText = cart.length;
};

// PLACE ORDER
window.placeOrder = async function () {
  await addDoc(collection(db, "orders"), {
    items: cart,
    phone: phone.value,
    address: address.value,
    branch: branch.value,
    time: new Date()
  });
  alert("Order sent!");
  cart = [];
};

// LOAD ORDERS (DASHBOARD)
function loadOrders() {
  onSnapshot(collection(db, "orders"), snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      let o = doc.data();
      html += `
        <div class="order-card">
          <p><b>📞</b> ${o.phone}</p>
          <p><b>📍</b> ${o.address}</p>
          <p><b>🏬</b> ${o.branch}</p>
        </div>
      `;
    });
    document.getElementById("orders").innerHTML = html;
  });
}

// AUTO RUN
if (document.getElementById("products")) loadProducts();
if (document.getElementById("orders")) loadOrders();
