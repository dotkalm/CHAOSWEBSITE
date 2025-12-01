import { TNewsletterFormData } from '@/types';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribeToNewsletter = async (data: TNewsletterFormData): Promise<string | Error> => {
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to subscribe');
        }

        const responseData = await response.json() as { message: string };
        return responseData.message;
    } catch (err) {
        return Promise.reject(err);
    }
};