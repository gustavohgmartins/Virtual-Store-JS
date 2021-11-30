// sets the "global" Variables
var accounts =[];
var user;
var emailTaken = false;

//Hides the elements that must be hidden at first
function start(){
    checkLogin();
    $('.fa-eye-slash').hide();
    $('#incorrect').hide();
    $('#emptyField').hide();
    $('#invalidEmail').hide();
    $('#matchPassword').hide();
    $('#invalidCpf').hide();
    $('#emailTaken').hide();
}
function checkLogin(){
    if(JSON.parse(window.localStorage.getItem("loggedIn"))!= null){
        $('#main').html('<button onclick="logout();">logout</button>');
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
    $('#confirmPassword').prop('type', 'text');
}

function hidePassword(){
    $('.fa-eye-slash').hide();
    $('.fa-eye').show();
    $('#confirmPassword').prop('type', 'password');
}

//Checks if the e-mail is available, creates a new account and redirects to the index page
function createAcount(email, password, fullName, date, cpf){
    
    user = new Object;
    user.email = email;
    user.password = password;
    user.fullName = fullName;
    user.birthDate = date;
    user.cpf = cpf;

    if(!emailTaken){
        accounts.push(user);
        window.location.href = '../pages/login.html';
    }
}

//Calls createAccount() and send the accounts data to the local storage
function registerLog(){
    createAcount($('#registerEmail').val(),$('#registerPassword').val(),$('#fullName').val(),$('#date').val(),$('#cpf').val())
    window.localStorage.setItem("accounts",JSON.stringify(accounts));
}

//Checks if the email input is a valid e-mail
function validateEmail(email) {

    accounts = JSON.parse(window.localStorage.getItem("accounts"));
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( emailReg.test(email.val())){
        $('#invalidEmail').hide()
        if(accounts!=null){
            if(accounts.some(function(element){
                return element.email == email.val();
            })){
                $('#emailTaken').show();
                emailTaken = true;
            }
            else{
                $('#emailTaken').hide();
                emailTaken = false;
            }
        }
        else{
            accounts = [];
        }
    }
    else{
        email.closest('div').addClass('invalido');
        $('#invalidEmail').show();
    };

}

//Checks if all the input fields are filled
function validateForm(){
    
        var allFilled = true;
        $('.input').each(function() {
            if (!(/\S/.test($(this).val()))){
              allFilled = false;
              $(this).closest('div').addClass('invalido');
              $('#emptyField').show();
            }
            else {
                $(this).closest('div').removeClass('invalido');
            }    
        });
        if (allFilled) {
            $('#emptyField').hide();
        }
}

//Checks if the password and confirmPassword inputs match
function validatePassword(password, confirmPassword){
    if(password.val()==confirmPassword.val()){
        $('#matchPassword').hide(); 
    }
    else{
        $('#matchPassword').show();
        confirmPassword.closest('div').addClass('invalido');  
    }
}

function validateCpf(cpf){
    if(cpf.val().length != 14 && cpf.val().length > 0 ){
        $('#invalidCpf').show();
        cpf.closest('div').addClass('invalido'); 
    }
    else if(cpf.val().length == 14 && !cpf.closest('div').hasClass('invalido')){
        $('#invalidCpf').hide();
    }
}

//Calls all the validation functions 
function submit(){
    validateForm();
    validateCpf($('#cpf'));
    validateEmail($('#registerEmail'));
    validatePassword($('#registerPassword'),$('#confirmPassword'));
    let isValid = true;
    $('.input').each(function(){
        if($(this).closest('div').hasClass('invalido')){
            isValid = false;
        }
    });
    if(isValid){   
        registerLog();   
    }
}


    
start();


