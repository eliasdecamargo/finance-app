import validator from 'validator'
import { badRequest } from './index.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not valid.',
    })
}

export const requiredFieldIsmissingResponse = (field) => {
    return badRequest({
        message: `The field ${field} is required.`,
    })
}

export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    const safeParams = params ?? {}

    for (const field of requiredFields) {
        const fieldIsMissing = !safeParams[field]
        const fieldIsEmpty =
            checkIfIsString(safeParams[field]) &&
            validator.isEmpty(safeParams[field], { ignore_whitespace: true })

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }

    return {
        ok: true,
        missingField: undefined,
    }
}
