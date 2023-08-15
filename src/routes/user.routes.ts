import { Router } from 'express'
import { UserController } from '../controllers/UserController'


class UserRoutes{
	private router: Router
	private userController: UserController
	constructor(){
		this.router = Router()
		this.userController = new UserController()
	}
	/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create user
 *     description: Cadastrar um novo usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             name: Anne Mars
 *             email: am@test.com
 *             password: '123456'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   description: username
 *                 email:
 *                   type: string
 *                 password:
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
 * /user:
 *   get:
 *     summary: Get users
 *     description: Renorta os usuários cadastrados
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   description: username
 *                 email:
 *                   type: string
 *                 password:
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
 * /user/{id}:
 *   get:
 *     summary: Create user
 *     description: Cadastrar um novo usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do user a ser obtido
 *         example: 64d6770c1e30b936abb02705
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
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   description: username
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 __v:
 *                   type: number
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */


	getRoutes(){

		this.router.post('/',this.userController.store.bind(this.userController))
		this.router.get('/',this.userController.index.bind(this.userController))
		this.router.get('/:id',this.userController.show.bind(this.userController))
		this.router.put('/:id',this.userController.update.bind(this.userController))
		this.router.delete('/:id',this.userController.delete.bind(this.userController))

		return this.router
	}
}

export {UserRoutes}
