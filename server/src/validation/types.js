import {z} from "zod";

export const signupSchema = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6)
});

export const loginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6)
});