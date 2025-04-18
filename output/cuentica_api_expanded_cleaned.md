
## Rate Limiting

The API enforces rate limits:
*   600 requests per 5 minutes.
*   7200 requests per day.

The following headers are included in the response to indicate the current rate limit status:

*   `X-RateLimit-Limit`: Current request number within the block.
*   `X-RateLimit-Remaining`: Requests remaining in the current block.
*   `X-RateLimit-Reset`: Timestamp (epoch format) when the current block resets.
*   `X-RateLimit-Daily-Limit`: Total daily request limit.
*   `X-RateLimit-Daily-Remaining`: Requests remaining for the day.
*   `X-RateLimit-Daily-Reset`: Timestamp (epoch format) when the daily limit resets.

## Pagination

Endpoints that return lists of resources support pagination. The maximum number of items returned per request is **300**.

Supported routes: `/invoice`, `/expense`, `/provider`, `/customer`.

The following headers are included in the response for paginated results:

*   `X-Pagination-CurrentPage`: The page number returned in the response.
*   `X-Pagination-PageSize`: The number of elements per page.
*   `X-Pagination-TotalElements`: The total number of elements available for the resource (after applying any filters).

---

## Empresa (Company)

### 1. Get Company Data

*   **Endpoint:** `GET /company`
*   **Summary:** Retrieve the data for your business.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:** None
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "cif": "string",
      "tradename": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "logo": "string",
      "series": [
        {
          "name": "string",
          "default": "boolean"
        }
      ]
    }
    ```

---

### 2. Get Company Invoicing Series

*   **Endpoint:** `GET /company/serie`
*   **Summary:** Retrieve the invoicing series for your business.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:** None
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "name": "string",
        "default": "boolean"
      }
    ]
    ```

---

## Cuenta (Account)

### 3. List Accounts

*   **Endpoint:** `GET /account`
*   **Summary:** Retrieve a list of the company's accounts (bank accounts, debit/credit cards, partner accounts).
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:** None
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "name": "string",
        "number": "string",
        "iban": "string",
        "type": "string"
      }
    ]
    ```

---

### 4. Get Account by ID

*   **Endpoint:** `GET /account/:id`
*   **Summary:** Retrieve a specific company account by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the account to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "id": "long",
      "name": "string",
      "number": "string",
      "iban": "string",
      "type": "string"
    }
    ```

---

## Proveedor (Provider)

### 5. List Providers

*   **Endpoint:** `GET /provider`
*   **Summary:** Retrieve a list of providers. Supports pagination and searching.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `q` (string): Search term. Filters providers where the term appears in `tradename`, `business_name`, `address`, `cif`, `phone`, or `email`.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "cif": "string",
        "tradename": "string",
        "default_payment_method": "string", // e.g., "cash", "receipt", "wire_transfer", "card", "promissory_note", "other"
        "business_type": "string", // "individual", "company", "others"
        "business_name": "string",
        "name": "string",
        "surname_1": "string",
        "surname_2": "string",
        "address": "string",
        "postal_code": "string",
        "town": "string",
        "region": "string", // See Regions section if country_code is ES
        "country_code": "string", // ISO 3166-1 alpha-2 code
        "contact_person": "string",
        "phone": "string",
        "email": "string",
        "web": "string",
        "fax": "string",
        "personal_comment": "string"
      }
    ]
    ```

### 6. Create Provider

*   **Endpoint:** `POST /provider`
*   **Summary:** Add a new provider.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `address` (string): Company address (street, number, floor...).
        *   `town` (string): Town/City.
        *   `postal_code` (string): Postal code.
        *   `cif` (string): Unique company identification number. Must be unique. Can be empty for non-EU companies, but the parameter must still be sent.
        *   `tradename` (string): Commercial name. Auto-generated if `business_type` is `individual` and this field is not sent.
        *   `business_name` (string): Legal/Business name. Required if `business_type` is *not* `individual`.
        *   `name` (string): First name. Required if `business_type` is `individual`.
        *   `surname_1` (string): First surname. Required if `business_type` is `individual`.
        *   `business_type` (string): Type of business. Accepted values: `individual` (Sole proprietor/freelancer), `company` (Corporation like SL, SA...), `others` (Partnership, institution...).
        *   `region` (string): Province. See [Regions](#regiones) section for accepted values if `country_code` is `ES`.
    *   **Optional Parameters:**
        *   `surname_2` (string): Second surname. Used if `business_type` is `individual`.
        *   `country_code` (string): Country code in ISO 3166-1 alpha-2 format. Defaults to `ES`.
        *   `default_payment_method` (string): Default payment method for this provider. Accepted values: `cash`, `receipt`, `wire_transfer`, `card`, `promissory_note`, `other`. Used if not specified in related operations.
        *   `fax` (string): Fax number.
        *   `phone` (string): Phone number.
        *   `web` (string): Company website URL.
        *   `email` (string): Email address.
        *   `contact_person` (string): Contact person's name.
        *   `personal_comment` (string): Internal notes about the provider.
        *   `default_retention` (number): Default withholding tax (IRPF) percentage applied to operations with this provider.
        *   `default_expense_type` (string): Default expense type code. See [Expense Types](#tipos-de-gasto) section for accepted values.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created provider object)

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_retention and default_expense_type might not be returned here based on the example.
    }
    ```

---

### 7. Get Provider by ID

*   **Endpoint:** `GET /provider/:id`
*   **Summary:** Retrieve a specific provider by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the provider to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_retention and default_expense_type might not be returned here based on the example.
    }
    ```

---

### 8. Update Provider

*   **Endpoint:** `PUT /provider/:id`
*   **Summary:** Update an existing provider.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the provider to update.
    *   **Body:** `application/json` (Contains the fields to update. Uses the same structure and required/optional rules as the `POST /provider` request body).
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated provider object)

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_retention and default_expense_type might not be returned here based on the example.
    }
    ```

---

### 9. Delete Provider

*   **Endpoint:** `DELETE /provider/:id`
*   **Summary:** Delete a provider.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the provider to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

## Cliente (Customer)

### 10. List Customers

