import {JwtPayload} from "jsonwebtoken";

export default interface Payload extends JwtPayload {
    user_id: string
}