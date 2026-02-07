import { PostgresHelper } from '../../database/postgres/helper.js'

export class PostgresDeleteuser {
    async execute(userId) {
        const deletedUser = await PostgresHelper.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [userId],
        )

        return deletedUser[0]
    }
}
