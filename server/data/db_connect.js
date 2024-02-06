require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const sql = require('mssql');
const logger = require('../services/logger');
const queries = require('./queries');
const { organizeInvoices, organizePurchaseOrders, organizeItemReceipts, organizePayments, organizeCreditMemos } = require('./transform_data');


const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_HOST,
    database: DB_NAME,
    options: {
        encrypt: true
    }
};

async function connectToDatabase() {
    try {

        const pool = await sql.connect(config);
        console.log('Connected to MSSQL');
        return pool;
    } catch (err) {
        logger.error('Error connecting to MSSQL:', err);
        throw err;
    }
}

async function closeConnection() {
    try {
        await sql.close();
        console.log('Connection to MSSQL closed');
    } catch (err) {
        logger.error('Error closing connection to MSSQL:', err);
        throw err;
    }
}



async function getData(pool, type) {
    try {


        let data = null;

        switch (type) {
            case 'customer':
                return await pool.request().query(queries.selectPatients);
            case 'invoice':
                data = await pool.request().query(queries.selectInvoice);
                return organizeInvoices(data);
            case 'purchaseorder':
                data = await pool.request().query(queries.selectPurchaseOrder);
                return organizePurchaseOrders(data);
            case 'itemreceipt':
                data = await pool.request().query(queries.selectItemReceipt);
                return organizeItemReceipts(data);
            case 'customerpayment':
                data = await pool.request().query(queries.selectPayment);
                return organizePayments(data);
            case 'creditmemo':
                data = await pool.request().query(queries.selectCreditMemo);
                return organizeCreditMemos(data);

            default:
                return null;
        }
    } catch (err) {
        logger.error('Error selecting all patients:', err);
        throw err;
    }
}


module.exports = {
    connectToDatabase,
    closeConnection,
    getData,
};

