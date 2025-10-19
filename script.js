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



// LOGIN AND SIGNUP PAGE FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateEmail(email)) {
            alert("Invalid email.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        //Simulated Login Success

        alert("Login successful");
        console.log("Email:", email);
        console.log("Password:", password);
    });

    function validateEmail(email) {
        // Basic email regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});


// // SIGN UP FORM FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".container-signup form");

    if (!form) {
        console.error("Sign-up form not found!");
        return;
    }

    const inputs = form.querySelectorAll("input");

    if (inputs.length < 4) {
        console.error("Not enough inputs in form.");
        return;
    }

    const emailInput = inputs[0];
    const usernameInput = inputs[1];
    const passwordInput = inputs[2];
    const confirmPasswordInput = inputs[3];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!validateEmail(email)) {
            alert("Invalid email address.");
            return;
        }

        if (username.length < 3) {
            alert("Username must be at least 3 characters.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (password === username) {
            alert("Password cannot be the same as username.")
            return;
        }

        const user = {
            email,
            username,
            password,
        };

        localStorage.setItem("blackStarUser", JSON.stringify(user));

        alert("✅ Signup successful!");
        console.log("User saved:", user);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});


//CHECKOUT PAGE FUNCTIONALITY

// JUST KIDDING DOING A WEATHER API BUILT IN TO THE SITE INSTEAD SINCE THE STRIPE API REQUIRES SETTING UP A SERVER ON NODE

// JUST KIDDING AGAIN, I AM NOT A QUITTER, AND I DO NOT ACCEPT DEFEAT

// EVER



document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.querySelector(".container-checkout form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the default form reload

            // Get form data
            const formData = {
                name: document.getElementById("name")?.value,
                email: document.querySelectorAll("#email")[0]?.value,
                emailConfirm: document.querySelectorAll("#email")[1]?.value,
                address: document.getElementById("address")?.value,
                cardNumber: document.querySelectorAll("cardNumber")?.value,
                cvc: document.querySelectorAll("cvc")?.value,
                expiration: document.querySelectorAll("expiration")?.value,
            };

            // Basic validation
            if (formData.email !== formData.emailConfirm) {
                alert("Emails do not match.");
                return;
            }

            console.log("Submitting checkout form:", formData);

            // Send to backend (we'll set up /checkout route on the server)
            fetch("/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Server error during checkout");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Checkout success:", data);

                    // Optional: redirect to success page
                    if (data.redirectUrl) {
                        window.location.href = data.redirectUrl;
                    } else {
                        alert("Checkout complete!");
                    }
                })
                .catch((err) => {
                    console.error("Checkout failed:", err);
                    alert("There was an issue with your checkout.");
                });
        });
    }
});


//Secure Credit Card PCI Compliant

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes("checkout.html")) {
        const stripe = Stripe("pk_test_51SJzgHBqT0SCKdMIsBy9z79q90yntQMOHEAer9MkZdWceRqfcziQMYv8nhQq4fccY7Bq0ddOMpUg1tBv55jUlTde00JjJpJyLw");
        const elements = stripe.elements();

        const card = elements.create("card", {
      style: {
        base: {
          fontSize: "16px",
          color: "#FFF",
          "::placeholder": {
            color: "#a0aec0"
          }
        }
      }
    });

        card.mount("#card-element");

        card.on("change", function (event) {
            const errorDiv = document.getElementById("card-errors");
            if (event.error) {
                errorDiv.textContent = event.error.message;
            } else {
                errorDiv.textContent = "";
            }
        });

        // Handle form submission
        const form = document.querySelector("form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Get total from cart (or set a static amount for now)
            let amount = 5000; // = $50.00 in cents

            const response = await fetch("/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount })
            });

            const { clientSecret } = await response.json();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: document.getElementById("name").value,
                        email: document.getElementById("email").value
                    }
                }
            });

            if (result.error) {
                document.getElementById("card-errors").textContent = result.error.message;
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    alert("✅ Payment successful!");
                    localStorage.removeItem("blackStarCart");
                    window.location.href = "/success.html"; 
                }
            }
        });
    }
});



// SUPPORT PAGE FUNCTIONALITY


document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("support.html")) {
        const supportForm = document.querySelector("form");

        supportForm.addEventListener("submit", function (e) {
            e.preventDefault();
        

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("user_message").value.trim();

        if ( !name || !email || !subject || !message) {
            alert("Please fill out all of the required fields before submitting.");
            return;
        }

        // Simulate successful submission

        alert("Message received. We'll be in touch soon.");

        supportForm.reset();
        });
    }
});