document.getElementById('addEventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Recoger los datos del formulario
    const eventName = document.getElementById('eventName').value;
    const professor = document.getElementById('professor').value;
    const reason = document.getElementById('reason').value;
    const members = document.getElementById('members').value;
    const date = document.getElementById('date').value;

    // Crear un objeto de evento
    const newEvent = {
        title: eventName,
        professor: professor,
        reason: reason,
        members: members.split(',').map(email => email.trim()),
        start: date
    };

    // Guardar el evento en un archivo JSON
    fetch('./php/save_event.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Evento guardado exitosamente');
            // Redirigir o actualizar la página si es necesario
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error al guardar el evento:', error);
    });
});
