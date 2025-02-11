import {z} from "zod";

export const signupSchema = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6).optional()
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});