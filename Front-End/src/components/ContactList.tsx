import { useCallback, useEffect, useState } from "react"
import Contact from "./Contact"
import { getContacts, type ContactType } from "../lib/api"



export default function ContactList({search}: {search: string}) {
  const [loading,setLoading] =  useState(false)

  const [contacts,setContacts] = useState<ContactType[]>([])

  const fetchContacts = useCallback(async() => {
    setLoading(true)
    const data: ContactType[] = await getContacts()
    setContacts(data)
    setLoading(false) 
  },[])

  useEffect(() => { 
    function fn() {
      fetchContacts()
    }
    fn()
  },[fetchContacts])
  
  
  if (loading) return <div className={`mt-2 text-lg`}>Fetching Contacts...</div>
  if (!loading && contacts.length === 0) return <div className={`mt-2 text-lg text-red-500`}>No Contacts Found !</div>

  return (
    <div className={`w-full max-w-200 p-4 flex flex-col max-h-full overflow-y-auto`}>
        {contacts?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        .map((data) => {
            return <Contact refetch={fetchContacts} key={data._id} data={data}/>
        })}
    </div>
  )
}