*   **Endpoint:** `GET /customer`
*   **Summary:** Retrieve a list of customers. Supports pagination and searching.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `q` (string): Search term. Filters customers where the term appears in `tradename`, `business_name`, `address`, `cif`, `phone`, or `email`.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "cif": "string",
        "tradename": "string",
        "default_payment_method": "string", // e.g., "cash", "receipt", "wire_transfer", "card", "promissory_note", "other"
        "business_type": "string", // "individual", "company", "others"
        "business_name": "string",
        "name": "string",
        "surname_1": "string",
        "surname_2": "string",
        "address": "string",
        "postal_code": "string",
        "town": "string",
        "region": "string", // See Regions section if country_code is ES
        "country_code": "string", // ISO 3166-1 alpha-2 code
        "contact_person": "string",
        "phone": "string",
        "email": "string",
        "web": "string",
        "fax": "string",
        "personal_comment": "string"
        // Note: Customer-specific fields like default_invoice_language and has_surcharge are not shown in this list response example, but might be present.
      }
    ]
    ```
### 11. Create Customer

*   **Endpoint:** `POST /customer`
*   **Summary:** Add a new customer.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `address` (string): Customer address (street, number, floor...).
        *   `town` (string): Town/City.
        *   `postal_code` (string): Postal code.
        *   `cif` (string): Unique customer identification number. Must be unique. Can be empty for non-EU customers, but the parameter must still be sent.
        *   `tradename` (string): Commercial name. Auto-generated if `business_type` is `individual` and this field is not sent.
        *   `business_name` (string): Legal/Business name. Required if `business_type` is *not* `individual`.
        *   `name` (string): First name. Required if `business_type` is `individual`.
        *   `surname_1` (string): First surname. Required if `business_type` is `individual`.
        *   `business_type` (string): Type of business. Accepted values: `individual` (Sole proprietor/freelancer), `company` (Corporation like SL, SA...), `others` (Partnership, institution...).
        *   `region` (string): Province. See [Regions](#regiones) section for accepted values if `country_code` is `ES`.
    *   **Optional Parameters:**
        *   `surname_2` (string): Second surname. Used if `business_type` is `individual`.
        *   `country_code` (string): Country code in ISO 3166-1 alpha-2 format. Defaults to `ES`.
        *   `default_payment_method` (string): Default payment method for this customer. Accepted values: `cash`, `receipt`, `wire_transfer`, `card`, `promissory_note`, `other`. Used if not specified in related operations.
        *   `fax` (string): Fax number.
        *   `phone` (string): Phone number.
        *   `web` (string): Customer website URL.
        *   `email` (string): Email address.
        *   `contact_person` (string): Contact person's name.
        *   `personal_comment` (string): Internal notes about the customer.
        *   `default_invoice_language` (string): Default language for invoices issued to this customer if not specified in the invoice itself. Accepted values: `default` (uses company default), `es` (Spanish), `eu` (Basque), `ca` (Catalan), `en` (English). Defaults to `default`.
        *   `has_surcharge` (boolean): Specifies if invoices for this customer should have equivalence surcharge applied by default. Defaults to `false`.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created customer object)

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_invoice_language and has_surcharge might not be returned here based on the example.
    }
    ```

---

### 12. Get Customer by ID

*   **Endpoint:** `GET /customer/:id`
*   **Summary:** Retrieve a specific customer by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the customer to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_invoice_language and has_surcharge might not be returned here based on the example.
    }
    ```

---

### 13. Update Customer

*   **Endpoint:** `PUT /customer/:id`
*   **Summary:** Update an existing customer.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the customer to update.
    *   **Body:** `application/json` (Contains the fields to update. Uses the same structure and required/optional rules as the `POST /customer` request body).
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated customer object)

    ```json
    {
      "id": "long",
      "cif": "string",
      "tradename": "string",
      "default_payment_method": "string",
      "business_type": "string",
      "business_name": "string",
      "name": "string",
      "surname_1": "string",
      "surname_2": "string",
      "address": "string",
      "postal_code": "string",
      "town": "string",
      "region": "string",
      "country_code": "string",
      "contact_person": "string",
      "phone": "string",
      "email": "string",
      "web": "string",
      "fax": "string",
      "personal_comment": "string"
      // Note: default_invoice_language and has_surcharge might not be returned here based on the example.
    }
    ```

---

### 14. Delete Customer

*   **Endpoint:** `DELETE /customer/:id`
*   **Summary:** Delete a customer.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the customer to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

## Factura (Invoice)

### 15. List Invoices

*   **Endpoint:** `GET /invoice`
*   **Summary:** Retrieve a list of invoices. Supports pagination and filtering.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `customer` (long): Filter by customer ID.
        *   `min_total_limit` (double): Filter invoices with a total amount greater than this value.
        *   `max_total_limit` (double): Filter invoices with a total amount less than this value.
        *   `initial_date` (string): Filter invoices with a date greater than or equal to this date (Format: `yyyy-MM-dd`).
        *   `end_date` (string): Filter invoices with a date less than or equal to this date (Format: `yyyy-MM-dd`).
        *   `serie` (string): Filter by invoicing series name (as returned by `GET /company/serie`).
        *   `description` (string): Filter invoices containing this text in the description.
        *   `issued` (boolean): Filter by status: `true` for issued invoices, `false` for drafts.
        *   `sort` (string): Comma-separated list of fields to sort by, with direction (e.g., `sort=date:desc,number:asc`).
            *   Valid keys: `customer`, `description`, `total_base`, `total_invoice`, `number`, `date`.
            *   Valid orders: `asc` (ascending), `desc` (descending).
        *   `tags` (string): Comma-separated list of tag names (e.g., `tags=projectA,urgent`). Returns invoices containing *all* specified tags.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "business": "long", // ID of the business issuing the invoice
        "customer": { // Customer details (similar to GET /customer/:id response)
          "id": "long",
          "cif": "string",
          "tradename": "string",
          "default_payment_method": "string",
          "business_type": "string",
          "business_name": "string",
          "name": "string",
          "surname_1": "string",
          "surname_2": "string",
          "address": "string",
          "postal_code": "string",
          "town": "string",
          "region": "string",
          "country_code": "string",
          "contact_person": "string",
          "phone": "string",
          "email": "string",
          "web": "string",
          "fax": "string",
          "personal_comment": "string"
        },
        "irm": "string", // Mercantile Registry Information
        "annotations": "string", // Internal notes
        "description": "string", // General description of the invoice
        "date": "string", // Invoice date (yyyy-MM-dd)
        "footer": "string", // Custom footer text
        "amount_details": {
          "total_base": "double", // Sum of base amounts from lines
          "total_retention": "double", // Sum of retention amounts
          "total_amount": "double", // Total invoice amount (base + tax + surcharge - retention)
          "total_tax": "double", // Sum of tax amounts
          "total_charged": "double", // Amount already paid/charged
          "total_left": "double", // Amount pending payment
          "surcharge": "double" // Sum of surcharge amounts
        },
        "invoice_number": "integer", // Invoice number within the series
        "invoice_serie": "string", // Name of the invoicing series
        "issued": "boolean", // True if issued, false if draft
        "rectification_cause": "string", // Reason if it's a corrective invoice
        "rectified_invoice": { // Details of the original invoice if this is a corrective one (recursive structure)
          // ... (Structure similar to the main invoice object)
        },
        "invoice_lines": [ // Array of invoice lines
          {
            "id": "long",
            "quantity": "double",
            "concept": "string",
            "amount": "double", // Price per unit
            "discount": "double", // Discount percentage
            "tax": "double", // Tax percentage (e.g., 21.0)
            "tax_amount": "double", // Calculated tax amount for the line
            "retention": "double", // Retention percentage (e.g., 15.0)
            "retention_amount": "double", // Calculated retention amount
            "surcharge": "double", // Equivalence surcharge percentage
            "surcharge_amount": "double", // Calculated surcharge amount
            "sell_type": "string", // "service" or "product"
            "tax_regime": "string", // See Operation Types section
            "tax_subjection_code": "string" // See VAT Subjection Types section
          }
        ],
        "recurrent": "boolean", // Is this a recurring invoice template
        "periodicity": "number", // Periodicity in months if recurrent
        "periodicity_parent_id": "number", // ID of the parent recurring invoice if generated from one
        "tags": ["string"] // Array of associated tag names
      }
    ]
    ```

