# Cuentica MCP Server

This MCP (Model Context Protocol) server exposes the Cuentica accounting API functionality to LLMs through a standardized interface.

## Features

- Provides read and write access to all Cuentica API endpoints (including deletion endpoints)
- Authenticates via the `CUENTICA_AUTH_TOKEN` environment variable
- Runs as a stdio transport server, making it easy to integrate with LLM tools

## Requirements

- Node.js (v14 or higher)
- NPM
- A valid Cuentica API auth token

## Installation

```bash
# Install dependencies (skip puppeteer download since it's not needed for MCP server)
PUPPETEER_SKIP_DOWNLOAD=true npm install @modelcontextprotocol/sdk zod axios node-fetch@2 express
```

## Usage

```bash
# Set your Cuentica auth token
export CUENTICA_AUTH_TOKEN="your_token_here"

# Run the server
node mcp/index.js
```

### Usage with Claude
```json
{
  "mcpServers": {
    "cuentica": {
      "command": "node",
      "args": ["path/to/mcp/index.js"],
      "env": {
        "CUENTICA_AUTH_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Available Tools

### Company
- `getCompanyData` - Retrieves company information
- `getCompanyInvoicingSeries` - Gets invoicing series configured for the company

### Accounts
- `listAccounts` - Lists all accounts
- `getAccountById` - Gets a specific account by ID

### Providers
- `listProviders` - Lists providers with pagination and filtering
- `createProvider` - Creates a new provider
- `getProviderById` - Gets a specific provider by ID
- `updateProvider` - Updates an existing provider
- `deleteProvider` - Deletes a provider

### Customers
- `listCustomers` - Lists customers with pagination and filtering
- `createCustomer` - Creates a new customer
- `getCustomerById` - Gets a specific customer by ID
- `updateCustomer` - Updates an existing customer
- `deleteCustomer` - Deletes a customer

### Invoices
- `listInvoices` - Lists invoices with pagination and filtering
- `createInvoice` - Creates a new invoice
- `getInvoiceById` - Gets a specific invoice by ID
- `updateInvoice` - Updates an existing invoice
- `getInvoicePublicLink` - Gets a public link for an invoice
- `updateInvoiceCharges` - Updates the charges for an invoice
- `emailInvoice` - Sends an invoice by email
- `downloadInvoicePdf` - Downloads the PDF version of an invoice
- `deleteInvoice` - Deletes an invoice

### Incomes
- `listIncomes` - Lists incomes with pagination and filtering
- `createIncome` - Creates a new income
- `getIncomeById` - Gets a specific income by ID
- `updateIncome` - Updates an existing income
- `getIncomeAttachment` - Gets the attachment for an income
- `updateIncomeAttachment` - Updates the attachment for an income
- `updateIncomeCharges` - Updates the charges for an income
- `deleteIncome` - Deletes an income
- `deleteIncomeAttachment` - Deletes an income attachment

### Expenses
- `listExpenses` - Lists expenses with pagination and filtering
- `createExpense` - Creates a new expense
- `getExpenseById` - Gets a specific expense by ID
- `updateExpense` - Updates an existing expense
- `getExpenseAttachment` - Gets the attachment for an expense
- `updateExpenseAttachment` - Updates the attachment for an expense
- `updateExpensePayments` - Updates the payments for an expense
- `deleteExpense` - Deletes an expense
- `deleteExpenseAttachment` - Deletes an expense attachment

### Documents
- `listDocuments` - Lists documents with pagination and filtering
- `uploadDocument` - Uploads a new document
- `getDocumentById` - Gets a specific document by ID
- `updateDocumentMetadata` - Updates the metadata for a document
- `getDocumentAttachmentData` - Gets the attachment data for a document
- `deleteDocument` - Deletes a document

### Tags
- `listTags` - Lists all tags

### Transfers
- `listTransfers` - Lists transfers with pagination and filtering
- `createTransfer` - Creates a new transfer
- `getTransferById` - Gets a specific transfer by ID
- `updateTransfer` - Updates an existing transfer
- `deleteTransfer` - Deletes a transfer

## Security Notes

- The server requires an API token to function properly
- ⚠️ **WARNING: Deletion endpoints are available and will permanently remove data from Cuentica**
- Deletion endpoints include: customers, providers, invoices, incomes, expenses, documents, transfers, and attachments
- Use deletion endpoints with extreme caution as data cannot be recovered
- All API calls are logged to help with debugging
- Error handling is implemented to provide meaningful error messages

## Example Integration

This server can be integrated with LLM applications that support the Model Context Protocol. For example:

```javascript
// Client-side example (simplified)
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

// Initialize the MCP client
const transport = new StdioClientTransport({
  command: "node",
  args: ["path/to/mcp/index.js"]
});

const client = new Client({ name: "example-client", version: "1.0.0" });
await client.connect(transport);

// Call a tool
const result = await client.callTool({
  name: "listInvoices",
  arguments: { page_size: 10, page: 1 }
});

console.log(result);
``` 
