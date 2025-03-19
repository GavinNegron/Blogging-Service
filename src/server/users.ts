"use server";

import { auth } from "@/utils/auth";

export const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
        await auth.api.signInEmail({
            body: { email, password }
        });
        return { success: true };
    } catch (error) {
        let errorMessage = "Login failed. Please try again.";

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }

        return { success: false, message: errorMessage };
    }
};

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "gavinnegron@icloud.com",
            password: "Lincoln$4",
            name: 'Gavin'
        }
    })
}