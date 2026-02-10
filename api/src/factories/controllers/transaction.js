import { CreateTransactionController } from '../../controllers/index.js'

import {
    PostgresGetUserByIdRespository,
    PostgresCreateTransactionRepository,
} from '../../repositories/index.js'
import { CreateTransactionUseCase } from '../../use-cases/transaction/createTransaction'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRespository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
