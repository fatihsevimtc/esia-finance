//TODO: For testing purposes only. Remove these temp variables when deploying to production.

const tempRecordSetsSmall = [
    [
        {
            "RecordType": "customer",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "FirstName": "Kerryy",
            "LastName": "Doe",
            "Email": "kerry.doe@example.com",
            "LastModified": "2023-09-01T00:00:00.000Z"
        }
    ],
    [
        {
            "RecordType": "purchaseorder",
            "VendorExternalId": "ABC123",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "PoExternalId": "ZZZ-1234-DEF",
            "LastModified": "2026-09-01T00:00:00.000Z",
            "LineItems": [
                {
                    "ItemId": 5714, "Quantity": 2,
                    "SerialNumbers": ["11234562220", "16543212220"], "ItemExternalId": "XYZ-4422-GHT"
                },
                {
                    "ItemId": 6122, "Quantity": 3,
                    "SerialNumbers": ["12345672220", "17654322220", "1876542220"], "ItemExternalId": "EEE-4422-GHT"
                },
                {
                    "ItemId": 11948, "Quantity": 20,
                    "SerialNumbers": [], "ItemExternalId": "AAA-4422-GHT"
                }
            ]
        }
    ],
    [
        {
            "RecordType": "invoice",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "LocationId": "DEF789",
            "InvoiceId": "XXX-342-RRR-4533-TTTT",
            "LastModified": "2023-09-01T00:00:00.000Z",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 32 },
                { "ItemId": 13319, "Quantity": 33 },
                { "ItemId": 13313, "Quantity": 3 }
            ]
        }
    ],
    [
        {
            "RecordType": "payment",
            "PaymentExternalId": "XXX-344442-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "Address": '123 Main St',
            "Contact": 'John Doe',
            "PaymentAmount": 400.00,
            "PaymentDate": '25/1/2024',
            "PaymentMethodExternalId": "PAY234-XYZ-12-TRUE-EFTPOS",
            "InvoiceExternalId": "XXX-342-RRR-4533-TTTT",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "LastModified": "2025-09-01T00:00:00.000Z"

        }
    ],
    [
        {
            "RecordType": "creditmemo",
            "CreditMemoExternalId": "QQQ-344442-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "ReasonForReturnExternalId": "REASON123-XYZ-333",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 1, "SerialNumbers": ["98877669666"] },
                { "ItemId": 13319, "Quantity": 1, "SerialNumbers": ["98877667"] },
                { "ItemId": 13313, "Quantity": 1, "SerialNumbers": ["98877665"] },
            ],

            "LastModified": "2025-09-01T00:00:00.000Z"
        }
    ]
];


