import mongoose from 'mongoose'
// import {v4 as uuid} from 'uuid'

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
})
const User =  mongoose.model('User', userSchema)

const booksSchema = new mongoose.Schema({

	name:String,
	author:String,
	company:String,
	read:Boolean,
	dataRead:Date,
	description:String,
	rate:Number,
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		require:true,
	},
})
const Books = mongoose.model('Books', booksSchema)

export {
	User,
	Books,
}
