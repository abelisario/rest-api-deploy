import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

const app = express()

app.use(express.json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.use('/movies', moviesRouter)

// Listener
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})