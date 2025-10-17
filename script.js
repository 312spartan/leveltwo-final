const hamburgerMenu = document.querySelector(".hamburger-menu");

const offMenu = document.querySelector(".off-menu");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    offMenu.classList.toggle("active");
});

// Cart Functionality

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

// Close Cart

closeCart.addEventListener("click", () => {
    cart.classList.toggle("active");
});

// Cart Working JS

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

// function qunatityChanged(event){
//     var input = event.target
//     if (isNaN(input.value) || input.value <=  0) {
//         input.value = 1;
//     } else {
//         input.value = value;
//     }
//     updateTotal();
// }


function quantityChanged(event) {
    const input = event.target;
    let value = parseInt(input.value, 10);

    if (isNaN(value) || value <= 0) {
        input.value = 1;
    }

    updateTotal();
}


//Simplified Ready Function


// ---------------------------------------------------------------------


// function ready() {
//     // Attach remove button handlers
//     document.querySelectorAll('.item-remove').forEach(button => {
//         button.addEventListener('click', removeCartItem);
//     });

//     // Attach quantity change handlers
//     document.querySelectorAll('.quantity').forEach(input => {
//         input.addEventListener('change', quantityChanged);
//     });
// }

//OLDER STYLE READY FUNCTION

//--------------------------------------------------------------------------

// function ready(){
//     // Remove items from the cart
//     var removeCartButtons = document.getElementsByClassName('item-remove')
//     console.log(removeCartButtons);
//     for (var i = 0; i < removeCartButtons.length; i++){
//         var button = removeCartButtons[i];
//         button.addEventListener("click", removeCartItem);
//     }

//     var quantityInputs = document.getElementsByClassName("quantity");
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i];
//         input.addEventListener("change", quantityChanged);
//     }
// }


// Hopefully this one works

//--------------------------------------------------------------------------------

function ready() {
    // Remove items from the cart
    var removeCartButtons = document.getElementsByClassName('item-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", function(e) {
            removeCartItem(e, i );
        });
    }

    // Quantity input changes
    var quantityInputs = document.getElementsByClassName("quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged); // ✅ fixed name
    }
}

// UPDATE TOTAL

// function updateTotal() {
//     var cartItems = document.getElementsByClassName("cart-items")[0];
//     var cartBoxes = document.getElementsByClassName("cart-box");
//     var total = 0;
//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("quantity")[0];
//         var price = parseFloat(priceElement.innerText.replace("$"));
//         var quantity = quantityElement.value;
//         total = total + price * quantity;

//         // If price contains some cents
//         total = Math.round(total * 100) / 100;

//         document.getElementsByClassName("total-price")[0].innerText = "" + total;
//     }
// }

function updateTotal() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;
    const tPrice =  document.getElementsByClassName("total-price");
     var removeCartButtons = document.getElementsByClassName('item-remove');
    console.log(removeCartButtons);
    
    if (!removeCartButtons.length) {
        tPrice[0].innerHTML = 0;
        return;
    }
    

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];

        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("quantity")[0];

        var price = parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ""));
        var quantity = parseInt(quantityElement.value, 10);

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    }

    // Round to 2 decimal places

    total = Math.round(total * 100) / 100;
    tPrice[0].innerHTML = total.toFixed(2);

    
    console.log(tPrice);
    
}