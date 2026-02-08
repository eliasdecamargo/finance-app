import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, postgresCreateUserRepository) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // gerar ID do usuário
        const userId = uuidv4()

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório
        const createdUser =
            await this.postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
