# REST API

AureusERP provides a REST API that gives you programmatic access to every module in the platform. Whether you're building integrations, automating workflows, or syncing data with external systems, the API covers the full lifecycle of your ERP data.

The API is documented and served interactively by [Scribe](https://scribe.knuckles.wtf/). You can browse every endpoint, inspect request/response schemas, and send live requests without writing a single line of code.

::: tip Try it now
Open **[/api/docs](/api/docs)** to explore the full API with an interactive request builder.
:::

## Authentication

The AureusERP API uses [Laravel Sanctum](https://laravel.com/docs/sanctum) for token-based authentication. To access any endpoint, first obtain a Bearer token by logging in:

```http
POST /admin/api/v1/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

Then include the token in every subsequent request:

```http
Authorization: Bearer {YOUR_AUTH_TOKEN}
```

See [Authentication](./authentication) for the full login and logout reference.

## What's Next?

Ready to start? Open the interactive documentation at **[/api/docs](/api/docs)** to browse every available endpoint.
