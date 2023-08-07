import { Books } from '../models'


interface ICreateBook {
	name:string,
	author:string,
	company:string,
	read:boolean,
	dateReade:Date | null,
	description:string,
	rate:number,
	user_id:string,
}
interface IBookPaginate {
	user_id:string,
	page:number,
	size:number,
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

	async findByUserId(user_id:string){
		const result = await Books.find({user_id})
		return result
	}

	findPaginateByUserId({user_id, page, size}:IBookPaginate){
		const result = Books.find({user_id}).skip((page-1)*size).limit(size).exec()
		return result
	}

	findById(id:string, user_id:string){
		return Books.find({_id: id, user_id:user_id}).exec
	}

	async delete(id:string){
		const result = await Books.findByIdAndRemove(id)
		return result
	}
}
export { BooksRepository }
