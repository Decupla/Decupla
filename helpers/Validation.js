class Validation {
    inputData = [];
    errors = [];

    constructor(data) {
        this.inputData = data;
    }

    required(field) {
        if( this.inputData[field] === undefined || this.inputData[field] === null || this.inputData[field] === '' ){
            this.errors.push(`${field} is required`);
        }
    }
    string(field) {
        if(typeof(this.inputData[field]) !== "string"){
            this.errors.push(`${field} must be type string`);
        }
    }
    // minLength(value,satisfier){
    //      return value.length>=satisfier;
    // }
    validate (field,fieldRules) {
        const rulesSplit = fieldRules.split('|');
        rulesSplit.forEach(fieldRule => {
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
    
    hasErrors() {
        return this.errors.length > 0;
    }
};


module.exports = Validation;