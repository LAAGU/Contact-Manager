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
  
  
  if (loading) return <div className={`flex flex-col w-full items-center`}>
    <div className={`mt-2 text-lg`}>Fetching Contacts...</div>

      <div className="max-w-[80%] mt-5 text-lg text-yellow-200 bg-black/80 p-2 rounded font-mono">
  The backend is hosted on a free Render service and may take up to 30–60 seconds
  to respond on the first request after inactivity. Please wait a moment.
</div>
  </div>
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
