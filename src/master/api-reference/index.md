# REST API Reference

AureusERP exposes a full-featured REST API that gives you programmatic access to every module in the platform. Whether you are building third-party integrations, automating internal workflows, or syncing data with external systems, the API covers the complete lifecycle of your ERP data — from partners and inventory to products, sales, accounts, and beyond.

The API is documented and served interactively by [Scribe](https://scribe.knuckles.wtf/). The pages in this section mirror that documentation as static reference — every endpoint is shown as a ready-to-copy **cURL request** with its real **JSON response**.

::: tip Interactive API Explorer
A live request builder is also available at your AureusERP installation's `/api/docs` endpoint. Use it to fire real requests against your own instance.
:::

## Base URL

All API endpoints are relative to your installation's base URL:

```
https://{your-domain}/admin/api/v1
```

Replace `{your-domain}` with the domain where AureusERP is installed (e.g., `erp.example.com`). Throughout the endpoint pages the placeholder host `https://your-domain.com` is used.

## API Versioning

The current API version is **v1**. The version is included in every endpoint path:

```
/admin/api/v1/{resource}
```

## Getting Started

1. [Authenticate](/master/api-reference/authentication) to obtain a Bearer token.
2. Read [Making Requests](/master/api-reference/making-requests) for the request/response envelope, pagination, filtering, sorting, and relationship includes.
3. Review [Errors & Status Codes](/master/api-reference/errors) to handle failures.
4. Browse the **Endpoints** section for every available resource.

## Available Resources

| Group | Covers |
|-------|--------|
| [Security & Authentication](/master/api-reference/endpoints/security/authentication) | Login, logout, token management |
| [Support](/master/api-reference/endpoints/support/currencies) | Currencies, currency rates, banks, countries, states, units of measure |
| [Partners](/master/api-reference/endpoints/partners/partners) | Partners, addresses, bank accounts, titles, tags, industries |
| [Products](/master/api-reference/endpoints/products/products) | Products, variants, categories, attributes, packaging, price lists |
| [Inventory](/master/api-reference/endpoints/inventory/receipts) | Warehouses, locations, routes, receipts, deliveries, transfers, lots, packages |
| [Sales](/master/api-reference/endpoints/sales/orders) | Sales orders, order lines, deliveries, invoices, tags |
| [Accounts](/master/api-reference/endpoints/accounts/invoices) | Invoices, bills, credit notes, taxes, journals, payment terms, customers, vendors |
