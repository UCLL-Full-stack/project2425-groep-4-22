// Function to decode JWT token and get the userEmail
export const getUserEmailFromToken = (): string | null => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('Token is missing.');
        return null;
    }

    try {
        // Split the token into parts and decode the payload
        const payloadBase64 = token.split('.')[1]; // The payload is the second part of the JWT
        if (!payloadBase64) {
            console.error('Invalid token format.');
            return null;
        }

        const payloadJson = atob(payloadBase64); // Decode base64 to string
        const payload = JSON.parse(payloadJson); // Parse the JSON string

        // Check if email exists in the payload
        if (payload.email) {
            return payload.email;
        } else {
            console.error('Token does not contain email.');
            return null;
        }
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};