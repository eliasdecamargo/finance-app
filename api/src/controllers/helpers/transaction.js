import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmoutIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [1, 2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be a valid currency',
    })
}

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
    })
}
