class Typer {
    static validate(types, subject) {
        const keys = Object.keys(types);
        
        for (let i = 0; i < keys.length; i++) {
            const actual = typeof subject[keys[i]];
            const expected = types[keys[i]];
            
            if (actual !== expected) {
                throw new Error(`Typer: Expecting property '${keys[i]}' to be of type '${expected}' but got '${actual}'`);
            }
        }
    }
}

module.exports = Typer;