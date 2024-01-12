import "./App.css";
import { Contacts, Navbar, Modal, ContactForm, AddButton } from "./components";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(()=> {
    async function fetchContacts() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")

      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      } else {
        console.log("Something went wrong")
      }
    }

    fetchContacts()
  }, [])

  function deleteContacts(id) {
    const newContacts = contacts.filter((c) => c.id !== id);
    setContacts(newContacts);
  }

  function handleEdit(contact) {
    setShowModal(true)
    setInitialData(contact)
  }

  function handleSaveData(contact) {
    let newContacts = null
    if (contacts.some((c)=> c.id === contact.id)) {
      newContacts = contacts.map((c) => c.id === contact.id ? contact : c);
    } else {
      newContacts = [...contacts, contact]
    }
    setContacts(newContacts);
    setInitialData(null)
    setShowModal(false)
  }
  


  return (
    <div className="max-w-xl mx-auto">
      <Navbar></Navbar>

      {contacts.map((c) => {
        return <Contacts key={c.id} contact={c} deleteContacts={deleteContacts} handleEdit={handleEdit} />
      })}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
      <ContactForm initialData={initialData} handleSaveData={handleSaveData}></ContactForm>
      </Modal>

      {showModal ? null : <AddButton handleClick={handleEdit}></AddButton>}
      


    </div>
  );
}

export default App;
