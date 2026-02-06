import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/getUserByEmail.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/updateUser.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // 1. se o e-mail estier sendo atualikzado, verificar se ele já esta em uso
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
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
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
