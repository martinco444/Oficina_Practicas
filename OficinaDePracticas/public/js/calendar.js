document.addEventListener('DOMContentLoaded', async function() {
    const calendarEl = document.getElementById('calendar');
    const email = 'gissel@gmail.com'; // Aquí usarías el correo del usuario autenticado

    let events = [];

    try {
        const res = await fetch(`/api/event/user/${email}`);
        events = await res.json();
    } catch (err) {
        console.error('Error al cargar los eventos:', err);
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: events.map(event => ({
            title: event.eventname,
            start: event.date,
            description: event.reason,
            professor: event.professor
        }))
    });

    calendar.render();
});
