import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AddContactForm from './AddContactForm/AddContactForm';
import ContactList from './ContactList/ContactList';
import SearchFilter from './SearchFilter/SearchFilter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');

    if (storageContacts) {
      try {
        const parsedContacts = JSON.parse(storageContacts);
        this.setState({ contacts: parsedContacts });
      } catch (error) {
        this.setState({ contacts: [] });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    
    if (updatedContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  onAddContacts = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isContact = contacts.find(
      contact => contact.name === name.toLowerCase()
    );
    if (isContact) {
      alert(`${name} is already in contact`);
      return contacts;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  onDeleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <AddContactForm onAddContacts={this.onAddContacts} />

        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <SearchFilter filter={filter} onHandleChange={this.changeFilter} />
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onDeleteContacts={this.onDeleteContacts}
          />
        )}
      </div>
    );
  }
}