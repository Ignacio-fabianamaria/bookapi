import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user.routes'
import { DbConnection } from './database'
import dotenv from 'dotenv'
import { BookRoutes } from './routes/book.routes'
import swaggerUi from 'swagger-ui-express'
import { SwaggerSpec } from './utils/swagger'
import { SwaggerUI } from 'swagger-ui-dist'


dotenv.config()

const app: Application = express()
const PORT = 3333
const userRoutes = new UserRoutes().getRoutes()
const booksRoutes = new BookRoutes().getRoutes()
const database = new DbConnection

app.use(express.json())
app.use(express.urlencoded({extended: true}))/*configura o Express para analisar dados de formulários enviados por requisições POST.*/
app.use('/user', userRoutes)
app.use('/books', booksRoutes)
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(SwaggerSpec))

const swaggerOptions = {
	customCss: '.swagger-ui .topbar { display: none }', // Opcional: para ocultar a parte superior do Swagger UI
}

app.get('/swagger', (req: Request, res: Response) => {
	const swaggerHTML = swaggerUi.generateHTML(SwaggerSpec, swaggerOptions)
	res.send(swaggerHTML)
})

database.connect()
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof Error){
		return res.status(400).json({message: err.message})
	}
	return res.status(500).json({ status:500, message: 'Internal server error'})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
