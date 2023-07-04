import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { hash } from 'bcrypt'
import { UserRepository } from '../repositories/UserRepository'

class UserController{
	private userRepository: UserRepository
	constructor(){
		this.userRepository = new UserRepository()
	}

	async store(req: Request, res:Response, next: NextFunction){
		const {name, password, email} = req.body
		try {
			const findUser = await this.userRepository.findByEmail(email)
			if(findUser){
				throw new Error('User already exists')
			}
			const hashPassword = await hash(password, 10)
			const createUser = await this.userRepository.create({name, password:hashPassword, email })
			return res.json(createUser)
		} catch (error) {
			next(error)
		}
	}
	async index(req: Request, res:Response, next: NextFunction){
	// buscar todos
		try {
			const result = await this.userRepository.findAll()
			return res.json(result)
		} catch (error) {
			next(error)
		}
	}
	show(req: Request, res:Response, next: NextFunction){
	// buscar apenas um
	}
	update(req: Request, res:Response, next: NextFunction){
	// atualizar
	}
}

export {UserController}
