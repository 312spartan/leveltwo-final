const hamburgerMenu = document.querySelector(".hamburger-menu");

const offMenu = document.querySelector(".off-menu");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    offMenu.classList.toggle("active");
});

// // Cart Functionality

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// // Open Cart

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

// // Close Cart

closeCart.addEventListener("click", () => {
    cart.classList.toggle("active");
});

// // Cart Working JS

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Making Function

function removeCartItem(event, i){
    // console.log(i);
    // const cartBoxes = document.getElementsByClassName("cart-box");
    // console.log(cartBoxes);
    // cartBoxes.splice(i - 1, 1);
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}


function quantityChanged(event) {
    const input = event.target;
    let value = parseInt(input.value, 10);

    if (isNaN(value) || value <= 0) {
        input.value = 1;
    }

    updateTotal();
    saveCartToLocalStorage();
}

 function ready() {
    // // Remove items from the cart
    var removeCartButtons = document.getElementsByClassName('item-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", function(e) {
            removeCartItem(e, i );
        });
    }

    // // Quantity input changes
    var quantityInputs = document.getElementsByClassName("quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }

    loadCartFromLocalStorage();
}

// //Remove Item From Cart

function removeCartItem(event, i){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartToLocalStorage();
}


// //Add To Cart


//  function addCartClicked(event, i) {
//      var button = event.target;
//      var shopProducts = button.parentElement;
//      var title = shopProducts.getElementsByClassName('cart-item-name')[0];
//      var price = shopProducts.getElementsByClassName('cart-price')[0];
//      button.parentElement.add();
//      console.log(title, price);
//      updateTotal();

//  }


function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.closest('.item'); // Find the closest .item container

    var title = shopItem.querySelector('.item-name').innerText;
    var price = shopItem.querySelector('.price').childNodes[0].nodeValue.trim();
    var imageSrc = shopItem.querySelector('.item-image').src;

    // Check if item already in cart
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-name');

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            let quantityInput = cartItemNames[i].parentElement.querySelector('.quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal();
            return;
            
        }
    }

    // Create new cart item
    var cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = `
        <div class="details">
            <img src="${imageSrc}" alt="" class="cart-img">
            <div class="cart-item-name">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="quantity">
            <i class='bx bxs-trash-alt item-remove' color="black"></i>
        </div>
    `;

    cartItems.appendChild(cartBox);

    // Add event listeners to the new item
    cartBox.querySelector('.item-remove').addEventListener("click", removeCartItem);
    cartBox.querySelector('.quantity').addEventListener("change", quantityChanged);

    updateTotal();
    saveCartToLocalStorage();
}



// function updateTotal() {
//     var cartBoxes = document.getElementsByClassName("cart-box");
//     var total = 0;
//     const tPrice =  document.getElementsByClassName("total-price");
//      var removeCartButtons = document.getElementsByClassName('item-remove');
//     console.log(removeCartButtons);
    
//     if (!removeCartButtons.length) {
//         tPrice[0].innerHTML = 0;
//         return;
//     }
    

//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];

//         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("quantity")[0];

//         var price = parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ""));
//         var quantity = parseInt(quantityElement.value, 10);

//         if (!isNaN(price) && !isNaN(quantity)) {
//             total += price * quantity;
//         }
//     }

//    // // Round to 2 decimal places

//     total = Math.round(total * 100) / 100;
//     tPrice[0].innerHTML = total.toFixed(2);

    
//     console.log(tPrice);
    
// }

function updateTotal() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("quantity")[0];

        if (!priceElement || !quantityElement) continue;

        var price = parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ""));
        var quantity = parseInt(quantityElement.value, 10);

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    }

    total = Math.round(total * 100) / 100;
    const totalDisplay = document.getElementsByClassName("total-price")[0];
    if (totalDisplay) {
        totalDisplay.innerText = total.toFixed(2);
    }
}

// LOCAL STORAGE - SAVING CART ACROSS MULTIPLE PAGES


function saveCartToLocalStorage() {
    const cartBoxes = document.getElementsByClassName("cart-box");
    const cartData = [];

    for (let i = 0; i < cartBoxes.length; i++) {
        const box = cartBoxes[i];
        const title = box.querySelector(".cart-item-name")?.innerText || '';
        const price = box.querySelector(".cart-price")?.innerText || '';
        const quantity = box.querySelector(".quantity")?.value || 1;
        const image = box.querySelector(".cart-img")?.src || '';

        if (title.trim() === '' || price.trim() === '') continue;

        cartData.push({ title, price, quantity, image });
    }

    if (cartData.length > 0) {
        localStorage.setItem("blackStarCart", JSON.stringify(cartData));
    } else {
        localStorage.setItem("blackStarCart", JSON.stringify(cartData));
    }
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("blackStarCart");
    if (!savedCart) return;

    const cartItems = JSON.parse(savedCart);
    const cartContainer = document.getElementsByClassName("cart-items")[0];

    cartItems.forEach(item => {
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");
        cartBox.innerHTML = 
        
        `<div class="details">
                <img src="${item.image}" alt="" class="cart-img">
                <div class="cart-item-name">${item.title}</div>
                <div class="cart-price">${item.price}</div>
                <input type="number" value="${item.quantity}" class="quantity" min="1">
                <i class='bx bxs-trash-alt item-remove' color="black"></i>
            </div>
        `;

        cartContainer.appendChild(cartBox);

        cartBox.querySelector('.item-remove').addEventListener('click', removeCartItem);
        cartBox.querySelector('.quantity').addEventListener('click', quantityChanged);
    });

    updateTotal();
}
