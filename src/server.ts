import express from 'express'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.urlencoded({extended: true}))/*configura o Express para analisar dados de formulários enviados por requisições POST.*/
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
