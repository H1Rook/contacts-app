import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch contacts');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Contacts List</h1>
      {loading && <p>Loading contacts...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="contact-card"
            onMouseEnter={() => setHoveredContact(contact.id)}
            onMouseLeave={() => setHoveredContact(null)}
          >
            <h2>{contact.name}</h2>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Company:</strong> {contact.company.name}
            </p>
            {hoveredContact === contact.id && (
              <div className="hover-details">
                <p>
                  <strong>Username:</strong> {contact.username}
                </p>
                <p>
                  <strong>Website:</strong> {contact.website}
                </p>
                <p>
                  <strong>Address:</strong> {contact.address.suite}, {contact.address.street}, {contact.address.city}
                </p>
              </div>
            )}
            <div className="button-container">
              <button className="action-button">Add</button>
              <button className="action-button">Modify</button>
              <button className="action-button delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
