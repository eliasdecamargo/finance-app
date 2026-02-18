import { ZodError } from 'zod'
import { createTransactionSchema } from '../../schemas/transaction.js'
import { created, serverError, badRequest } from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest?.body ?? {}

            await createTransactionSchema.parseAsync(params)

            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: JSON.parse(error.message)[0].message,
                })
            }

            console.error(error)
            return serverError()
        }
    }
}
