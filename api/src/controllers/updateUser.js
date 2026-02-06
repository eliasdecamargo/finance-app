import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/updateUser.js'
import { badRequest, ok, serverError } from './helpers.js'
import validator from 'validator'

export class UpdateUserContoller {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided ID is not valid.',
                })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({
                        message: 'Invalid e-mail, Please provide a valid one.',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

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
