import jwt from 'jsonwebtoken';
import User from "~/server/database/schemas/user";
import Payload from "~/@types/jwtpayload";

const config = useRuntimeConfig().secret

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);

    const accessToken = cookies?.accessToken;
    const refreshToken = cookies?.refreshToken;

    try {
        const accessTokenPayload = jwt.verify(accessToken, config.jwtSecret);
        const user = await User.findOne({_id: (accessTokenPayload as Payload).user_id});
        event.context.user = user
    }
    catch (e) {
        console.log('refreshing')
        // access token invalid, try generate new one using refresh token
        try {
            const refreshTokenPayload = jwt.verify(refreshToken, config.jwtSecret);
            const newAccessToken = jwt.sign({user_id: (refreshTokenPayload as Payload).user_id}, config.jwtSecret);
            setCookie(event, 'accessToken', newAccessToken, {maxAge: 300})
            const user = await User.findOne({_id: (refreshTokenPayload as Payload).user_id});
            event.context.user = user
        }
        catch (e) {
            event.context.user = null;
        }
    }
})