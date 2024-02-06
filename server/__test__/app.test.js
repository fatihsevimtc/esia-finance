const { connectToDatabase, closeConnection, selectAllPatients } = require('../data/db_connect.js');

jest.mock('../data/db_connect.js');
const { main } = require('../app.js');

describe('main function', () => {
    it('should handle database operations correctly', async () => {

        const mockPool = {
            query: jest.fn(),
            end: jest.fn(),
        };
        
        connectToDatabase.mockResolvedValue(mockPool);
        selectAllPatients.mockResolvedValue(['patient1', 'patient2']);

        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        const mockError = jest.spyOn(console, 'error').mockImplementation();

        await main();

        expect(connectToDatabase).toHaveBeenCalled();
        expect(selectAllPatients).toHaveBeenCalledWith(mockPool);
        expect(mockLog).toHaveBeenCalledWith(['patient1', 'patient2']);
        expect(closeConnection).toHaveBeenCalled();
        expect(mockError).not.toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
        connectToDatabase.mockRejectedValue(new Error('Database connection error'));
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        const mockError = jest.spyOn(console, 'error').mockImplementation();
        await main();
        expect(connectToDatabase).toHaveBeenCalled();
        expect(mockLog).not.toHaveBeenCalled();
        expect(closeConnection).not.toHaveBeenCalled();
        expect(mockError).toHaveBeenCalledWith('Error in app.js:', expect.any(Error));
    });
});
