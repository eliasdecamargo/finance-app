import 'dotenv/config.js'
import express from 'express'
const app = express()
app.use(express.json())

import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/getUserById.js'
import { UpdateUserContoller } from './src/controllers/updateUser.js'

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserContoller()

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
