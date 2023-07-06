import { Books } from '../models'


interface ICreateBook {
	name:string,
	author:string,
	company:string,
	read:boolean,
	dateReade:Date,
	description:string,
	rate:number,
	user_id:string,
}

class BooksRepository {
	async create({name,author,company,read,dateReade,description,rate,user_id}:ICreateBook){
		const result = await Books.create({
			name,
			author,
			company,
			read,
			dateReade,
			description,
			rate,
			user_id
		})
		return result
	}
}
export { BooksRepository }
