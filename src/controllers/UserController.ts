import { NextFunction, Request, Response } from 'express'

class UserController{
	index(req: Request, res:Response, next: NextFunction){
	// buscar todos
	}

	show(req: Request, res:Response, next: NextFunction){
	// buscar apenas um
	}

	store(req: Request, res:Response, next: NextFunction){
	// criar
		const {name, password, email} = req.body
		try {
			const result = ''
		} catch (error) {
			return res.json({error: 'Erro'})
		}
	}

	update(req: Request, res:Response, next: NextFunction){
	// atualizar
	}

}

export {UserController}
