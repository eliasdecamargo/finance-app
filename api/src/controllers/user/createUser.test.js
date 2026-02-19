import { CreateUserController } from '../index.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when creating a user successfully', async () => {
        const createUserUseCaseStub = new CreateUserUseCaseStub()

        const createUserController = new CreateUserController(
            createUserUseCaseStub,
        )

        const httpRequest = {
            body: {
                first_name: 'Elias',
                last_name: 'Camargo',
                email: 'test@gmail.com',
                password: '1234567',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body.first_name).toBe('Elias')
        expect(result.body).not.toBeNull()
    })

    it('should return 400 if first_name is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                last_name: 'Camargo',
                email: 'test@gmail.com',
                password: '1234567',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Elias',
                // last_name: 'Camargo',
                email: 'test@gmail.com',
                password: '1234567',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Elias',
                last_name: 'Camargo',
                email: 'test',
                password: '1234567',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Elias',
                last_name: 'Camargo',
                email: 'test@gmail.com',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is less than 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Elias',
                last_name: 'Camargo',
                email: 'test@gmail.com',
                password: '123',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
