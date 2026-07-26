// ADD PRODUCT
<script type="module" src="firebase.js"></script>
<script type="module" src="script.js"></script>


import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ADD PRODUCT
window.addProduct = async function () {
  await addDoc(collection(db, "products"), {
    name: name.value,
    price: parseFloat(price.value),
    image: image.value,
    category: category.value
  });
};

// LOAD PRODUCTS
function loadProducts() {
  onSnapshot(collection(db, "products"), snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      let p = doc.data();
      html += `
        <div>
          <img src="${p.image}" width="100">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="addToCart('${doc.id}')">Add</button>
        </div>
      `;
    });
    products.innerHTML = html;
  });
}

let cart = [];

window.addToCart = function(id) {
  cart.push(id);
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
};

// LOAD ORDERS
function loadOrders() {
  onSnapshot(collection(db, "orders"), snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      let o = doc.data();
      html += `
        <div>
          <p>${o.phone}</p>
          <p>${o.address}</p>
          <p>${o.branch}</p>
        </div>
      `;
    });
    orders.innerHTML = html;
  });
}

// AUTO RUN
if (document.getElementById("products")) loadProducts();
if (document.getElementById("orders")) loadOrders();
