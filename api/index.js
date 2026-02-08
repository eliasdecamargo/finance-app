import 'dotenv/config.js'
import express from 'express'
const app = express()
app.use(express.json())

import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserContoller,
} from './src/controllers/index.js'

import {
    DeleteUserUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from './src/use-cases/index.js'

import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRespository,
    PostgresUpdateUserRepository,
} from './src/repositories/index.js'

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRespository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(updateUserRepository)

    const updateUserController = new UpdateUserContoller(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserContoller = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserContoller.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