### 16. Create Invoice

*   **Endpoint:** `POST /invoice`
*   **Summary:** Add a new invoice (either as a draft or issued).
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `issued` (boolean): Set to `true` to create an issued invoice, `false` for a draft.
        *   `invoice_lines` (array): An array of [Invoice Line](#linea-de-factura) objects. At least one line is required.
        *   `charges` (array): An array of [Invoice Charge](#cobro-de-factura) objects. The sum of charge amounts must equal the total invoice amount.
    *   **Optional Parameters:**
        *   `description` (string): General description for the invoice.
        *   `annotations` (string): Internal notes or comments.
        *   `date` (string): Invoice date (Format: `yyyy-MM-dd`). If omitted, the current date is used. Must be later than or equal to the last issued invoice date for the same series and year.
        *   `serie` (string): Name of the invoicing series. If omitted, the default series is used. If using the `IVA-OSS` series, the customer must be from an EU country (not Spain).
        *   `tags` (array of strings): List of tag names to associate with the invoice. Tags will be created if they don't exist.
        *   `number` (integer): Specific invoice number. If it's the first invoice of the year/series, this number will be used. If invoices already exist for the series/year, sending this parameter will cause an error if it doesn't match the next sequential number.
        *   `customer` (integer): ID of the customer. If omitted, the default "Miscellaneous Customer" is used.
        *   `footer` (string): Custom text for the invoice footer. Defaults to the user's configured default footer.
        *   `irm` (string): Mercantile Registry Information text. Defaults to the user's configured default IRM text.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created invoice object, including generated fields like `id`, `invoice_number` if not provided, `amount_details`, `public_link`, etc.)

    ```json
    {
      "id": "long",
      "business": { // Details of the issuing business
        "id": "long",
        "cif": "string",
        "tradename": "string",
        "business_name": "string", // Only if business_type is not 'individual'
        "name": "string", // Only if business_type is 'individual'
        "surname_1": "string", // Only if business_type is 'individual'
        "surname_2": "string", // Only if business_type is 'individual'
        "address": "string",
        "postal_code": "string",
        "town": "string",
        "region": "string",
        "country_code": "string",
        "phone": "string",
        "email": "string",
        "web": "string",
        "fax": "string"
      },
      "customer": { // Customer details
        // ... (Structure similar to GET /customer/:id response)
      },
      "irm": "string",
      "annotations": "string",
      "description": "string",
      "date": "string", // yyyy-MM-dd
      "footer": "string",
      "amount_details": {
        "total_base": "double",
        "total_retention": "double",
        "total_amount": "double",
        "total_tax": "double",
        "total_charged": "double",
        "total_left": "double",
        "surcharge": "double"
      },
      "invoice_number": "integer",
      "invoice_serie": "string",
      "issued": "boolean",
      "rectification_cause": "string", // Null for standard invoices
      "rectified_invoice": null, // Null for standard invoices
      "recurrent": "boolean",
      "periodicity": "number",
      "periodicity_parent_id": "number",
      "tags": ["string"],
      "invoice_lines": [
        {
          "id": "long",
          "quantity": "double",
          "concept": "string",
          "amount": "double",
          "discount": "double",
          "tax": "double",
          "tax_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "surcharge": "double", // Only present if applicable
          "surcharge_amount": "double", // Only present if applicable
          "sell_type": "string",
          "tax_regime": "string",
          "tax_subjection_code": "string"
        }
      ],
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
      ],
      "public_link": "string" // URL for the public view/payment page
    }
    ```

---

### 17. Get Invoice by ID

*   **Endpoint:** `GET /invoice/:id`
*   **Summary:** Retrieve a specific invoice by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the detailed invoice object)

    ```json
    {
      "id": "long",
      "business": { // Details of the issuing business
        // ... (Structure as in POST /invoice response)
      },
      "customer": { // Customer details
        // ... (Structure similar to GET /customer/:id response)
      },
      "irm": "string",
      "annotations": "string",
      "description": "string",
      "date": "string", // yyyy-MM-dd
      "footer": "string",
      "amount_details": {
        "total_base": "double",
        "total_retention": "double",
        "total_amount": "double",
        "total_tax": "double",
        "total_charged": "double",
        "total_left": "double",
        "surcharge": "double"
      },
      "invoice_number": "integer",
      "invoice_serie": "string",
      "issued": "boolean",
      "rectification_cause": "string",
      "rectified_invoice": { // Populated if this is a corrective invoice
        // ... (Structure similar to the main invoice object)
      },
      "recurrent": "boolean",
      "periodicity": "number",
      "periodicity_parent_id": "number",
      "tags": ["string"],
      "invoice_lines": [
        {
          "id": "long",
          "quantity": "double",
          "concept": "string",
          "amount": "double",
          "discount": "double",
          "tax": "double",
          "tax_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "surcharge": "double", // Only present if applicable
          "surcharge_amount": "double", // Only present if applicable
          "sell_type": "string",
          "tax_regime": "string",
          "tax_subjection_code": "string"
        }
      ],
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
      ],
      "public_link": "string"
    }
    ```

---

### 18. Update Invoice

*   **Endpoint:** `PUT /invoice/:id`
*   **Summary:** Update an existing invoice.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice to update.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `issued` (boolean): Update the status (draft/issued).
            *   `customer` (integer): ID of the customer.
            *   `invoice_lines` (array): Array of [Invoice Line](#linea-de-factura) objects.
            *   `charges` (array): Array of [Invoice Charge](#cobro-de-factura) objects.
        *   **Optional Parameters:**
            *   `description` (string)
            *   `annotations` (string)
            *   `date` (string): Format `yyyy-MM-dd`.
            *   `serie` (string): If changing series, ensure customer country compatibility (e.g., for `IVA-OSS`).
            *   `tags` (array of strings)
            *   `number` (integer): Can only be updated under specific conditions (e.g., if it's still a draft or the first in series/year). Usually not updatable for issued invoices.
            *   `footer` (string)
            *   `irm` (string)
        *   **Update Behavior for Lines/Charges:**
            *   Items in the array *with* an `id` matching an existing line/charge will be updated.
            *   Items in the array *without* an `id` will be created as new lines/charges.
            *   Any existing lines/charges on the invoice whose `id`s are *not* present in the request array will be **deleted**.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated invoice object)

    ```json
    {
      // ... (Structure identical to GET /invoice/:id response)
    }
    ```

---

### 19. Delete Invoice

*   **Endpoint:** `DELETE /invoice/:id`
*   **Summary:** Delete an invoice.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

### 20. Get Invoice Public Link

*   **Endpoint:** `GET /invoice/:id/public`
*   **Summary:** Retrieve the public URL for viewing and potentially paying an invoice.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice.
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Contains the public link URL)

    ```json
    {
      "public_link": "string" // The URL for the public invoice view
    }
    ```
    *(Note: The documentation example for GET /invoice/:id includes this field directly in the invoice object. This endpoint might return just the URL as plain text or wrapped in this simple JSON structure.)*

### 21. Update Invoice Charges

*   **Endpoint:** `PUT /invoice/:id/charges`
*   **Summary:** Update the charges (payments received) associated with a specific invoice.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice whose charges are to be updated.
    *   **Body:** `application/json`
        *   **Optional Parameters:**
            *   `charges` (array): An array of [Invoice Charge](#cobro-de-factura) objects representing the desired state of the charges for the invoice.
                *   Include the `id` field for charges you want to update.
                *   Omit the `id` field for new charges you want to add.
                *   Any existing charges associated with the invoice whose `id`s are *not* included in this array will be **deleted**.
                *   The sum of the `amount` for all charges in the final state must equal the invoice's total amount.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the full updated invoice object, including the modified charges list)

    ```json
    {
      // ... (Structure identical to GET /invoice/:id response)
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
        // ... other charges
      ]
      // ...
    }
    ```

---

### 22. Email Invoice

*   **Endpoint:** `POST /invoice/:id/email`
*   **Summary:** Send an invoice via email.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice to email.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `to` (array of strings): List of recipient email addresses.
            *   `reply_to` (string): The email address recipients should reply to.
            *   `subject` (string): The subject line of the email.
            *   `body` (string): The main content/body of the email.
        *   **Optional Parameters:**
            *   `cc` (array of strings): List of CC recipient email addresses.
            *   `cc_me` (boolean): Send a copy of the email to the authenticated user's email address.
            *   `show_card_payment` (boolean): Include a payment button in the email (links to the public invoice view). Requires Stripe integration to be configured in Cuéntica.
            *   `include_pdf` (boolean): Attach the invoice PDF to the email.
            *   `attachments` (array): Array of [Attachment](#adjunto) objects to include in the email (maximum 5).

*   **Response:** `200 OK`
    *   **Body:** None (Indicates the email was queued for sending).

---

### 23. Download Invoice PDF

*   **Endpoint:** `GET /invoice/:id/pdf`
*   **Summary:** Download the PDF file for a specific invoice, using the company's configured template.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the invoice to download.
*   **Response:** `200 OK`
    *   **Headers:**
        *   `Content-Type: application/pdf`
        *   `Content-Disposition: attachment; filename="invoice_details.pdf"` (Example filename)
    *   **Body:** The raw binary data of the PDF file. *(Note: The documentation mentions "Binario Base64", but typically file download endpoints return raw binary data with appropriate headers).*

---

## Ingreso (Income)

Represents income/revenue not associated with a standard issued invoice (e.g., bank interest, cash statements).

### 24. List Incomes

*   **Endpoint:** `GET /income`
*   **Summary:** Retrieve a list of income records. Supports pagination and filtering.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `customer` (long): Filter by customer ID associated with the income.
        *   `min_total_limit` (double): Filter incomes with a total amount greater than this value.
        *   `max_total_limit` (double): Filter incomes with a total amount less than this value.
        *   `initial_date` (string): Filter incomes with a date greater than or equal to this date (Format: `yyyy-MM-dd`).
        *   `end_date` (string): Filter incomes with a date less than or equal to this date (Format: `yyyy-MM-dd`).
        *   `sort` (string): Comma-separated list of fields to sort by, with direction (e.g., `sort=date:desc,total_income:asc`).
            *   Valid keys: `customer`, `document_number`, `total_base`, `total_income`, `date`.
            *   Valid orders: `asc` (ascending), `desc` (descending).
        *   `tags` (string): Comma-separated list of tag names (e.g., `tags=interest,bankX`). Returns incomes containing *all* specified tags.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "business": "long", // ID of the business receiving the income
        "date": "string", // Income date (yyyy-MM-dd)
        "document_type": "string", // e.g., "other_invoice", "cash_statement", "interest_settlement", etc.
        "document_number": "string", // Reference number if applicable
        "annotations": "string", // Internal notes
        "amount_details": {
          "total_base": "double",
          "total_retention": "double",
          "total_amount": "double", // Total income amount (base + tax - retention)
          "total_tax": "double",
          "total_charged": "double", // Amount received
          "total_left": "double" // Amount pending
        },
        "customer": { // Customer associated with the income (can be 'Miscellaneous Customer')
          // ... (Structure similar to GET /customer/:id response)
        },
        "has_attachment": "boolean", // True if an attachment exists
        "tags": ["string"], // Array of associated tag names
        "lines": [ // Array of income lines (usually one for simple incomes)
          {
            "id": "long",
            "concept": "string",
            "amount": "double", // Base amount for this line
            "tax": "double", // Tax percentage
            "tax_amount": "double", // Calculated tax amount
            "retention": "double", // Retention percentage
            "retention_amount": "double", // Calculated retention amount
            "imputation": "double", // Imputation percentage (if applicable)
            "income_type": "string", // See Income Types section
            "tax_regime": "string", // See Operation Types section
            "tax_subjection_code": "string" // See VAT Subjection Types section
          }
        ]
        // Note: 'charges' array is shown in POST/PUT but not GET list example.
      }
    ]
    ```

---

### 25. Create Income

*   **Endpoint:** `POST /income`
*   **Summary:** Add a new income record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `customer` (integer): ID of the customer associated with the income. Use the ID for "Miscellaneous Customer" if needed.
        *   `income_lines` (array): An array of [Income Line](#linea-de-ingreso) objects. At least one line is required.
        *   `charges` (array): An array of [Invoice Charge](#cobro-de-factura) objects representing the payments received for this income. The sum of charge amounts must equal the total income amount.
    *   **Optional Parameters:**
        *   `date` (string): Income date (Format: `yyyy-MM-dd`). Defaults to the current date if omitted.
        *   `tags` (array of strings): List of tag names to associate. Tags will be created if they don't exist.
        *   `document_type` (string): Type of document representing the income. Accepted values: `other_invoice`, `cash_statement`, `interest_settlement`, `bank_doc`, `contract`, `resolution`, `other_doc`. Defaults to `other_invoice` if omitted.
        *   `document_number` (string): Reference number for the document.
        *   `annotations` (string): Internal notes or comments.
        *   `attachment` (object): An [Attachment](#adjunto) object to associate with the income.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created income object)

    ```json
    {
      "id": "long",
      "business": { // Details of the receiving business
        // ... (Structure as in POST /invoice response)
      },
      "date": "string", // yyyy-MM-dd
      "document_type": "string",
      "document_number": "string",
      "annotations": "string",
      "amount_details": {
        "total_base": "double",
        "total_retention": "double",
        "total_amount": "double",
        "total_tax": "double",
        "total_charged": "double",
        "total_left": "double"
      },
      "customer": { // Customer details
        // ... (Structure similar to GET /customer/:id response)
      },
      "has_attachment": "boolean",
      "tags": ["string"],
      "lines": [
        {
          "id": "long",
          "concept": "string",
          "amount": "double",
          "tax": "double",
          "tax_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "imputation": "double",
          "income_type": "string",
          "tax_regime": "string",
          "tax_subjection_code": "string"
        }
      ],
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
      ]
    }
    ```

### 26. Get Income by ID

*   **Endpoint:** `GET /income/:id`
*   **Summary:** Retrieve a specific income record by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the detailed income object)

    ```json
    {
      "id": "long",
      "business": { // Details of the receiving business
        "id": "long",
        "cif": "string",
        "tradename": "string",
        "business_name": "string", // Only if business_type is not 'individual'
        "name": "string", // Only if business_type is 'individual'
        "surname_1": "string", // Only if business_type is 'individual'
        "surname_2": "string", // Only if business_type is 'individual'
        "address": "string",
        "postal_code": "string",
        "town": "string",
        "region": "string",
        "country_code": "string",
        "phone": "string",
        "email": "string",
        "web": "string",
        "fax": "string"
      },
      "date": "string", // yyyy-MM-dd
      "document_type": "string",
      "document_number": "string",
      "annotations": "string",
      "amount_details": {
        "total_base": "double",
        "total_retention": "double",
        "total_amount": "double",
        "total_tax": "double",
        "total_charged": "double",
        "total_left": "double"
      },
      "customer": { // Customer details
        // ... (Structure similar to GET /customer/:id response)
      },
      "has_attachment": "boolean",
      "tags": ["string"],
      "lines": [
        {
          "id": "long",
          "concept": "string",
          "amount": "double",
          "tax": "double",
          "tax_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "imputation": "double",
          "income_type": "string", // See Income Types section
          "tax_regime": "string", // See Operation Types section
          "tax_subjection_code": "string" // See VAT Subjection Types section
        }
      ],
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
      ]
    }
    ```

---

### 27. Update Income

*   **Endpoint:** `PUT /income/:id`
*   **Summary:** Update an existing income record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record to update.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `customer` (integer): ID of the customer.
            *   `income_lines` (array): Array of [Income Line](#linea-de-ingreso) objects.
            *   `charges` (array): Array of [Invoice Charge](#cobro-de-factura) objects.
        *   **Optional Parameters:**
            *   `date` (string): Format `yyyy-MM-dd`.
            *   `tags` (array of strings)
            *   `document_type` (string): Accepted values: `other_invoice`, `cash_statement`, `interest_settlement`, `bank_doc`, `contract`, `resolution`, `other_doc`.
            *   `document_number` (string)
            *   `annotations` (string)
            *   `attachment` (object): An [Attachment](#adjunto) object. If provided, it replaces the existing attachment. To remove an attachment without replacing, use the `DELETE /income/:id/attachment` endpoint.
        *   **Update Behavior for Lines/Charges:**
            *   Items in the array *with* an `id` matching an existing line/charge will be updated.
            *   Items in the array *without* an `id` will be created as new lines/charges.
            *   Any existing lines/charges on the income record whose `id`s are *not* present in the request array will be **deleted**.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated income object)

    ```json
    {
      // ... (Structure identical to GET /income/:id response)
    }
    ```

---

### 28. Delete Income

*   **Endpoint:** `DELETE /income/:id`
*   **Summary:** Delete an income record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

### 29. Get Income Attachment

*   **Endpoint:** `GET /income/:id/attachment`
*   **Summary:** Retrieve the attachment associated with an income record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record whose attachment is to be retrieved.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "filename": "string", // The original filename of the attachment
      "data": "string", // Base64 encoded content of the file
      "mimetype": "string" // The MIME type of the file (e.g., "application/pdf", "image/jpeg")
    }
    ```

