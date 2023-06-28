import mongoose from 'mongoose'

class DbConnection{
	async connect(){
		try {
			const dbUrl = process.env.DB_URL || ''// Atribui uma string vazia caso DB_URL seja undefined
			await	mongoose.connect(dbUrl)
			console.log('connect to database')
		} catch (error) {
			console.log('Error to connect database')
		}
	}
}

export {DbConnection}
