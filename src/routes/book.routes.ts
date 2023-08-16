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
	/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create book
 *     description: Cadastrar um novo livro
 *     parameters:
 *       - in: header
 *         name: email
 *         description: Email do usuário autenticado
 *         example: bb@teste.com
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: book
 *         description: Book object
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             company:
 *               type: string
 *             read:
 *               type: boolean
 *             rate:
 *               type: number
 *           example:
 *             name: Death on the Nile
 *             author: Agatha Christie
 *             description: Is a work of detective fiction
 *             company: Harper Paperbacks
 *             read: true
 *             rate: 5
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 author:
 *                   type: string
 *                   company: string
 *                 read:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 rate:
 *                   type: number
 *                 user_id:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 __v:
 *                   type: number
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

	/**
 * @swagger
 * /books:
 *   get:
 *     summary: Create book
 *     description: Cadastrar um novo livro
 *     parameters:
 *       - in: header
 *         name: email
 *         description: Email do usuário autenticado
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 author:
 *                   type: string
 *                   company: string
 *                 read:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 rate:
 *                   type: number
 *                 user_id:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 __v:
 *                   type: number
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

	/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book
 *     description: Atualiza dados de um livro cadastrado
 *     parameters:
 *       - in: header
 *         name: email
 *         description: Email do usuário autenticado
 *         example: bb@teste.com
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: ID do book a ser obtido
 *         required: true
 *         example: 64db90a955312da0813bf3fb
 *       - in: body
 *         name: book
 *         description: Book object
 *         schema:
 *           type: object
 *           properties:
 *             rate:
 *               type: number
 *           example:
 *             rate: 5
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

	/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book
 *     description: Exclui um livro cadastrado
 *     parameters:
 *       - in: header
 *         name: email
 *         description: Email do usuário autenticado
 *         example: bb@teste.com
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: ID do book a ser excluido
 *         required: true
 *         example: 64da81537a72c5dd18e76695
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 author:
 *                   type: string
 *                   company: string
 *                 read:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 rate:
 *                   type: number
 *                 user_id:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 __v:
 *                   type: number
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

	getRoutes():Router {
		this.router.post('/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.booksController.store.bind(this.booksController),
		)

		this.router.get('/', this.authMiddleware.auth.bind(this.authMiddleware),
			this.booksController.index.bind(this.booksController)
		)

		this.router.delete('/:id', this.authMiddleware.auth.bind(this.authMiddleware),
			this.booksController.delete.bind(this.booksController)
		)

		this.router.put('/:id', this.authMiddleware.auth.bind(this.authMiddleware),
			this.booksController.update.bind(this.booksController))

		return this.router
	}
}
export { BookRoutes }