---

### 30. Delete Income Attachment

*   **Endpoint:** `DELETE /income/:id/attachment`
*   **Summary:** Delete the attachment associated with an income record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record whose attachment is to be deleted.
*   **Response:** `200 OK`
    *   **Body:** None

### 31. Update Income Attachment

*   **Endpoint:** `PUT /income/:id/attachment`
*   **Summary:** Update or replace the attachment associated with an income record. If no attachment exists, it will be added.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record whose attachment is to be updated/added.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `filename` (string): The desired filename for the attachment.
            *   `data` (string): The file content encoded in Base64.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the full updated income object, with `has_attachment` set to `true`)

    ```json
    {
      // ... (Structure identical to GET /income/:id response)
      "has_attachment": true
      // ...
    }
    ```

---

### 32. Update Income Charges

*   **Endpoint:** `PUT /income/:id/charges`
*   **Summary:** Update the charges (payments received) associated with a specific income record. *(Note: This endpoint appears functionally similar to updating charges via `PUT /income/:id` but is documented separately).*
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the income record whose charges are to be updated.
    *   **Body:** `application/json`
        *   **Optional Parameters:**
            *   `charges` (array): An array of [Invoice Charge](#cobro-de-factura) objects representing the desired state of the charges for the income.
                *   Include the `id` field for charges you want to update.
                *   Omit the `id` field for new charges you want to add.
                *   Any existing charges associated with the income whose `id`s are *not* included in this array will be **deleted**.
                *   The sum of the `amount` for all charges in the final state must equal the income's total amount.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the full updated income object, including the modified charges list)

    ```json
    {
      // ... (Structure identical to GET /income/:id response)
      "charges": [
        {
          "id": "long",
          "paid": "boolean",
          "amount": "double",
          "payment_method": "string",
          "date": "string", // yyyy-MM-dd
          "destination_account_id": "long",
          "destination_account_description": "string",
          "origin_account_number": "string", // Present depending on payment method
          "origin_account_description": "string" // Present depending on payment method
        }
        // ... other charges
      ]
      // ...
    }
    ```

---

## Gasto (Expense)

Represents expenses incurred by the business.

### 33. List Expenses

*   **Endpoint:** `GET /expense`
*   **Summary:** Retrieve a list of expenses. Supports pagination and filtering.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `provider` (long): Filter by provider ID.
        *   `min_total_limit` (double): Filter expenses with a total amount greater than this value.
        *   `max_total_limit` (double): Filter expenses with a total amount less than this value.
        *   `initial_date` (string): Filter expenses with a date greater than or equal to this date (Format: `yyyy-MM-dd`).
        *   `end_date` (string): Filter expenses with a date less than or equal to this date (Format: `yyyy-MM-dd`).
        *   `expense_type` (string): Filter by expense type code. See [Expense Types](#tipos-de-gasto).
        *   `investment_type` (string): Filter by investment type code (only applies if the expense line is an investment). See [Investment Types](#tipos-de-inversi-n).
        *   `draft` (boolean): Filter by status: `true` for drafts, `false` for confirmed expenses.
        *   `sort` (string): Comma-separated list of fields to sort by, with direction (e.g., `sort=date:desc,total_expense:asc`).
            *   Valid keys: `provider`, `document_number`, `total_base`, `total_expense`, `date`.
            *   Valid orders: `asc` (ascending), `desc` (descending).
        *   `tags` (string): Comma-separated list of tag names (e.g., `tags=office,supplies`). Returns expenses containing *all* specified tags.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "date": "string", // Expense date (yyyy-MM-dd)
        "accounting_date": "string", // Accounting date (yyyy-MM-dd), might differ from expense date
        "draft": "boolean", // True if draft, false if confirmed
        "provider": { // Provider details
          // ... (Structure similar to GET /provider/:id response)
        },
        "document_type": "string", // "invoice" or "ticket"
        "document_number": "string", // Invoice/ticket number from provider
        "annotations": "string", // Internal notes
        "expense_details": {
          "base": "double", // Total base amount
          "tax": "double", // Total tax amount
          "retention": "double", // Total retention amount
          "surcharge": "double", // Total surcharge amount
          "total_expense": "double", // Total expense amount (base + tax + surcharge - retention)
          "paid": "double", // Amount already paid
          "left": "double" // Amount pending payment
        },
        "recurrent": "boolean", // Is this a recurring expense template
        "periodicity": "number", // Periodicity in months if recurrent
        "periodicity_parent_id": "number", // ID of the parent recurring expense if generated from one
        "has_attachment": "boolean", // True if an attachment exists
        "expense_lines": [ // Array of expense lines
          {
            "id": "long",
            "draft": "boolean", // Usually matches the parent expense draft status
            "investment": "boolean", // True if this line represents an investment
            "description": "string", // Description of the expense item
            "base": "double", // Base amount for this line
            "tax": "double", // Tax percentage
            "tax_amount": "double", // Calculated tax amount
            "surcharge": "double", // Equivalence surcharge percentage
            "surcharge_amount": "double", // Calculated surcharge amount
            "retention": "double", // Retention percentage
            "retention_amount": "double", // Calculated retention amount
            "imputation": "double", // Imputation percentage (if applicable)
            "investment_data": { // Only present if investment is true
              "type": "string", // See Investment Types section
              "value": "double", // Depreciable value
              "start_date": "string", // yyyy-MM-dd
              "end_date": "string", // yyyy-MM-dd
              "duration_years": "integer", // Depreciation duration
              "used": "boolean" // Is the asset used?
            },
            "expense_type": "string" // See Expense Types section (null if investment is true)
          }
        ],
        "tags": ["string"] // Array of associated tag names
        // Note: 'payments' array is shown in POST/PUT but not GET list example.
      }
    ]
    ```

---

### 34. Create Expense

*   **Endpoint:** `POST /expense`
*   **Summary:** Add a new expense record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `date` (string): Expense date (Format: `yyyy-MM-dd`).
        *   `draft` (boolean): `true` to save as draft, `false` to confirm.
        *   `provider` (integer): ID of the provider.
        *   `document_type` (string): Type of document. Accepted values: `invoice`, `ticket`.
        *   `expense_lines` (array): An array of [Expense Line](#linea-de-gasto) objects. At least one line is required.
        *   `payments` (array): An array of [Expense Payment](#pago-de-gasto) objects. The sum of payment amounts must equal the total expense amount.
    *   **Optional Parameters:**
        *   `document_number` (string): Invoice or ticket number from the provider.
        *   `tags` (array of strings): List of tag names to associate. Tags will be created if they don't exist.
        *   `annotations` (string): Internal notes or comments.
        *   `attachment` (object): An [Attachment](#adjunto) object to associate with the expense.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created expense object)

    ```json
    {
      "id": "long",
      "date": "string", // yyyy-MM-dd
      "accounting_date": "string", // yyyy-MM-dd
      "draft": "boolean",
      "tags": ["string"],
      "provider": { // Provider details
        // ... (Structure similar to GET /provider/:id response)
      },
      "document_type": "string",
      "document_number": "string",
      "annotations": "string",
      "has_attachment": "boolean",
      "recurrent": "boolean",
      "periodicity": "number",
      "periodicity_parent_id": "number",
      "expense_details": {
        "base": "double",
        "tax": "double",
        "retention": "double",
        "surcharge": "double",
        "total_expense": "double",
        "paid": "double",
        "left": "double"
      },
      "expense_lines": [
        {
          "id": "long",
          "draft": "boolean",
          "investment": "boolean",
          "description": "string",
          "base": "double",
          "tax": "double",
          "tax_amount": "double",
          "surcharge": "double",
          "surcharge_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "imputation": "double",
          "investment_data": { // Only if investment is true
            // ... (Structure as in GET /expense response)
          },
          "expense_type": "string" // Null if investment is true
        }
      ],
      "payments": [
        {
          "id": "long",
          "paid": "boolean",
          "date": "string", // yyyy-MM-dd
          "expected_date": "string", // yyyy-MM-dd (if applicable, e.g., for promissory notes)
          "amount": "double",
          "payment_method": "string",
          "origin_account": "long", // ID of the account used for payment
          "origin_account_name": "string",
          "origin_account_number": "string",
          "destination_account_name": "string", // Provider's account name (if known)
          "destination_account_number": "string" // Provider's account number (if known)
        }
      ]
    }
    ```

---

### 35. Get Expense by ID

*   **Endpoint:** `GET /expense/:id`
*   **Summary:** Retrieve a specific expense record by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the detailed expense object)

    ```json
    {
      "id": "long",
      "date": "string", // yyyy-MM-dd
      "accounting_date": "string", // yyyy-MM-dd
      "draft": "boolean",
      "tags": ["string"],
      "provider": { // Provider details
        // ... (Structure similar to GET /provider/:id response)
      },
      "document_type": "string",
      "document_number": "string",
      "annotations": "string",
      "has_attachment": "boolean",
      "recurrent": "boolean",
      "periodicity": "number",
      "periodicity_parent_id": "number",
      "expense_details": {
        "base": "double",
        "tax": "double",
        "retention": "double",
        "surcharge": "double",
        "total_expense": "double",
        "paid": "double",
        "left": "double"
      },
      "expense_lines": [
        {
          "id": "long",
          "draft": "boolean",
          "investment": "boolean",
          "description": "string",
          "base": "double",
          "tax": "double",
          "tax_amount": "double",
          "surcharge": "double",
          "surcharge_amount": "double",
          "retention": "double",
          "retention_amount": "double",
          "imputation": "double",
          "investment_data": { // Only if investment is true
             // ... (Structure as in GET /expense response)
          },
          "expense_type": "string" // Null if investment is true
        }
      ],
      "payments": [
        {
          "id": "long",
          "paid": "boolean",
          "date": "string", // yyyy-MM-dd
          "expected_date": "string", // yyyy-MM-dd
          "amount": "double",
          "payment_method": "string",
          "origin_account": "long",
          "origin_account_name": "string",
          "origin_account_number": "string",
          "destination_account_name": "string",
          "destination_account_number": "string"
        }
      ]
    }
    ```

---

### 36. Update Expense

*   **Endpoint:** `PUT /expense/:id`
*   **Summary:** Update an existing expense record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record to update.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `date` (string): Format `yyyy-MM-dd`.
            *   `draft` (boolean): Update the status (draft/confirmed).
            *   `provider` (integer): ID of the provider.
            *   `document_type` (string): `invoice` or `ticket`.
            *   `expense_lines` (array): Array of [Expense Line](#linea-de-gasto) objects.
            *   `payments` (array): Array of [Expense Payment](#pago-de-gasto) objects.
        *   **Optional Parameters:**
            *   `document_number` (string)
            *   `tags` (array of strings)
            *   `annotations` (string)
            *   `attachment` (object): An [Attachment](#adjunto) object. Replaces existing attachment if provided.
        *   **Update Behavior for Lines/Payments:**
            *   Items in the array *with* an `id` matching an existing line/payment will be updated.
            *   Items in the array *without* an `id` will be created as new lines/payments.
            *   Any existing lines/payments on the expense whose `id`s are *not* present in the request array will be **deleted**.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated expense object)

    ```json
    {
      // ... (Structure identical to GET /expense/:id response)
    }
    ```

---

### 37. Delete Expense

*   **Endpoint:** `DELETE /expense/:id`
*   **Summary:** Delete an expense record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

### 38. Get Expense Attachment

*   **Endpoint:** `GET /expense/:id/attachment`
*   **Summary:** Retrieve the attachment associated with an expense record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record whose attachment is to be retrieved.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "filename": "string", // The original filename of the attachment
      "data": "string", // Base64 encoded content of the file
      "mimetype": "string" // The MIME type of the file (e.g., "application/pdf", "image/jpeg")
    }
    ```

---

### 39. Delete Expense Attachment

*   **Endpoint:** `DELETE /expense/:id/attachment`
*   **Summary:** Delete the attachment associated with an expense record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record whose attachment is to be deleted.
*   **Response:** `200 OK`
    *   **Body:** None

---

### 40. Update Expense Attachment

*   **Endpoint:** `PUT /expense/:id/attachment`
*   **Summary:** Update or replace the attachment associated with an expense record. If no attachment exists, it will be added.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record whose attachment is to be updated/added.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `filename` (string): The desired filename for the attachment.
            *   `data` (string): The file content encoded in Base64.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the full updated expense object, with `has_attachment` set to `true`)

    ```json
    {
      // ... (Structure identical to GET /expense/:id response)
      "has_attachment": true
      // ...
    }
    ```

