import express from 'express';
import 'dotenv/config'
import usersRouter from './routes/users.routes.js'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Health is good' })
})

app.use('/users', usersRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})