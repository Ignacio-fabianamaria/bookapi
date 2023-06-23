const express = require('express');
const {v4: uuid} = require('uuid')

const app = express();
const PORT = 3333;
app.use(express.json());

const users = []

app.post('/users', (req, res)=>{
const {name, email} = req.body;
const id = uuid();

const emailAlreadyExists = users.some((user)=> user.email === email)
if(emailAlreadyExists){
    return res.status(400).json({message: "User Already exists"})
}

users.push({name,email,id});
return res.status(201).json({message: "User created"})
});

app.get('/users', (req, res)=> {
    return res.status(200).json(users)
})

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));