### 41. Update Expense Payments

*   **Endpoint:** `PUT /expense/:id/payments`
*   **Summary:** Update the payments associated with a specific expense record. *(Note: This endpoint appears functionally similar to updating payments via `PUT /expense/:id` but is documented separately).*
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the expense record whose payments are to be updated.
    *   **Body:** `application/json`
        *   **Optional Parameters:**
            *   `payments` (array): An array of [Expense Payment](#pago-de-gasto) objects representing the desired state of the payments for the expense.
                *   Include the `id` field for payments you want to update.
                *   Omit the `id` field for new payments you want to add.
                *   Any existing payments associated with the expense whose `id`s are *not* included in this array will be **deleted**.
                *   The sum of the `amount` for all payments in the final state must equal the expense's total amount.

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the full updated expense object, including the modified payments list)

    ```json
    {
      // ... (Structure identical to GET /expense/:id response)
      "payments": [
        {
          "id": "long",
          "paid": "boolean",
          "date": "string", // yyyy-MM-dd
          "expected_date": "string", // yyyy-MM-dd
          "amount": "double",
          "payment_method": "string",
          "origin_account": "long",
          "origin_account_name": "string",
          "origin_account_number": "string",
          "destination_account_name": "string",
          "destination_account_number": "string"
        }
        // ... other payments
      ]
      // ...
    }
    ```

