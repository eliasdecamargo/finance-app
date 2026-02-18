import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByIdRespository {
    async execute(userId) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
    }
}
