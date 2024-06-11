document.addEventListener('DOMContentLoaded', async function () {
    const editButton = document.getElementById('editButton');
    const inputs = document.querySelectorAll('.edit-mode');
    const spans = document.querySelectorAll('span[id]');



    async function obtenerPerfil() {
        try {
            const res = await fetch('/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const span = document.getElementById(key);
                        const input = document.getElementById(`${key}Input`);
                        if (span) span.textContent = data[key];
                        if (input) input.value = data[key];
                    }
                }
            } else {
                console.error('Error al obtener el perfil:', data.errors);
            }
        } catch (error) {
            console.error('Error en el servidor:', error);
        }
    }

    await obtenerPerfil();

    editButton.addEventListener('click', async function () {
        const isEditMode = editButton.textContent === 'Editar';

        inputs.forEach(input => {
            input.style.display = isEditMode ? 'block' : 'none';
        });

        spans.forEach(span => {
            span.style.display = isEditMode ? 'none' : 'inline';
        });

        if (isEditMode) {
            editButton.textContent = 'Guardar';
        } else {
            const perfilData = {};
            inputs.forEach(input => {
                const id = input.id.replace('Input', '');
                perfilData[id] = input.value;
            });

            try {
                const res = await fetch('/api/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(perfilData)
                });

                const data = await res.json();
                if (res.status === 200) {
                    spans.forEach(span => {
                        const id = span.id;
                        span.textContent = perfilData[id] || '';
                    });
                } else {
                    console.error('Error al actualizar el perfil:', data.errors);
                }
            } catch (error) {
                console.error('Error en el servidor:', error);
            }

            editButton.textContent = 'Editar';
        }
    });

    const imagenPerfil = document.getElementById('imagenPerfil');
    const vistaPrevia = document.getElementById('vistaPrevia');

    imagenPerfil.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                vistaPrevia.setAttribute('src', e.target.result);
                vistaPrevia.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });
});
