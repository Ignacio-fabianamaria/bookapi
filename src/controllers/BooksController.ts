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
		const {user_id} = req
		console.log('🚀 ~ file: BooksController.ts:13 ~ BooksController ~ store ~ d:', user_id)
		try {
			const result = await this.booksRepository.create({
				name,
				author,
				company,
				read,
				dateReade,
				description,
				rate,
				user_id,
			})
			return res.status(201).json(result)
		} catch (error) {
			next(error)
		}
	}
}
export { BooksController }
