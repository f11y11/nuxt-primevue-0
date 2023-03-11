import User from "~/server/database/schemas/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const REQUIRED_FIELDS = [
    "email",
    "password"
]

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    if (!REQUIRED_FIELDS.every(field => data[field] != null && data[field] != "")) return createError({statusCode: 400, message: 'Please fill all the required fields'})
    const {email, password} = data;

    return await User.findOne({email}).then(async (user) => {
        if (await bcrypt.compare(password, user!.password)) {

            const accessToken = jwt.sign({
                user_id: user!._id,
            }, config.secret.jwtSecret, {
                expiresIn: '5m'
            });

            const refreshToken = jwt.sign({
                user_id: user!._id,
                /* TODO: store device information for more advanced revoking features */
            }, config.secret.jwtSecret, {
                expiresIn: '7d'
            })

            setCookie(event, 'accessToken', accessToken, {maxAge: 300});
            setCookie(event, 'refreshToken', refreshToken, {maxAge: 604800});

            return {
                _id: user!._id,
                email: user!.email,
                username: user!.username,
                discriminator: user!.discriminator
            }

        }
        else {
            return createError({message: 'Incorrect email or password', statusCode: 401})
        }
    }).catch(() => {
        return createError({message: 'Incorrect email or password', statusCode: 401})
    })

})