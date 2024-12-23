const Validation = require('../Validation');

describe('Validation Class', () => {
    let validation;
    let testData;

    beforeEach(() => {
        testData = {
            validName: 'Nils',
            shortName: 'Ni',
            longName: 'abcdefghijklmnopqrstuvwxyz',
            validEmail: 'nils@gmail.com',
            invalidEmail: 'hello world',
            validNumber: 1,
            invalidNumber: 'Test',
        };
        validation = new Validation({});
    });

    describe('Constructor', () => {
        it('should handle no data passed to constructor', () => {
            const validation = new Validation();
            expect(validation.inputData).toEqual([]);
            expect(validation.hasErrors()).toBe(false);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Required Validation', () => {
        it('should add an error if required field is missing', () => {
            validation = new Validation({});
            expect(validation.required('name')).toBe(false);
            expect(validation.getErrors()).toEqual({ name: 'Name is required' });
        });

        it('should pass if required field is present', () => {
            validation = new Validation({ name: testData.validName });
            expect(validation.required('name')).toBe(true);
            expect(validation.hasErrors()).toBe(false);
        });
    });

    describe('String Validation', () => {
        it('should fail if value is not a string', () => {
            validation = new Validation({ name: 123 });
            expect(validation.string('name')).toBe(false);
            expect(validation.getErrors()).toEqual({ name: 'Name must be type string' });
        });

        it('should pass if value is a string', () => {
            validation = new Validation({ name: testData.validName });
            expect(validation.string('name')).toBe(true);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Numeric Validation', () => {
        it('should fail if value is not numeric', () => {
            validation = new Validation({ status: testData.invalidNumber });
            expect(validation.numeric('status')).toBe(false);
            expect(validation.getErrors()).toEqual({ status: 'Status must be numeric' });
        });

        it('should pass if value is numeric', () => {
            validation = new Validation({ status: testData.validNumber });
            expect(validation.numeric('status')).toBe(true);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Min Length Validation', () => {
        it('should fail if string is shorter than minimum length', () => {
            validation = new Validation({ name: testData.shortName });
            expect(validation.min('name', 3)).toBe(false);
            expect(validation.getErrors()).toEqual({ name: 'Name has to be at least 3 characters long' });
        });

        it('should pass if string meets minimum length', () => {
            validation = new Validation({ name: testData.validName });
            expect(validation.min('name', 3)).toBe(true);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Max Length Validation', () => {
        it('should fail if string exceeds maximum length', () => {
            validation = new Validation({ name: testData.longName });
            expect(validation.max('name', 12)).toBe(false);
            expect(validation.getErrors()).toEqual({ name: 'Name can be a maximum of 12 characters long' });
        });

        it('should pass if string is within maximum length', () => {
            validation = new Validation({ name: testData.validName });
            expect(validation.max('name', 12)).toBe(true);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Email Validation', () => {
        it('should fail if email is invalid', () => {
            validation = new Validation({ email: testData.invalidEmail });
            expect(validation.email('email')).toBe(false);
            expect(validation.getErrors()).toEqual({ email: 'Email must be a valid email' });
        });

        it('should pass if email is valid', () => {
            validation = new Validation({ email: testData.validEmail });
            expect(validation.email('email')).toBe(true);
            expect(validation.getErrors()).toEqual({});
        });
    });

    describe('Multiple Rule Validation', () => {
        it('should validate multiple rules with validate()', () => {
            const data = { username: 'ab', email: testData.invalidEmail };
            validation = new Validation(data);

            expect(validation.validate('username', 'required|min:3')).toBe(false);
            expect(validation.validate('email', 'required|email')).toBe(false);
            expect(validation.getErrors()).toEqual({
                username: 'Username has to be at least 3 characters long',
                email: 'Email must be a valid email',
            });
        });
    });

    describe('Utility Methods', () => {
        it('should add errors using addError', () => {
            validation.addError('field', 'Field is invalid');
            expect(validation.hasErrors()).toBe(true);
            expect(validation.getErrors()).toEqual({ field: 'Field is invalid' });
        });

        it('should return false for hasErrors when no errors are present', () => {
            expect(validation.hasErrors()).toBe(false);
        });

        it('should return the correct errors using getErrors', () => {
            validation.addError('field1', 'Field1 is invalid');
            validation.addError('field2', 'Field2 is invalid');
            expect(validation.getErrors()).toEqual({
                field1: 'Field1 is invalid',
                field2: 'Field2 is invalid',
            });
        });

        it('should handle invalid rules in validate()', () => {
            consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            validation = new Validation({ field: 'value' });
            expect(validation.validate('field', 'undefinedRule')).toBe(true);
            expect(validation.hasErrors()).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith('undefinedRule is not defined')
            consoleSpy.mockRestore();
        });

        it('should handle invalid rules with parameter in validate()', () => {
            const data = { field: 'value' };
            const validation = new Validation(data);
        
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        
            const isValid = validation.validate('field', 'unknownRule:5|min:8');
        
            expect(consoleSpy).toHaveBeenCalledWith('unknownRule is not defined');
    
            expect(isValid).toBe(false);
            expect(validation.getErrors()).toEqual({
                field: 'Field has to be at least 8 characters long',
            });
        
            consoleSpy.mockRestore(); 
        });
        
    });
});
