import { Router } from "express"
import { validatePartialMovie } from '../schemas/movies.js'

import { MovieModel } from "../models/movie.js"
import { MovieController } from "../controllers/movies.js"
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.options('/:id', MovieController.options)

