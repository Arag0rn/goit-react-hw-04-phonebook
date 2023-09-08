

import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid'
import { H1styled, H2styled} from "./Title.styled";
import { useState } from "react";
import { useEffect } from "react";


export const App =()=>{
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ];
  });
    const [filter, setFilter] = useState('')
  
 

    useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts) )
    }, [contacts]);   

 const addContact = NewContact =>{
  if (contacts.some(
    contact => contact.name.toLowerCase() === NewContact.name.toLowerCase())){
      alert(`${NewContact.name} is already in contacts`)
    return
  } else {
    setContacts(prevState =>
      [...prevState, {
        id: nanoid(), 
        ...NewContact}]  )
      }
 }

 const deleteContact = contactID => {
  setContacts(prevState =>(
    prevState.filter(cont => cont.id !== contactID)
  ))
 }




 const onChangeFilter = newFilter => {
  setFilter (
    newFilter
  );
 }
  

    const searchContact = contacts.filter( cont => cont.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div>
      <H1styled>Phonebook</H1styled>
      <ContactForm  onAdd={addContact} />
    
      <H2styled>Contacts</H2styled>
      <Filter  filter={filter} onChangeFilter={onChangeFilter}/>
      <ContactList  items={searchContact} onDelete={deleteContact}/>
    </div>
  );

}
