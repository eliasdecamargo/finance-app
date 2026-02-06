import { PostgresGetUserByIdRespository } from '../repositories/index.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRespository()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
