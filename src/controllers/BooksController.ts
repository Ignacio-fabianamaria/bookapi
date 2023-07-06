import { NextFunction, Request, Response, request } from 'express'
import { BooksRepository } from '../repositories/BooksRepository'

class BooksController {
	private booksRepository: BooksRepository
	constructor(){
		this.booksRepository = new BooksRepository()
	}
	async store(req:Request, res:Response, next:NextFunction){
		// create
		const {name, author, company, read, dateReade, description, rate} = req.body
		const {user_id} = request
		try {
		} catch (error) {
			next(error)
		}
	}
}
export { BooksController }
