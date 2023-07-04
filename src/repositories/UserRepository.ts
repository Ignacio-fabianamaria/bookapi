import { User } from '../models'
interface ICreate {
	name:string,
	email:string,
	password:string
}
interface IPage {
	page:number,
	size:number
}

//Responsabilidade de se comunicar com o banco de dados
class UserRepository{
	async findByEmail(email:string){
		const result = await User.findOne({email})
		return result
	}

	async create({name, password,email}: ICreate){
		const result = await User.create({
			name,
			password,
			email
		})
		return result
	}

	async findAll({page, size}: IPage){
		const result = await User.find().skip((page-1)* size).limit(size).exec()
		return result
	}
}

export {UserRepository}
