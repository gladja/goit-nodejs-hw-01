const fs = require('node:fs/promises');
const path = require('node:path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const data = await listContacts();
    const result = data.find(i => i.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex(i => i.id === contactId);
    if(index === -1) return null;
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = {name, email, phone, id: nanoid()}
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}