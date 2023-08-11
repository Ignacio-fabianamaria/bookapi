# :book: BOOKAPI
sistema de controle de leitura e notas de livros

## :rocket: Descrição

A BOOKAPI é uma API de gerenciamento de livros, que permite cadastrar usuários, cadastrar informações sobre livros, realizar a listagem dos livros cadastrados, atualizar informações dos usuários e realizar a exclusão de livros e usuários.

## :key: Requisitos

- Cadastro de usuário
- Cadastro de livro (name, author, company, read, dateRead, Description)
- Listagem de Livros
- Atualizar usuário
- Deletar Livro
- Deletar usuário
- Editar e Inserir notas para os livros

## :clipboard: Regras de negócio

- Não é possível cadastrar um usuário com um email já existente.
- Não é possível cadastrar o mesmo livro mais de uma vez.
- Não é possível deletar uma conta de usuário inexistente.
- Não é possível deletar um livro inexistente.
- Não é possível atribuir nenhuma nota ao livro que ainda não foi lido.
- Não é possível atribuir nota para livro que não foi lido

## MongoDB Atlas Database Configuration

<details>
<summary>Click to expand</summary>

Before running the application, you need to configure a MongoDB Atlas database and obtain the connection URL.

Follow these steps to set up the database:

1. Access [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account or log in if you haven't already.

2. Create a new project on MongoDB Atlas and follow the steps to set up a cluster. Make sure to select the desired options for the region, cluster size, and other configurations.

3. After creating the cluster, go to the "Database Access" section in the MongoDB Atlas dashboard and create a new user with read and write permissions for the database.

4. In the "Network Access" section of MongoDB Atlas, add the IP address of the machine where the application will be running to the whitelist. This will allow the application to connect to the database.

5. In the MongoDB Atlas dashboard, click on "Connect" and select the "Connect your application" option. Copy the provided connection URL.

6. Create a `.env` file in the project root directory.

7. Copy the contents of the `.env.example` file and paste them into the `.env` file.

8. In the `.env` file, replace the value of `DB_URL` with the connection URL you copied in step 5. Make sure to remove the dummy values and replace them with the correct URL.

9. Save and close the `.env` file.

After following these steps, you will be ready to run the application, which will connect to your MongoDB Atlas database.

</details>
