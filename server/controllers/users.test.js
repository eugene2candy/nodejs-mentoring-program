/* eslint-disable object-curly-newline */
const { create, list, retrieve, update, destroy } = require('./users');
const { createUser, findList, findOne, updateUserById, deleteUserById } = require('../services/users');

jest.mock('../services/users.js', () => ({
    createUser: jest.fn(),
    findList: jest.fn(),
    findOne: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn()
}));

describe('User Controller', () => {
    let mRes;
    beforeEach(() => {
        mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('create - 200', async () => {
        const mReq = { body: { login: 'asdfghjk', password: 'asdfghjk', age: 20 } };
        createUser.mockResolvedValueOnce({ data: 'fake data' });
        await create(mReq, mRes);
        expect(createUser).toBeCalledWith({ login: 'asdfghjk', password: 'asdfghjk', age: 20 });
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('create - 400', async () => {
        const mReq = { body: { login: 'asdfghjk', password: 'asdfghjk' } };
        const mError = new Error('error');
        createUser.mockImplementationOnce(() => {
            throw mError;
        });
        await create(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('list 200', async () => {
        const mReq = { query: { login: 'asdfghjk', limit: 3 } };
        findList.mockResolvedValueOnce({ data: 'fake data' });
        await list(mReq, mRes);
        expect(findList).toBeCalledWith('asdfghjk', 3);
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('list - 400', async () => {
        const mReq = { query: { login: 'asdfghjk', limit: 3 } };
        const mError = new Error('error');
        findList.mockImplementationOnce(() => {
            throw mError;
        });
        await list(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('list - 404', async () => {
        const mReq = { query: { login: 'asdfghjk', limit: 3 } };
        findList.mockImplementationOnce(() => null);
        await list(mReq, mRes);
        expect(findList).toBeCalledWith('asdfghjk', 3);
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });

    test('retrieve 200', async () => {
        const mReq = { params: { id: '123' } };
        findOne.mockResolvedValueOnce({ data: 'fake data' });
        await retrieve(mReq, mRes);
        expect(findOne).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('retrieve - 400', async () => {
        const mReq = { params: { id: '123' } };
        const mError = new Error('error');
        findOne.mockImplementationOnce(() => {
            throw mError;
        });
        await retrieve(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('retrieve - 404', async () => {
        const mReq = { params: { id: '123' } };
        findOne.mockImplementationOnce(() => null);
        await retrieve(mReq, mRes);
        expect(findOne).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });

    test('update - id missing 400', async () => {
        const mReq = { params: {}, body: { password: 'asdfghjk' } };
        await update(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('Id is missing');
    });

    test('update 200', async () => {
        const mReq = { params: { id: '123' }, body: { password: 'asdfghjk' } };
        updateUserById.mockResolvedValueOnce({ data: 'fake data' });
        await update(mReq, mRes);
        expect(updateUserById).toBeCalledWith('123', { password: 'asdfghjk' });
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('update - 400', async () => {
        const mReq = { params: { id: '123' }, body: { password: 'asdfghjk' } };
        const mError = new Error('error');
        updateUserById.mockImplementationOnce(() => {
            throw mError;
        });
        await update(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('update - 404', async () => {
        const mReq = { params: { id: '123' }, body: { password: 'asdfghjk' } };
        updateUserById.mockImplementationOnce(() => null);
        await update(mReq, mRes);
        expect(updateUserById).toBeCalledWith('123', { password: 'asdfghjk' });
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });

    test('destroy - id missing 400', async () => {
        const mReq = { params: {} };
        await destroy(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('Id is missing');
    });

    test('destroy 200', async () => {
        const mReq = { params: { id: '123' } };
        deleteUserById.mockResolvedValueOnce({ data: 'fake data' });
        await destroy(mReq, mRes);
        expect(deleteUserById).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('destroy - 400', async () => {
        const mReq = { params: { id: '123' } };
        const mError = new Error('error');
        deleteUserById.mockImplementationOnce(() => {
            throw mError;
        });
        await destroy(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('destroy - 404', async () => {
        const mReq = { params: { id: '123' } };
        deleteUserById.mockImplementationOnce(() => null);
        await destroy(mReq, mRes);
        expect(deleteUserById).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });
});
