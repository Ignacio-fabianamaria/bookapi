import { NextFunction, Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'

class AuthMiddleware {
	private userRepository: UserRepository
	constructor(){
		this.userRepository = new UserRepository
	}
	async auth(req:Request, res:Response, next:NextFunction){
		const authHeader:string = req.headers.email as string
		if(!authHeader){
			return res.status(401).json({
				code: 'token.missing',
				message: 'Token missing',
			})
		}
		const findUser = await this.userRepository.findByEmail(authHeader)
		if(!findUser){
			return res.status(400).json({
				code: 'token.no_found',
				message: 'Token not found',
			})
		}
		req.user_id = findUser?.id
		return next()
	}
}
export { AuthMiddleware}
