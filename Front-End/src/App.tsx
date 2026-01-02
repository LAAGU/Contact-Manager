import { useCallback, useState } from "react"
import CreateContact, { type ContactFormData } from "./components/CreateContact"
import ContactList from "./components/ContactList"
import Button from "./components/Button"
import { createContact } from "./lib/api"



function App() {
  const [selectedPage,setSelectedPage] = useState(0)
  const [search,setSearch] = useState("")
  
  const handleOnSubmit = useCallback(async(data: ContactFormData) => {
    await createContact(data)
    setSelectedPage(0)
  },[]) 

  return <div className={`flex flex-col items-center w-screen p-10`}>
    {selectedPage !== 1 && <div className={`w-full max-w-200 p-4 bg-black/10 flex items-center gap-2 rounded`}>
    <input onChange={(e) => setSearch(e.target.value)} placeholder="Filter by Name..." className={`w-full p-2 text-lg text-black outline-0 border border-black rounded`} type="text" />
    <Button onClick={() => setSelectedPage(1)}>
      Add New
    </Button>
  </div>}

  {selectedPage === 1 && <Button onClick={() => setSelectedPage(0)}>
      Go Back
    </Button>}

  {selectedPage === 1 ? <CreateContact onSubmit={handleOnSubmit}/> : <ContactList search={search}/>}
  </div>

}

export default App
