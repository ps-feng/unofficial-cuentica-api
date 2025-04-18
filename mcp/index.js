const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");
const axios = require("axios");

// Configuration
const BASE_URL = "https://api.cuentica.com";
const AUTH_TOKEN = process.env.CUENTICA_AUTH_TOKEN;

if (!AUTH_TOKEN) {
  console.error("Error: CUENTICA_AUTH_TOKEN environment variable is required");
  process.exit(1);
}

// API client
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-AUTH-TOKEN": AUTH_TOKEN,
    "Content-Type": "application/json"
  }
});

// Create an MCP server
const server = new McpServer({
  name: "Cuentica API",
  version: "1.0.0"
});

// Helper function for API calls
async function makeApiCall(method, endpoint, data = null, params = null) {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      params
    });
    return response.data;
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
      return {
        error: true,
        status: error.response.status,
        message: error.response.data
      };
    }
    return {
      error: true,
      message: error.message
    };
  }
}

// Add tools for each API endpoint
// Company endpoints
server.tool(
  "getCompanyData",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/company"), null, 2) }]
  })
);

server.tool(
  "getCompanyInvoicingSeries",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/company/serie"), null, 2) }]
  })
);

// Account endpoints
server.tool(
  "listAccounts",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/account"), null, 2) }]
  })
);

server.tool(
  "getAccountById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/account/${id}`), null, 2) }]
  })
);

// Provider endpoints
server.tool(
  "listProviders",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    q: z.string().optional()
  },
  async ({ page_size, page, q }) => {
    const params = { page_size, page };
    if (q) params.q = q;
    return {
      content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/provider", null, params), null, 2) }]
    };
  }
);

server.tool(
  "createProvider",
  {
    address: z.string(),
    town: z.string(),
    postal_code: z.string(),
    cif: z.string(),
    tradename: z.string(),
    business_name: z.string().optional(),
    name: z.string().optional(),
    surname_1: z.string().optional(),
    business_type: z.enum(["individual", "company"]),
    region: z.string(),
    country_code: z.string().default("ES"),
    default_payment_method: z.string().default("cash"),
    phone: z.string().optional(),
    email: z.string().optional(),
    contact_person: z.string().optional(),
    personal_comment: z.string().optional()
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/provider", data), null, 2) }]
  })
);

server.tool(
  "getProviderById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/provider/${id}`), null, 2) }]
  })
);

server.tool(
  "updateProvider",
  {
    id: z.number(),
    address: z.string().optional(),
    town: z.string().optional(),
    postal_code: z.string().optional(),
    cif: z.string().optional(),
    tradename: z.string().optional(),
    business_name: z.string().optional(),
    name: z.string().optional(),
    surname_1: z.string().optional(),
    business_type: z.enum(["individual", "company"]).optional(),
    region: z.string().optional(),
    country_code: z.string().optional(),
    default_payment_method: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    contact_person: z.string().optional(),
    personal_comment: z.string().optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/provider/${id}`, data), null, 2) }]
  })
);

// Customer endpoints
server.tool(
  "listCustomers",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    q: z.string().optional()
  },
  async ({ page_size, page, q }) => {
    const params = { page_size, page };
    if (q) params.q = q;
    return {
      content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/customer", null, params), null, 2) }]
    };
  }
);

server.tool(
  "createCustomer",
  {
    address: z.string(),
    town: z.string(),
    postal_code: z.string(),
    cif: z.string(),
    tradename: z.string(),
    business_name: z.string().optional(),
    name: z.string().optional(),
    surname_1: z.string().optional(),
    business_type: z.enum(["individual", "company"]),
    region: z.string(),
    country_code: z.string().default("ES"),
    default_payment_method: z.string().default("cash"),
    phone: z.string().optional(),
    email: z.string().optional(),
    contact_person: z.string().optional(),
    personal_comment: z.string().optional(),
    default_invoice_language: z.string().default("default"),
    has_surcharge: z.boolean().default(false)
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/customer", data), null, 2) }]
  })
);

server.tool(
  "getCustomerById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/customer/${id}`), null, 2) }]
  })
);

