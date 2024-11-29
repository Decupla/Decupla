// ToDo: Only one message per field

class Validation {
    inputData = [];
    errors = [];

    constructor(data) {
        this.inputData = data;
    }

    required(field) {
        if( this.inputData[field] === undefined || this.inputData[field] === null || this.inputData[field] === '' ){
            this.addError(field,`${field} is required`);
        }
    }

    string(field) {
        if(typeof(this.inputData[field]) !== "string"){
            this.addError(field,`${field} must be type string`);
        }
    }

    numeric(field) {
        if (isNaN(this.inputData[field]) || this.inputData[field] === null || this.inputData[field] === '' || !isFinite(this.inputData[field])) {
            this.addError(field,`${field} must be numeric`);
        }
    }

    min(value,satisfier){
         return value.length>=satisfier;
    }

    max(value,satisfier){
        return value.length>=satisfier;
    }

    validate (field,fieldRules) {
        const rulesSplit = fieldRules.split('|');
        rulesSplit.forEach(fieldRule => {
            if(typeof this[fieldRule] === "undefined"){
                console.log(fieldRule + ' is not defined');
                return;
            }

            if(fieldRule.includes(':')){
                const ruleSplit = fieldRule.split(':');
                const rule = ruleSplit[0];
                const satisfier = ruleSplit[1];
                this[rule](field,satisfier);
            } else {
                this[fieldRule](field);
            }
        });
    }
    
    addError(field,message) {
        this.errors.push({
            field,
            message
        })
    }

    hasErrors() {
        return this.errors.length > 0;
    }
};


module.exports = Validation;