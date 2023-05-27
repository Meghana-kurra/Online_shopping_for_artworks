let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


// let generateCartItems = () => {
//   if (basket.length !== 0) {
//     return (ShoppingCart.innerHTML = basket
//       .map((x) => {
//         let { id, item } = x;
//         let search = shopItemsData.find((x) => x.id === id) || [];
//         let { img, price, name } = search;
//         return `
//       <div class="cart-item">
//         <img width="100" src=${img} alt="" />
//         <div class="details">
        
//           <div class="title-price-x">
//             <h4 class="title-price">
//               <p>${name}</p>
//               <p class="cart-item-price">$ ${price}</p>
//             </h4>
//             <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
//           </div>
//           <div class="cart-buttons">
//             <div class="buttons">
//               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
//               <div id=${id} class="quantity">${item}</div>
//               <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
//             </div>
//           </div>
//           <h3>$ ${item * price}</h3>
        
//         </div>
//       </div>
//       `;
//       })
//       .join(""));
//   } else {
//     ShoppingCart.innerHTML = "";
//     label.innerHTML = `
//     <h2>Cart is Empty</h2>
//     <a href="index.html">
//       <button class="HomeBtn">Back to Home</button>
//     </a>
//     `;
//   }
// };

// generateCartItems();



let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};



let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

// let update = (id) => {
//   let search = basket.find((x) => x.id === id);
//   document.getElementById(id).innerHTML = search.item;
//   calculation();
//   TotalAmount();
// };

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */


let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill Amount : $ ${amount}</h2>
    `);
  } else return;
};

TotalAmount();


