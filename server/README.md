## API for Data Synchronization between Auditdata DB and NetSuite

This API facilitates the synchronization of financial data from Auditdata DB to NetSuite in a one-way process. It includes a scheduled function to automate this task.

### Scope of the Project:

This app syncs the following components:

1. **Customer (Patient/Client) Details**: 
   - It retrieves customers from Auditdata and checks if the patient ID matches an external ID of any client in NetSuite.
   - If a match is found, it compares the last modified date of the patient from Auditdata with a configuration record called "Last Sync" in NetSuite.
   - If the patient's last modified date is newer than the last sync date, it updates the client in NetSuite with the patient's information.
   - If no client matches the patient's ID, a new client is created in NetSuite, and logs are saved in the deployment script execution logs for reference.

2. **Synchronization of Purchase Orders, Invoices, Payments, and Credit Memos**: 
   - Similar to the customer sync process, with additional logic for managing line items.
   - It compares the last modified date of the parent object (purchase order, invoice, etc.) and all associated line items with the last sync date.
   - If any of these dates are newer than the last sync date, the entire record along with its line items is updated.
   - Line items are managed by removing existing ones and creating new ones using the latest data from Auditdata products list. This approach ensures consistency and integrity.

### NetSuite Custom Record: EarSuite Config

In NetSuite, there exists a custom record called **EarSuite Config** which plays a pivotal role in the synchronization process. This record comprises two dedicated components:

1. **Auditdata Finance Sync Date**: This record maintains the time of the last synchronization operation. It is continually updated with the current time as long as the system operates without errors or completes the synchronization successfully.

2. **Generic Items For Auditdata Integration**: This component contains a JSON object designed to link Auditdata products with NetSuite generic items, specifically crafted for the synchronization operation. It utilizes the unique identifiers from both sides (Audit Data and NetSuite) as key values for mapping.

### Consumer: AuditdataFinanceSyncRestlet.js

The consumer is a SuiteScript Restlet in version 2.1, uploaded in the NetSuite environment, authenticated with OAuth 1.0. Additionally, this consumer creates daily logs for any troubleshooting purposes.


## Troubleshooting:

1. Prior to executing any troubleshooting steps, it's crucial to address a potential issue related to the department record ID being misspelled in NetSuite. It's imperative that the code utilizes the exact ID, even if it is misspelled in the system.

2. The key values of certain objects may have been modified to accommodate accessing additional information from the Auditdata DB. Therefore, if test data is required for any reason, ensure that they possess matching keys to facilitate proper testing.

3. Development occurs with dummy data from the sandbox account. If it is time to release the app with the production account of NetSuite, ensure that all data migrations and external ID configurations are done properly.

4. Ensure that the correct scripts and deployments are repeated in the production account of NetSuite to avoid discrepancies between environments.

5. Create the necessary configuration records in the production EarSuite Config records to ensure seamless synchronization.

6. Make sure the .env file is updated with the production configuration data to enable proper communication and authentication with the production environment.

7. Enable email notifications to receive the synchronization results for monitoring and troubleshooting purposes.

8. Pay attention to the order of setting line items in the Restlet. In NetSuite SuiteScript customizations, the order of setting line item values, such as quantity, rate, and amount, must follow the sequence as it matters for dynamic values. Failure to follow the correct order may result in errors, particularly with dynamic values that depend on the sequence of data entry, as observed in the NetSuite UI.

