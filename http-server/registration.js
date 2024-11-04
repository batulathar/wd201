// Date calculation for setting min and max date attributes on the DOB input
const currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Months are 0-based in JavaScript
let year = currentDate.getFullYear();

// Adding leading zeroes for single-digit day and month values
const formatWithLeadingZero = (value) => (value < 10 ? '0' + value : value);

day = formatWithLeadingZero(day);
month = formatWithLeadingZero(month);

// Defining the max and min date for Date of Birth input (18 to 55 years age range)
const maxAllowedDate = `${year - 18}-${month}-${day}`;
const minAllowedDate = `${year - 55}-${month}-${day}`;

// Setting the min and max date attributes for the Date of Birth input field
const dobInput = document.getElementById("dob");
dobInput.setAttribute("min", minAllowedDate);
dobInput.setAttribute("max", maxAllowedDate);

// Fetching user entries from localStorage or initializing it as an empty array if not found
const storedEntries = localStorage.getItem("user-data");
let userRecords = storedEntries ? JSON.parse(storedEntries) : [];

// Function to render user entries as a table
const renderEntries = () => {
    const savedRecords = localStorage.getItem("user-data");
    let tableRows = "";
    
    if (savedRecords) {
        const parsedRecords = JSON.parse(savedRecords);
        tableRows = parsedRecords
            .map((record) => {
                const userName = `<td class='border px-4 py-2'>${record.name}</td>`;
                const userEmail = `<td class='border px-4 py-2'>${record.email}</td>`;
                const userPassword = `<td class='border px-4 py-2'>${record.password}</td>`;
                const userDob = `<td class='border px-4 py-2'>${record.dob}</td>`;
                const termsAccepted = `<td class='border px-4 py-2'>${record.termsAccepted}</td>`;
                return `<tr>${userName} ${userEmail} ${userPassword} ${userDob} ${termsAccepted}</tr>`;
            })
            .join("");
    }

    const tableStructure = `<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
        </tr>${tableRows}</table>`;

    const userEntriesContainer = document.getElementById("user-entries");
    userEntriesContainer.innerHTML = tableStructure;
};

// Function to save form data to localStorage
const handleFormSubmission = (event) => {
    event.preventDefault();
    
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    const dobInput = document.getElementById("dob").value;
    const isTermsAccepted = document.getElementById("acceptTerms").checked;

    const newEntry = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        dob: dobInput,
        termsAccepted: isTermsAccepted,
    };

    userRecords.push(newEntry);
    localStorage.setItem("user-data", JSON.stringify(userRecords));

    renderEntries(); // Update the table after adding the new entry
};

// Adding event listener for form submission
const userFormElement = document.getElementById("user_form");
userFormElement.addEventListener("submit", handleFormSubmission, true);

// Initial render of user entries when the page loads
renderEntries();