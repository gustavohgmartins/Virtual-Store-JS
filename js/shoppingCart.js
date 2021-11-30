var amount = [];
var total = 0;

function start(){
    checkLogin();
    itemCards();
    $("#profile").css("margin-right", "50px");
    $('.dropdown-content1').hide();
}
function itemCards(){
    total = 0;
    shoppingCart = JSON.parse(window.localStorage.getItem("shoppingCart"));
    $('#items').html(`<div class="title">
                         <h1>Shopping Cart</h1>
                      </div>`);
    shoppingCart.forEach(item => {
        if(amount[shoppingCart.indexOf(item)]==null){
        amount.push(1);
        }
        var content ='';
        content += `<div class="itemCard">
                        <div class="itemImg">
                            <img src="../assets/${item.image}">
                        </div>
                        <div class="info">
                            <div class="description">
                                ${item.name}  
                            </div>
                            <div class="options">
                                <h5 onclick="removeItem(${item.id})">Remove</h5>
                            </div>
                        </div>
                        <div class="amount">
                            <div class="remove" onclick="decrement(${item.id});">-</div>
                            <div class="number">${amount[shoppingCart.indexOf(item)]}</div>
                            <div class="add" onclick="increment(${item.id});">+</div>
                        </div>
                        <div class="value">
                            R$&nbsp${(item.price*amount[shoppingCart.indexOf(item)]).toFixed(2)}
                        </div>
                    </div>`
        total += parseFloat((item.price*amount[shoppingCart.indexOf(item)]).toFixed(2));            
        $('#items').html($('#items').html()+content);
    });
    var content=` <div class="total">
                    <h1>Total &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspR$&nbsp ${total.toFixed(2)}</h1>
                    <button class="payment" onclick="payment();">Pay Now</button>
                  </div>`;
    $('#items').html($('#items').html()+content);
    if(shoppingCart.length==0){
        $('#items').html(  `<div class="emptyCart">
                                <h1>Your shopping cart is empty</h1>
                                <h2>Dont't know what to buy? millions of products await you!</h2>
                            </div>`);
    }
    total.toFixed(2)
    window.localStorage.setItem("total",JSON.stringify(total.toFixed(2)));
}
function checkLogin(){
    if(JSON.parse(window.localStorage.getItem("loggedIn"))!= null){
        $('.login').hide();
    }
    else{
        $('#profile').hide();
    }
}
//dropdown menu to logout
function dropDown() {
    $('.dropdown-content1').show();
  }
// Closes the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#profile')) {
        $('.dropdown-content1').hide();
    }
  }
function increment(elem){
    shoppingCart.forEach(item => {
        if(item.id == elem){
            amount[shoppingCart.indexOf(item)] += 1;
            itemCards();
        }
    })
    
}
function decrement(elem){
    shoppingCart.forEach(item => {
        if(item.id == elem ){
            if(amount[shoppingCart.indexOf(item)]>1){
                amount[shoppingCart.indexOf(item)] -= 1;
                itemCards();
                
            }
        }
    })
}
function logout(){
    
    window.localStorage.setItem("loggedIn",JSON.stringify(null));
    window.localStorage.setItem("shoppingCart",JSON.stringify(null));
    alert("Logout successful")
    document.location.reload(true);
    window.location.href = '../index.html';
    window.localStorage.setItem("paymentLogin",JSON.stringify(false));
}
function removeItem(elem){
    shoppingCart.forEach(item => {
        if(item.id == elem){
            shoppingCart.splice(shoppingCart.indexOf(item),1);
            window.localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
            itemCards();
        }
    })
}
function payment(){
    if(JSON.parse(window.localStorage.getItem("loggedIn"))!= null){
        window.localStorage.setItem("amount",JSON.stringify(amount));
        window.location.href = './payment.html';
    }
    else{
        window.localStorage.setItem("paymentLogin",JSON.stringify(true));
        window.location.href = './login.html';
    }
}

start();
