import { MovieModel } from '../models/movie.js'

export class MovieController {

  static async getAll (req, res) {
      res.header('Access-Control-Allow-Origin', '*')
      const { genre } = req.query
      const movies = await MovieModel.getAll({ genre })
      res.json(movies)
  }
    
  static async getById (req, res) {
      const { id } = req.params
      const movie = await MovieModel.getById({ id })
      if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
      }
      res.json(movie)
  }
    
  static async create (req, res) {
      const result = validateMovie(req.body)
  
      if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
      }
  
      const newMovie = await MovieModel.create({ input: result.data })
      res.status(201).json(newMovie)
  }
    
  static async update (req, res) {
      const result = validatePartialMovie(req.body)
  
      if (!result.success) {
      return res.status(400).json({ error: result.error.errors })
      }
  
      const { id } = req.params
      const updatedMovie = await MovieModel.update({ id, input: result.data })
      if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
      }
  
      res.json(updatedMovie)
  }
   
  static async delete (req, res) {
      res.header('Access-Control-Allow-Origin', '*')
      const { id } = req.params
      const deletedMovie = await MovieModel.delete({ id })
      if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
      }
      
      return res.status(204).send()
  }

  static async options (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.sendStatus(200)
  }
}