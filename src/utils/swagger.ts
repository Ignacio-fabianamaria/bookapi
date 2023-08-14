import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
	definition: {
		info: {
			title: 'BookAPI',
			description: 'A BOOKAPI é uma API de gerenciamento de livros, que permite cadastrar usuários, cadastrar informações sobre livros, realizar a listagem dos livros cadastrados, atualizar informações dos usuários e realizar a exclusão de livros e usuários',
			version: '1.0.0',
			contact: {
				name: 'Suporte',
				email: 'faby.tbe@gmail.com'
			}
		},
	},
	apis: ['**/*.ts'],
}
export const SwaggerSpec = swaggerJsdoc(options)
