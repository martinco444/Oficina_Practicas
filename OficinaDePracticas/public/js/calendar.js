document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: []
    });

    try {
        const res = await fetch('/api/event', {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

        const data = await res.json();
        const events = data.map(event => ({
            title: event.eventname,
            start: event.date,
            description: event.summary
        }));

        calendar.addEventSource(events);
        calendar.render();
    } catch (err) {
        console.error('Error al cargar eventos:', err);
    }
});
