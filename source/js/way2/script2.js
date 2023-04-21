
// Definition and Selection
let productsArray = [
    { id: 1, Name: "ALBUM 1", Price: 26.99, Adress: "../images/Album 1.jpg" },
    { id: 2, Name: "ALBUM 2", Price: 9.99, Adress: "../images/Album 2.png" },
    { id: 3, Name: "ALBUM 3", Price: 19.09, Adress: "../images/Album 3.png" },
    { id: 4, Name: "ALBUM 4", Price: 14.79, Adress: "../images/Album 4.png" },
    { id: 5, Name: "ALBUM 5", Price: 17.00, Adress: "../images/Band Members.png" },
    { id: 6, Name: "ALBUM 6", Price: 8.88, Adress: "../images/Demons.png" },
    { id: 7, Name: "COFEE CUP", Price: 22.00, Adress: "../images/Cofee.png" },
    { id: 8, Name: "iphone 14 pro max", Price: 1499.99, Adress: "../images/14promax.jpg" },
    { id: 9, Name: "iphone 13", Price: 1299.99, Adress: "../images/iphone 13.jpg" },
    { id: 10, Name: "Apple watch Ultra", Price: 459.99, Adress: "../images/iwatch.jpg" },
    { id: 11, Name: "Dior Sauvage", Price: 299.49, Adress: "../images/sauvage.jpg" },
    { id: 12, Name: "Gaming Laptop", Price: 1999.99, Adress: "../images/laptop.jpg" },
];
let basket = [];
let headerTop = document.querySelector('.header-top');
let productsContent = document.querySelector('.products-content');
let cartContent = document.querySelector('.cart-content-products');
let purchaseBtn = document.querySelector('.purchase-btn');
let totalPrice = document.querySelector('.total-price-item')
let headerIcon = document.querySelector('.header-icon i');
let menu = document.querySelector('.menu')
let loader = document.querySelector('.loader');


//Events
purchaseBtn.addEventListener('click', purchaseAllHandler);
headerIcon.addEventListener('click', menuBarHandler);
window.addEventListener('load', loadFunc);
function loadFunc() {
    loader.classList.add('hidden');
}

// First time
showProducts();

//functions
function menuBarHandler() {
    if (headerIcon.classList.contains('fa-bars')) {
        menu.style.left = '0';
        headerIcon.classList.remove('fa-bars');
        headerIcon.classList.add('fa-times');
    }
    else {
        menu.style.left = '-240px';
        headerIcon.classList.add('fa-bars');
        headerIcon.classList.remove('fa-times');
    }
}

function purchaseAllHandler() {
    alert('Thanks For Your Shopping!!!')
    basket = [];
    showCartHandler();
}

function showProducts() {
    productsContent.textContent = "";
    productsArray.forEach(function (product) {

        let newHtml = '<div class="products-item">';
        newHtml += '<h3 class="product-header">' + product.Name + '</h3>';
        newHtml += '<img src="' + product.Adress + '" alt="product" class="product-image">';
        newHtml += '<div class="product-footer">';
        newHtml += '<p class="product-price">' + '$' + product.Price + '</p>';
        newHtml += '<button onclick="clickAddHandler(event)" class="add-product">add to cart</button>'

        productsContent.insertAdjacentHTML('beforeend', newHtml);

    })
}

function clickAddHandler(event) {
    let productName = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    console.log(productName);
    let product = productsArray.find(function (item) {
        return item.Name === productName;
    })
    addToCartHandler(product);
    console.log(product);
}

function addToCartHandler(product) {
    let frequentlyIndex = basket.findIndex(function (item) {
        return item.Name === product.Name;
    });
    if (frequentlyIndex === -1) {
        let newObject = {
            id: product.id,
            Name: product.Name,
            Price: product.Price,
            Adress: product.Adress,
            counter: 1,
        };
        basket.push(newObject);
    }
    else {
        basket[frequentlyIndex].counter++;
    };

    showCartHandler();
}

function showCartHandler() {
    cartContent.textContent = "";

    basket.forEach(function (basketProduct) {

        let html = '<div class="cart-content-item">';
        html += ' <div class="cart-item-ITEM">';
        html += '<img src="' + basketProduct.Adress + '" alt="product" class="cart-content-item-image">';
        html += '<p class="cart-item-name">' + basketProduct.Name + '</p>';
        html += '</div>';
        html += '<p class="cart-item-price">' + '$' + basketProduct.Price + '</p>'
        html += '<div class="cart-item-quantity">';
        html += '<input min="1" oninput="inputNumberHandler(event)" type="number" value="' + basketProduct.counter + '" class="cart-item-number">';
        html += '<button onclick="clickRemoveHandler(event)" class="remove-Btn">Remove</button>';
        html += '</div>';
        html += '</div>';

        cartContent.insertAdjacentHTML('beforeend', html);


    })
    showTotalPrice();
}

function inputNumberHandler(event) {
    let basketProductName = event.target.parentElement.previousElementSibling.previousElementSibling.children[1].textContent;
    let basketProduct = basket.find(function (item) {
        return item.Name === basketProductName;
    });
    productCounterHandler(event, basketProduct);
}

function clickRemoveHandler(event) {
    let basketProductName = event.target.parentElement.previousElementSibling.previousElementSibling.children[1].textContent;
    let basketProduct = basket.find(function (item) {
        return item.Name === basketProductName;
    })
    removeProductFromCart(basketProduct);
}

function productCounterHandler(event, basketProduct) {
    basketProduct.counter = event.target.value;
    showTotalPrice();
}

function removeProductFromCart(basketProduct) {
    basket = basket.filter(function (item) {
        return item.id != basketProduct.id
    });
    showCartHandler()
}

function showTotalPrice() {
    let totalCost = 0;
    basket.forEach(function (item) {
        totalCost += (item.Price * item.counter);
    })
    totalPrice.textContent = "$" + totalCost.toFixed(2);
}