server.tool(
  "updateCustomer",
  {
    id: z.number(),
    address: z.string().optional(),
    town: z.string().optional(),
    postal_code: z.string().optional(),
    cif: z.string().optional(),
    tradename: z.string().optional(),
    business_name: z.string().optional(),
    name: z.string().optional(),
    surname_1: z.string().optional(),
    business_type: z.enum(["individual", "company"]).optional(),
    region: z.string().optional(),
    country_code: z.string().optional(),
    default_payment_method: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    contact_person: z.string().optional(),
    personal_comment: z.string().optional(),
    default_invoice_language: z.string().optional(),
    has_surcharge: z.boolean().optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/customer/${id}`, data), null, 2) }]
  })
);

// Invoice endpoints
server.tool(
  "listInvoices",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    customer: z.number().optional(),
    min_total_limit: z.number().optional(),
    max_total_limit: z.number().optional(),
    initial_date: z.string().optional(), // yyyy-MM-dd
    end_date: z.string().optional(), // yyyy-MM-dd
    serie: z.string().optional(),
    description: z.string().optional(),
    issued: z.boolean().optional(),
    sort: z.string().optional(),
    tags: z.string().optional() // comma-separated
  },
  async (params) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/invoice", null, params), null, 2) }]
  })
);

server.tool(
  "createInvoice",
  {
    issued: z.boolean(),
    invoice_lines: z.array(
      z.object({
        quantity: z.number(),
        concept: z.string(),
        amount: z.number(),
        discount: z.number().default(0),
        tax: z.number(),
        retention: z.number().default(0),
        sell_type: z.string(),
        tax_regime: z.string().optional(),
        tax_subjection_code: z.string().optional()
      })
    ),
    charges: z.array(
      z.object({
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    ).optional(),
    description: z.string().optional(),
    date: z.string(), // yyyy-MM-dd
    customer: z.number(),
    tags: z.array(z.string()).optional()
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/invoice", data), null, 2) }]
  })
);

server.tool(
  "getInvoiceById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/invoice/${id}`), null, 2) }]
  })
);

server.tool(
  "updateInvoice",
  {
    id: z.number(),
    issued: z.boolean().optional(),
    customer: z.number().optional(),
    invoice_lines: z.array(
      z.object({
        id: z.number().optional(),
        quantity: z.number(),
        concept: z.string(),
        amount: z.number(),
        discount: z.number().default(0),
        tax: z.number(),
        retention: z.number().default(0),
        sell_type: z.string(),
        tax_regime: z.string().optional(),
        tax_subjection_code: z.string().optional()
      })
    ).optional(),
    charges: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    ).optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/invoice/${id}`, data), null, 2) }]
  })
);

server.tool(
  "getInvoicePublicLink",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/invoice/${id}/public`), null, 2) }]
  })
);

server.tool(
  "updateInvoiceCharges",
  {
    id: z.number(),
    charges: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    )
  },
  async ({ id, charges }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/invoice/${id}/charges`, { charges }), null, 2) }]
  })
);

server.tool(
  "emailInvoice",
  {
    id: z.number(),
    to: z.array(z.string()),
    reply_to: z.string().optional(),
    subject: z.string(),
    body: z.string(),
    cc: z.array(z.string()).optional(),
    cc_me: z.boolean().optional(),
    show_card_payment: z.boolean().optional(),
    include_pdf: z.boolean().optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", `/invoice/${id}/email`, data), null, 2) }]
  })
);

server.tool(
  "downloadInvoicePdf",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/invoice/${id}/pdf`), null, 2) }]
  })
);

// Income endpoints
server.tool(
  "listIncomes",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    customer: z.number().optional(),
    min_total_limit: z.number().optional(),
    max_total_limit: z.number().optional(),
    initial_date: z.string().optional(), // yyyy-MM-dd
    end_date: z.string().optional(), // yyyy-MM-dd
    sort: z.string().optional(),
    tags: z.string().optional() // comma-separated
  },
  async (params) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/income", null, params), null, 2) }]
  })
);

