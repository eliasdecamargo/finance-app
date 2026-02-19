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
})
