import { ZodError } from 'zod'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateUserContoller {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            await updateUserSchema.parseAsync(params)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: JSON.parse(error.message)[0].message,
                })
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
