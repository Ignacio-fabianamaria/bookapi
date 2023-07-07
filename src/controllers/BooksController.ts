import { NextFunction, Request, Response, } from 'express'
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
		try {
			const readVerify = read ? true : false
			const dateReadVerify = dateReade ? new Date(dateReade): null
			const findBooksByUser = await this.booksRepository.findByUserId(user_id)
			const filterBooks = findBooksByUser.find((book) =>{
				return (book.name && StringFormatter.formatString(book.name) === StringFormatter.formatString(name))
			})
			if(filterBooks){
				throw new Error('Book already existis')
			}
			if(!readVerify && rate ){
				throw new Error('You can grade only books thai have been read')

			}
			const result = await this.booksRepository.create({
				name,
				author,
				company,
				read: readVerify,
				dateReade: dateReadVerify,
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

class StringFormatter{
	static formatString(str:string){
		str = str.toLowerCase()
		str = str.trimEnd()//remover espaço no final
		str = str.normalize('NFD')//remover acentos
		return str
	}
}
export { BooksController }
