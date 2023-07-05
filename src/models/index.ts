import mongoose from 'mongoose'
import {v4 as uuid} from 'uuid'

const userSchema = new mongoose.Schema({
	_id:{
		type:String,
		default: uuid()
	},
	name: String,
	email: String,
	password: String,
})
const User =  mongoose.model('User', userSchema)
export {User}
