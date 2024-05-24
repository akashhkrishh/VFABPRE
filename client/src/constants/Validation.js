// Validation.js

// Function to validate email format
export function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password strength (at least 8 characters)
export function validatePassword(password) {
    return password.length >= 8;
}

export function validatePhone(phone) {

    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

export function validateCity(city) {
    return city.trim().length >=2 ;
}

export function validateName(name) {
    return name.trim().length >=2 ;
}

export function validateKeyword(name) {
    return name.trim().length >=2 ;
}

export function validateAccessPolicy(policy) {
    return (policy == 'read' || policy == 'download' );
}
