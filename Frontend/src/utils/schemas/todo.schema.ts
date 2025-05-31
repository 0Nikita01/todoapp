
import {z} from 'zod';
import DOMPurify from 'dompurify';

const sanitize = (value: string) => DOMPurify.sanitize(value.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
});

export const todoSchema = z.object({
    title: z
        .string()
        // .transform((val) => sanitize(val))
        .refine((val) => val.length > 0, { message: "title обязателен" })
        .refine((val) => val.length < 100, { message: "Текст задачи слишком большой" })
});

export type TodoInput = z.infer<typeof todoSchema>;