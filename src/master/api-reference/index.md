# REST API Reference

AureusERP exposes a full-featured REST API that gives you programmatic access to every module in the platform. Whether you are building third-party integrations, automating internal workflows, or syncing data with external systems, the API covers the complete lifecycle of your ERP data — from partners and inventory to purchases, employees, and beyond.

The API is documented and served interactively by [Scribe](https://scribe.knuckles.wtf/). You can browse every endpoint, inspect request and response schemas, and fire live requests without writing a single line of code.

> **💡 Interactive API Explorer**
> The API documentation is available at your AureusERP installation's `/api/docs` endpoint to explore every available endpoint with a built-in request builder.

---

## Base URL

All API endpoints are relative to your installation's base URL:

```
https://{your-domain}/admin/api/v1
```

Replace `{your-domain}` with the domain where AureusERP is installed (e.g., `erp.example.com`).

---

## API Versioning

The current API version is **v1**. The version is included in every endpoint path:

```
/admin/api/v1/{resource}
```
---

## Authentication

The AureusERP API uses [Laravel Sanctum](https://laravel.com/docs/sanctum) for stateless, token-based authentication. You must obtain a Bearer token before making any protected request.

### Obtaining a Token

Send your credentials to the login endpoint:

```http
POST /admin/api/v1/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

A successful response returns a token:

```json
{
  "data": {
    "token": "1|abc123XYZ..."
  }
}
```

### Using the Token

Include the token as a `Bearer` header on every subsequent request:

```http
GET /admin/api/v1/partners/partners/partners
Authorization: Bearer {YOUR_AUTH_TOKEN}
Accept: application/json
```

### Revoking a Token

To log out and invalidate the current token:

```http
POST /admin/api/v1/logout
Authorization: Bearer {YOUR_AUTH_TOKEN}
```

> **⚠️ Keep tokens secret**
> Never expose your API token in client-side code, public repositories, or logs. Treat it like a password.

---

## Request Format

- All request bodies must be sent as **JSON** with the `Content-Type: application/json` header.
- Always include `Accept: application/json` so error responses are returned as JSON rather than HTML.

```http
POST /admin/api/v1/partners/partners
Authorization: Bearer {YOUR_AUTH_TOKEN}
Content-Type: application/json
Accept: application/json

{
  "name": "Acme Corp",
  "email": "contact@acme.com"
}
```

---

## Response Format

All responses follow a consistent JSON envelope:

### Success — Single Resource

```json
{
  "data": {
    "id": 1,
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "created_at": "2026-03-17T10:00:00.000000Z",
    "updated_at": "2026-03-17T10:00:00.000000Z"
  }
}
```

### Success — Collection

```json
{
  "data": [
    {
      "id": 1,
      "name": "Acme Corp"
    },
    {
      "id": 2,
      "name": "Beta Ltd"
    }
  ],
  "links": {
    "first": "https://erp.example.com/admin/api/v1/partners/partners?page=1",
    "last":  "https://erp.example.com/admin/api/v1/partners/partners?page=5",
    "prev":  null,
    "next":  "https://erp.example.com/admin/api/v1/partners/partners?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 15,
    "to": 15,
    "total": 72
  }
}
```

### Error

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

---

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the outcome of every request.

| Code | Meaning |
|------|---------|
| `200 OK` | Request succeeded. |
| `201 Created` | Resource was successfully created. |
| `204 No Content` | Request succeeded with no response body (e.g., DELETE). |
| `400 Bad Request` | The request was malformed or missing required parameters. |
| `401 Unauthorized` | Missing or invalid authentication token. |
| `403 Forbidden` | The authenticated user lacks permission for this action. |
| `404 Not Found` | The requested resource does not exist. |
| `422 Unprocessable Entity` | Validation failed. Check the `errors` object in the response. |
| `429 Too Many Requests` | Rate limit exceeded. Slow down and retry after the indicated period. |
| `500 Internal Server Error` | An unexpected server-side error occurred. |

---

## Pagination

List endpoints return paginated results. Use the `page` and `per_page` query parameters to control pagination:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `page` | `1` | The page number to retrieve. |
| `per_page` | `15` | Number of records per page (max `100`). |

**Example:**

```http
GET /admin/api/v1/partners/partners?page=2&per_page=25
Authorization: Bearer {YOUR_AUTH_TOKEN}
```

Pagination metadata is returned in the `meta` and `links` objects of every collection response (see [Response Format](#response-format) above).

---

## Filtering & Sorting

Most list endpoints support filtering by passing query parameters that match field names, as well as a `sort` parameter:

```http
GET /admin/api/v1/partners/partners?filter[name]=Acme&sort=-created_at
```

- Prefix a sort field with `-` for **descending** order.
- Multiple sort fields can be comma-separated: `sort=name,-created_at`.

> **ℹ️ Note**
> Refer to each resource's endpoint documentation in the interactive API explorer for the full list of supported filters and sort fields.

---

## Regenerating API Documentation with Scribe

After making any changes to your API — such as adding new endpoints, updating request/response structures, or modifying permissions — you must regenerate the Scribe documentation so the interactive explorer stays in sync with your codebase.

### Regenerate Docs

Run the following Artisan command from your project root:

```bash
php artisan scribe:generate
```

This scans all your API routes, reads docblock annotations and FormRequest rules, and outputs a fresh set of documentation files.

### When to Regenerate

You should run `scribe:generate` whenever you:

- Add, rename, or remove an API endpoint.
- Change request validation rules or response fields.
- Update route middleware (e.g., permission or authentication guards).
- Change the Scribe configuration file.

### Useful Flags

| Flag | Description |
|------|-------------|
| `--force` | Overwrite any manually edited docs without prompting. Cannot be combined with `--no-extraction`. |
| `--no-extraction` | Skip extracting example responses from your app (useful in CI). Cannot be combined with `--force`. |
| `--env=testing` | Run generation against a specific environment. |

> **⚠️ Note**
> The `--force` and `--no-extraction` flags are mutually exclusive — Scribe will throw an error if you pass both at the same time. Choose one based on your use case.

**Example — force overwrite manually edited docs:**

```bash
php artisan scribe:generate --force
```

**Example — skip response extraction (useful in CI where the app may not be fully bootable):**

```bash
php artisan scribe:generate --no-extraction
```

> **💡 Tip**
> Add `php artisan scribe:generate` to your deployment script or CI/CD pipeline so docs are always up to date after every release.

---

### Generate and Preview

After adding annotations, regenerate and review:

```bash
# Regenerate the documentation
php artisan scribe:generate

# Preview locally (docs are served at /api/docs by default)
php artisan serve
```

Open `http://localhost:8000/api/docs` to verify your new endpoints appear correctly.

> **⚠️ Important**
> If your new endpoints are behind permission middleware, make sure the Scribe config includes the correct authentication headers so that example requests work in the interactive explorer.
