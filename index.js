const express = require("express")
const path = require("path")

const imageRoutes = require("./routes/imageRoutes")
const appRoutes = require("./routes/appRoutes")

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use("/image", imageRoutes)
app.use("/", appRoutes)


app.listen(PORT, () => {
    console.log("Server is running and listens to " + PORT)
})

