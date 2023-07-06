import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'
import { BooksController } from '../controllers/BooksController'

class BookRoutes {
	private router: Router
	private authMiddleware: AuthMiddleware
	private booksController: BooksController
	constructor(){
		this.router = Router()
		this.authMiddleware = new AuthMiddleware
		this.booksController = new BooksController
	}
	getRoutes():Router {
		this.router.post('/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.booksController.store.bind(this.booksController),
		)
		return this.router
	}
}
export { BookRoutes }
