document.getElementById('addEventForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const eventname = document.getElementById('eventName').value;
    const professor = document.getElementById('professor').value;
    const reason = document.getElementById('reason').value;
    const members = document.getElementById('members').value;
    const date = document.getElementById('date').value;

    const eventData = {
        eventname,
        professor,
        reason,
        members,
        date
    };

    try {
        const res = await fetch('/api/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(eventData)
        });

        if (res.status === 200) {
            alert('Evento creado con éxito');
            document.getElementById('addEventForm').reset();
        } else {
            const data = await res.json();
            alert(`Error al crear el evento: ${data.errors.map(error => error.msg).join(', ')}`);
        }
    } catch (err) {
        console.error('Error del servidor:', err);
    }
});
