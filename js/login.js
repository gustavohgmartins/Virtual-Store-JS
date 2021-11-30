// sets the "global" Variables
var accounts=[];
var user;
var password;
var accountIndex;
//Hides the elements that must be hidden at first
function start(){
    checkLogin();
    $('.fa-eye-slash').hide();
    $('#incorrect').hide();
    $('#emptyField').hide();
}
function checkLogin(){
    if(JSON.parse(window.localStorage.getItem("loggedIn"))!= null){
        $('#main').html('<button class="logout" onclick="logout();">logout</button>');
    }
}
function logout(){
    window.localStorage.setItem("loggedIn",JSON.stringify(null));
    window.localStorage.setItem("shoppingCart",JSON.stringify(null));
    document.location.reload(true);
}
function showPassword(){
    $('.fa-eye-slash').show();
    $('.fa-eye').hide();
    $('#password').prop('type', 'text');   
}

function hidePassword(){
    $('.fa-eye-slash').hide();
    $('.fa-eye').show();
    $('#password').prop('type', 'password');
}

//checks if the fields are filed and throw warning labels
function validateLogin(){
    if(document.getElementById("username").value.length==0){
        $('.username').addClass('invalido');
        $('#emptyField').show();
        $('#incorrect').hide();
    }
    else{
        $('.username').removeClass('invalido');
    }   
    if(document.getElementById("password").value.length==0){
        $('.password').addClass('invalido');
        $('#emptyField').show();
        $('#incorrect').hide();
    }
    else{
        $('.password').removeClass('invalido');   
    }
    if(document.getElementById("password").value.length!=0 && document.getElementById("username").value.length!=0){
        $('#emptyField').hide();
    }
}    

//Gets the data from the local storage
function getData(){
    accounts=[];
    if(JSON.parse(window.localStorage.getItem("accounts"))!= null){
        accounts.push(JSON.parse(window.localStorage.getItem("accounts")));
    }
}

//Checks if the username an password match with any account registered, if they do, redirects to the products(index) page
function login(){
    getData();
    user = $('#username').val();
    password = $('#password').val();
    let matchFound = false;
        
    accounts.forEach(function(element){
        element.forEach(function(element){
            if(element.email==user){
                if(element.password==password){
                    $('#incorrect').hide();
                    $('#emptyField').hide();
                    alert("Login Successful!");
                    matchFound = true;
                    window.localStorage.setItem("loggedIn",JSON.stringify(element));
                    if(JSON.parse(window.localStorage.getItem("paymentLogin"))){
                    window.localStorage.setItem("paymentLogin",JSON.stringify(false));
                    window.location.href = './payment.html';
                    }
                    else{
                        window.location.href = '../index.html';
                    }
                }
            }
        });
    });
    if(matchFound){
        $('#incorrect').hide();
    }
    else{
        $('#incorrect').show();
    }
}

//Check if all the input fields are valid
function allValid(){
    let isValid = [];

    $('.input').each(function(){
        if($(this).closest('div').hasClass('invalido')){
            isValid.push(false);
        }
        else{isValid.push(true);}
    });
    if(isValid.every(i => i == true)){   
        return true;
    }
    else{
        return false;
    }
}

//Calls the validation functions and if all requirements are met, calls the login function
function submit(){
    validateLogin();
    if(allValid()){
        login();
    }

}

start();
