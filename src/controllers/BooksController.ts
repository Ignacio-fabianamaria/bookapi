import { NextFunction, Request, Response, request, } from 'express'
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

	async index(req:Request, res:Response, next:NextFunction){
		const {page, size} = req.query
		const { user_id } =  req

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 10

		try {
			const pageNumber = page ? parseInt(page as string) : DEFAULT_PAGE
			const sizeNumber = size ? parseInt(size as string) : DEFAULT_SIZE
			const findBooksByUser = await this.booksRepository.findPaginateByUserId({
				user_id,
				page:pageNumber,
				size: sizeNumber,
			})
			return res.json(findBooksByUser)
		} catch (error) {
			next(error)
		}
	}

	async delete(req:Request, res:Response, next:NextFunction){
		const {id} = req.params
		const {user_id} = req
		try {
			const findById = await this.booksRepository.findById(id, user_id)
			if(findById.length <= 0){
				throw new Error('Book not found!')
			}
			const result = await this.booksRepository.delete(id)
			return res.json(result)

		} catch (error) {
			next(error)
		}
	}

	async update(req:Request, res:Response, next:NextFunction){
		const{rate} = req.body
		const{id} = req.params
		const{user_id} = req
		try {
			const findById = await this.booksRepository.findById(id,user_id)
			if(findById.length <=0){
				throw new Error('Book not found')
			}
			if(!rate){
				throw new Error('Rate not found')
			}
			if(rate < 0 || rate > 5){
				throw new Error('Only rate between 0 and 5')
			}

			const result = await this.booksRepository.update({
				rate,
				read:true,
				dateRead:new Date(),
				id,
			})
			if(result.modifiedCount !== 1){
				throw new Error('Update was not successful')
			}
			return res.json({message: 'Updated successfully!'})

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
