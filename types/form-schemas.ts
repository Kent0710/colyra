import { z } from "zod";

export const authFormSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters long"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export const createSpaceFormSchema = z.object({
    name: z
        .string()
        .min(1, "Space name is required")
        .min(3, "Space name must be at least 3 characters long"),
    // Space code that should be in six length unique
    code: z
        .string()
        .min(6, "Space code must be at least 6 characters long")
        .max(6, "Space code must be at most 6 characters long"),
});

export const joinSpaceFormSchema = z.object({
    code: z
        .string()
        .min(6, "Space code must be at least 6 characters long")
        .max(6, "Space code must be at most 6 characters long"),
});

export const uploadResourceLinkFormSchema = z.object({
    link: z.url().min(1, "Link is required"),
    name: z.string().optional(),
});

export const sendMesageFormSchema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
});

export const isEditingAccountDetailsFormSchema = z.object({
    username : z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters long"),
})

export const feedbackFormSchema = z.object({
    feedback: z.string().min(1, "Feedback cannot be empty").max(500, "Feedback must be at most 500 characters long"),
    // another field for highlighting the feature or part of the app for this feedback 
    feature: z.string().optional(),
    sendEmail: z.boolean().optional(),
})

export const searchSpacesFormSchema = z.object({
    query: z.string().min(1, "Search query cannot be empty"),
});