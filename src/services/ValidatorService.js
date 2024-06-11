const validatorService = {

    isValidUserName: function (username) {
        if (!username || !username.trim()) {
            return false;
        }
        const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
        return usernamePattern.test(username);
    },

    isValidPassword(password) {
        const passwordPattern = /^[a-zA-Z0-9]{6,30}$/;
        return passwordPattern.test(password);
    },

    isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    },

    isNonBlank(text) {
        if (!text || !text.trim())
            return false;
        return true;
    },

    isValidDateFormat(dateOfBirth) {
        const dateOfBirthPattern = /^(19|20)\d\d[-\/](0[1-9]|1[012])[-\/](0[1-9]|[12][0-9]|3[01])$/;
        if (!dateOfBirth || !dateOfBirth.trim())
            return false;
        if (!dateOfBirthPattern.test(dateOfBirth))
            return false;
        return true;
    },

    isValidDateOfBirthPast(date) {
        return new Date(date) <= new Date();
    },

    isValidPhoneNumber(phoneNumber) {
        const phoneNumberPattern = /^[0-9]{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    },
}
export default validatorService;
