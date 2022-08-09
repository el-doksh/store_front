import {UserModel, User} from '../users';

const store = new UserModel;

describe('test', () => {
    // it('should include index method', () => {
    //     expect(store.index).toBeDefined();
    // });
    
    it('should index method return same array of objects from database', async () => {
        const result = await store.index();
        expect(result).toBeDefined([]);
    });
});