let organizeInvoices = (originalData) => {
    // Create an object to hold the restructured data
    const restructuredData = {
        recordsets: originalData.recordsets,
        recordset: []
    };

    // Create a map to store invoice IDs and their corresponding products
    const invoiceMap = new Map();

    // Iterate through the original data to group products by invoice ID
    originalData.recordset.forEach(invoice => {
        const { InvoiceId, ...productDetails } = invoice;
        if (!invoiceMap.has(InvoiceId)) {
            invoiceMap.set(InvoiceId, {
                RecordType: invoice.RecordType,
                InvoiceId: InvoiceId,
                PatientId: invoice.PatientId,
                LocationId: invoice.LocationId,
                InvoiceAndProductsModifiedDates: [invoice.InvoiceModifiedDate],
                LineItems: [],
            });
        } else {
            // Add invoice modified date to the InvoiceAndProductsModifiedDates array if it's not already present
            const invoiceData = invoiceMap.get(InvoiceId);
            if (!invoiceData.InvoiceAndProductsModifiedDates.includes(invoice.InvoiceModifiedDate)) {
                invoiceData.InvoiceAndProductsModifiedDates.push(invoice.InvoiceModifiedDate);
            }
        }
        // Push product details to the products array under the corresponding invoice ID
        invoiceMap.get(InvoiceId).LineItems.push({
            ProductId: productDetails.ProductId,
            ProductName: productDetails.ProductName,
            ProductCategoryName: productDetails.ProductCategoryName,
            ProductDescription: productDetails.ProductDescription,
            Quantity: productDetails.Quantity,
            RetailPrice: productDetails.RetailPrice,
            Cost: productDetails.Cost,
            IsSellable: productDetails.IsSellable,
        });

        // Add product modified date to the InvoiceAndProductsModifiedDates array
        invoiceMap.get(InvoiceId).InvoiceAndProductsModifiedDates.push(productDetails.ProductModifiedDate);
    });

    // Convert the map values (grouped invoice products) to an array
    restructuredData.recordset = Array.from(invoiceMap.values());

    return restructuredData;
}

let organizePurchaseOrders = (data) => {
    return data;
}

let organizeItemReceipts = (data) => {
    return data;
}
let organizePayments = (data) => {
    return data;
}
let organizeCreditMemos = (data) => {
    return data;
}

module.exports = {
    organizeInvoices,
    organizePurchaseOrders,
    organizeItemReceipts,
    organizePayments,
    organizeCreditMemos
};