"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const store = new users_1.UserModel;
describe('test', () => {
    // it('should include index method', () => {
    //     expect(store.index).toBeDefined();
    // });
    it('should index method return same array of objects from database', async () => {
        const result = await store.index();
        expect(result).toBeDefined([]);
    });
});
