/**
 * Artivo Museum - Events & Forms
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ticket Form Validation (Frontend only as requested)
    const ticketForm = document.getElementById('ticketForm');
    
    if (ticketForm) {
        // Prevent default submission handled in HTML for simplicity in this demo, 
        // but we can add extra validation here if needed.
        
        const dateInput = ticketForm.querySelector('input[type="date"]');
        if (dateInput) {
            // Set min date to today
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
});
