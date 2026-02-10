import { userNotFoundResponse } from '../../controllers/index.js'

export class getTransactionsByUserId {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if(!user) {
            return userNotFoundResponse()
        }

        const transactions = await this.getTransactionsByUserIdRepository.execute(params.userId)

        return transactions
    }
}