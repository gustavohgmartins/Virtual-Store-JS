var products=[
    {   
        "id":0,
        "price":429.99,
        "name":"Toyota Supra miniature",
        "image":"supra.png",
        "status":false
    },
    {   
        "id":1,
        "price":4239.99,
        "name":"Nissan Skyline miniature (metal)",
        "image":"skyline.png",
        "status":false
    },
    {   
        "id":2,
        "price":489.99,
        "name":"Atari 8",
        "image":"atari.png",
        "status":false
    },
    {   
        "id":3,
        "price":9329.99,
        "name":"Iphone 13 Pro",
        "image":"iphone.png",
        "status":false
    },
    {   
        "id":4,
        "price":179.99,
        "name":"Yugioh Card pack",
        "image":"yugioh.png",
        "status":false
    },
    {   
        "id":5,
        "price":11199.99,
        "name":"Alienware notebook",
        "image":"notebook.png",
        "status":false
    },
    {   
        "id":6,
        "price":99.99,
        "name":"Harry Potter Chocolate frog",
        "image":"frog.png",
        "status":false
    },
    {   
        "id":7,
        "price":154.01,
        "name":"Razer mini viper mouse",
        "image":"mouse.png",
        "status":false
    },
    {   
        "id":8,
        "price":1049.99,
        "name":"Razer Kraken Ultimate Headset",
        "image":"headset.png",
        "status":false
    },
    {   
        "id":9,
        "price":1189.99,
        "name":"Husky Gaming chair",
        "image":"husky.png",
        "status":false
    },
    {   
        "id":10,
        "price":269.99,
        "name":"GTA trilogy - Definitive Edition",
        "image":"gta.png",
        "status":false
    },
    {   
        "id":11,
        "price":549.99,
        "name":"Anne pro 2 Keyboard",
        "image":"anne.png",
        "status":false
    },
    {   
        "id":12,
        "price":5939.99,
        "name":"Play Station 5",
        "image":"ps5.png",
        "status":false
    },
    {   
        "id":13,
        "price":571.99,
        "name":"Spider man Costume",
        "image":"spiderman.png",
        "status":false
    }
];
var shoppingCart = [];

function start(){
    $('.dropdown-content').hide();
    checkCart();
    checkLogin();
    cards();
}
//dropdown menu to logout
function dropDown() {
    $('.dropdown-content').show();
  }
// Closes the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#profile')) {
        $('.dropdown-content').hide();
    }
  }

//retrives the 'added to cart' products 
function checkCart(){
    if(JSON.parse(window.localStorage.getItem("shoppingCart"))!= null){
        shoppingCart = JSON.parse(window.localStorage.getItem("shoppingCart"));
        products.forEach(elem => {
            shoppingCart.forEach(item =>{
                if(elem.id == item.id){
                    elem.status = true;
                }
            })
        })
    }
}

//Checks if the user logged in
function checkLogin(){
    if(JSON.parse(window.localStorage.getItem("loggedIn"))!= null){
        $('.login').hide();
        let account = JSON.parse(window.localStorage.getItem("loggedIn"));
        $('#username').html(account.fullName.split(' ')[0]);
    }
    else{
        $('#profile').hide();
    }
}

function logout(){
    
    window.localStorage.setItem("loggedIn",JSON.stringify(null));
    window.localStorage.setItem("shoppingCart",JSON.stringify(null));
    alert("Logout successful")
    window.localStorage.setItem("paymentLogin",JSON.stringify(false));
    document.location.reload(true);
}
//Creates the card of the given item
function createCards(item){
    var content ="";
    content += `<div class="card">`;
    content += `<div class="cardImg">`;
    content += `<img src="./assets/${item.image}">`;
    content += `</div>`;
    content += `<div class="cardPrice">`;
    content += `R$ ${item.price}`;
    content += `</div>`;
    content += `<div class="cardName">`;
    content += item.name;
    content += `</div>`;
    if(item.status){
        content += `<div class="removeCart" onclick="toogleStatus(${item.id});">`;
        content += "Added"
        content += `</div>`;
    }
    else{
    content += `<div class="addCart" onclick="toogleStatus(${item.id});">`;
    content += "Add to cart"
    content += `</div>`;
    }
    content += `</div>`;

    $('#products').html($('#products').html() + content);
}
//Creates all the product cards
function cards(){
    $('#products').html('');

    products.forEach(item => {
        createCards(item);
    });
}
//change the status of the selected product
function toogleStatus(id){
    products.forEach(item =>{
        if(item.id == id){
            if(item.status == false){
                item.status = true;
                shoppingCart.push(item);
                window.localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
            }
            else{
                shoppingCart.forEach(elem => {
                    if (elem.id == item.id){
                        shoppingCart.splice(shoppingCart.indexOf(elem),1);
                        window.localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
                    }
                });
                item.status = false;
            }
        }
    });
    if($('#search').val()==''){
    cards();
    }
    else{
        search();
    }
    
}

//Checks if the cart is empty and redirects to the shopping cart page
function registerCart(){
    if(shoppingCart ==''){
        alert('Your shopping cart is empty')

    }
    else{
    window.location.href = './pages/shoppingCart.html';
    }
}
//Filters the card creation
function search(){
    if($('#search').val()!=''){
        products.forEach(item => {
            if(item.name.toLowerCase().includes($('#search').val().toLowerCase())){
                $('#products').html('');
                createCards(item);
            }
        });
    }
    else{
        document.location.reload(true);
    }
}
start();