server.tool(
  "createIncome",
  {
    customer: z.number(),
    income_lines: z.array(
      z.object({
        concept: z.string(),
        amount: z.number(),
        tax: z.number(),
        retention: z.number().default(0),
        imputation: z.number().optional(),
        income_type: z.string().optional(),
        tax_regime: z.string().optional(),
        tax_subjection_code: z.string().optional()
      })
    ),
    charges: z.array(
      z.object({
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    ).optional(),
    date: z.string(), // yyyy-MM-dd
    document_type: z.string(),
    document_number: z.string().optional(),
    annotations: z.string().optional(),
    tags: z.array(z.string()).optional()
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/income", data), null, 2) }]
  })
);

server.tool(
  "getIncomeById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/income/${id}`), null, 2) }]
  })
);

server.tool(
  "updateIncome",
  {
    id: z.number(),
    customer: z.number().optional(),
    income_lines: z.array(
      z.object({
        id: z.number().optional(),
        concept: z.string(),
        amount: z.number(),
        tax: z.number(),
        retention: z.number().default(0),
        imputation: z.number().optional(),
        income_type: z.string().optional(),
        tax_regime: z.string().optional(),
        tax_subjection_code: z.string().optional()
      })
    ).optional(),
    charges: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    ).optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/income/${id}`, data), null, 2) }]
  })
);

server.tool(
  "getIncomeAttachment",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/income/${id}/attachment`), null, 2) }]
  })
);

server.tool(
  "updateIncomeAttachment",
  {
    id: z.number(),
    filename: z.string(),
    data: z.string() // base64 encoded data
  },
  async ({ id, filename, data }) => ({
    content: [{ 
      type: "text", 
      text: JSON.stringify(await makeApiCall("put", `/income/${id}/attachment`, { filename, data }), null, 2) 
    }]
  })
);

server.tool(
  "updateIncomeCharges",
  {
    id: z.number(),
    charges: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        destination_account_id: z.number()
      })
    )
  },
  async ({ id, charges }) => ({
    content: [{ 
      type: "text", 
      text: JSON.stringify(await makeApiCall("put", `/income/${id}/charges`, { charges }), null, 2) 
    }]
  })
);

// Expense endpoints
server.tool(
  "listExpenses",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    provider: z.number().optional(),
    min_total_limit: z.number().optional(),
    max_total_limit: z.number().optional(),
    initial_date: z.string().optional(), // yyyy-MM-dd
    end_date: z.string().optional(), // yyyy-MM-dd
    expense_type: z.string().optional(),
    investment_type: z.string().optional(),
    draft: z.boolean().optional(),
    sort: z.string().optional(),
    tags: z.string().optional() // comma-separated
  },
  async (params) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/expense", null, params), null, 2) }]
  })
);

server.tool(
  "createExpense",
  {
    date: z.string(), // yyyy-MM-dd
    draft: z.boolean().default(true),
    provider: z.number(),
    document_type: z.string(),
    expense_lines: z.array(
      z.object({
        draft: z.boolean().default(true),
        investment: z.boolean().default(false),
        description: z.string(),
        base: z.number(),
        tax: z.number(),
        retention: z.number().default(0),
        expense_type: z.string()
      })
    ),
    payments: z.array(
      z.object({
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        origin_account: z.number()
      })
    ).optional(),
    document_number: z.string().optional(),
    tags: z.array(z.string()).optional(),
    annotations: z.string().optional()
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/expense", data), null, 2) }]
  })
);

server.tool(
  "getExpenseById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/expense/${id}`), null, 2) }]
  })
);

server.tool(
  "updateExpense",
  {
    id: z.number(),
    date: z.string().optional(), // yyyy-MM-dd
    draft: z.boolean().optional(),
    provider: z.number().optional(),
    document_type: z.string().optional(),
    expense_lines: z.array(
      z.object({
        id: z.number().optional(),
        draft: z.boolean().optional(),
        investment: z.boolean().optional(),
        description: z.string(),
        base: z.number(),
        tax: z.number(),
        retention: z.number().optional(),
        expense_type: z.string()
      })
    ).optional(),
    payments: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        origin_account: z.number()
      })
    ).optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/expense/${id}`, data), null, 2) }]
  })
);

server.tool(
  "getExpenseAttachment",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/expense/${id}/attachment`), null, 2) }]
  })
);

