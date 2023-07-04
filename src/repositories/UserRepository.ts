import { User } from '../models'
interface ICreate {
	name:string,
	email:string,
	password:string
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

	async findAll(){
		const result = await User.find()
		return result
	}
}

export {UserRepository}
