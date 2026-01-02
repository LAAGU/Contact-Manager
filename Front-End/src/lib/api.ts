import type { ContactFormData } from "../components/CreateContact"
const API_URL = import.meta.env.VITE_API_URL



export async function createContact(data: ContactFormData) {
  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Failed to create contact")
  }

  return res.json()
}



export type ContactType = {
  _id: string
  name: string
  email?: string
  phone: string
  message?: string
  createdAt: string
}

export async function getContacts(): Promise<ContactType[]> {
  const res = await fetch(`${API_URL}/contacts`)

  if (!res.ok) {
    console.log("Failed to fetch contacts")
    return []
  }

  return res.json()
}



export async function deleteContact(id: string) {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete contact")
  }

  return res.json()
}