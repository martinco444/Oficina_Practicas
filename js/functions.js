
const bodyLogin = document.querySelector("#bodyLogin");

bodyLogin.classList.remove('opacity0');
bodyLogin.classList.add('opacity1');
//bodyLogin.classList.add('class1','class2');
//bodyLogin.classList.toggle('NombreClase'); //Quita y agrega una clase
//document.querySelector("#linkCreateAcount").addEventListener("click",nextPass);

document.querySelector("#linkCreateAcount").onclick = function(e){
    e.preventDefault();
    nextLayout('#divEmail','#divRegister');
}

document.querySelector("#btnNextEmail").onclick = function(e){
    e.preventDefault();
    prevLayout('#divRegister','#divEmail');
}

document.querySelector("#btnNextPass").onclick = function(){

    const strEmail = document.querySelector("#emailUser").value;
    const alerEmailLogin = document.querySelector("#alertEmailLogin");
    const spanEmail = document.querySelector("#spanEmail");

    const emailValid = fntEmailValidate(strEmail);

    if(!emailValid )
    {
        alerEmailLogin.innerHTML = '<p style="color:red;">Escribe una dirección de correo electrónico</p>';
        alerEmailLogin.style.display ="block";
    }else{
        alerEmailLogin.style.display ="none";
        spanEmail.innerHTML = strEmail;
        nextLayout('#divEmail','#divPassword');
    }
}

document.querySelector("#btnPrev").onclick = function(){
    prevLayout('#divPassword','#divEmail');
}

document.querySelector("#linkRecoveryPass").onclick = function(e){
	e.preventDefault();
    nextLayout('#divPassword','#divRecoveryPass');
}

document.querySelector("#btnCancelar").onclick = function(){
    prevLayout('#divRecoveryPass','#divPassword');
}

//Ultimo
document.querySelector("#btnRegister").onclick = function(){
    const nameUser = document.querySelector("#nameUser").value;
    const emailNewUser = document.querySelector("#emailNewUser").value;
    const passNewUser = document.querySelector("#passNewUser").value;

    const alertRegister = document.querySelector("#alertRegister");

    if(nameUser == "" || emailNewUser == "" || passNewUser == "")
    {
        alertRegister.innerHTML = '<p style="color:red;">Todos los datos son obligatorios</p>';
        alertRegister.style.display = "block";
    }else{
        alertRegister.style.display = "none";
        alert("Registrar usuario");
    }
}

document.querySelector("#btnLogin").onclick = function(){
    const strEmailUser = document.querySelector("#emailUser").value;
	const strPassUser = document.querySelector("#passUser").value;
    const strPersona = document.querySelector("#persona").value;

    const alertPass = document.querySelector('#alertPass');

    if(strPassUser == "")
    {
        alertPass.innerHTML = '<p style="color:red;">Escriba su contraseña.</p>';
        alertPass.style.display = 'block';
    }else{
        alertPass.style.display = 'none';
    
        if (strPersona === "Estudiante"){
            window.location.href = "index.html";
        }
        else{
            window.location.href = "indexprofesor.html";
        }
    
    }
}

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






//jQuery(document).ready(function($) {
    /*$('#bodyLogin').removeClass('opacity0');
    $('#bodyLogin').addClass('opacity1');

	$('#linkCreateAcount').click(function(e){
		e.preventDefault();
		nextLayout('#divEmail','#divRegister');
	});*/

	/*$('#btnNextEmail').click(function(){
		prevLayout('#divRegister','#divEmail');
	});
    */

    /*$('#btnNextPass').click(function(){

    	const strEmail = $('#emailUser').val();

    	if(strEmail == "")
    	{
    		$('.alertEmail').slideDown();
    	}else{
    		$('.spanEmail').html($('#emailUser').val());
    		nextLayout('#divEmail','#divPassword');
    	}
    });*/


    /*$('#btnPrev').click(function(){
    	prevLayout('#divPassword','#divEmail');
    });*/

    /*$('#linkRecoveryPass').click(function(e){
    	e.preventDefault();
    	nextLayout('#divPassword','#divRecoveryPass');
    });*/

    /*$('#btnCancelar').click(function(){
    	prevLayout('#divRecoveryPass','#divPassword');
    });*/




    //Ultimos
    /*$('#btnRegister').click(function(){

    	alert("Registrar datos del usuario");

    });*/

    /*$('#btnLogin').click(function(){

    	const strEmailUser = $('#emailUser').val();
    	const strPassUser = $('#passUser').val();

    	alert("Usuario: "+strEmailUser+' - '+'Contraseña: '+strPassUser);
    });*/

    /*$('#btnSendEmail').click(function(){
    	const strEmailSend = $('#emailRecovery').val();
    	alert("Enviar email a "+strEmailSend);
    });*/

//}); //End Ready


function layoutIni(){
    const divEmail = document.querySelector("#divEmail");
    divEmail.classList.add("layoutActive");
}
setTimeout(layoutIni, 1000);

function nextLayout(parent,next)
{
	/*$(parent).removeClass('layoutLeft');
	$(parent).removeClass('layoutRight');
	$(parent).removeClass('layoutActive');
	$(next).removeClass('layoutLeft');
	$(next).removeClass('layoutRight');
	$(next).removeClass('layoutActive');
	$(parent).addClass("layoutLeft");
	$(next).addClass("layoutActive");*/

    const divParent = document.querySelector(parent);
    const divNext = document.querySelector(next);
    divParent.classList.remove('layoutLeft','layoutRight','layoutActive');
    divNext.classList.remove('layoutLeft','layoutRight','layoutActive');

    divParent.classList.toggle('layoutLeft');
    divNext.classList.toggle('layoutActive');

}

function prevLayout(parent,prev)
{
	/*$(parent).removeClass('layoutLeft');
	$(parent).removeClass('layoutRight');
	$(parent).removeClass('layoutActive');
	$(prev).removeClass('layoutLeft');
	$(prev).removeClass('layoutRight');
	$(prev).removeClass('layoutActive');

	$(parent).addClass("layoutRight");
	$(prev).addClass("layoutActive");*/

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



