document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myform');
    const table = document.getElementById('table');
    const tbody = document.getElementById('tbody');//initializing variables 

    function displayTable(data) { //Dynamic table generation
        if (!data || Object.values(data).some(value => !value)) {
            table.style.display = 'none';
            return;
        }// If no data or any value in data is falsy, hide the table

        // Clear previous table rows
        tbody.innerHTML = '';

        // Create a new table row for the data
        const row = document.createElement('tr');
        // Iterate over values in data and create a cell for each value
        Object.values(data).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        // Append the row to the table body
        tbody.appendChild(row);

        // Display the table
        table.style.display = 'block';
    }

    // Function to retrieve data from localStorage
    function getDataFromLocalStorage() {
        const name = localStorage.getItem('name');
        const surname = localStorage.getItem('surname');
        const age = localStorage.getItem('age');

        // If all data exists in localStorage, return an object with the data; otherwise, return null
        if (name && surname && age) {
            return { name, surname, age };
        }

        return null;
    }

    // Function to save data to localStorage
    function saveDataToLocalStorage(data) {
        localStorage.setItem('name', data.name);
        localStorage.setItem('surname', data.surname);
        localStorage.setItem('age', data.age);
    }

    // Function to clear localStorage
    function clearLocalStorage() {
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('age');
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Retrieve form input values
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const age = document.getElementById('age').value.trim();

        if (parseInt(age) < 18) { // Age validation
            alert('You must be over 18 years old to get access to the contents of the web-page');
            clearLocalStorage();
            displayTable(null); // Hide table
            return;
        }

        const formData = { name, surname, age };// Construct formData object

        saveDataToLocalStorage(formData);// Save data to localStorage

        displayTable(formData);// Display data in the table

        form.reset();// Reset the form after submission
    });

    const initialData = getDataFromLocalStorage();
    displayTable(initialData);  // Display data from localStorage when the page loads
});