---

## Documento (Document)

Represents uploaded documents, often associated with expenses.

### 42. List Documents

*   **Endpoint:** `GET /document`
*   **Summary:** Retrieve a list of uploaded documents. Supports pagination and filtering.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `sort` (string): Sort order by date. Accepted values: `asc`, `desc`.
        *   `initial_date` (string): Filter documents with a date greater than or equal to this date (Format: `yyyy-MM-dd`).
        *   `end_date` (string): Filter documents with a date less than or equal to this date (Format: `yyyy-MM-dd`).
        *   `keyword` (string): Search term in the filename or email subject.
        *   `assigned` (boolean): Filter by assignment status: `true` for documents assigned to an expense, `false` for unassigned (pending).
        *   `extension` (string): Comma-separated list of file extensions to filter by (e.g., `pdf,jpg`). Prefix with `!` to exclude (e.g., `!png`).
        *   `hash` (string): Filter by the MD5 hash of the file content.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "date": "string", // Upload/associated date (yyyy-MM-dd)
        "expense_id": "long", // ID of the associated expense, null if unassigned
        "email": "string", // Email address if uploaded via email
        "subject": "string", // Email subject if uploaded via email
        "filename": "string", // Original filename
        "url": "string", // URL to access/download the document (may require auth)
        "extension": "string", // File extension (e.g., "pdf", "jpg")
        "hash": "string" // MD5 hash of the file content
      }
    ]
    ```

---

### 43. Upload Document

*   **Endpoint:** `POST /document`
*   **Summary:** Upload a new document.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `attachment` (object): An [Attachment](#adjunto) object containing the filename and Base64 encoded data.
    *   **Optional Parameters:**
        *   `date` (string): Date to associate with the document (Format: `yyyy-MM-dd`). Defaults to upload date if omitted.
        *   `expense_id` (integer): ID of an existing expense to associate this document with immediately.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created document object)

    ```json
    {
      "id": "long",
      "date": "string",
      "expense_id": "long", // or null
      "email": "string", // null if not uploaded via email
      "subject": "string", // null if not uploaded via email
      "filename": "string",
      "url": "string",
      "extension": "string",
      "hash": "string"
    }
    ```

---

### 44. Get Document by ID

*   **Endpoint:** `GET /document/:id`
*   **Summary:** Retrieve a specific document's metadata by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the document to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "id": "long",
      "date": "string",
      "expense_id": "long", // or null
      "email": "string",
      "subject": "string",
      "filename": "string",
      "url": "string",
      "extension": "string",
      "hash": "string"
    }
    ```

