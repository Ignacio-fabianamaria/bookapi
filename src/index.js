const express = require('express');
const {v4: uuid} = require('uuid')

const app = express();
const PORT = 3333;
app.use(express.json());

const users = [];
const books = [];

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
});

app.put('/users/:id', (req, res)=>{
    const {id} = req.params;
    console.log("🚀 ~ file: index.js:28 ~ app.put ~ id:", id);

    const {name} = req.body
    const findUser = users.find(user => user.id === id);
    findUser.name = name;

    return res.json(users);
    
})

app.post('/books', (req, res)=>{
    const { name, author, company, description, user_id} = req.body;
    const id = uuid();
    books.push({name, author, company, description, id, user_id})
    return res.status(201).json({message: " Book created "})
});

app.get('/books/:id', (req, res)=> {
    const{id} = req.params;

    const findBookUser = books.filter(book => {
         return book.user_id === id
    })
    return res.status(200).json(findBookUser)
    console.log("🚀 ~ file: index.js:52 ~ app.get ~ findBookUser:", findBookUser)
});

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));