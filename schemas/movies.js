import z from 'zod'

const movieSchema = z.object({
  title: z.string().min(1),
  year: z.number().int().min(1888).max(new Date().getFullYear()),
  director: z.string().optional(),
  duration: z.number().int().optional(),
  poster: z.string().url().optional(),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'])
  ),
  rate: z.number().min(0).max(10).optional()
}); 

export function validateMovie(data) {
  return movieSchema.safeParse(data)
}

export function validatePartialMovie(data) {
  return movieSchema.partial().safeParse(data);
}
