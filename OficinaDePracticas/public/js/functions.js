const bodyLogin = document.querySelector("#bodyLogin");
bodyLogin.classList.remove('opacity0');
bodyLogin.classList.add('opacity1');


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
    const alertEmailLogin = document.querySelector("#alertEmailLogin");
    const spanEmail = document.querySelector("#spanEmail");

    const emailValid = fntEmailValidate(strEmail);

    if(!emailValid) {
        alertEmailLogin.innerHTML = '<p style="color:red;">Escribe una dirección de correo electrónico</p>';
        alertEmailLogin.style.display = "block";
    } else {
        alertEmailLogin.style.display = "none";
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

document.querySelector("#btnRegister").onclick = function(){
    const nameUser = document.querySelector("#nameUser").value;
    const emailNewUser = document.querySelector("#emailNewUser").value;
    const passNewUser = document.querySelector("#passNewUser").value;
    const personType = document.querySelector("#persona").value;
    const alertRegister = document.querySelector("#alertRegister");

    if(nameUser === "" || emailNewUser === "" || passNewUser === "" || personType === "") {
        alertRegister.innerHTML = '<p style="color:red;">Todos los datos son obligatorios</p>';
        alertRegister.style.display = "block";
    }
}

document.querySelector("#btnSendEmail").onclick = function(){
    const sendEmail = document.querySelector("#sendEmail").value;
    const alertSendEmail = document.querySelector("#alertSendEmail");

    const emailValid = fntEmailValidate(sendEmail);

    if(!emailValid) {
        alertSendEmail.innerHTML = '<p style="color:red;">Escriba su cuenta de correo.</p>';
        alertSendEmail.style.display = "block";
    } else {
        alertSendEmail.style.display = "none";
        alert("Enviar email a " + sendEmail);
    }
}

document.querySelector("#emailUser").onkeyup = function(){
    const emailUser = document.querySelector("#emailUser").value;
    const alertEmailLogin = document.querySelector("#alertEmailLogin");
    const emailValid = fntEmailValidate(emailUser);

    if(!emailValid) {
        alertEmailLogin.innerHTML = '<p style="color:red;">Escribe una dirección de correo electrónico.</p>';
        alertEmailLogin.style.display = "block";
    } else {
        alertEmailLogin.style.display = "none";
    }
}

document.querySelector("#sendEmail").onkeyup = function(){
    const sendEmail = document.querySelector("#sendEmail").value;
    const alertSendEmail = document.querySelector("#alertSendEmail");
    const emailValid = fntEmailValidate(sendEmail);

    if(!emailValid) {
        alertSendEmail.innerHTML = '<p style="color:red;">Escriba su cuenta de correo.</p>';
        alertSendEmail.style.display = "block";
    } else {
        alertSendEmail.style.display = "none";
    }
}

function layoutIni(){
    const divEmail = document.querySelector("#divEmail");
    divEmail.classList.add("layoutActive");
}
setTimeout(layoutIni, 1000);

function nextLayout(parent, next){
    const divParent = document.querySelector(parent);
    const divNext = document.querySelector(next);
    divParent.classList.remove('layoutLeft','layoutRight','layoutActive');
    divNext.classList.remove('layoutLeft','layoutRight','layoutActive');

    divParent.classList.toggle('layoutLeft');
    divNext.classList.toggle('layoutActive');
}

function prevLayout(parent, prev){
    const divParent = document.querySelector(parent);
    const divPrev = document.querySelector(prev);
    divParent.classList.remove('layoutLeft','layoutRight','layoutActive');
    divPrev.classList.remove('layoutLeft','layoutRight','layoutActive');

    divParent.classList.toggle('layoutRight');
    divPrev.classList.toggle('layoutActive');
}

function fntEmailValidate(email){
    const stringEmail = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    return stringEmail.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");

    if (btnRegister) {
        btnRegister.addEventListener('click', async () => {
            const nameUser = document.getElementById('nameUser').value;
            const emailNewUser = document.getElementById('emailNewUser').value;
            const passNewUser = document.getElementById('passNewUser').value;
            const personType = document.getElementById('persona').value;

            console.log('Datos a enviar:', { username: nameUser, email: emailNewUser, password: passNewUser, personType: personType });

            try {
                const response = await fetch('/api/auth/register', { // URL actualizada
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: nameUser,
                        email: emailNewUser,
                        password: passNewUser,
                        personType: personType
                    }),
                });

                console.log('Respuesta del servidor:', response);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Error al registrar usuario');
                }

                const data = await response.json();
                console.log('Usuario registrado:', data);
                alert('Usuario registrado con éxito');
            } catch (error) {
                console.error('Error en la solicitud fetch:', error.message);
                alert(`Error: ${error.message}`);
            }
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const emailUser = document.getElementById('emailUser').value;
            const passUser = document.getElementById('passUser').value;
            const personType = document.getElementById('persona').value;

            console.log('Datos a enviar:', { email: emailUser, password: passUser, personType: personType });

            try {
                const response = await fetch('/api/auth/login', { // URL actualizada
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailUser,
                        password: passUser,
                        personType: personType
                    }),
                });

                console.log('Respuesta del servidor:', response);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Error al iniciar sesión');
                }

                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);
                alert('Inicio de sesión exitoso');

                switch (personType) {
                    case 'student':
                        window.location.href = './index.html';
                        break;
                    case 'professor':
                        window.location.href = './indexprofesor.html';
                        break;
                    case 'company':
                        window.location.href = './index_empresa.html';
                        break;
                    case 'admin':
                        window.location.href = './admin.html';
                        break;
                    default:
                        console.error('Tipo de persona no reconocido');
                }
            } catch (error) {
                console.error('Error en la solicitud fetch:', error.message);
                alert(`Error: ${error.message}`);
            }
        });
    }
});
