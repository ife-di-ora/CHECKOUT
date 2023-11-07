// declare html link variables
const cardContainer = document.querySelector("#card--container");
const cartSummary = document.getElementById("cart--summary");

// declare other global variables
let sum;
let currrencyDisplay = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
});

// create function to display card of each item in the section
function displayCartItems() {
  cardContainer.innerHTML = cartItems
    .map((item) => {
      return `<div class = "col-md-4 col-sm-6"><div class="card">
    <div class="single--product card-body">
      <img
        class="product--img"
        src=${item.productImage}
        alt=""
      />
      <div class="product--info">
        <h3 class="product--title">${item.productName}</h3>
        <p class="product--amount">${currrencyDisplay.format(
          item.productPrice
        )}</p>
      </div>
      <div class="icons card-footer">
          <div><button onclick=removeItem(${
            item.productId
          })><i class="fa-regular fa-trash-can" style="color: #d25f2d;"></i></button></div>
          <div><button onclick=updateLike(${item.productId}) class="${
        item.like
      }"><i class="fa-solid fa-heart"></i>   </button></div>
          <div><button onclick=decreaseQty(${
            item.productId
          })><i class="fa-solid fa-circle-minus" style="color: #ff8040;"></i></button><span id="">${
        item.productQty
      }</span><button onclick=increaseQty(${
        item.productId
      })><i class="fa-solid fa-circle-plus" style="color: #ff8040;"></i></button></div>
      </div>
    </div>
  </div></div>`;
    })
    .join("");
}
displayCartItems();

// function to increase qty of cart item
function increaseQty(id) {
  cartItems.forEach((item) => {
    if (item.productId == id) {
      item.productQty += 1;
    }
  });
  displayCartItems();
  calculateTotal();
}

// function to decrease qty of cart item
function decreaseQty(id) {
  cartItems.forEach((item) => {
    if (item.productId == id) {
      if (item.productQty > 1) {
        item.productQty -= 1;
      }
    }
  });
  displayCartItems();
  calculateTotal();
}

// function to remove item from cart
function removeItem(id) {
  cartItems = cartItems.filter((item) => item.productId !== id);

  displayCartItems();
  calculateTotal();
}

// function to calculate total of cart items
function calculateTotal() {
  sum = cartItems.reduce(
    (sum, item) => (sum += item.productPrice * item.productQty),
    // return sum;
    0
  );
  cartSummary.textContent = currrencyDisplay.format(sum);
}
calculateTotal();

// a function to check if a customer likes a product
function updateLike(id) {
  cartItems.forEach((item) => {
    if (item.productId === id && item.like === "no") {
      item.like = "yes";
    } else if (item.productId === id && item.like == "yes") {
      item.like = "no";
    }
    console.log(item.productName);
    console.log(item.like);
  });
  displayCartItems();
}
