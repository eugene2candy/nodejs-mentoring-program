/* eslint-disable object-curly-newline */
const { create, list, userGroupList, retrieve, update, addUser, destroy } = require('./groups');
const { createGroup, findList, findUserGroupList, findOne, updateGroupById, addUsersToGroup, deleteGroupById } = require('../services/groups');

jest.mock('../services/groups.js', () => ({
    createGroup: jest.fn(),
    findList: jest.fn(),
    findUserGroupList: jest.fn(),
    findOne: jest.fn(),
    updateGroupById: jest.fn(),
    addUsersToGroup: jest.fn(),
    deleteGroupById: jest.fn()
}));

describe('Group Controller', () => {
    let mRes;
    beforeEach(() => {
        mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('create - 200', async () => {
        let groupDTO;
        const mReq = { body: groupDTO };
        createGroup.mockResolvedValueOnce({ data: 'fake data' });
        await create(mReq, mRes);
        expect(createGroup).toBeCalledWith(groupDTO);
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('create - 400', async () => {
        let groupDTO;
        const mReq = { body: groupDTO };
        const mError = new Error('error');
        createGroup.mockImplementationOnce(() => {
            throw mError;
        });
        await create(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('list 200', async () => {
        const mReq = {};
        findList.mockResolvedValueOnce({ data: 'fake data' });
        await list(mReq, mRes);
        expect(findList).toBeCalledWith();
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('list - 400', async () => {
        const mReq = {};
        const mError = new Error('error');
        findList.mockImplementationOnce(() => {
            throw mError;
        });
        await list(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('list - 404', async () => {
        const mReq = {};
        findList.mockImplementationOnce(() => null);
        await list(mReq, mRes);
        expect(findList).toBeCalledWith();
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });

    test('userGroupList 200', async () => {
        const mReq = {};
        findUserGroupList.mockResolvedValueOnce({ data: 'fake data' });
        await userGroupList(mReq, mRes);
        expect(findUserGroupList).toBeCalledWith();
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('userGroupList - 400', async () => {
        const mReq = {};
        const mError = new Error('error');
        findUserGroupList.mockImplementationOnce(() => {
            throw mError;
        });
        await userGroupList(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('userGroupList - 404', async () => {
        const mReq = {};
        findUserGroupList.mockImplementationOnce(() => null);
        await userGroupList(mReq, mRes);
        expect(findUserGroupList).toBeCalledWith();
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
        let groupDTO;
        const mReq = { params: {}, body: groupDTO };
        await update(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('Id is missing');
    });

    test('update 200', async () => {
        let groupDTO;
        const mReq = { params: { id: '123' }, body: groupDTO };
        updateGroupById.mockResolvedValueOnce({ data: 'fake data' });
        await update(mReq, mRes);
        expect(updateGroupById).toBeCalledWith('123', groupDTO);
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('update - 400', async () => {
        let groupDTO;
        const mReq = { params: { id: '123' }, body: groupDTO };
        const mError = new Error('error');
        updateGroupById.mockImplementationOnce(() => {
            throw mError;
        });
        await update(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('update - 404', async () => {
        let groupDTO;
        const mReq = { params: { id: '123' }, body: groupDTO };
        updateGroupById.mockImplementationOnce(() => null);
        await update(mReq, mRes);
        expect(updateGroupById).toBeCalledWith('123', groupDTO);
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });

    test('addUser - GroupId missing 400', async () => {
        const mReq = { body: { UserIds: ['123', '456', '789'] } };
        await addUser(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('GroupId is missing');
    });

    test('addUser - UserId missing 400', async () => {
        const mReq = { body: { GroupId: '123' } };
        await addUser(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('UserId is missing');
    });

    test('addUser 200', async () => {
        const mReq = { body: { GroupId: '111', UserIds: ['123', '456', '789'] } };
        addUsersToGroup.mockResolvedValueOnce({ data: 'fake data' });
        await addUser(mReq, mRes);
        expect(addUsersToGroup).toBeCalledWith('111', ['123', '456', '789']);
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('addUser - 400', async () => {
        const mReq = { body: { GroupId: '111', UserIds: ['123', '456', '789'] } };
        const mError = new Error('error');
        addUsersToGroup.mockImplementationOnce(() => {
            throw mError;
        });
        await addUser(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('addUser - 400 Validation Error', async () => {
        const mReq = { body: { GroupId: '111', UserIds: ['123', '456', '789'] } };
        addUsersToGroup.mockImplementationOnce(() => null);
        await addUser(mReq, mRes);
        expect(addUsersToGroup).toBeCalledWith('111', ['123', '456', '789']);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('Validation Error');
    });

    test('destroy - id missing 400', async () => {
        const mReq = { params: {} };
        await destroy(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('Id is missing');
    });

    test('destroy 200', async () => {
        const mReq = { params: { id: '123' } };
        deleteGroupById.mockResolvedValueOnce({ data: 'fake data' });
        await destroy(mReq, mRes);
        expect(deleteGroupById).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.status().send).toBeCalledWith({ data: 'fake data' });
    });

    test('destroy - 400', async () => {
        const mReq = { params: { id: '123' } };
        const mError = new Error('error');
        deleteGroupById.mockImplementationOnce(() => {
            throw mError;
        });
        await destroy(mReq, mRes);
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.status().send).toBeCalledWith('error');
    });

    test('destroy - 404', async () => {
        const mReq = { params: { id: '123' } };
        deleteGroupById.mockImplementationOnce(() => null);
        await destroy(mReq, mRes);
        expect(deleteGroupById).toBeCalledWith('123');
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.status().send).toBeCalledWith('Not found!');
    });
});
