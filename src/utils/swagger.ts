import swaggerJsdoc from 'swagger-jsdoc'

const options:swaggerJsdoc.Options = {
	definition:{
		info:{
			title: 'BookAPI',
			version: '1.0.0',
			contact:{
				name:'Ignácio Fabiana',
			}
		},
	},
	apis:['**/*.ts'],
}
export const SwaggerSpec = swaggerJsdoc(options)
