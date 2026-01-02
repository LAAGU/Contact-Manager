import { useState } from "react"
import type {ChangeEvent, FormEvent} from "react"
import Button from "./Button"

export type ContactFormData = {
  name: string
  email: string
  phone: string
  message: string
}

type Props = {
  onSubmit: (data: ContactFormData) => void
}

export default function CreateContact({ onSubmit }: Props) {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validate = (values: ContactFormData) => {
    const newErrors: Partial<ContactFormData> = {}

    if (!values.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    if (values.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email)) {
        newErrors.email = "Invalid email address"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    validate(updated)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate(form)) return

    onSubmit(form)
    setForm({ name: "", email: "", phone: "", message: "" })
    setErrors({})
  }

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    Object.keys(errors).length === 0

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-200 w-full mx-auto p-6 border rounded-lg bg-white space-y-4 mt-2"
    >
      <h2 className="text-xl font-semibold text-center">
        Add Contact
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          Name *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Phone *
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 min-h-20 focus:outline-none focus:ring"
        />
      </div>

      <Button
        className={`w-full`}
        disabled={!isValid}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
