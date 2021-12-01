import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));

  function getRandomContact() {
    const random = Math.floor(Math.random() * contactsJSON.length);

    const randomContact = contactsJSON[random];

    setContacts(contacts.concat(randomContact));
  }

  function sortByPopularity() {
    const sortedContacts = contacts.sort((a, b) => b.popularity - a.popularity);
    setContacts([...sortedContacts]);
  }

  function sortByName() {
    const sortedByName = contacts.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setContacts([...sortedByName]);
  }

  function deleteContact(contactId) {
    const filteredContacts = contacts.filter((contact) => {
      return contact._id !== contactId;
    });

    setContacts([...filteredContacts]);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={() => getRandomContact()}>Add Random contact</button>
      <button onClick={() => sortByPopularity()}>Sort by popularity</button>
      <button onClick={() => sortByName()}>Sort by name</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
        {contacts.map((firstContacts) => {
          return (
            <tr>
              <td>
                <img
                  src={firstContacts.pictureUrl}
                  alt="celebImg"
                  width="100px"
                />
              </td>
              <td>{firstContacts.name}</td>
              <td>{firstContacts.popularity.toFixed(2)}</td>
              <td>{firstContacts.wonOscar && <p>🏆</p>}</td>
              <td>{firstContacts.wonEmmy && <p>🏆</p>}</td>
              <td>
                <button onClick={() => deleteContact(firstContacts._id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
