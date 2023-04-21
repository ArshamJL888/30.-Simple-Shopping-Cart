
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
let totalPrice = document.querySelector('.total-price')
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
    let userFregment = document.createDocumentFragment();
    productsArray.forEach(function (product) {
        let newDivItem = document.createElement('div');
        let newh3 = document.createElement('h3');
        let newImg = document.createElement('img');
        let newDivFooter = document.createElement('div');
        let newPrice = document.createElement('p');
        let newBtn = document.createElement('button');

        newDivItem.classList.add('products-item');
        newh3.classList.add('product-header')
        newImg.classList.add('product-image')
        newDivFooter.classList.add('product-footer')
        newPrice.classList.add('product-price')
        newBtn.classList.add('add-product')

        newImg.alt = "Product";

        newh3.textContent = product.Name;
        newImg.setAttribute('src', product.Adress);
        newPrice.textContent = '$' + product.Price;
        newBtn.innerHTML = 'Add to cart';




        newDivItem.append(newh3);
        newDivItem.append(newImg);
        newDivFooter.append(newPrice);
        newDivFooter.append(newBtn);
        newDivItem.append(newDivFooter);


        newBtn.addEventListener('click', function () {
            addToCartHandler(product);
        });
        userFregment.appendChild(newDivItem);
    })
    productsContent.append(userFregment);
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
    let userFregment = document.createDocumentFragment();
    basket.forEach(function (basketProduct) {
        let newDivcontent = document.createElement('div');
        let newDivItem = document.createElement('div');
        let newImg = document.createElement('img');
        let newPName = document.createElement('p');
        let newpPrice = document.createElement('p');
        let newDivQuantity = document.createElement('div');
        let newInputCounter = document.createElement('input');
        let newRemoveBtn = document.createElement('button');

        newDivcontent.classList.add('cart-content-item');
        newDivItem.classList.add('cart-item-ITEM');
        newImg.classList.add('cart-content-item-image');
        newPName.classList.add('cart-item-name');
        newpPrice.classList.add('cart-item-price');
        newDivQuantity.classList.add('cart-item-quantity');
        newInputCounter.classList.add('cart-item-number');
        newRemoveBtn.classList.add('remove-Btn');

        newInputCounter.setAttribute('type', 'number');
        newInputCounter.setAttribute('value', basketProduct.counter);
        newImg.setAttribute('alt', 'Cart Product');
        newImg.setAttribute('src', basketProduct.Adress);

        newPName.textContent = basketProduct.Name;
        newpPrice.textContent = '$' + basketProduct.Price;
        newRemoveBtn.textContent = "Remove";


        newDivcontent.append(newDivItem)
        newDivItem.append(newImg);
        newDivItem.append(newPName);
        newDivcontent.append(newpPrice);
        newDivcontent.append(newDivQuantity);
        newDivQuantity.append(newInputCounter);
        newDivQuantity.append(newRemoveBtn);

        newInputCounter.addEventListener('input', function () {
            productCounterHandler(event, basketProduct);
        })

        newRemoveBtn.addEventListener('click', function () {
            removeProductFromCart(basketProduct);
        })

        userFregment.appendChild(newDivcontent);
    })
    cartContent.append(userFregment);
    showTotalPrice();
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