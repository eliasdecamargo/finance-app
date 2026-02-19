const sum = (a, b) => {
    return a + b
}

describe('sum function', () => {
    it('should sum two numbers correctly', () => {
        const a = 2
        const b = 2

        const result = sum(a, b)

        expect(result).toBe(4)
    })

    it('should return number', () => {
        const a = 2
        const b = 2

        const result = sum(a, b)

        expect(result).not.toBeUndefined()
        expect(result).not.toBeNull()
    })
})
