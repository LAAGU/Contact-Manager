import { useCallback } from "react";
import Button from "./Button";
import { deleteContact, type ContactType } from "../lib/api";


export default function Contact({data,refetch}: {data: ContactType,refetch: () => void}) {
  const handleDelete = useCallback(async(id: string) => {
    await deleteContact(id)
    refetch()
  },[refetch])

  return (
    <div className={`w-full flex p-2 border border-black rounded`}>
        <div className={`flex flex-col w-full p-2`}>
            {Object.entries(data).map(([item,value]) => {
                if (item === "_id") return null

                return <div className={`flex gap-2`} key={item}>
                    <div>{item}</div> : <div>{value}</div>
                </div>
            })}
        </div>

        <Button onClick={() => handleDelete(data._id)} danger>
            Delete
        </Button>
    </div>
  )
}