const tempRecordSetsBig = [
    [
        {
            "RecordType": "customer",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "FirstName": "Kerryy",
            "LastName": "Doe",
            "Email": "kerry.doe@example.com",
            "LastModified": "2023-09-01T00:00:00.000Z"
        },
        {
            "RecordType": "customer",
            "PatientId": "AAAA-BBBB-CCCC-1234",
            "FirstName": "John",
            "LastName": "Smith",
            "Email": "john.smith@example.com",
            "LastModified": "2023-10-01T00:00:00.000Z"
        },
        {
            "RecordType": "customer",
            "PatientId": "EEEE-FFFF-GGGG-5678",
            "FirstName": "Alice",
            "LastName": "Johnson",
            "Email": "alice.johnson@example.com",
            "LastModified": "2023-11-01T00:00:00.000Z"
        }
    ],
    [
        {
            "RecordType": "purchaseorder",
            "VendorExternalId": "ABC123",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "PoExternalId": "ZZZ-1234-DEF",
            "LastModified": "2026-09-01T00:00:00.000Z",
            "LineItems": [
                {
                    "ItemId": 5714, "Quantity": 2,
                    "SerialNumbers": ["11234562220", "16543212220"], "ItemExternalId": "XYZ-4422-GHT"
                },
                {
                    "ItemId": 6122, "Quantity": 3,
                    "SerialNumbers": ["12345672220", "17654322220", "1876542220"], "ItemExternalId": "EEE-4422-GHT"
                },
                {
                    "ItemId": 11948, "Quantity": 20,
                    "SerialNumbers": [], "ItemExternalId": "AAA-4422-GHT"
                }
            ]
        },
        {
            "RecordType": "purchaseorder",
            "VendorExternalId": "ABC123",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "PoExternalId": "ZZZ-5678-ABC",
            "LastModified": "2026-10-01T00:00:00.000Z",
            "LineItems": [
                {
                    "ItemId": 5714, "Quantity": 2,
                    "SerialNumbers": ["11112222333", "44445555666"], "ItemExternalId": "HHH-9999-PPP"
                },
                {
                    "ItemId": 6122, "Quantity": 3,
                    "SerialNumbers": ["77778888999", "00001111222", "33334444555"], "ItemExternalId": "PPP-8888-SSS"
                },
                {
                    "ItemId": 11948, "Quantity": 15,
                    "SerialNumbers": [], "ItemExternalId": "TTT-7777-RRR"
                }
            ]
        }
    ],
    [
        {
            "RecordType": "invoice",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "InvoiceExternalId": "XXX-342-RRR-4533-TTTT",
            "LastModified": "2023-09-01T00:00:00.000Z",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 32 },
                { "ItemId": 13319, "Quantity": 33 },
                { "ItemId": 13313, "Quantity": 3 }
            ]
        },
        {
            "RecordType": "invoice",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "InvoiceExternalId": "YYY-123-PPP-9876-XXXX",
            "LastModified": "2023-10-01T00:00:00.000Z",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 12 },
                { "ItemId": 13319, "Quantity": 13 },
                { "ItemId": 13313, "Quantity": 23 }
            ]
        }
    ],
    [
        {
            "RecordType": "payment",
            "PaymentExternalId": "XXX-344442-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "Address": '123 Main St',
            "Contact": 'John Doe',
            "PaymentAmount": 400.00,
            "PaymentDate": '25/1/2024',
            "PaymentMethodExternalId": "PAY234-XYZ-12-TRUE-EFTPOS",
            "InvoiceExternalId": "XXX-342-RRR-4533-TTTT",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "LastModified": "2025-09-01T00:00:00.000Z"
        },
        {
            "RecordType": "payment",
            "PaymentExternalId": "YYY-56789-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "Address": '456 Elm St',
            "Contact": 'Jane Doe',
            "PaymentAmount": 800.00,
            "PaymentDate": '30/1/2024',
            "PaymentMethodExternalId": "PAY234-XYZ-12-TRUE-EFTPOS",
            "InvoiceExternalId": "XXX-342-RRR-4533-TTTT",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "LastModified": "2025-10-01T00:00:00.000Z"
        }
    ],
    [
        {
            "RecordType": "creditmemo",
            "CreditMemoExternalId": "QQQ-344442-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "ReasonForReturnExternalId": "REASON123-XYZ-333",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 1, "SerialNumbers": ["98877669666"] },
                { "ItemId": 13319, "Quantity": 1, "SerialNumbers": ["98877667"] },
                { "ItemId": 13313, "Quantity": 1, "SerialNumbers": ["98877665"] },
            ],
            "LastModified": "2025-09-01T00:00:00.000Z"
        },
        {
            "RecordType": "creditmemo",
            "CreditMemoExternalId": "RRR-99999-RRR-4533-TTTT",
            "PatientId": "XXXX-YYYY-ZZZZ-4567",
            "DepartmentExternalId": "XYZ456",
            "LocationExternalId": "DEF789",
            "ReasonForReturnExternalId": "REASON123-XYZ-333",
            "LineItems": [
                { "ItemId": 13318, "Quantity": 1, "SerialNumbers": ["988177669666"] },
                { "ItemId": 13319, "Quantity": 1, "SerialNumbers": ["988177667"] },
                { "ItemId": 13313, "Quantity": 1, "SerialNumbers": ["988776165"] },
            ],
            "LastModified": "2025-10-01T00:00:00.000Z"
        }
    ]
];

module.exports = {
    tempRecordSetsSmall,
    tempRecordSetsBig
}
