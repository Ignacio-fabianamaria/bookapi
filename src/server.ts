import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user.routes'

const app: Application = express()
const PORT = 3333
const userRoutes = new UserRoutes().getRoutes

app.use(express.json())
app.use(express.urlencoded({extended: true}))/*configura o Express para analisar dados de formulários enviados por requisições POST.*/
app.use('/', userRoutes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof Error){
		return res.status(400).json({message: err.message})
	}
	return res.status(500).json({ status:500, message: 'Internal server error'})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

// throw new Error("message")

// Arquivo Server.ts vai apenas setar as configurações iniciais e repassar para as rotas
