import path from "path";
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    salt_round: process.env.SALT_ROUND,
    access_token: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiredIn: process.env.ACCESS_TOKEN_EXPIRED
    }


}
