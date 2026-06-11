let contacts = [];

function addContact() {

    const contact = {
        id: Date.now(),
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

    contacts.push(contact);

    displayContacts();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("street").value = "";
    document.getElementById("state").value = "";
    document.getElementById("postcode").value = "";
    document.getElementById("description").value = "";
}

function displayContacts(contactArray = contacts) {

    const contactList =
        document.getElementById("contactList");

    contactList.innerHTML = "";

    contactArray.forEach(contact => {

        contactList.innerHTML += `
            <div class="card">
                <h3>${contact.name}</h3>
                <p>Phone: ${contact.phone}</p>
                <p>Email: ${contact.email}</p>
                <p>
                    ${contact.address.street},
                    ${contact.address.state},
                    ${contact.address.postcode}
                </p>
                <p>${contact.description}</p>

                <button onclick="deleteContact(${contact.id})">
                    Delete
                </button>
            </div>
        `;
    });
}

function searchContact() {

    const keyword =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(keyword)
    );

    displayContacts(filtered);
}

function deleteContact(id) {

    contacts = contacts.filter(
        contact => contact.id !== id
    );

    displayContacts();
}