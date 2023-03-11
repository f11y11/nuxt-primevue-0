import jwt from 'jsonwebtoken';
import Payload from "~/@types/jwtpayload";

const config = useRuntimeConfig().secret;

export default defineEventHandler((event) => {
    const user = event.context.user
    if (user) {
        return {
            username: user.username,
            discriminator: user.discriminator,
            email: user.email,
            badges: user.badges,
            status: user.status
        }
    }
    return null;
})