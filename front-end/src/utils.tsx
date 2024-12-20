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


export const getUserIdFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return null;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);
        return decodedToken.userId; // Adjust based on your token structure
    };