# Making Requests

This page covers the conventions shared by every endpoint: request headers, the response envelope, pagination, filtering, sorting, and relationship includes.

## Request Format

- All request bodies must be sent as **JSON** with the `Content-Type: application/json` header.
- Always include `Accept: application/json` so error responses are returned as JSON rather than HTML.
- Protected endpoints require the `Authorization: Bearer {YOUR_AUTH_TOKEN}` header (see [Authentication](/master/api-reference/authentication)).

```bash
curl -X POST "https://your-domain.com/admin/api/v1/partners/partners" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Acme Corp",
  "email": "contact@acme.com"
}'
```

## Response Format

All responses follow a consistent JSON envelope.

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
    { "id": 1, "name": "Acme Corp" },
    { "id": 2, "name": "Beta Ltd" }
  ],
  "links": {
    "first": "https://your-domain.com/admin/api/v1/partners/partners?page=1",
    "last":  "https://your-domain.com/admin/api/v1/partners/partners?page=5",
    "prev":  null,
    "next":  "https://your-domain.com/admin/api/v1/partners/partners?page=2"
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

## Pagination

List endpoints return paginated results. Use the `page` and `per_page` query parameters to control pagination:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `page` | `1` | The page number to retrieve. |
| `per_page` | `15` | Number of records per page (max `100`). |

```bash
curl -X GET "https://your-domain.com/admin/api/v1/partners/partners?page=2&per_page=25" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

Pagination metadata is returned in the `meta` and `links` objects of every collection response.

## Filtering

Most list endpoints support filtering via `filter[field]` query parameters (powered by Spatie QueryBuilder):

```bash
curl -X GET "https://your-domain.com/admin/api/v1/partners/partners?filter[name]=Acme" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

- `filter[id]` accepts a comma-separated list of IDs.
- `filter[trashed]=with` includes soft-deleted records; `filter[trashed]=only` returns only them.

## Sorting

Use the `sort` parameter to order results:

```
?sort=-created_at
```

- Prefix a sort field with `-` for **descending** order.
- Multiple sort fields can be comma-separated: `sort=name,-created_at`.

## Including Relationships

Use the `include` parameter to eager-load related resources in a single request:

```
?include=category,tags
```

::: info
Refer to each endpoint's **Query parameters** table for the exact filters, sort fields, and available `include` relationships it supports.
:::

## Regenerating the Documentation

These endpoint pages are generated from AureusERP's Scribe extraction. After changing the API, regenerate Scribe in the backend, then rebuild these docs:

```bash
# In the AureusERP backend
php artisan scribe:generate

# In this docs project
npm run docs:api
```
