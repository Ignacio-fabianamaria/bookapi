const express = require('express');

const app = express();
const PORT = 3333;
app.use(express.json());


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));