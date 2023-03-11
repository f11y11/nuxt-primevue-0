import {Schema, Document, model} from 'mongoose';

enum UserStatus {
    DEFAULT = 0,
    BANNED = 2
}

enum UserBadge {
    NONE = 0,
    PREMIUM = 2,
    STAFF = 4,
    DEVELOPER = 8
}

interface IUserNote {
    content: string
    iat: number
}

export interface IUser extends Document {
    username: string
    discriminator: string
    email: string
    status: UserStatus
    badges: UserBadge
    notes: IUserNote[]
}

export interface IUserWithPassword extends IUser{
    password: string
}

export const UserNoteSchema = new Schema<IUserNote>({
    content: {type: String, required: true},
    iat: {type: Number, required: true}
})
export const UserSchema = new Schema<IUserWithPassword>({
    username: {type: String, required: true},
    discriminator: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: Number, required: true, default: 0},
    badges: {type: Number, required: true, default: 0},
    notes: {type: [UserNoteSchema], required: true, default: []},
    password: {type: String, required: true}
})

export default model<IUserWithPassword>('User', UserSchema)