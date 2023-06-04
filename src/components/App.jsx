import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { Section, Title, Container } from './App.styled';

import Form from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';

export class App extends Component {
  // початковий стан
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  // створення нового контакта
  addNewContact = data => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), ...data };

    // console.log({ ...newContact });
    // console.log({ ...contacts });

    contacts.some(({ name, id }) => name === data.name || id === data.id)
      ? Notify.info(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
    // (`${data.name} is added to contacts`);
  };
  //видалення контакта
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Container>
          <Title>Phonebook</Title>
          <Section>
            <Form addNewContact={this.addNewContact} />
          </Section>

          <Title>Contacts</Title>
          <Section>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactsList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </Section>
        </Container>
      </>
    );
  }
}
