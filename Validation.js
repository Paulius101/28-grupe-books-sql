class Validation {

    static isUpperCase(str) {
        return str.toUpperCase()
    }


    static isValidName(name) {
        if (name === undefined ||
            typeof name !== 'string' ||
            name.length < 2 ||
            !Validation.isUpperCase(name[0])) {
            return false;
        }
        return true;
    }






}

module.exports = Validation;