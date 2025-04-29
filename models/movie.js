import movies from '../movies.json' with { type: 'json' }
import { randomUUID } from 'node:crypto'

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    }
    return movies
  }
  
  static async getById ({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const index = movies.findIndex((movie) => movie.id === id)
    if (index === -1) {
      return null
    }
    const deletedMovie = movies[index]
    movies.splice(index, 1)
    return true
  }

  static async update ({ id, input }) {
    const index = movies.findIndex(movie => movie.id === id)
    if (index === -1) {
      return null
    }
    const updatedMovie = {
      ...movies[index],
      ...input
    }
    movies[index] = updatedMovie
    return updatedMovie
  }

}