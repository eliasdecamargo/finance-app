import { PostgresGetUserByIdRespository } from "../repositories/postgres/getUserById";

export class getUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRespository()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}