---

### 45. Update Document Metadata

*   **Endpoint:** `PUT /document/:id`
*   **Summary:** Update metadata for an existing document, specifically its date or associated expense.
*   **Description:** This endpoint only allows changing the `date` and `expense_id` associated with the document. It does *not* replace the file content. *(Note: The documentation description conflicts with its request schema which incorrectly lists `attachment` as required. This specification follows the description).*
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the document to update.
    *   **Body:** `application/json`
        *   **Optional Parameters:**
            *   `date` (string): New date to associate with the document (Format: `yyyy-MM-dd`).
            *   `expense_id` (integer): ID of an expense to associate the document with (can be `null` to disassociate).

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated document metadata object)

    ```json
    {
      "id": "long",
      "date": "string", // Updated date
      "expense_id": "long", // Updated expense ID (or null)
      "email": "string",
      "subject": "string",
      "filename": "string",
      "url": "string",
      "extension": "string",
      "hash": "string"
    }
    ```

---

### 46. Delete Document

*   **Endpoint:** `DELETE /document/:id`
*   **Summary:** Delete a document.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the document to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

### 47. Get Document Attachment Data

*   **Endpoint:** `GET /document/:id/attachment`
*   **Summary:** Retrieve the actual file content of a document.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the document whose attachment data is to be retrieved.
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    {
      "filename": "string", // The original filename of the attachment
      "data": "string", // Base64 encoded content of the file
      "mimetype": "string" // The MIME type of the file (e.g., "application/pdf", "image/jpeg")
    }
    ```

---

## Etiqueta (Tag)

### 48. List Tags

*   **Endpoint:** `GET /tag`
*   **Summary:** Retrieve a list of all tags used within the company account.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:** None
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "name": "string", // The tag name as entered by the user
        "normalized_name": "string" // A normalized version (e.g., lowercase, no accents)
      }
    ]
    ```

