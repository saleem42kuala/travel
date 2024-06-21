document.addEventListener('DOMContentLoaded', () => {
    const newSectionForm = document.getElementById('new-section-form');

    newSectionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Add validation logic here (e.g., check if fields are filled)

        // If valid, you could send the data to a server or store it locally
        // For now, let's just log the data to the console
        const formData = new FormData(newSectionForm);
        for (const [key, value] of formData) {
            console.log(`${key}: ${value}`);
        }
    });
});
