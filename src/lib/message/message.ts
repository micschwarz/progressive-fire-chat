import type { User } from "../user/user";

export interface Message {
    user: User;
    content: string;
    createdAt: Date;
}
