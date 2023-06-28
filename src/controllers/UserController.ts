import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { hash } from 'bcrypt'

class UserController{
	index(req: Request, res:Response, next: NextFunction){
	// buscar todos
	}

	show(req: Request, res:Response, next: NextFunction){
	// buscar apenas um
	}

	async store(req: Request, res:Response, next: NextFunction){
	// criar
		const {name, password, email} = req.body
		try {
			const findUser = await User.findOne({email})
			console.log('🚀 ~ file: UserController.ts:18 ~ UserController ~ store ~ findUser:', findUser)
			if(findUser){
				throw new Error('User already exists')
			}
			const hashPassword = await hash(password, 10)
			const createUser = await User.create({name, password: hashPassword, email})
			return res.json(createUser)
		} catch (error) {
			next(error)
		}
	}

	update(req: Request, res:Response, next: NextFunction){
	// atualizar
	}

}

export {UserController}
