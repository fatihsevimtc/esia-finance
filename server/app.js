// app.js
const {
    connectToDatabase,
    closeConnection,
    getData,
} = require('./data/db_connect.js');

const { tempRecordSetsSmall, tempRecordSetsBig } = require('./data/test_data.js');

require('dotenv').config();




const { postToNetsuite } = require('./api/restlet_client.js');
const schedule = require('node-schedule');
const logger = require('./services/logger.js');
const { sendEmail } = require('./services/email.js');

let auditdata = [];

const sendData = async () => {
    try {
       return await postToNetsuite(auditdata); //TODO: uncomment this line after testing
        //await postToNetsuite(tempRecordSetsBig); //TODO: remove this line after testing
    } catch (err) {
        const errorMessage = `Error: ${err}`;
        logger.error(errorMessage);
        //await sendEmail('Error in Data Sync', errorMessage);
    }
};

const fetchData = async (pool, entityType) => {
    try {



        const data = await getData(pool, entityType);

        if (data && data.recordset && data.recordset.length > 0) {

            auditdata.push(data.recordset);
        } else {
            const errorMessage = `Error in app.js: Invalid data returned for ${entityType}`;
            logger.error(errorMessage);
            //await sendEmail('Error in fetchData', errorMessage);
        }
    } catch (err) {
        const errorMessage = `Error in fetchData: ${err}`;

        logger.error(errorMessage);
        //await sendEmail('Error in fetchData', errorMessage);
    }

    return auditdata;
};

const main = async () => {
    try {
        auditdata = [];
        const pool = await connectToDatabase();

        const entityTypes = [
            'customer',
            'purchaseorder',
            'itemreceipt',
            'invoice',
            'customerpayment',
            'creditmemo',
        ];

        // Fetch data from auditdata and store in auditdata array
        for (const entityType of entityTypes) {
            await fetchData(pool, entityType);
        }


        //console.log('auditdata', auditdata);
        // Send data to NetSuite
        let response = await sendData();
        await closeConnection();
        return response;
    } catch (err) {
        logger.error('Error in app.js:', err);
        //await sendEmail('Error in Data Sync', err);
    }
};

/**
 * This function schedules the main function to run every day at midnight
 * @returns {void} 
 */
const scheduleSync = () => {
    const syncInterval = process.env.SYNC_INTERVAL || '0 0 * * *'; // Default to once a day at midnight

    logger.info('Financial records sync from Aduitdata to NetSuite has started on', new Date().toLocaleTimeString());
    let counter = 0;

    const job = schedule.scheduleJob(syncInterval, async function () {
        try {
            await main();
            counter++;
            logger.info(`Financial records sync from Aduitdata to NetSuite occurs every day, and this is the number of times it has run: ${counter}`);
        } catch (err) {
            const errorMessage = `Error in scheduled sync: ${err}`;
            logger.error(errorMessage);
            //await sendEmail('Error in Scheduled Sync', errorMessage);
        }
    });
}


// Uncomment the line below to schedule the sync
//scheduleSync();
// main();

module.exports = { main };
