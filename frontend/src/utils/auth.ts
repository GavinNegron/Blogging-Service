import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * User Login
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{ success: boolean; session?: any; message?: string }>}
 */
export const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
        return { success: true, session: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || "Login failed.",
        };
    }
};

/**
 * User Registration
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} name - User's name
 * @returns {Promise<{ success: boolean; message?: string }>}
 */
export const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, { email, password, name });
        return { success: true, message: response.data.message };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || "Registration failed.",
        };
    }
};

/**
 * Get Current Session
 * @param {string} token - Authentication token
 * @returns {Promise<{ success: boolean; session?: any; message?: string }>}
 */
export const getSession = async () => {
    const response = await axios.get(`http://localhost:5000/api/auth/session`);
    return { success: true, message: response.data.message };
};