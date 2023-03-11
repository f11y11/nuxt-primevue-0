import User from '../../../database/schemas/user'
import age from "~/utils/ageCalculator";
import generateDiscriminator from "~/utils/discriminatorGen";
import bcrypt from 'bcrypt';

const REQUIRED_FIELDS = [
    "email",
    "username",
    "password",
    "passwordConfirm",
    "birthdate",
    "legalConfirmation"
]

const validateUsername = (username: string): boolean => {
    if (username.length >= 3) {
        return true
    }

    return false
}

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    if (!REQUIRED_FIELDS.every(field => data[field] != null && data[field] != "")) return createError({statusCode: 400, message: 'Please fill all the required fields'})
    const {email, username, password, passwordConfirm, birthdate, legalConfirmation} = data;
    if (password !== passwordConfirm) return createError({statusCode: 400, message: 'Passwords don\'t match'})
    if (age(new Date(birthdate)) < 13) return createError({statusCode: 403, message: 'You must be at least 13 years old to register'})
    if (!legalConfirmation) return createError({statusCode: 403, message: 'You must accept our Terms of Service and Privacy Policy to be able to register'})
    const user = await User.findOne({email})
    if (user) {return createError({statusCode: 403, message: 'This email is in use'})}
    if (!validateUsername(username)) return createError({statusCode: 403, message: 'Username validation failed'})

    /**
    Checks that are done here:
     - Check if all the required fields are filled
     - Check if passwords match
     - Check if user is older than 13
     - Check if user has accepted site policies
     - Check if email is in use
     - Check if username is acceptable
     - Check if there are not too many users with the same username
    */

    try {
        const discriminator = await generateDiscriminator(username);

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                discriminator
            })

            if (user) {
                return {username, discriminator}
            }
            else {
                return await createError({statusCode: 500, message: 'An error occured. Please try again later.'})
            }
        }
        catch (err) {
            return createError({statusCode: 500, message: 'An error occured. Please try again later.'})
        }
    }
    catch {
        return createError({statusCode: 403, message: 'There are too many users with this username'})
    }
})