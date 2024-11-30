class Validation {
    inputData = [];
    errors = {};

    constructor(data) {
        this.inputData = data;
    }

    required(field) {
        if (this.inputData[field] === undefined || this.inputData[field] === null || this.inputData[field] === '') {
            this.addError(field, `${field} is required`);
            return false;
        }
        return true
    }

    string(field) {
        if (typeof (this.inputData[field]) !== "string") {
            this.addError(field, `${field} must be type string`);
            return false;
        }
        return true;
    }

    numeric(field) {
        if (isNaN(this.inputData[field]) || this.inputData[field] === null || this.inputData[field] === '' || !isFinite(this.inputData[field])) {
            this.addError(field, `${field} must be numeric`);
            return false;
        }
        return true;
    }

    min(field, satisfier) {
        if (this.inputData[field].length >= satisfier) {
            this.addError(field, `${field} has to be at least ${satisfier} characters long`);
            return false;
        }
        return true;
    }

    max(field, satisfier) {
        if (this.inputData[field].length <= satisfier) {
            this.addError(field, `${field} can be a maximum of ${satisfier} characters long`);
            return false;
        }
        return true;
    }

    email(field) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.inputData[field])) {
            this.addError(field, `${field} must be a valid email`);
            return false;
        }
        return true
    }

    validate(field, fieldRules) {
        const rulesSplit = fieldRules.split('|');
        let valid = true;

        for (let i = 0; i < rulesSplit.length; i++) {
            const fieldRule = rulesSplit[i];
            if (typeof this[fieldRule] === "undefined") {
                console.log(fieldRule + ' is not defined');
                continue;
            }

            if (fieldRule.includes(':')) {
                const ruleSplit = fieldRule.split(':');
                const rule = ruleSplit[0];
                const satisfier = ruleSplit[1];
                valid = this[rule](field, satisfier);
            } else {
                valid = this[fieldRule](field);
            }

            if (!valid) {
                return false;
            }
        }
    }

    addError(field, message) {
        this.errors[field] = message;
    }

    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    getErrors() {
        return this.errors;
    }
};


module.exports = Validation;