express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// GET /movies?genre=?
// Obtener todas las peliculas o filtrar por por genero
app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// GET /movies/:id
// Obtener pelicula por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  res.json(movie);
})

// POST /movies
// Registrar pelicula
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  };

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

//PATCH /movies/:id
// Actualizar pelicula
app.patch('/movies/:id', (req, res) => {
  
  const result = validatePartialMovie(req.body);

  if( !result.success) {  
    return res.status(400).json({ error: result.error.errors });
  }

  const { id } = req.params
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  
  const updatedMovie = {
    ...movies[index],
    ...result.data
  }
  movies[index] = updatedMovie
  res.json(updatedMovie)
})

//DELETE /movies/:id
// Eliminar pelicula  
app.delete('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { id } = req.params
  const index = movies.findIndex((movie) => movie.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  movies.splice(index, 1)
  res.status(204).json({ error: 'Movie deleted' })
})
app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.sendStatus(200)
})

// Listener
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})