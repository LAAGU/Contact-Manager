import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./db.js"
import contactRoutes from "./routes/contacts.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API running")
})

app.use("/contacts", contactRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
