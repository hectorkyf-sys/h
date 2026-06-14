let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let editId = null;

// Save to localStorage
function saveData() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Add or Update Contact
function addContact() {
    const contact = {
        id: editId ? editId : Date.now(),
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: {
            street: document.getElementById("street").value,
            state: document.getElementById("state").value,
            postcode: document.getElementById("postcode").value
        },
        description: document.getElementById("description").value
    };

    if (editId) {
        contacts = contacts.map(c => c.id === editId ? contact : c);
        editId = null;
    } else {
        contacts.push(contact);
    }

    saveData();
    clearForm();
    displayContacts();
}

// Display Contacts
function displayContacts(list = contacts) {
    const container = document.getElementById("contactList");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No contacts found</p>";
        return;
    }

    list.forEach(c => {
        container.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>
            <p>${c.phone}</p>
            <p>${c.email}</p>
            <p>${c.address.street}, ${c.address.state}, ${c.address.postcode}</p>
            <p>${c.description}</p>

            <button onclick="editContact(${c.id})">Edit</button>
            <button onclick="deleteContact(${c.id})">Delete</button>
        </div>
        `;
    });
}

// Search
function searchContact() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(keyword)
    );

    displayContacts(filtered);
}

// Delete
function deleteContact(id) {
    if (!confirm("Delete this contact?")) return;

    contacts = contacts.filter(c => c.id !== id);
    saveData();
    displayContacts();
}

// Edit
function editContact(id) {
    const c = contacts.find(c => c.id === id);

    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;
    document.getElementById("email").value = c.email;
    document.getElementById("street").value = c.address.street;
    document.getElementById("state").value = c.address.state;
    document.getElementById("postcode").value = c.address.postcode;
    document.getElementById("description").value = c.description;

    editId = id;
}

// Clear Form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("street").value = "";
    document.getElementById("state").value = "";
    document.getElementById("postcode").value = "";
    document.getElementById("description").value = "";
}

// Load on start
displayContacts();