---

## Traspaso (Transfer)

Represents transfers of funds between the company's own accounts.

### 49. List Transfers

*   **Endpoint:** `GET /transfer`
*   **Summary:** Retrieve a list of transfers between accounts. Supports pagination and filtering.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   Pagination headers are returned in the response.
*   **Request Parameters:**
    *   **Query Parameters (Optional):**
        *   `origin_account` (long): Filter by the ID of the source account.
        *   `destination_account` (long): Filter by the ID of the destination account.
        *   `payment_method` (string): Filter by the transfer method. Accepted values: `cash`, `wire_transfer`, `promissory_note`.
        *   `sort` (string): Sort order by date. Accepted values: `asc`, `desc`.
        *   `page_size` (integer): Number of items per page (Max 300).
        *   `page` (integer): Page number to retrieve.
        *   `min_total_limit` (double): Filter transfers with an amount greater than this value.
        *   `max_total_limit` (double): Filter transfers with an amount less than this value.
        *   `initial_date` (string): Filter transfers with a date greater than or equal to this date (Format: `yyyy-MM-dd`).
        *   `end_date` (string): Filter transfers with a date less than or equal to this date (Format: `yyyy-MM-dd`).
*   **Response:** `200 OK`
    *   **Body:** `application/json`

    ```json
    [
      {
        "id": "long",
        "amount": "double",
        "payment_method": "string", // "cash", "wire_transfer", "promissory_note"
        "date": "string", // yyyy-MM-dd
        "concept": "string",
        "destination_account": { // Simplified account details
          "id": "long",
          "number": "string", // Account number/identifier
          "description": "string" // Account name/description
        },
        "origin_account": { // Simplified account details
          "id": "long",
          "number": "string",
          "description": "string"
        }
      }
    ]
    ```

---

### 50. Create Transfer

*   **Endpoint:** `POST /transfer`
*   **Summary:** Create a new transfer between two company accounts.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Body:** `application/json`

    *   **Required Parameters:**
        *   `amount` (number): The amount to transfer. Must be positive.
        *   `concept` (string): Description of the transfer. Cannot be empty.
        *   `destination_account` (integer): ID of the account receiving the funds.
        *   `origin_account` (integer): ID of the account sending the funds.
    *   **Optional Parameters:**
        *   `payment_method` (string): Method of transfer. Accepted values: `cash`, `wire_transfer`, `promissory_note`. Defaults to `cash` if omitted.
        *   `date` (string): Date of the transfer (Format: `yyyy-MM-dd`). Defaults to the current date if omitted.

*   **Response:** `201 Created` (Assuming standard REST practice, though docs show 200)
    *   **Body:** `application/json` (Returns the newly created transfer object)

    ```json
    {
      "id": "long",
      "amount": "double",
      "payment_method": "string",
      "date": "string", // yyyy-MM-dd
      "concept": "string",
      "destination_account": { // Full account details might be returned here, unlike the list view
        "id": "long",
        // ... potentially more fields like GET /account/:id
        "number": "string",
        "description": "string" // Example shows description, but full object might be returned
      },
      "origin_account": { // Full account details might be returned here
        "id": "long",
        // ... potentially more fields like GET /account/:id
        "number": "string",
        "description": "string" // Example shows description, but full object might be returned
      }
    }
    ```
    *(Note: The response example in the docs for POST shows full customer/provider objects instead of account objects for origin/destination. This seems incorrect for a transfer endpoint. The structure above assumes simplified or full account objects are returned, matching the GET /transfer/:id example more closely).*

### 51. Get Transfer by ID

*   **Endpoint:** `GET /transfer/:id`
*   **Summary:** Retrieve a specific transfer by its ID.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the transfer to retrieve.
*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the detailed transfer object)

    ```json
    {
      "id": "long",
      "amount": "double",
      "payment_method": "string", // "cash", "wire_transfer", "promissory_note"
      "date": "string", // yyyy-MM-dd
      "concept": "string",
      "destination_account": { // Full account details might be returned here
        "id": "long",
        // ... potentially more fields like GET /account/:id
        "number": "string", // Example field from list view
        "description": "string" // Example field from list view
        // The example response shows full customer/provider objects, which seems incorrect.
        // Assuming it returns account details similar to GET /account/:id or at least id/number/description.
      },
      "origin_account": { // Full account details might be returned here
        "id": "long",
        // ... potentially more fields like GET /account/:id
        "number": "string", // Example field from list view
        "description": "string" // Example field from list view
        // The example response shows full customer/provider objects, which seems incorrect.
        // Assuming it returns account details similar to GET /account/:id or at least id/number/description.
      }
    }
    ```
    *(Note: The response example in the docs shows full customer/provider objects instead of account objects for origin/destination. This seems incorrect for a transfer endpoint. The structure above assumes simplified or full account objects are returned).*

---

### 52. Update Transfer

*   **Endpoint:** `PUT /transfer/:id`
*   **Summary:** Update an existing transfer.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
    *   `Content-Type: application/json` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the transfer to update.
    *   **Body:** `application/json`
        *   **Required Parameters:**
            *   `amount` (number): The transfer amount. Must be positive.
            *   `concept` (string): Description of the transfer. Cannot be empty.
            *   `destination_account` (integer): ID of the destination account.
            *   `origin_account` (integer): ID of the origin account.
        *   **Optional Parameters:**
            *   `payment_method` (string): Method of transfer. Accepted values: `cash`, `wire_transfer`, `promissory_note`.
            *   `date` (string): Date of the transfer (Format: `yyyy-MM-dd`).

*   **Response:** `200 OK`
    *   **Body:** `application/json` (Returns the updated transfer object)

    ```json
    {
      // ... (Structure identical to GET /transfer/:id response)
    }
    ```
    *(Note: The response example in the docs shows full customer/provider objects instead of account objects for origin/destination. This seems incorrect for a transfer endpoint. The structure above assumes simplified or full account objects are returned).*

---

### 53. Delete Transfer

*   **Endpoint:** `DELETE /transfer/:id`
*   **Summary:** Delete a transfer record.
*   **Headers:**
    *   `X-AUTH-TOKEN` (Required)
*   **Request Parameters:**
    *   **Path Parameters:**
        *   `id` (long): The ID of the transfer to delete.
*   **Response:** `200 OK`
    *   **Body:** None

---

## Subentidades (Sub-Entities)

Definitions for complex objects used within main entity requests/responses.

### Linea de factura (Invoice Line)

*   **Object Description:** Represents a single line item within an invoice.

| Field Name              | Type   | Description                       
