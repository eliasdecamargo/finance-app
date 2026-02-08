import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserUseCase {
    constructor(postgresUpdateUserRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
    }

    async execute(userId, updateUserParams) {
        // 1. se o e-mail estier sendo atualikzado, verificar se ele já esta em uso
        if (updateUserParams.email) {

            const userWithProvidedEmail =
                await this.postgresUpdateUserRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        // 2. se a senha estiver sendo atualizada, criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // 3. chamar o repository para atualizar o usuário

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
