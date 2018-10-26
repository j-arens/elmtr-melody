module.exports.default = class {
    constructor() {
        this.on = jest.fn();
        this.off= jest.fn();
    }
};
