import express from "express"
import Contact from "../models/contact.js"

const router = express.Router()


router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body)
    res.status(201).json(contact)
  } catch (err) {
    res.status(400).json({ error: "Invalid contact data" })
  }
})


router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const deleted = await Contact.findByIdAndDelete(id)
  if (!deleted) {
    return res.status(404).json({ error: "Contact not found" })
  }

  res.json({ message: "Contact deleted" })
})

export default router
