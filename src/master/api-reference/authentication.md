# Authentication

The AureusERP API uses [Laravel Sanctum](https://laravel.com/docs/sanctum) for stateless, token-based authentication. You must obtain a Bearer token before making any protected request, then send that token on every subsequent call.

## Obtaining a Token

Send your credentials to the login endpoint:

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/login" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "email": "admin@example.com",
  "password": "password"
}'
```

```json [Response 200]
{
  "message": "Login successful",
  "token": "1|abcd1234efgh5678ijkl...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```

:::

A `401` is returned when the credentials are invalid:

```json
{
  "message": "The provided credentials are incorrect."
}
```

## Using the Token

Include the token as a `Bearer` header on every protected request:

```bash
curl -X GET "https://your-domain.com/admin/api/v1/partners/partners" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

## Revoking a Token

To log out and invalidate the current token:

::: code-group

```bash [cURL]
curl -X POST "https://your-domain.com/admin/api/v1/logout" \
  -H "Authorization: Bearer {YOUR_AUTH_TOKEN}" \
  -H "Accept: application/json"
```

```json [Response 200]
{
  "message": "Logout successful"
}
```

:::

::: warning Keep tokens secret
Never expose your API token in client-side code, public repositories, or logs. Treat it like a password. If a token leaks, log out to revoke it and issue a new one.
:::
