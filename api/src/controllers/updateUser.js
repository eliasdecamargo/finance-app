import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/index.js'
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from './helpers/index.js'

export class UpdateUserContoller {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updateUser = await updateUserUseCase.execute(userId, params)

            return ok(updateUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
