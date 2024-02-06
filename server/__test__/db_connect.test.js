const { connectToDatabase, closeConnection, selectAllPatients } = require('../data/db_connect');

jest.mock('mssql', () => {
    const poolStub = {
        request: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue('testResult')
    };

    return {
        connect: jest.fn().mockResolvedValue(poolStub),
        close: jest.fn().mockResolvedValue()
    };
});

describe('Database Connection', () => {
    it('should successfully connect to the database', async () => {
        const pool = await connectToDatabase();

        expect(pool).toBeDefined();
        expect(typeof pool.request).toBe('function');
        expect(typeof pool.query).toBe('function');
    });


    it('should successfully close the connection', async () => {
        await closeConnection();
    });

    it('should successfully select all patients', async () => {
        const pool = await connectToDatabase();
        const result = await selectAllPatients(pool);
        expect(result).toEqual('testResult');
    });
});
