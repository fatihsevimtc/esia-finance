//TODO: record types spelling and capitalization for insering into each table
// 1. cusomer
// 2. purchaseorder
// 3. itemreceipt
// 4. invoice
// 5. payment
// 6. creditmemo



const selectPatients = `
SELECT 
    'customer' AS RecordType,
    *
FROM 
    [svc].[Dim_Patient]     
WHERE 
    -- Customer id is required.
    [PatientId] IS NOT NULL
and
    [CreatedDate] >= DATEADD(day, -100, GETDATE()) 
or 
    [LastModified] >= DATEADD(day, -100, GETDATE())
`; // -100 days for testing but should be -3 days for production



const selectInvoice = `
SELECT 
    'invoice' as RecordType,
    FI.InvoiceId AS InvoiceId,
    FS.PatientId AS PatientId,
    FS.LocationID AS LocationId, -- TODO: Find DepartmentId from location record from netsuite
 	P.ProductId,
    P.Name AS ProductName,
	PC.Name AS ProductCategoryName,
    P.Description AS ProductDescription,
    P.Quantity,
    P.RetailPrice,
    p.Cost,
    P.IsSellable,    
	FI.ModifiedOn AS InvoiceModifiedDate, -- TODO: Use this if invoice is modified then ignore ProductModifiedDate
    P.ModifiedOn AS ProductModifiedDate -- TODO: Use this if invoice is not modified then use ProductModifiedDate
FROM 
    [svc].[Fact_Invoices] AS FI
JOIN 
    [svc].[Fact_Sales] AS FS ON FI.SaleId = FS.SaleId
JOIN
    [svc].[Fact_ProductSales] AS PS ON FS.SaleId = PS.SaleId
JOIN
    [svc].[Dim_StockProduct] AS SP ON PS.StockProductId = SP.StockProductId
JOIN [svc].[Dim_Product] AS P ON SP.ProductId = P.ProductId
JOIN [svc].[Dim_ProductCategory] AS PC ON P.CategoryId = PC.ProductCategoryId
WHERE
    -- Customer or location id is required.
    FS.PatientId IS NOT NULL
    AND FS.LocationID IS NOT NULL
;
`;

const selectPurchaseOrder = ``; //TODO: Add query

const selectItemReceipt = ``; //TODO: Add query

const selectCustomerPayment = ``; //TODO: Add query

const selectCreditMemo = ``; //TODO: Add query



module.exports = {
    selectPatients,
    selectInvoice,
    selectPurchaseOrder,
    selectItemReceipt,
    selectCustomerPayment,
    selectCreditMemo,
}