# Errors & Status Codes

The API uses standard HTTP status codes to indicate the outcome of every request. A `2xx` code means success; `4xx` means the request was rejected; `5xx` means a server-side error.

## HTTP Status Codes

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

## Error Envelope

Errors return a `message` and, for validation failures (`422`), a field-keyed `errors` object:

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

An unauthenticated request returns:

```json
{
  "message": "Unauthenticated."
}
```
