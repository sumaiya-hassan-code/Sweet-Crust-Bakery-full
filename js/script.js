
$('.slides').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,

    prevArrow: '<i class="fa-solid fa-circle-left prev"></i>',
    nextArrow: '<i class="fa-solid fa-circle-right next"></i>',

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

// Mobile menu
let menuBtn = document.getElementById("menuBtn");
let mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

let mobileLinks = document.querySelectorAll(".mobile-link");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});


let navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("border-b-2", "pb-2" , "border-[#A65C00]");
        });

        link.classList.add("border-b-2", "border-[#A65C00]");

    });

});

// Modal open
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// Modal off
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// model off
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
}


// cart 
let cart = [];

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");

const cartCount =
    document.getElementById("cart-count");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const cartBtn =
    document.getElementById("cart-btn");

const cartDrawer =
    document.getElementById("cart-drawer");

const closeCart =
    document.getElementById("close-cart");

const cartOverlay =
    document.getElementById("cart-overlay");

addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard =
            button.closest(".product-card");

        const name =
            productCard.dataset.name;

        const price =
            Number(productCard.dataset.price);


        const existingProduct =
            cart.find(function(item) {
                return item.name === name;
            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

    });

});

function updateCart() {

    let totalQuantity = 0;

    cart.forEach(function(item) {

        totalQuantity += item.quantity;

    });

    cartCount.innerText = totalQuantity;

    renderCart();

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-gray-500">
                Your cart is empty.
            </p>
        `;

        cartTotal.innerText = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="flex items-center
                        justify-between
                        border-b pb-4">

                <div>

                    <h3 class="font-semibold">
                        ${item.name}
                    </h3>

                    <p class="text-gray-500">
                        ৳${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="flex items-center gap-2">

                    <button
                        onclick="decreaseQuantity(${index})"
                        class="w-7 h-7
                               rounded-full
                               bg-gray-200">
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})"
                        class="w-7 h-7
                               rounded-full
                               bg-gray-200">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.innerText = total;

}
// quantity increase:
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}
// Decrease
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}

cartBtn.addEventListener("click", function() {

    cartDrawer.classList.remove("translate-x-full");

    cartOverlay.classList.remove("hidden");

});

function closeCartDrawer() {

    cartDrawer.classList.add("translate-x-full");

    cartOverlay.classList.add("hidden");

}


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);

