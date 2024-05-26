

document.querySelector("#btnSendEmail").onclick = function(){
    const sendEmail = document.querySelector("#sendEmail").value;
    const alertSendEmail = document.querySelector("#alertSendEmail");

     const emailValid = fntEmailValidate(sendEmail);


    if(!emailValid)
    {
        alertSendEmail.innerHTML = '<p style="color:red;">Escriba su cuenta de correo.</p>';
        alertSendEmail.style.display = "block";
    }else{
        alertSendEmail.style.display = "none";
        alert("Enviar email a "+sendEmail);
    }
}

document.querySelector("#emailUser").onkeyup = function(){
    const emailUser = document.querySelector("#emailUser").value;
    const alerEmailLogin = document.querySelector("#alertEmailLogin");
    const emailValid = fntEmailValidate(emailUser);

    if(!emailValid)
    {
        alerEmailLogin.innerHTML = '<p style="color:red;">Escribe una dirección de correo electrónico.</p>';
        alerEmailLogin.style.display = "block";
    }else{

        alerEmailLogin.style.display = "none";
    }

}

document.querySelector("#sendEmail").onkeyup = function(){
    const sendEmail = document.querySelector("#sendEmail").value;
    const alertSendEmail = document.querySelector("#alertSendEmail");
    const emailValid = fntEmailValidate(sendEmail);

    if(!emailValid)
    {
        alertSendEmail.innerHTML = '<p style="color:red;">Escriba su cuenta de correo.</p>';
        alertSendEmail.style.display = "block";
    }else{

        alertSendEmail.style.display = "none";
    }

}


function layoutIni(){
    const divEmail = document.querySelector("#divEmail");
    divEmail.classList.add("layoutActive");
}
setTimeout(layoutIni, 1000);

function nextLayout(parent,next)
{

    const divParent = document.querySelector(parent);
    const divNext = document.querySelector(next);
    divParent.classList.remove('layoutLeft','layoutRight','layoutActive');
    divNext.classList.remove('layoutLeft','layoutRight','layoutActive');

    divParent.classList.toggle('layoutLeft');
    divNext.classList.toggle('layoutActive');

}

function prevLayout(parent,prev)
{


    const divParent = document.querySelector(parent);
    const divPrev = document.querySelector(prev);
    divParent.classList.remove('layoutLeft','layoutRight','layoutActive');
    divPrev.classList.remove('layoutLeft','layoutRight','layoutActive');

    divParent.classList.toggle('layoutRight');
    divPrev.classList.toggle('layoutActive');
}

function fntEmailValidate(email){
    const stringEmail = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (stringEmail.test(email) == false){
        return false;
    }else{
        return true;
    }
}