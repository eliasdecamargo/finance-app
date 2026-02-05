import { PostgresGetUserByIdRespository } from "../repositories/postgres/getUserById.js";

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRespository()

        const user = await getUserByIdRepository.execute(userId)

        return user;
    }
}