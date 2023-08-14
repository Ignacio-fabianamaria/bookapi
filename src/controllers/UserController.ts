import { NextFunction, Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
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
			return res.status(201).json(createUser)
		} catch (error) {
			next(error)
			console.log('🚀 ~ file: UserController.ts:23 ~ UserController ~ store ~ error:', error)
		}
	}
	async index(req: Request, res:Response, next: NextFunction){
	// buscar todos
		const {page, size} = req.query

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 2
		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE
		const sizeNumber = size ? parseInt(size as string, 10) : DEFAULT_SIZE
		try {
			const result = await this.userRepository.findAll({page:pageNumber, size:sizeNumber})
			return res.json(result)
		} catch (error) {
			next(error)
		}
	}
	async show(req: Request, res:Response, next: NextFunction){
	// buscar apenas um
		const {id} = req.params
		try {
			const result = await this.userRepository.findById(id)
			if(!result){
				throw new Error('User not found!')
			}
			return res.json(result)
		} catch (error) {
			next(error)
		}
	}
	async update(req: Request, res:Response, next: NextFunction){
	// atualizar
		const {id} = req.params
		const {name, password, oldPassword} = req.body
		try {
			const findUser = await this.userRepository.findById(id)
			if(!findUser){
				throw new Error('User not found')
			}
			if(password && oldPassword && findUser.password){
				const passwordMatch = await compare(oldPassword, findUser.password)
				if(!passwordMatch){
					throw new Error('Password doesn`t match')
				}
				const hashPassword = await hash(password,10)
				await this.userRepository.updatePassword(hashPassword,id)
			}
			if(name){
				await this.userRepository.updateName(name, id)
			}
			return res.json({message : 'User updated successfully'})
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res:Response, next: NextFunction){
		// deletar
		const {id} =req.params
		try {
			const findUser = await this.userRepository.findById(id)
			if(!findUser){
				throw new Error('User not found')
			}
			await this.userRepository.delete(id)
			return res.json({message: 'Successfully deleted user'})
		} catch (error) {
			next(error)
		}
	}
}

export {UserController}