server.tool(
  "updateExpenseAttachment",
  {
    id: z.number(),
    filename: z.string(),
    data: z.string() // base64 encoded data
  },
  async ({ id, filename, data }) => ({
    content: [{ 
      type: "text", 
      text: JSON.stringify(await makeApiCall("put", `/expense/${id}/attachment`, { filename, data }), null, 2) 
    }]
  })
);

server.tool(
  "updateExpensePayments",
  {
    id: z.number(),
    payments: z.array(
      z.object({
        id: z.number().optional(),
        amount: z.number(),
        payment_method: z.string(),
        date: z.string(), // yyyy-MM-dd
        origin_account: z.number()
      })
    )
  },
  async ({ id, payments }) => ({
    content: [{ 
      type: "text", 
      text: JSON.stringify(await makeApiCall("put", `/expense/${id}/payments`, { payments }), null, 2) 
    }]
  })
);

// Document endpoints
server.tool(
  "listDocuments",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    sort: z.string().optional(),
    initial_date: z.string().optional(), // yyyy-MM-dd
    end_date: z.string().optional(), // yyyy-MM-dd
    keyword: z.string().optional(),
    assigned: z.boolean().optional(),
    extension: z.string().optional(),
    hash: z.string().optional()
  },
  async (params) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/document", null, params), null, 2) }]
  })
);

server.tool(
  "uploadDocument",
  {
    attachment: z.object({
      filename: z.string(),
      data: z.string() // base64 encoded data
    }),
    date: z.string(), // yyyy-MM-dd
    expense_id: z.number().optional()
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/document", data), null, 2) }]
  })
);

server.tool(
  "getDocumentById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/document/${id}`), null, 2) }]
  })
);

server.tool(
  "updateDocumentMetadata",
  {
    id: z.number(),
    date: z.string().optional(), // yyyy-MM-dd
    expense_id: z.number().optional()
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/document/${id}`, data), null, 2) }]
  })
);

server.tool(
  "getDocumentAttachmentData",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/document/${id}/attachment`), null, 2) }]
  })
);

// Tag endpoints
server.tool(
  "listTags",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/tag"), null, 2) }]
  })
);

// Transfer endpoints
server.tool(
  "listTransfers",
  { 
    page_size: z.number().default(100),
    page: z.number().default(1),
    origin_account: z.number().optional(),
    destination_account: z.number().optional(),
    payment_method: z.string().optional(),
    sort: z.string().optional(),
    min_total_limit: z.number().optional(),
    max_total_limit: z.number().optional(),
    initial_date: z.string().optional(), // yyyy-MM-dd
    end_date: z.string().optional() // yyyy-MM-dd
  },
  async (params) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", "/transfer", null, params), null, 2) }]
  })
);

server.tool(
  "createTransfer",
  {
    amount: z.number(),
    concept: z.string().optional(),
    destination_account: z.number(),
    origin_account: z.number(),
    payment_method: z.string(),
    date: z.string() // yyyy-MM-dd
  },
  async (data) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("post", "/transfer", data), null, 2) }]
  })
);

server.tool(
  "getTransferById",
  { id: z.number() },
  async ({ id }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("get", `/transfer/${id}`), null, 2) }]
  })
);

server.tool(
  "updateTransfer",
  {
    id: z.number(),
    amount: z.number().optional(),
    concept: z.string().optional(),
    destination_account: z.number().optional(),
    origin_account: z.number().optional(),
    payment_method: z.string().optional(),
    date: z.string().optional() // yyyy-MM-dd
  },
  async ({ id, ...data }) => ({
    content: [{ type: "text", text: JSON.stringify(await makeApiCall("put", `/transfer/${id}`, data), null, 2) }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport).catch(error => {
  console.error("Failed to connect transport:", error);
  process.exit(1);
});
