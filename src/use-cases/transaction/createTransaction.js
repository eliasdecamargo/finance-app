import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, PostgresGetUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.PostgresGetUserByIdRepository = PostgresGetUserByIdRepository
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id

        const user = await this.PostgresGetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = uuidv4()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
